import os
import logging
import traceback

logger = logging.getLogger(__name__)

# Constants
HUGGINGFACE_TOKEN = os.getenv("HUGGINGFACE_TOKEN", "")
LOCAL_MODEL_PATH = os.getenv("LOCAL_MODEL_PATH", "./models")
MODEL_NAME = "bigcode/starcoderbase-1b"  # Smaller model that works with limited RAM

# Global variables for the model
model = None
tokenizer = None
transformers_available = False

# Try to import transformers
try:
    from transformers import AutoModelForCausalLM, AutoTokenizer
    import torch
    transformers_available = True
except ImportError:
    logger.warning("Transformers library not available. Install with: pip install transformers")

def load_local_model():
    """Load the smaller StarCoder model with memory optimizations"""
    global model, tokenizer
    
    if not transformers_available:
        logger.error("Transformers library not available. Cannot load model.")
        return False
    
    try:
        logger.info(f"Loading model {MODEL_NAME}...")
        
        # Load tokenizer and model
        tokenizer = AutoTokenizer.from_pretrained(
            MODEL_NAME, 
            use_auth_token=HUGGINGFACE_TOKEN,
            cache_dir=LOCAL_MODEL_PATH
        )
        
        # Check available memory and use appropriate settings
        try:
            import psutil
            available_memory_gb = psutil.virtual_memory().available / (1024 ** 3)
            logger.info(f"Available memory: {available_memory_gb:.2f} GB")
            
            # If limited memory, use CPU or 8-bit quantization
            if available_memory_gb < 8:
                logger.info("Limited memory detected, using CPU model")
                model = AutoModelForCausalLM.from_pretrained(
                    MODEL_NAME,
                    use_auth_token=HUGGINGFACE_TOKEN,
                    cache_dir=LOCAL_MODEL_PATH,
                    device_map="cpu",
                    low_cpu_mem_usage=True
                )
            else:
                # Try to use GPU if available or 8-bit quantization 
                device = "cuda" if torch.cuda.is_available() else "cpu"
                logger.info(f"Using device: {device}")
                
                model = AutoModelForCausalLM.from_pretrained(
                    MODEL_NAME,
                    use_auth_token=HUGGINGFACE_TOKEN,
                    cache_dir=LOCAL_MODEL_PATH,
                    device_map="auto",
                    low_cpu_mem_usage=True
                )
                
        except ImportError:
            logger.info("psutil not available, using default model loading settings")
            model = AutoModelForCausalLM.from_pretrained(
                MODEL_NAME,
                use_auth_token=HUGGINGFACE_TOKEN,
                cache_dir=LOCAL_MODEL_PATH,
                device_map="auto",
                low_cpu_mem_usage=True
            )
        
        logger.info("Model loaded successfully!")
        return True
        
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        logger.error(traceback.format_exc())
        model = None
        tokenizer = None
        logger.warning("Failed to load model. Continuing with rule-based optimization only.")
        return False

# Try to load the model if imports succeeded
if transformers_available and HUGGINGFACE_TOKEN:
    try:
        load_local_model()
    except Exception as e:
        logger.error(f"Error during initial model loading: {str(e)}")
        logger.error(traceback.format_exc())