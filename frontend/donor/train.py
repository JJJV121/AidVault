# train.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load donor dataset
df = pd.read_csv("donors.csv")

# Features (you can expand)
X = df[['donation_amount', 'past_donations']]  # numeric features
y = df['flagged']  # 0 = verified, 1 = suspicious

# Split into train/test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a simple Random Forest
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
accuracy = model.score(X_test, y_test)
print(f"Model accuracy: {accuracy*100:.2f}%")

# Save model
joblib.dump(model, "donor_verification_model.pkl")
print("✅ Model saved as donor_verification_model.pkl")
