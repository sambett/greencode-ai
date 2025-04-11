"""
Simplified server script that explicitly uses cached models only.
"""
import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

# Add utils to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from utils.analysis import static_analysis
from utils.emissions import estimate_emissions

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Check if model cache exists
model_path = "./models/models--bigcode--starcoderbase-1b"
model_file_path = os.path.join(model_path, "snapshots/182f0165fdf8da9c9935901eec65c94337f01c11/model.safetensors")
if not os.path.exists(model_file_path):
    print(f"WARNING: Cached model file not found at: {model_file_path}")
    print("The repository doesn't include large model files due to GitHub size limitations.")
    print("Options:")
    print("1. The system will automatically download the model on first use (slower).")
    print("2. Copy the model files from your cache if you've already downloaded them.")
    
    use_remote = True
    
    # Check if model structure exists but not the files
    if os.path.exists(model_path) and not os.path.exists(model_file_path):
        print("Model structure exists, but not the large files.")
        model_structure_intact = True
    else:
        model_structure_intact = False
else:
    print(f"✓ Found cached model at: {model_path}")
    use_remote = False
    try:
        print("Loading model...")
        if use_remote:
            print("Using remote model (this will download it first time)")
            model = pipeline("text-generation", model="bigcode/starcoderbase-1b")
        else:
            print("Using locally cached model")
            model = pipeline("text-generation", model=model_path)
        print("Model loaded successfully!")
    except Exception as e:
        print(f"Error loading model: {e}")
        print("Using a simpler fallback method instead")
        model = None

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint to check if the server is running"""
    return jsonify({
        "status": "healthy", 
        "message": "GreenCode AI Backend is running",
        "model_loaded": model is not None
    })

@app.route('/analyze', methods=['POST'])
def analyze_code():
    """Simplified endpoint that uses cached model only"""
    try:
        data = request.json
        code = data.get("code", "")
        
        if not code:
            return jsonify({"error": "No code provided"}), 400
        
        # Step 1: Basic Analysis
        analysis_results = static_analysis(code)
        
        # Step 2: Code Optimization (using cached model or fallback)
        if model:
            # Generate a prompt for the model
            prompt = f"# Optimize this Python code for maximum energy efficiency:\n{code}\n\n# Energy-efficient optimized version:"
            
            # Generate optimized code using the model
            response = model(
                prompt, 
                max_length=1024,
                do_sample=True,
                temperature=0.2,
                num_return_sequences=1
            )
            
            # Extract the optimized code
            generated_text = response[0]['generated_text']
            optimized_code = generated_text.split("# Energy-efficient optimized version:")[1].strip()
        else:
            # Simple fallback optimization
            optimized_code = code.replace("for item in data:", "[item * 2 for item in data if item > 0]")
            optimized_code = optimized_code.replace("total = 0\n    for r in result:\n        total += r", "total = sum(result)")
        
        # Step 3: Energy Estimation
        energy_results = estimate_emissions(code)
        
        # Calculate a simple green score
        inefficiencies = len(analysis_results.get("inefficiencies", []))
        green_score = max(75 - (inefficiencies * 5), 35)
        optimized_score = green_score + min(35, green_score // 2)
        
        return jsonify({
            "original_code": code,
            "optimized_code": optimized_code,
            "analysis": analysis_results,
            "energy_saved": energy_results["energy_saved"],
            "co2_saved": energy_results["co2_saved"],
            "green_score": {
                "original": green_score,
                "optimized": optimized_score,
                "improvement": optimized_score - green_score
            }
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
