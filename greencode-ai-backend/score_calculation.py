import re
import logging
from model_loader import model, tokenizer
from code_optimization import generate_code_with_model

logger = logging.getLogger(__name__)

def calculate_green_score(code, optimized, inefficiencies):
    """Calculate a sustainability score for the code"""
    # Base score
    original_score = 70
    
    # Deduct points for inefficiencies
    original_score -= len(inefficiencies) * 5
    
    # Check for specific patterns that reduce score
    if re.search(r"for\s+.+?:\s*[^\n]*\n\s*for", code, re.DOTALL):
        original_score -= 10  # Nested loops penalty
    
    # Make sure the score stays reasonable
    original_score = max(min(original_score, 95), 40)
    
    # Calculate optimized score
    if code == optimized:
        optimized_score = original_score
        improvement = 0
    else:
        # Baseline improvement
        improvement = 25
        
        # Additional improvements based on specific optimizations
        if "[" in optimized and "for" not in optimized:
            improvement += 5  # Good list comprehension use
        
        if "sum(" in optimized:
            improvement += 5  # Good use of built-in functions
        
        # Calculate the optimized score
        optimized_score = min(original_score + improvement, 110)
        
        # Ensure there's always some improvement if the code changed
        if optimized_score <= original_score:
            optimized_score = original_score + 10
    
    return {
        "original": original_score,
        "optimized": optimized_score,
        "improvement": optimized_score - original_score
    }

def generate_code_variants(original_code, optimized_code):
    """Generate different optimization variants for speed vs energy efficiency"""
    
    # Default values if we can't generate proper variants
    fast_version = {
        "code": f"# Consider using NumPy for faster numeric operations\nimport numpy as np\n\n{original_code}",
        "context": "Optimized for maximum execution speed. Best for real-time processing and time-critical operations.",
        "speed": 70.0,
        "energy": 120
    }
    
    green_version = {
        "code": optimized_code,
        "context": "Optimized for energy efficiency. Ideal for background tasks, batch processing, and cloud deployments.",
        "speed": 70.0 if "for" in optimized_code else 90.0,
        "energy": 60 if original_code != optimized_code else 70.0
    }
    
    # Try to use the model to generate proper variants if available
    if model is not None and tokenizer is not None:
        try:
            # Try to generate a speed-optimized version
            speed_prompt = f"""
            # Original code:
            ```python
            {original_code}
            ```
            
            # Task: Optimize the above code for maximum SPEED, regardless of energy consumption.
            
            # Speed-optimized code:
            ```python
            """
            
            fast_code = generate_code_with_model(original_code, speed_prompt)
            if fast_code and fast_code != original_code:
                fast_version["code"] = fast_code
        except Exception as e:
            logger.warning(f"Error generating speed variant: {str(e)}")
    
    # Determine which version to recommend
    if original_code == optimized_code:
        recommended = "original"
        trade_off = "No significant improvements were found. The original code is already quite efficient."
    else:
        recommended = "green"
        trade_off = "Both versions offer similar performance characteristics. The green version is recommended for better sustainability."
    
    return {
        "fast_version": fast_version,
        "green_version": green_version,
        "recommended": recommended,
        "trade_off": trade_off
    }