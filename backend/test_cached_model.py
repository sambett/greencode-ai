"""
Very simple script to test if the cached model works.
This script ONLY uses locally cached models and will not attempt to download.
"""

import os
from transformers import pipeline

def test_cached_model():
    # Check if model cache exists
    model_path = "./models/models--bigcode--starcoderbase-1b"
    if not os.path.exists(model_path):
        print(f"❌ ERROR: Cached model not found at: {model_path}")
        print("   This means you need to either:")
        print("   1. Let the system download the model once, or")
        print("   2. Manually copy a cached model to this location")
        return False
    
    print(f"✓ Found cached model at: {model_path}")
    
    try:
        # Try to load the model
        print("⏳ Loading model from cache (this may take a few seconds)...")
        model = pipeline("text-generation", model=model_path)
        print("✓ Successfully loaded model from cache!")
        
        # Test with a simple prompt
        print("⏳ Testing model with a simple prompt...")
        test_code = "def add(a, b):\n    return a + b"
        prompt = f"# Function:\n{test_code}\n\n# Explanation:"
        
        response = model(prompt, max_length=50, num_return_sequences=1)
        generated_text = response[0]['generated_text']
        
        print("\n=== Test Output ===")
        print(generated_text)
        print("===================")
        
        print("✓ Model test successful!")
        return True
        
    except Exception as e:
        print(f"❌ ERROR loading or using the model: {e}")
        return False

if __name__ == "__main__":
    print("=== Testing Cached Model ===")
    success = test_cached_model()
    if success:
        print("\n✓ ALL TESTS PASSED - Ready to run the server!")
        print("   Run: python run_simple.py")
    else:
        print("\n❌ TESTS FAILED - Please check the errors above")
