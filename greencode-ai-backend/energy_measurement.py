import os
import tempfile
import logging
import json
import time
import uuid
from codecarbon import EmissionsTracker

logger = logging.getLogger(__name__)

def measure_energy_consumption(code):
    """Measure energy consumption using CodeCarbon"""
    try:
        # Create test data for the code to run with
        test_data = {'data': [1, -2, 3, -4, 5, -6, 7, -8, 9, -10] * 1000}
        
        # Create a temporary file
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as tmp_file:
            # Add test data and wrap the code
            test_code = f"""
# Test data
data = {json.dumps(test_data['data'])}

# Original code to measure
{code}

# Run the code with test data
if 'calculate_values' in locals():
    result = calculate_values(data)
elif 'find_pairs' in locals():
    result = find_pairs(data, 10)
elif 'build_message' in locals():
    result = build_message(data)
            """
            tmp_file.write(test_code)
            tmp_file_path = tmp_file.name
        
        # Create a unique output file for this run
        output_file = f"emissions_{uuid.uuid4().hex}.csv"
        
        # Initialize the tracker
        tracker = EmissionsTracker(
            output_file=output_file,
            log_level='critical',
            save_to_file=False,  # We'll just get the value directly
            tracking_mode='process'
        )
        
        # Track emissions
        tracker.start()
        start_time = time.time()
        
        try:
            # Execute the code
            exec(open(tmp_file_path).read(), {})
        except Exception as e:
            logger.warning(f"Error executing code for energy measurement: {str(e)}")
        
        # Stop tracking and get the results
        emissions = tracker.stop()
        execution_time = time.time() - start_time
        
        # Clean up
        os.unlink(tmp_file_path)
        if os.path.exists(output_file):
            os.unlink(output_file)
        
        return {
            "co2": emissions or 0.0,
            "energy": emissions * 1000 if emissions else 0.0,  # Convert to milligrams
            "time": execution_time
        }
    
    except Exception as e:
        logger.error(f"Error measuring energy consumption: {str(e)}")
        return {"co2": 0.0, "energy": 0.0, "time": 0.0}