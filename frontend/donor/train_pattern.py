import pandas as pd
from sklearn.ensemble import IsolationForest
import joblib

# Load donation history
df = pd.read_csv("donation_history.csv")  
# Columns: donor_id, donation_amount, num_donations, avg_past_donation, time_between_donations

# Select numeric features
X = df[['donation_amount', 'num_donations', 'avg_past_donation', 'time_between_donations']]

# Train Isolation Forest
model = IsolationForest(contamination=0.05, random_state=42)
model.fit(X)

# Save model
joblib.dump(model, "donation_anomaly_model.pkl")
print("✅ Anomaly detection model saved.")
