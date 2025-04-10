from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import utility modules
from utils.analysis import static_analysis
from utils.optimization import suggest_optimization
from utils.emissions import estimate_emissions
from utils.algorithm_analyzer import analyze_algorithm
from utils.ai_optimizer import ai_optimize
from utils.optimization_variants import generate_optimization_variants

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint to check if the server is running"""
    return jsonify({"status": "healthy", "message": "GreenCode AI Backend is running"})

@app.route('/analyze', methods=['POST'])
def analyze_code():
    """Main endpoint to analyze, optimize and estimate emissions for code"""
    try:
        data = request.json
        code = data.get("code", "")
        optimization_context = data.get("context", "energy_efficiency")
        use_advanced_analysis = data.get("advanced", True)  # Default to advanced analysis
        show_variants = data.get("variants", True)  # Whether to show fast/green versions
        
        if not code:
            return jsonify({"error": "No code provided"}), 400
        
        # Step 1: Static Analysis
        analysis_results = static_analysis(code)
        
        # Step 2: Advanced Algorithm Analysis (if enabled)
        algorithm_analysis = {}
        if use_advanced_analysis:
            algorithm_analysis = analyze_algorithm(code)
            
        # Step 3: AI-Powered Optimization
        optimization_results = ai_optimize(code, context=optimization_context, analysis_results=algorithm_analysis)
        
        # Step 4: Energy and CO2 Estimation
        energy_results = estimate_emissions(code)
        
        # Step 5: Generate optimization variants (fast vs. green)
        variants_results = {}
        if show_variants:
            variants_results = generate_optimization_variants(code, analysis_results, algorithm_analysis)
        
        # Calculate a simple green score (0-100)
        green_score = calculate_green_score(analysis_results, algorithm_analysis)
        optimized_score = green_score + min(35, green_score // 2)  # Improved scoring
        
        # Determine which optimized code to use as default based on context
        default_optimized_code = optimization_results["optimized_code"]
        
        # If variants are enabled, use the recommended version
        if show_variants and variants_results:
            if variants_results["recommended"] == "fast":
                default_optimized_code = variants_results["fast_version"]["code"]
            elif variants_results["recommended"] == "green":
                default_optimized_code = variants_results["green_version"]["code"]
        
        return jsonify({
            "original_code": code,
            "optimized_code": default_optimized_code,
            "analysis": analysis_results,
            "algorithm_analysis": algorithm_analysis,
            "optimization": {
                "changes": optimization_results["changes"],
                "explanation": optimization_results["explanation"],
                "context": optimization_context,
                "optimization_time": optimization_results.get("optimization_time", 0)
            },
            "energy_saved": energy_results["energy_saved"],
            "co2_saved": energy_results["co2_saved"],
            "green_score": {
                "original": green_score,
                "optimized": optimized_score,
                "improvement": optimized_score - green_score
            },
            "variants": variants_results
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def calculate_green_score(analysis_results, algorithm_analysis=None):
    """Calculate a green score based on analysis results and algorithm analysis"""
    # Base score starts higher
    base_score = 75
    penalty = 0
    
    # Penalties from basic analysis
    inefficiencies = analysis_results.get("inefficiencies", [])
    penalty += min(len(inefficiencies) * 5, 25)  # Max penalty of 25 points from basic analysis
    
    # Additional penalties from algorithm analysis
    if algorithm_analysis:
        # Time complexity penalties
        complexity = algorithm_analysis.get("time_complexity", "")
        if complexity == "O(n^2)":
            penalty += 15
        elif complexity == "O(2^n)":
            penalty += 25
        elif complexity == "O(n*log(n))":
            penalty += 5
            
        # Inefficient pattern penalties
        alg_inefficiencies = algorithm_analysis.get("inefficient_patterns", [])
        penalty += min(len(alg_inefficiencies) * 10, 20)  # Max penalty of 20 points from algorithm patterns
    
    # Calculate final score with minimum threshold
    final_score = max(base_score - penalty, 35)  # Minimum score of 35
    return final_score

if __name__ == '__main__':
    app.run(debug=True, port=5000)
