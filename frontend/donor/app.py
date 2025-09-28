# app.py
from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load trained model
model = joblib.load("donor_verification_model.pkl")

@app.route("/verify_donor", methods=["POST"])
def verify_donor():
    """
    Expects JSON:
    {
        "donation_amount": 500,
        "past_donations": 3
    }
    """
    data = request.json
    df = pd.DataFrame([data])

    # Make prediction
    prediction = model.predict(df)[0]  # 0 = verified, 1 = suspicious
    probability = model.predict_proba(df)[0][prediction]

    result = {
        "verified": bool(prediction == 0),
        "suspicion_score": float(probability)
    }

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
