"""
Helper script to set up the model for GreenCode AI.
This script handles the following scenarios:
1. First-time setup: Downloads the model if it doesn't exist
2. Verification: Checks if model files are present
3. Repair: Fixes model structure issues

Usage:
python setup_model.py
"""

import os
import sys
import shutil
from transformers import AutoTokenizer, AutoModelForCausalLM

def check_model_structure():
    """Check if the model directory structure exists."""
    model_path = "./models/models--bigcode--starcoderbase-1b"
    return os.path.exists(model_path)

def check_model_files():
    """Check if the large model files are present."""
    model_file_path = "./models/models--bigcode--starcoderbase-1b/snapshots/182f0165fdf8da9c9935901eec65c94337f01c11/model.safetensors"
    return os.path.exists(model_file_path)

def get_huggingface_cache_path():
    """Get the default Hugging Face cache path."""
    if sys.platform.startswith('win'):
        return os.path.expanduser('~/.cache/huggingface/hub')
    else:
        return os.path.expanduser('~/.cache/huggingface/hub')

def find_model_in_cache():
    """Try to find the model in Hugging Face cache."""
    cache_path = get_huggingface_cache_path()
    possible_paths = [
        os.path.join(cache_path, 'models--bigcode--starcoderbase-1b'),
        os.path.join(cache_path, 'models--bigcode--starcoder-1b'),
        os.path.join(cache_path, 'models--bigcode--starcoderbase-3b'),
        os.path.join(cache_path, 'models--bigcode--starcoder-3b')
    ]

    for path in possible_paths:
        if os.path.exists(path):
            return path
    return None

def download_model():
    """Download the model using Hugging Face transformers."""
    print("Downloading model. This might take a while...")
    try:
        # First the tokenizer (smaller)
        print("Downloading tokenizer...")
        tokenizer = AutoTokenizer.from_pretrained("bigcode/starcoderbase-1b")
        
        # Then the model (larger)
        print("Downloading model weights...")
        model = AutoModelForCausalLM.from_pretrained("bigcode/starcoderbase-1b")
        
        print("Model downloaded successfully!")
        return True
    except Exception as e:
        print(f"Error downloading model: {e}")
        return False

def main():
    """Main function to handle model setup."""
    print("GreenCode AI - Model Setup")
    print("=" * 40)
    
    # Check if model structure exists
    structure_exists = check_model_structure()
    # Check if model files exist
    files_exist = check_model_files()
    
    if structure_exists and files_exist:
        print("✓ Model structure and files exist!")
        print("You're all set! You can run the application with:")
        print("  python run_simple.py")
        return True
    
    if structure_exists and not files_exist:
        print("! Model structure exists but large files are missing.")
        print("This is expected if you cloned the repository from GitHub.")
    
    # Try to find model in cache
    cache_path = find_model_in_cache()
    if cache_path:
        print(f"✓ Found model in cache: {cache_path}")
        print("You can run the application and it will automatically use the cached model.")
        print("  python run_simple.py")
        return True
    
    # Ask user if they want to download
    print("\nModel not found. You have two options:")
    print("1. Download model now (4.5GB, will take some time)")
    print("2. Let the application download it when first used")
    choice = input("Enter choice (1/2): ")
    
    if choice == "1":
        success = download_model()
        if success:
            print("\nModel setup complete! You can now run:")
            print("  python run_simple.py")
        else:
            print("\nFailed to download model. You can still run the application,")
            print("and it will try to download the model when first used:")
            print("  python run_simple.py")
    else:
        print("\nYou chose to download later. You can run:")
        print("  python run_simple.py")
        print("The model will be downloaded when first used.")
    
    return True

if __name__ == "__main__":
    main()
