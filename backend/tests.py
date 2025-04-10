"""
Unit tests for GreenCode AI backend
"""

import unittest
import json
from app import app
from utils.algorithm_analyzer import analyze_algorithm
from utils.ai_optimizer import ai_optimize

class GreenCodeAITests(unittest.TestCase):
    
    def setUp(self):
        """Set up test client"""
        self.app = app.test_client()
        self.app.testing = True
        
        # Sample inefficient code for testing
        self.inefficient_code = """
def calculate_sum(numbers):
    result = 0
    for num in numbers:
        result += num
    return result

def find_duplicates(items):
    duplicates = []
    for i in range(len(items)):
        for j in range(i+1, len(items)):
            if items[i] == items[j] and items[i] not in duplicates:
                duplicates.append(items[i])
    return duplicates

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
"""

    def test_health_endpoint(self):
        """Test the health check endpoint"""
        response = self.app.get('/health')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'healthy')
    
    def test_algorithm_analyzer(self):
        """Test the algorithm analyzer"""
        results = analyze_algorithm(self.inefficient_code)
        
        # Check that we correctly identified complexity
        self.assertIn('time_complexity', results)
        self.assertEqual(results['time_complexity'], 'O(n^2)')
        
        # Check that we correctly identified inefficient patterns
        self.assertIn('inefficient_patterns', results)
        self.assertTrue(len(results['inefficient_patterns']) > 0)
        
        # Check that we correctly identified recursive Fibonacci
        self.assertIn('recursive_without_memoization', results['inefficient_patterns'])
    
    def test_ai_optimizer(self):
        """Test the AI optimizer"""
        # Simple function that can be optimized with built-in sum()
        simple_code = """
def calculate_sum(numbers):
    result = 0
    for num in numbers:
        result += num
    return result
"""
        results = ai_optimize(simple_code)
        
        # Check that we have an optimized code
        self.assertIn('optimized_code', results)
        self.assertNotEqual(results['optimized_code'], '')
        
        # Check that optimization explanation is provided
        self.assertIn('explanation', results)
        self.assertNotEqual(results['explanation'], '')
        
        # Check that changes were identified
        self.assertIn('changes', results)
    
    def test_analyze_endpoint(self):
        """Test the main code analysis endpoint"""
        response = self.app.post('/analyze', 
                               json={'code': self.inefficient_code},
                               content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        
        # Check that all expected components are present
        self.assertIn('original_code', data)
        self.assertIn('optimized_code', data)
        self.assertIn('analysis', data)
        self.assertIn('algorithm_analysis', data)
        self.assertIn('optimization', data)
        self.assertIn('energy_saved', data)
        self.assertIn('co2_saved', data)
        self.assertIn('green_score', data)
        
        # Check that the green score calculation works
        self.assertIn('original', data['green_score'])
        self.assertIn('optimized', data['green_score'])
        self.assertIn('improvement', data['green_score'])
        
        # The optimized score should be higher than the original
        self.assertGreater(data['green_score']['optimized'], data['green_score']['original'])
        
        # Check that advanced analysis was performed
        self.assertIn('time_complexity', data['algorithm_analysis'])
        self.assertIn('space_complexity', data['algorithm_analysis'])
    
    def test_different_optimization_contexts(self):
        """Test different optimization contexts"""
        
        # Test optimization for memory efficiency
        response = self.app.post('/analyze', 
                               json={'code': self.inefficient_code, 'context': 'memory_efficiency'},
                               content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        
        # Check that the context was properly used
        self.assertEqual(data['optimization']['context'], 'memory_efficiency')
        
        # Test optimization for readability
        response = self.app.post('/analyze', 
                               json={'code': self.inefficient_code, 'context': 'readability'},
                               content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        
        # Check that the context was properly used
        self.assertEqual(data['optimization']['context'], 'readability')


if __name__ == '__main__':
    unittest.main()
