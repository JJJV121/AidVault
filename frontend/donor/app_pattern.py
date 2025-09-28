import pandas as pd
import joblib

# Load trained model
model = joblib.load("donation_anomaly_model.pkl")

def check_donation(donation_amount, num_donations, avg_past_donation, time_between_donations):
    """
    Function to check donation anomaly.
    
    Parameters:
        donation_amount (float): Current donation amount
        num_donations (int): Number of donations made
        avg_past_donation (float): Average past donation amount
        time_between_donations (float): Time (days) since last donation
    
    Returns:
        dict: {
            "is_anomaly": True/False,
            "anomaly_score": float
        }
    """
    data = {
        "donation_amount": [donation_amount],
        "num_donations": [num_donations],
        "avg_past_donation": [avg_past_donation],
        "time_between_donations": [time_between_donations]
    }

    df = pd.DataFrame(data)
    anomaly = model.predict(df)[0]  # -1 = anomaly, 1 = normal
    score = float(model.decision_function(df)[0])

    return {
        "is_anomaly": anomaly == -1,
        "anomaly_score": score
    }

# Example usage
if __name__ == "__main__":
    test = check_donation(500, 3, 100, 2)
    print(test)
