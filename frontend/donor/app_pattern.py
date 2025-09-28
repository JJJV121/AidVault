from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# Load trained model
model = joblib.load("donation_anomaly_model.pkl")

@app.route("/check_donation", methods=["POST"])
def check_donation():
    """
    JSON input:
    {
        "donation_amount": 500,
        "num_donations": 3,
        "avg_past_donation": 100,
        "time_between_donations": 2
    }
    """
    data = request.json
    df = pd.DataFrame([data])
    anomaly = model.predict(df)[0]  # -1 = anomaly, 1 = normal
    score = float(model.decision_function(df)[0])

    result = {
        "is_anomaly": anomaly == -1,
        "anomaly_score": score
    }
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
