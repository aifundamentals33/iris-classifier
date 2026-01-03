import pytest
import numpy as np
import sys
import os

# Add src to path to allow import
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from model import IrisClassifier

def test_model_initialization():
    model = IrisClassifier(max_depth=5)
    assert model.model.max_depth == 5

def test_model_fit_predict():
    # Simple synthetic data
    X = np.array([[0, 0], [1, 1]])
    y = np.array([0, 1])
    
    # We patch the internal model to handle 2 features for this test
    # or just use real dimensions. Let's use 4 features like Iris
    X = np.random.rand(10, 4)
    y = np.random.randint(0, 2, 10)
    
    model = IrisClassifier()
    model.fit(X, y)
    preds = model.predict(X)
    
    assert len(preds) == 10
    assert set(preds).issubset({0, 1})
