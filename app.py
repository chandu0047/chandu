from flask import Flask, render_template, request
import joblib
import numpy as np
import os

app = Flask(__name__)

# load model
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model.pkl')
model = joblib.load(MODEL_PATH)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    plant = request.form.get('plant', 'Unknown')
    try:
        temp = float(request.form.get('temperature', 25))
        ph = float(request.form.get('ph', 6.2))
        ec = float(request.form.get('ec', 1.8))
        humidity = float(request.form.get('humidity', 65))
    except ValueError:
        return "Invalid input. Please enter numeric values."

    X = np.array([[temp, ph, ec, humidity]])
    pred = model.predict(X)[0]
    pred_temp, pred_ph, pred_ec = float(pred[0]), float(pred[1]), float(pred[2])

    suggestions = []
    if pred_temp - temp > 0.5:
        suggestions.append(f"Increase temperature by {pred_temp - temp:.1f} °C")
    elif temp - pred_temp > 0.5:
        suggestions.append(f"Decrease temperature by {temp - pred_temp:.1f} °C")

    if pred_ph - ph > 0.2:
        suggestions.append(f"Increase pH by {pred_ph - ph:.2f}")
    elif ph - pred_ph > 0.2:
        suggestions.append(f"Decrease pH by {ph - pred_ph:.2f}")

    if pred_ec - ec > 0.2:
        suggestions.append(f"Increase EC (nutrients) by {pred_ec - ec:.2f}")
    elif ec - pred_ec > 0.2:
        suggestions.append(f"Decrease EC (nutrients) by {ec - pred_ec:.2f}")

    return render_template('result.html',
                           plant=plant,
                           temp=temp, ph=ph, ec=ec, humidity=humidity,
                           pred_temp=round(pred_temp, 2),
                           pred_ph=round(pred_ph, 2),
                           pred_ec=round(pred_ec, 2),
                           suggestions=suggestions)

if __name__ == '__main__':
    app.run(debug=True)
