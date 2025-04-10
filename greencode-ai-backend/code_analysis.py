import re
import logging
import tempfile
import sys
from io import StringIO
import pylint.lint

logger = logging.getLogger(__name__)

def detect_inefficiencies(code):
    """Detect inefficient patterns in code"""
    inefficiencies = []
    
    # Check for nested loops
    if re.search(r"for\s+.+?:\s*[^\n]*\n\s*for", code, re.DOTALL):
        inefficiencies.append({
            "line": next((i+1 for i, line in enumerate(code.split('\n')) if "for" in line), 0),
            "type": "nested_loops",
            "message": "Nested loops can be inefficient and energy-intensive",
            "severity": "medium"
        })
    
    # Check for manual summation instead of using sum()
    if re.search(r"=\s*0[\s\n]+for[^:]+:[^=]+=", code, re.DOTALL):
        inefficiencies.append({
            "line": next((i+1 for i, line in enumerate(code.split('\n')) if "+=" in line), 0),
            "type": "inefficient_builtin",
            "message": "Manual summation can be replaced with built-in sum() function",
            "severity": "medium"
        })
    
    # Check for inefficient string concatenation
    if re.search(r"=\s*[\"\'][\"\'][\s\n]+for[^:]+:[^=]+\+=\s*[\"\']", code, re.DOTALL):
        inefficiencies.append({
            "line": next((i+1 for i, line in enumerate(code.split('\n')) if "+=" in line and ("'" in line or '"' in line)), 0),
            "type": "string_concat",
            "message": "String concatenation in loops is inefficient, use join() instead",
            "severity": "medium"
        })
    
    return inefficiencies

def calculate_complexity(code):
    """Estimate time and space complexity."""
    # Simple heuristic-based complexity estimation
    space_complexity = "O(1)"  # Default
    time_complexity = "O(1)"   # Default
    
    # Check for lists/arrays/dictionaries that store data
    if any(pattern in code for pattern in ["= []", "= list(", "= {", "= dict("]):
        space_complexity = "O(n)"
    
    # Check for nested loops - O(n²)
    if re.search(r"for\s+.+?:\s*[^\n]*\n\s*for", code, re.DOTALL):
        time_complexity = "O(n²)"
    # Single loop - O(n)
    elif "for" in code:
        time_complexity = "O(n)"
    
    return time_complexity, space_complexity

def run_pylint(code):
    """Run pylint on code and return issues."""
    issues = []
    
    # Create temporary file to run pylint
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as tmp_file:
        tmp_file.write(code)
        tmp_file_path = tmp_file.name
    
    # Redirect stdout to capture pylint output
    old_stdout = sys.stdout
    redirected_output = StringIO()
    sys.stdout = redirected_output
    
    try:
        pylint.lint.Run([
            '--disable=all', 
            '--enable=unused-variable,unused-import,unnecessary-comprehension,unnecessary-lambda',
            tmp_file_path
        ], exit=False)
        
        output = redirected_output.getvalue()
        
        # Parse issues from pylint output
        for line in output.split('\n'):
            if ':' in line and any(level in line for level in ['C:', 'W:', 'E:']):
                parts = line.split(':')
                if len(parts) >= 3:
                    try:
                        line_num = int(parts[1])
                        message = ':'.join(parts[2:]).strip()
                        issues.append({
                            "line": line_num,
                            "message": message,
                            "severity": "low" if 'C:' in line else "medium"
                        })
                    except ValueError:
                        pass
    
    except Exception as e:
        logger.error(f"Error running pylint: {str(e)}")
    
    finally:
        # Restore stdout
        sys.stdout = old_stdout
        
        # Clean up the temporary file
        import os
        try:
            os.unlink(tmp_file_path)
        except:
            pass
    
    return issues