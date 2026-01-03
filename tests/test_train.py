import pytest
import numpy as np
import sys
import os
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Add src to path to allow import
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from model import IrisClassifier

def test_model_initialization():
    model = IrisClassifier(max_depth=5)
    assert model.model.max_depth == 5

def test_model_fit_predict_accuracy():
    # Load real data for accuracy test
    iris = load_iris()
    X, y = iris.data, iris.target
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    model = IrisClassifier(random_state=42)
    model.fit(X_train, y_train)
    preds = model.predict(X_test)
    
    accuracy = accuracy_score(y_test, preds)
    assert accuracy >= 0.9, f"Model accuracy {accuracy} is below 0.9"

def test_model_output_structure():
    # Test that model handles input of correct shape
    X = np.random.rand(10, 4)
    y = np.random.randint(0, 3, 10)
    
    model = IrisClassifier()
    model.fit(X, y)
    preds = model.predict(X)
    
    assert len(preds) == 10
    assert np.all((preds >= 0) & (preds <= 2))
