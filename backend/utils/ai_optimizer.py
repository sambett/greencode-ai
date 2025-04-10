"""
AI-powered code optimization with context awareness
"""

import re
import time
import os
from dotenv import load_dotenv
from transformers import pipeline
import importlib.util

# Load environment variables including Hugging Face token
load_dotenv()

class AIOptimizer:
    """Uses AI models to suggest context-aware optimizations for code."""
    
    def __init__(self, model_name="bigcode/starcoderbase-1b"):
        """
        Initialize the AI optimizer.
        
        Args:
            model_name (str): Name of the model to use for optimization suggestions
        """
        self.model_name = model_name
        self._model = None
        # Get token from environment variables or default to saved token
        self.hf_token = os.getenv("HUGGINGFACE_TOKEN")
        self.optimization_context = {
            "energy_efficiency": {
                "prompt_prefix": "# Optimize this Python code for maximum energy efficiency:\n",
                "prompt_suffix": "\n\n# Energy-efficient optimized version with reduced computational complexity:",
                "system_context": "Focus on minimizing computational operations, reducing memory usage, and avoiding redundant calculations."
            },
            "readability": {
                "prompt_prefix": "# Make this Python code more readable while maintaining efficiency:\n",
                "prompt_suffix": "\n\n# More readable version with good documentation:",
                "system_context": "Focus on clear variable names, appropriate comments, and following PEP 8 style guidelines."
            },
            "memory_efficiency": {
                "prompt_prefix": "# Optimize this Python code for minimum memory usage:\n",
                "prompt_suffix": "\n\n# Memory-efficient version:",
                "system_context": "Focus on reducing memory allocations, avoiding unnecessary copies, and using generators where appropriate."
            },
            "performance": {
                "prompt_prefix": "# Optimize this Python code for maximum execution speed:\n",
                "prompt_suffix": "\n\n# High-performance optimized version:",
                "system_context": "Focus on algorithmic improvements, efficient data structures, and vectorization where possible."
            }
        }
    
    @property
    def model(self):
        """Lazy-load the model on first use."""
        if self._model is None:
            try:
                # Use the token if available, otherwise use the saved token
                if self.hf_token:
                    print("Using token from environment variables")
                    self._model = pipeline("text-generation", model=self.model_name, use_auth_token=self.hf_token)
                else:
                    print("Using saved Hugging Face token")
                    self._model = pipeline("text-generation", model=self.model_name, use_auth_token=True)
            except Exception as e:
                print(f"Error loading model: {e}")
                # Try one more time with explicit token if we have one
                if self.hf_token:
                    try:
                        print("Retrying with explicit token...")
                        self._model = pipeline("text-generation", model=self.model_name, token=self.hf_token)
                    except Exception as e2:
                        print(f"Second attempt failed: {e2}")
                        raise
                else:
                    raise
        return self._model
    
    def optimize(self, code, context="energy_efficiency", analysis_results=None, max_length=1024, temperature=0.2):
        """
        Generate optimized code using the AI model.
        
        Args:
            code (str): Original code to optimize
            context (str): Optimization context (energy_efficiency, readability, etc.)
            analysis_results (dict, optional): Results from algorithm analysis to improve context
            max_length (int): Maximum length of generated text
            temperature (float): Sampling temperature for text generation
            
        Returns:
            dict: Optimization results
        """
        start_time = time.time()
        
        # Initialize results structure
        results = {
            "optimized_code": "",
            "explanation": "",
            "changes": [],
            "optimization_time": 0,
            "context": context
        }
        
        try:
            # Get context-specific prompt templates
            context_info = self.optimization_context.get(
                context, 
                self.optimization_context["energy_efficiency"]
            )
            
            # Build the prompt with context awareness
            prompt = self._build_context_aware_prompt(code, context_info, analysis_results)
            
            # Generate optimized code
            generated = self.model(
                prompt, 
                max_length=max_length,
                do_sample=True,
                temperature=temperature,
                num_return_sequences=1
            )
            
            # Extract the optimized code and explanation
            generated_text = generated[0]['generated_text']
            optimized_code, explanation = self._extract_optimization(
                generated_text, 
                context_info["prompt_suffix"]
            )
            
            # Record the results
            results["optimized_code"] = optimized_code.strip()
            results["explanation"] = self._generate_explanation(optimized_code, code, context, analysis_results)
            results["changes"] = self._identify_changes(code, optimized_code)
            
        except Exception as e:
            results["error"] = str(e)
            # Still provide a basic optimization using rule-based approach as fallback
            from .optimization import suggest_optimization
            fallback = suggest_optimization(code)
            results["optimized_code"] = fallback.get("optimized_code", code)
            results["explanation"] = f"AI optimization failed: {str(e)}. Using rule-based optimization instead."
            results["changes"] = fallback.get("changes", [])
        
        # Record optimization time
        results["optimization_time"] = round(time.time() - start_time, 2)
        
        return results
    
    def _build_context_aware_prompt(self, code, context_info, analysis_results=None):
        """Build a context-aware prompt for the AI model."""
        prompt = context_info["prompt_prefix"]
        
        # Add code
        prompt += code
        
        # Add context from analysis results if available
        if analysis_results:
            prompt += "\n\n# Analysis information:\n"
            if "time_complexity" in analysis_results:
                prompt += f"# Current time complexity: {analysis_results['time_complexity']}\n"
            if "space_complexity" in analysis_results:
                prompt += f"# Current space complexity: {analysis_results['space_complexity']}\n"
            if "inefficient_patterns" in analysis_results and analysis_results["inefficient_patterns"]:
                prompt += f"# Inefficient patterns detected: {', '.join(analysis_results['inefficient_patterns'])}\n"
            if "algorithm_patterns" in analysis_results and analysis_results["algorithm_patterns"]:
                prompt += f"# Algorithm patterns detected: {', '.join(analysis_results['algorithm_patterns'])}\n"
        
        # Add optimization goal
        prompt += context_info["prompt_suffix"]
        
        return prompt
    
    def _extract_optimization(self, generated_text, prompt_suffix):
        """Extract the optimized code and explanation from the generated text."""
        # Split the generated text at the prompt suffix
        parts = generated_text.split(prompt_suffix)
        
        if len(parts) < 2:
            # If prompt suffix not found, assume everything after original code is the optimization
            explanation = "AI optimization applied."
            optimized_code = parts[0].split("# Optimize this Python code")[1].strip()
        else:
            optimized_code = parts[1].strip()
            
            # Try to find explanation comments
            explanation_match = re.search(r"#\s*(.*?)\n", optimized_code)
            if explanation_match:
                explanation = explanation_match.group(1).strip()
            else:
                explanation = "AI optimization applied."
        
        # Clean up the code (remove markdown code blocks if present)
        if "```python" in optimized_code:
            optimized_code = re.search(r"```python\s*(.*?)\s*```", optimized_code, re.DOTALL)
            if optimized_code:
                optimized_code = optimized_code.group(1)
        
        return optimized_code, explanation
    
    def _generate_explanation(self, optimized_code, original_code, context, analysis_results=None):
        """Generate a human-readable explanation of the optimization."""
        explanation = f"Code optimized for {context}.\n\n"
        
        # Compare original and optimized code
        original_lines = len(original_code.split('\n'))
        optimized_lines = len(optimized_code.split('\n'))
        line_diff = original_lines - optimized_lines
        
        if line_diff > 0:
            explanation += f"- Reduced code size by {line_diff} lines.\n"
        
        # Add specific optimization explanations based on context
        if context == "energy_efficiency":
            explanation += "- Improved energy efficiency by reducing computational complexity.\n"
            if analysis_results and "time_complexity" in analysis_results:
                explanation += f"- Original time complexity: {analysis_results['time_complexity']}.\n"
                
        elif context == "memory_efficiency":
            explanation += "- Improved memory usage by optimizing data structures and allocation patterns.\n"
        
        elif context == "performance":
            explanation += "- Enhanced performance by optimizing algorithms and data access patterns.\n"
        
        elif context == "readability":
            explanation += "- Enhanced code readability while maintaining efficiency.\n"
        
        return explanation
    
    def _identify_changes(self, original_code, optimized_code):
        """Identify the key changes made during optimization."""
        changes = []
        
        # Check for list comprehension
        if "for" in original_code and "[" in optimized_code and "for" in optimized_code and "]" in optimized_code:
            # Look for list comprehension pattern
            if re.search(r"\[\s*.*\s+for\s+.*\s+in\s+.*\s*\]", optimized_code):
                changes.append({
                    "type": "list_comprehension",
                    "description": "Replaced for-loop with more efficient list comprehension"
                })
        
        # Check for use of built-in functions
        if "sum(" in optimized_code and not "sum(" in original_code:
            changes.append({
                "type": "builtin_function",
                "description": "Used built-in sum() function for more efficient summation"
            })
            
        # Check for dictionary usage instead of repeated lookups
        if not "= {}" in original_code and "= {}" in optimized_code:
            changes.append({
                "type": "data_structure",
                "description": "Used dictionary for O(1) lookups instead of repeated searches"
            })
            
        # Check for recursion to iteration conversion
        if "def " in original_code and "return " in original_code and re.search(r"def\s+(\w+).*\1\s*\(", original_code) and not re.search(r"def\s+(\w+).*\1\s*\(", optimized_code):
            changes.append({
                "type": "recursion_to_iteration",
                "description": "Converted recursive algorithm to iterative approach for better efficiency"
            })
            
        return changes


def ai_optimize(code, context="energy_efficiency", analysis_results=None):
    """
    Wrapper function for AI-powered code optimization.
    
    Args:
        code (str): Python code to optimize
        context (str): Optimization context
        analysis_results (dict, optional): Results from algorithm analysis
        
    Returns:
        dict: Optimization results
    """
    optimizer = AIOptimizer()
    try:
        return optimizer.optimize(code, context, analysis_results)
    except Exception as e:
        # Fallback to the original optimization logic
        from .optimization import suggest_optimization
        fallback = suggest_optimization(code)
        fallback["error"] = str(e)
        fallback["explanation"] = f"AI optimization failed: {str(e)}. Using rule-based optimization instead."
        return fallback
