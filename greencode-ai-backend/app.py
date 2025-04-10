from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback
import os
import logging
from code_analysis import detect_inefficiencies, calculate_complexity
from code_optimization import rule_based_optimization, generate_code_with_model, call_remote_model
from energy_measurement import measure_energy_consumption
from score_calculation import calculate_green_score, generate_code_variants
from model_loader import load_local_model, model, tokenizer

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Constants
COLAB_URL = os.getenv("COLAB_URL", "")  # URL for remote StarCoder 15B
USE_LOCAL_MODEL = model is not None
USE_REMOTE_MODEL_FALLBACK = bool(COLAB_URL)

@app.route('/analyze', methods=['POST'])
def analyze_code():
    try:
        data = request.get_json()
        
        if not data or 'code' not in data:
            return jsonify({
                'error': 'No code provided'
            }), 400
        
        code = data['code']
        context = data.get('context', 'energy_efficiency')
        advanced = data.get('advanced', True)
        variants = data.get('variants', True)
        
        logger.info(f"Analyzing code with context: {context}")
        
        # Store the original code
        original_code = code
        
        # Detect inefficiencies
        inefficiencies = detect_inefficiencies(code)
        
        # Calculate complexity
        time_complexity, space_complexity = calculate_complexity(code)
        
        # Apply rule-based optimization
        rule_optimized_code, changes = rule_based_optimization(code)
        
        # Try model-based optimization if available
        model_optimized_code = None
        explanation = ""
        
        # Step 1: Try local model
        if USE_LOCAL_MODEL:
            try:
                model_optimized_code = generate_code_with_model(code)
                if model_optimized_code:
                    logger.info("Successfully generated optimized code with local model")
            except Exception as e:
                logger.error(f"Error using local model: {str(e)}")
                explanation = f"Local model optimization failed: {str(e)}. "
        else:
            explanation = "Local model not available. "
        
        # Step 2: Try remote model if local failed and remote is configured
        if model_optimized_code is None and USE_REMOTE_MODEL_FALLBACK:
            try:
                model_optimized_code = call_remote_model(code)
                if model_optimized_code:
                    logger.info("Successfully generated optimized code with remote model")
                else:
                    explanation += "Remote model optimization failed. "
            except Exception as e:
                logger.error(f"Error using remote model: {str(e)}")
                explanation += f"Remote model optimization failed: {str(e)}. "
        
        # Step 3: Fall back to rule-based if both models failed
        if model_optimized_code is None:
            optimized_code = rule_optimized_code
            explanation += "Using rule-based optimization instead."
            logger.info("Using rule-based optimization")
        else:
            optimized_code = model_optimized_code
            logger.info("Using model-based optimization")
        
        # Measure energy consumption (optional)
        try:
            energy_measurements = measure_energy_consumption(code)
            co2_saved = str(round(energy_measurements.get("co2", 0.0), 2))
            energy_saved = str(round(energy_measurements.get("energy", 0.0), 2))
        except Exception as e:
            logger.error(f"Error measuring energy: {str(e)}")
            co2_saved = "0.0"
            energy_saved = "0.0"
        
        # Calculate green score
        green_score = calculate_green_score(original_code, optimized_code, inefficiencies)
        
        # Generate variants if requested
        code_variants = generate_code_variants(original_code, optimized_code) if variants else {}
        
        # Generate suggestions
        suggestions = []
        if inefficiencies:
            for issue in inefficiencies:
                if issue['type'] == 'nested_loops':
                    suggestions.append({
                        "message": "Consider vectorized operations or NumPy for nested loops",
                        "severity": "medium"
                    })
                elif issue['type'] == 'inefficient_builtin':
                    suggestions.append({
                        "message": "Use optimized built-in functions like sum() instead of manual loops",
                        "severity": "medium"
                    })
                elif issue['type'] == 'string_concat':
                    suggestions.append({
                        "message": "Use string join() instead of concatenation in loops",
                        "severity": "medium"
                    })
        
        # Construct the full response
        response = {
            "original_code": original_code,
            "optimized_code": optimized_code,
            "analysis": {
                "inefficiencies": inefficiencies,
                "severity": "low" if len(inefficiencies) < 2 else "medium",
                "suggestions": suggestions
            },
            "algorithm_analysis": {
                "time_complexity": time_complexity,
                "space_complexity": space_complexity,
                "analysis_time": 0.0,
                "algorithm_patterns": [],
                "inefficient_patterns": [],
                "optimization_suggestions": []
            },
            "optimization": {
                "context": context,
                "explanation": explanation,
                "changes": changes,
                "optimization_time": 0.0
            },
            "green_score": green_score,
            "co2_saved": co2_saved,
            "energy_saved": energy_saved
        }
        
        # Add variants if generated
        if variants and code_variants:
            response["variants"] = code_variants
        
        logger.info("Successfully analyzed code")
        return jsonify(response)
    
    except Exception as e:
        logger.error(f"Error analyzing code: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({
            'error': f'Error analyzing code: {str(e)}'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    model_status = "loaded" if model is not None else "not_loaded"
    return jsonify({
        "status": "healthy",
        "model_status": model_status,
        "remote_model_configured": bool(COLAB_URL)
    })

if __name__ == '__main__':
    # Load environment variables
    port = int(os.environ.get('PORT', 5000))
    
    # Start the Flask app
    app.run(host='0.0.0.0', port=port, debug=False)
