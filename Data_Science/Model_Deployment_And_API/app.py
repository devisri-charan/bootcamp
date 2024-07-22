from flask import Flask, request, jsonify
import joblib
import numpy as np

# Load the serialized model
model = joblib.load('./gradient_boosting_model.joblib')
scaler = joblib.load('./scaler.joblib')

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input_data = np.array([data['features']])
    
    # Standardize the input data using the same scaler used during training
    input_data_scaled = scaler.transform(input_data)
    
    prediction = model.predict(input_data_scaled)
    
    return jsonify({'predicted_claim_amount': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)