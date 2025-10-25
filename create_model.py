# create_model.py
import joblib
import numpy as np
from sklearn.linear_model import LinearRegression

# Example: Predict optimal temp, ph, ec based on current conditions
# X = [temperature, ph, ec, humidity]
X = np.array([
    [25, 6.2, 1.8, 60],
    [22, 6.0, 1.5, 55],
    [28, 6.5, 2.0, 70],
    [24, 6.1, 1.7, 65]
])

# Y = [pred_temp, pred_ph, pred_ec]
y = np.array([
    [26, 6.3, 1.9],
    [23, 6.1, 1.6],
    [29, 6.6, 2.1],
    [25, 6.2, 1.8]
])

model = LinearRegression()
model.fit(X, y)

joblib.dump(model, 'model.pkl')
print("model.pkl created successfully!")
