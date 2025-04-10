import re
import tempfile
import os
import ast

def static_analysis(code):
    """
    Analyze Python code for energy inefficiencies using static analysis.
    Returns a dictionary with analysis results.
    """
    try:
        # Initialize results
        results = {
            "inefficiencies": [],
            "suggestions": [],
            "severity": "low"
        }
        
        # Check if the code is valid Python syntax
        try:
            ast.parse(code)
        except SyntaxError as e:
            results["inefficiencies"].append({
                "type": "syntax_error",
                "message": f"Syntax error: {str(e)}",
                "line": e.lineno
            })
            results["severity"] = "high"
            return results

        # Check for nested loops (potentially inefficient)
        nested_loops = check_nested_loops(code)
        if nested_loops:
            results["inefficiencies"].extend(nested_loops)
        
        # Check for inefficient string concatenation
        string_concat = check_string_concatenation(code)
        if string_concat:
            results["inefficiencies"].extend(string_concat)
        
        # Check for list comprehension opportunities
        list_comp = check_list_comprehension_opportunities(code)
        if list_comp:
            results["inefficiencies"].extend(list_comp)
        
        # Check for inefficient use of built-in functions
        builtin_check = check_inefficient_builtin_usage(code)
        if builtin_check:
            results["inefficiencies"].extend(builtin_check)
        
        # Generate suggestions based on inefficiencies
        for issue in results["inefficiencies"]:
            if issue["type"] == "nested_loops":
                results["suggestions"].append({
                    "message": "Consider vectorized operations or NumPy for nested loops",
                    "severity": "medium"
                })
            elif issue["type"] == "string_concatenation":
                results["suggestions"].append({
                    "message": "Use string joining or f-strings instead of + operator for multiple concatenations",
                    "severity": "low"
                })
            elif issue["type"] == "list_comprehension_opportunity":
                results["suggestions"].append({
                    "message": "Replace for-loop with list comprehension for better efficiency",
                    "severity": "medium"
                })
            elif issue["type"] == "inefficient_builtin":
                results["suggestions"].append({
                    "message": "Use optimized built-in functions like sum() instead of manual loops",
                    "severity": "medium"
                })
        
        # Set overall severity based on number and type of issues
        if len(results["inefficiencies"]) > 5:
            results["severity"] = "high"
        elif len(results["inefficiencies"]) > 2:
            results["severity"] = "medium"
        
        return results
    
    except Exception as e:
        return {
            "error": str(e),
            "inefficiencies": [],
            "suggestions": [],
            "severity": "unknown"
        }

def check_nested_loops(code):
    """Check for nested loops in the code"""
    issues = []
    
    # Simple regex pattern to detect nested loops
    nested_for_pattern = r'for\s+.+:\s*\n\s+for\s+'
    matches = re.finditer(nested_for_pattern, code)
    
    for match in matches:
        line_number = code[:match.start()].count('\n') + 1
        issues.append({
            "type": "nested_loops",
            "message": "Nested loops can be inefficient and energy-intensive",
            "line": line_number,
            "severity": "medium"
        })
    
    return issues

def check_string_concatenation(code):
    """Check for inefficient string concatenation"""
    issues = []
    
    # Look for multiple string concatenations with + operator
    concat_pattern = r'(\w+\s*\+\=\s*[\'\"].+[\'\"]|\w+\s*\=\s*\w+\s*\+\s*[\'\"].+[\'\"])'
    matches = re.finditer(concat_pattern, code)
    
    for match in matches:
        line_number = code[:match.start()].count('\n') + 1
        issues.append({
            "type": "string_concatenation",
            "message": "Using + operator for string concatenation is less efficient than join() or f-strings",
            "line": line_number,
            "severity": "low"
        })
    
    return issues

def check_list_comprehension_opportunities(code):
    """Identify opportunities to use list comprehensions instead of loops"""
    issues = []
    
    # Pattern for detecting common for-loop patterns that could be list comprehensions
    # This is a simplified pattern and won't catch all cases
    pattern = r'(\w+)\s*=\s*\[\]\s*\n\s*for\s+(\w+)\s+in\s+(.+):\s*\n\s+\1\.append\('
    matches = re.finditer(pattern, code)
    
    for match in matches:
        line_number = code[:match.start()].count('\n') + 1
        issues.append({
            "type": "list_comprehension_opportunity",
            "message": "This for-loop could be replaced with a more efficient list comprehension",
            "line": line_number,
            "severity": "medium"
        })
    
    return issues

def check_inefficient_builtin_usage(code):
    """Check for inefficient use of built-in functions or manual implementations"""
    issues = []
    
    # Pattern for manual sum implementation
    sum_pattern = r'(\w+)\s*=\s*0\s*\n\s*for\s+(\w+)\s+in\s+(.+):\s*\n\s+\1\s*\+\=\s*\2'
    matches = re.finditer(sum_pattern, code)
    
    for match in matches:
        line_number = code[:match.start()].count('\n') + 1
        issues.append({
            "type": "inefficient_builtin",
            "message": "Manual summation can be replaced with built-in sum() function",
            "line": line_number,
            "severity": "medium"
        })
    
    return issues
