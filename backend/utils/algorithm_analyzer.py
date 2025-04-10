"""
Algorithm Analyzer - Advanced code pattern detection for complexity analysis
"""

import ast
import re
from collections import defaultdict
import time

class AlgorithmAnalyzer:
    """Performs deep analysis of algorithms to detect complexity and suggest optimizations."""
    
    def __init__(self):
        self.complexity_patterns = {
            "O(n^2)": [
                r"for\s+.+:\s*\n\s+for\s+.+:",  # Nested loops
                r"while\s+.+:\s*\n\s+while\s+.+:",  # Nested while loops
                r"for\s+.+:\s*\n\s+while\s+.+:", # Mixed nested loops
            ],
            "O(n*log(n))": [
                r"\.sort\(\)",  # Python's sort (Timsort)
                r"sorted\(",  # Python's sorted function
                r"merge_sort|quick_sort|heap_sort",  # Common O(n log n) sorting algorithms
            ],
            "O(n)": [
                r"for\s+.+\s+in\s+.+:",  # Single loop
                r"while\s+.+:",  # Single while loop
            ],
            "O(log(n))": [
                r"binary_search",  # Binary search
                r"mid\s*=\s*.+\s*\/\/\s*2",  # Common pattern in binary search
            ],
            "O(1)": [
                r"\[\d+\]",  # Constant-time access
                r"\.append\(",  # Constant-time append to list
            ],
            "O(2^n)": [
                r"fibonacci\(.+\-1\)\s*\+\s*fibonacci\(.+\-2\)",  # Recursive Fibonacci
                r"def\s+.+\(.+\):.+return\s+.+\(.+\-1\)\s*\+\s*.+\(.+\-2\)",  # General recursive pattern
            ]
        }
        
        # Patterns for specific inefficient algorithms
        self.inefficient_patterns = {
            "recursive_without_memoization": r"def\s+fibonacci\(.+\):.+return\s+fibonacci\(.+\-1\)\s*\+\s*fibonacci\(.+\-2\)",
            "bubble_sort": r"for\s+.+\s+in\s+range\(.+\):\s*\n\s+for\s+.+\s+in\s+range\(.+\):\s*\n\s+if\s+.+\[.+\]\s*>\s*.+\[.+\]",
            "repeated_list_traversal": r"for\s+.+\s+in\s+.+:.+\n.*if\s+.+\s+in\s+.+:",
        }
        
        # Suggestions for optimizations
        self.optimization_suggestions = {
            "recursive_without_memoization": "Use memoization to avoid redundant calculations in recursive functions",
            "bubble_sort": "Replace bubble sort with Python's built-in sort() or sorted() function for better efficiency",
            "repeated_list_traversal": "Use set or dictionary for lookups instead of repeatedly traversing lists",
            "O(n^2)": "Consider optimizing nested loops with more efficient alternatives",
            "O(2^n)": "Exponential algorithms can be optimized using dynamic programming techniques",
        }
    
    def analyze(self, code):
        """
        Perform a deep analysis of the code to detect algorithm patterns and complexity.
        
        Args:
            code (str): Python code as a string
            
        Returns:
            dict: Analysis results including complexity, inefficient patterns, and optimization suggestions
        """
        results = {
            "time_complexity": "Unknown",
            "space_complexity": "Unknown",
            "inefficient_patterns": [],
            "optimization_suggestions": [],
            "algorithm_patterns": []
        }
        
        # Start timing the analysis
        start_time = time.time()
        
        # Detect time complexity
        complexity = self._detect_time_complexity(code)
        if complexity:
            results["time_complexity"] = complexity
        
        # Detect inefficient patterns
        for pattern_name, pattern in self.inefficient_patterns.items():
            if re.search(pattern, code):
                results["inefficient_patterns"].append(pattern_name)
                if pattern_name in self.optimization_suggestions:
                    results["optimization_suggestions"].append({
                        "type": pattern_name,
                        "suggestion": self.optimization_suggestions[pattern_name]
                    })
        
        # Detect algorithm patterns
        results["algorithm_patterns"] = self._detect_algorithm_patterns(code)
        
        # Add complexity-based optimization suggestions
        if complexity in self.optimization_suggestions:
            results["optimization_suggestions"].append({
                "type": complexity,
                "suggestion": self.optimization_suggestions[complexity]
            })
        
        # Add space complexity analysis
        results["space_complexity"] = self._analyze_space_complexity(code)
        
        # Add analysis time
        results["analysis_time"] = round(time.time() - start_time, 4)
        
        return results
    
    def _detect_time_complexity(self, code):
        """Detect the most likely time complexity of the code."""
        # Start with most complex patterns
        for complexity, patterns in self.complexity_patterns.items():
            for pattern in patterns:
                if re.search(pattern, code):
                    return complexity
        
        # If no specific pattern detected, default to linear
        return "O(n)"
    
    def _analyze_space_complexity(self, code):
        """Analyze space complexity of the code."""
        # Check for memory-intensive patterns
        if re.search(r"\.append\(.+\)", code) and re.search(r"for\s+.+\s+in\s+range\(.+\)", code):
            return "O(n)"  # Likely creating a list of size proportional to input
        
        if re.search(r"=\s*\[\s*\]\s*\n\s*for", code):
            return "O(n)"  # Creating an array and filling it in a loop
            
        if re.search(r"=\s*\{\s*\}\s*\n\s*for", code):
            return "O(n)"  # Creating a dictionary and filling it in a loop
            
        if re.search(r"=\s*\[\s*for\s+.+\s+in\s+.+\s*\]", code):
            return "O(n)"  # List comprehension
            
        return "O(1)"  # Default if no clear pattern found
    
    def _detect_algorithm_patterns(self, code):
        """Detect common algorithm patterns in the code."""
        patterns = []
        
        # Check for sorting algorithms
        if re.search(r"\.sort\(\)|sorted\(", code):
            patterns.append("sorting")
            
        # Check for search algorithms
        if re.search(r"binary_search|if\s+.+\s+in\s+.+:", code):
            patterns.append("searching")
            
        # Check for dynamic programming
        if re.search(r"memo\s*=\s*\{\}|cache\s*=\s*\{\}", code):
            patterns.append("dynamic_programming")
            
        # Check for recursion
        if re.search(r"def\s+(.+)\(.+\):.+\1\(.+\)", code):
            patterns.append("recursion")
            
        # Check for graph operations
        if re.search(r"graph\s*=\s*\{.*\}|adjacency|neighbors", code):
            patterns.append("graph_algorithm")
            
        # Check for divide and conquer
        if re.search(r"mid\s*=\s*.+\s*\/\/\s*2.+return.+mid", code):
            patterns.append("divide_and_conquer")
        
        return patterns

def analyze_algorithm(code):
    """
    Wrapper function to analyze algorithms in code.
    
    Args:
        code (str): Python code as a string
        
    Returns:
        dict: Analysis results
    """
    analyzer = AlgorithmAnalyzer()
    try:
        return analyzer.analyze(code)
    except Exception as e:
        return {
            "error": str(e),
            "time_complexity": "Unknown",
            "space_complexity": "Unknown",
            "inefficient_patterns": [],
            "optimization_suggestions": [],
            "algorithm_patterns": []
        }
