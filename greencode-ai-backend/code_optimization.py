import re
import logging
import requests
import os
import torch
from model_loader import model, tokenizer

logger = logging.getLogger(__name__)

# Constants
COLAB_URL = os.getenv("COLAB_URL", "")  # URL for remote StarCoder 15B

def rule_based_optimization(code):
    """Apply basic rule-based optimizations to Python code."""
    optimized = code
    changes = []
    
    # Rule 1: Convert basic for loops to list comprehensions
    original = optimized
    pattern = r"(\w+)\s*=\s*\[\]\s*\n\s*for\s+(\w+)\s+in\s+(.+?):\s*\n\s*if\s+([^:]+?):\s*\n\s*\1\.append\(([^)]+)\)"
    replacement = r"\1 = [\5 for \2 in \3 if \4]"
    optimized = re.sub(pattern, replacement, optimized)
    if original != optimized:
        changes.append({
            "type": "list_comprehension",
            "description": "Replaced for-loop with more efficient list comprehension"
        })
    
    # Rule 2: Replace manual sum with sum() function
    original = optimized
    pattern = r"(\w+)\s*=\s*0\s*\n\s*for\s+(\w+)\s+in\s+([^:]+?):\s*\n\s*\1\s*\+=\s*\2"
    replacement = r"\1 = sum(\3)"
    optimized = re.sub(pattern, replacement, optimized)
    if original != optimized:
        changes.append({
            "type": "builtin_function",
            "description": "Replaced manual sum loop with efficient built-in sum() function"
        })
    
    # Rule 3: Replace string concatenation in loops with join
    original = optimized
    pattern = r"(\w+)\s*=\s*[\"\']\s*[\"\']\s*\n\s*for\s+(\w+)\s+in\s+(.+?):\s*\n\s*\1\s*\+=\s*(.+)"
    replacement = r"\1 = ''.join(\4 for \2 in \3)"
    optimized = re.sub(pattern, replacement, optimized)
    if original != optimized:
        changes.append({
            "type": "string_join",
            "description": "Replaced inefficient string concatenation with join() method"
        })
    
    return optimized, changes

def generate_code_with_model(code, prompt_template=None):
    """Use the loaded model to optimize code"""
    if model is None or tokenizer is None:
        logger.warning("Local model not available, skipping model-based optimization")
        return None
    
    try:
        if prompt_template is None:
            prompt_template = """
            You are an expert Python developer focused on energy-efficient, sustainable code.
            
            # Original code:
            ```python
            {original_code}
            ```
            
            # Task: 
            Optimize the above code for energy efficiency and sustainability. Focus on:
            1. Reducing unnecessary computations
            2. Minimizing memory usage
            3. Using efficient built-in functions
            4. Vectorizing operations where possible
            5. Avoiding redundant calculations
            
            # Optimized code:
            ```python
            """
        
        # Prepare the prompt
        prompt = prompt_template.format(original_code=code)
        
        # Encode the prompt
        inputs = tokenizer(prompt, return_tensors="pt")
        inputs = {k: v.to(model.device) for k, v in inputs.items()} 
        
        # Determine token limit based on model size
        max_new_tokens = min(500, tokenizer.model_max_length - inputs.input_ids.shape[1] - 10)
        
        # Generate optimized code
        with torch.no_grad():
            outputs = model.generate(
                inputs["input_ids"],
                max_new_tokens=max_new_tokens,
                temperature=0.2,  # More deterministic outputs
                num_return_sequences=1,
                pad_token_id=tokenizer.eos_token_id,
                do_sample=True
            )
        
        # Decode the generated text
        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Extract only the optimized code
        pattern = r"# Optimized code:\n```python\n(.*?)(?:```|$)"
        match = re.search(pattern, generated_text, re.DOTALL)
        if match:
            optimized_code = match.group(1).strip()
            return optimized_code
        
        # If the regex pattern didn't match, try to extract code after the prompt
        prompt_parts = prompt.split("# Optimized code:\n```python\n")
        if len(prompt_parts) > 1:
            # Get everything after the prompt
            generated_part = generated_text[len(prompt_parts[0]) + len("# Optimized code:\n```python\n"):]
            # Look for the end of code block or take everything
            code_end = generated_part.find("```")
            if code_end > 0:
                return generated_part[:code_end].strip()
            return generated_part.strip()
        
        return None
    
    except Exception as e:
        logger.error(f"Error generating optimized code with model: {str(e)}")
        return None

def call_remote_model(code):
    """Send code to remote Colab instance running StarCoder 15B"""
    if not COLAB_URL:
        return None
    
    try:
        logger.info(f"Calling remote model at {COLAB_URL}")
        response = requests.post(
            COLAB_URL,
            json={"code": code},
            timeout=30  # 30-second timeout
        )
        
        if response.status_code == 200:
            result = response.json()
            return result.get("optimized_code")
        else:
            logger.error(f"Remote model returned status code {response.status_code}")
            return None
    
    except Exception as e:
        logger.error(f"Error calling remote model: {str(e)}")
        return None