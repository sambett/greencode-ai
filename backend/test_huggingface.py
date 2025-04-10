"""
Test script to verify Hugging Face model integration
"""

from transformers import pipeline
import time

def test_model_integration():
    print("Testing Hugging Face model integration...")
    
    # Test code to optimize
    test_code = """def calculate_values(data):
    result = []
    for item in data:
        if item > 0:
            result.append(item * 2)
    total = 0
    for r in result:
        total += r
    return result, total"""
    
    prompt = "# Optimize this Python code for maximum energy efficiency:\n" + test_code
    prompt += "\n\n# Energy-efficient optimized version with reduced computational complexity:"
    
    try:
        print("Loading model (this may take a while on first run)...")
        start_time = time.time()
        
        # Use smaller model for faster loading
        model = pipeline("text-generation", model="bigcode/starcoderbase-1b")
        
        load_time = time.time() - start_time
        print(f"Model loaded in {load_time:.2f} seconds.")
        
        print("Generating optimization...")
        start_time = time.time()
        
        generated = model(
            prompt, 
            max_length=1024,
            do_sample=True,
            temperature=0.2,
            num_return_sequences=1
        )
        
        generation_time = time.time() - start_time
        print(f"Optimization generated in {generation_time:.2f} seconds.")
        
        # Extract and print the generated output
        generated_text = generated[0]['generated_text']
        optimized_code = generated_text.split("# Energy-efficient optimized version with reduced computational complexity:")[1].strip()
        
        print("\nOriginal code:")
        print(test_code)
        
        print("\nOptimized code:")
        print(optimized_code)
        
        print("\nHugging Face integration test successful!")
        return True
        
    except Exception as e:
        print(f"Error testing Hugging Face integration: {e}")
        return False

if __name__ == "__main__":
    test_model_integration()
