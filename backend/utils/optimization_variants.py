"""
Generates optimization variants (fast vs. green) with trade-off analysis
"""

import time
import ast
import re

class OptimizationVariants:
    """Generates fast and green versions of code with trade-off analysis."""
    
    def __init__(self):
        pass
        
    def generate_variants(self, code, analysis_results=None, algorithm_analysis=None):
        """
        Generate both fast and green variants of the code.
        
        Args:
            code (str): Original code to optimize
            analysis_results (dict): Results from static analysis
            algorithm_analysis (dict): Results from algorithm analysis
            
        Returns:
            dict: Fast and green variants with metrics
        """
        # Validate code syntax
        try:
            ast.parse(code)
        except SyntaxError:
            return {
                "fast_version": {
                    "code": code,
                    "speed": 100,
                    "energy": 100,
                    "context": "Invalid syntax in original code"
                },
                "green_version": {
                    "code": code,
                    "speed": 100,
                    "energy": 100,
                    "context": "Invalid syntax in original code"
                },
                "recommended": "none",
                "trade_off": "Cannot optimize code with syntax errors"
            }
            
        # Start with base versions
        fast_version = self._create_fast_version(code, algorithm_analysis)
        green_version = self._create_green_version(code, algorithm_analysis)
        
        # Calculate metrics and trade-offs
        metrics = self._calculate_metrics(code, fast_version, green_version)
        
        # Determine recommended version based on context
        recommendation = self._determine_recommendation(metrics)
        
        return {
            "fast_version": {
                "code": fast_version,
                "speed": metrics["fast_speed"],
                "energy": metrics["fast_energy"],
                "context": "Optimized for maximum execution speed. Best for real-time processing and time-critical operations."
            },
            "green_version": {
                "code": green_version,
                "speed": metrics["green_speed"],
                "energy": metrics["green_energy"],
                "context": "Optimized for energy efficiency. Ideal for background tasks, batch processing, and cloud deployments."
            },
            "recommended": recommendation,
            "trade_off": self._generate_trade_off_explanation(metrics)
        }
        
    def _create_fast_version(self, code, algorithm_analysis=None):
        """Create a performance-optimized version of the code."""
        fast_code = code
        
        # Replace list comprehensions with pre-allocated lists (when dealing with large lists)
        list_comp_pattern = r'\[(.+) for (.+) in (.+) if (.+)\]'
        match = re.search(list_comp_pattern, fast_code)
        if match:
            expr, var, iterable, condition = match.groups()
            if "large" in iterable.lower() or algorithm_analysis and algorithm_analysis.get("data_size", "small") == "large":
                replacement = f"""result = []
result_append = result.append  # Local reference for faster lookups
for {var} in {iterable}:
    if {condition}:
        result_append({expr})"""
                fast_code = fast_code.replace(match.group(0), replacement)
        
        # Generate arrays for heavily numeric operations
        if "numpy" in fast_code or "sum" in fast_code or any(op in fast_code for op in ["+", "-", "*", "/"]):
            fast_code = f"""# Consider using NumPy for faster numeric operations
import numpy as np

{fast_code.replace("sum(", "np.sum(").replace("range(", "np.arange(")}"""
        
        # Replace recursive solutions with iterative ones
        if re.search(r"def\s+(\w+).*\n.*\1\(", fast_code, re.DOTALL):
            # This is simplified, actual recursion replacement would be more complex
            fast_code = f"""# Recursion replaced with iteration for speed
{fast_code}

# Note: For large inputs, consider a non-recursive approach for better performance"""
            
        # If this is a search algorithm, suggest binary search
        if "search" in fast_code.lower() or "find" in fast_code.lower():
            fast_code = f"""# Consider using binary search for faster lookups on sorted data
{fast_code}"""
        
        return fast_code
        
    def _create_green_version(self, code, algorithm_analysis=None):
        """Create an energy-efficient optimized version of the code."""
        green_code = code
        
        # Transform for loops into list comprehensions
        for_loop_pattern = r'(\w+)\s*=\s*\[\]\s*\n\s*for\s+(\w+)\s+in\s+(.+):\s*\n\s+if\s+(.+):\s*\n\s+\1\.append\((.+)\)'
        match = re.search(for_loop_pattern, green_code)
        if match:
            var_name, item_name, iterable, condition, expression = match.groups()
            replacement = f"{var_name} = [{expression} for {item_name} in {iterable} if {condition}]"
            green_code = green_code.replace(match.group(0), replacement)
        
        # Replace manual sum with built-in sum()
        sum_pattern = r'(\w+)\s*=\s*0\s*\n\s*for\s+(\w+)\s+in\s+(\w+):\s*\n\s+\1\s*\+\=\s*\2'
        match = re.search(sum_pattern, green_code)
        if match:
            total_var, item_name, iterable = match.groups()
            replacement = f"{total_var} = sum({iterable})"
            green_code = green_code.replace(match.group(0), replacement)
        
        # Use lazy evaluation with generators for large data
        if "large" in green_code.lower() or algorithm_analysis and algorithm_analysis.get("data_size", "small") == "large":
            if "[" in green_code and "]" in green_code and "for" in green_code:
                green_code = green_code.replace("[", "(").replace("]", ")")
                green_code = f"""# Using generators for memory efficiency
{green_code}

# Note: Generator expressions consume less memory than list comprehensions"""
        
        # Memoize repeated function calls
        if re.search(r"def\s+(\w+).*\n.*\1\(", green_code, re.DOTALL):
            # Simplified memoization suggestion
            # Fix the problematic f-string with raw string
            memoization_comment = "# Consider using memoization for repeated function calls"
            import_statement = "from functools import lru_cache"
            
            decorated_code = green_code.replace("def ", "@lru_cache(maxsize=None)\ndef ")
            green_code = f"{memoization_comment}\n{import_statement}\n\n{decorated_code}"
        
        return green_code
        
    def _calculate_metrics(self, original_code, fast_version, green_version):
        """Calculate performance and energy metrics for each variant."""
        # In a real system, we'd benchmark actual code execution
        # Here, we'll use a simplified model
        
        # Count operations as a proxy for computational cost
        original_ops = self._count_operations(original_code)
        fast_ops = self._count_operations(fast_version)
        green_ops = self._count_operations(green_version)
        
        # Calculate relative metrics (lower is better)
        # Base metrics on 100-point scale
        original_speed = 100
        original_energy = 100
        
        # Fast version: Better speed, possibly higher energy
        fast_speed = max(50, original_speed * (0.7 - 0.2 * (fast_ops < original_ops)))
        fast_energy = min(120, original_energy * (1.2 - 0.3 * (fast_ops < original_ops)))
        
        # Green version: Moderate speed, better energy
        green_speed = max(70, original_speed * (0.9 - 0.2 * (green_ops < original_ops)))
        green_energy = max(60, original_energy * (0.7 - 0.1 * (green_ops < original_ops)))
        
        return {
            "original_ops": original_ops,
            "fast_ops": fast_ops,
            "green_ops": green_ops,
            "original_speed": original_speed,
            "original_energy": original_energy,
            "fast_speed": fast_speed,
            "fast_energy": fast_energy,
            "green_speed": green_speed,
            "green_energy": green_energy,
            "speed_diff": fast_speed - green_speed,
            "energy_diff": green_energy - fast_energy
        }
        
    def _count_operations(self, code):
        """Count operations in code as a proxy for computational complexity."""
        # This is a simplified proxy for operation counting
        operations = 0
        
        # Count loop iterations
        operations += code.count("for ") * 10
        operations += code.count("while ") * 15
        
        # Count function calls
        operations += len(re.findall(r"\w+\(", code)) * 5
        
        # Count arithmetic operations
        operations += sum(code.count(op) for op in ["+", "-", "*", "/", "%", "**"]) * 2
        
        # List and dictionary operations
        operations += code.count("append") * 3
        operations += code.count("[") * 2
        operations += code.count("{}") * 3
        
        return operations
        
    def _determine_recommendation(self, metrics):
        """Determine which version to recommend based on metrics."""
        speed_diff = metrics["speed_diff"]
        energy_diff = metrics["energy_diff"]
        
        if speed_diff > 15 and energy_diff < 10:
            # Fast is much faster without much energy penalty
            return "fast"
        elif speed_diff < 10 and energy_diff > 15:
            # Green is much more energy efficient without much speed penalty
            return "green"
        else:
            # Trade-off is significant, recommend green as the default for sustainability
            return "green"
        
    def _generate_trade_off_explanation(self, metrics):
        """Generate an explanation of the trade-off between versions."""
        speed_diff = metrics["speed_diff"]
        energy_diff = metrics["energy_diff"]
        
        if speed_diff > 0 and energy_diff > 0:
            return f"The fast version is approximately {round(speed_diff)}% faster but uses {round(energy_diff)}% more energy. Choose based on your priority: speed or sustainability."
        elif speed_diff > 0:
            return f"The fast version is approximately {round(speed_diff)}% faster but uses more energy. The green version is more sustainable for non-time-critical tasks."
        elif energy_diff > 0:
            return f"The green version uses approximately {round(energy_diff)}% less energy with minimal performance impact. Recommended for most use cases."
        else:
            return "Both versions offer similar performance characteristics. The green version is recommended for better sustainability."

def generate_optimization_variants(code, analysis_results=None, algorithm_analysis=None):
    """
    Generate fast and green variants of code with metrics and recommendations.
    
    Args:
        code (str): Original code to optimize
        analysis_results (dict): Results from static analysis
        algorithm_analysis (dict): Results from algorithm analysis
        
    Returns:
        dict: Fast and green variants with metrics
    """
    optimizer = OptimizationVariants()
    return optimizer.generate_variants(code, analysis_results, algorithm_analysis)
