from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import sys
import numpy as np

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'outputs', 'iris_model.joblib')

try:
    model = joblib.load(MODEL_PATH)
    print(f"Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

SPECIES_NAMES = ['setosa', 'versicolor', 'virginica']

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'ok',
        'model_loaded': model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        data = request.json
        features = np.array([[
            float(data['sepalLength']),
            float(data['sepalWidth']),
            float(data['petalLength']),
            float(data['petalWidth'])
        ]])
        
        prediction = model.predict(features)
        species_idx = int(prediction[0])
        species_name = SPECIES_NAMES[species_idx]
        
        return jsonify({
            'species': species_name,
            'speciesIndex': species_idx
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
