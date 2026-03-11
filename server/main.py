from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
model = pickle.load(open("autism_model.pkl", "rb"))

# Request schema
class AutismInput(BaseModel):
    A1_Score: int
    A2_Score: int
    A3_Score: int
    A4_Score: int
    A5_Score: int
    A6_Score: int
    A7_Score: int
    A8_Score: int
    A9_Score: int
    A10_Score: int
    age: int
    gender: int
    ethnicity: int
    jaundice: int
    autism: int
    country: int
    used_app_before: int
    result: float
    relation: int


@app.get("/")
def home():
    return {"message": "Autism Prediction API is running"}


@app.post("/predict")
def predict(data: AutismInput):

    features = np.array([[
        data.A1_Score,
        data.A2_Score,
        data.A3_Score,
        data.A4_Score,
        data.A5_Score,
        data.A6_Score,
        data.A7_Score,
        data.A8_Score,
        data.A9_Score,
        data.A10_Score,
        data.age,
        data.gender,
        data.ethnicity,
        data.jaundice,
        data.autism,
        data.country,
        data.used_app_before,
        data.result,
        data.relation
    ]])

    # Prediction
    prediction = int(model.predict(features)[0])

    # Probability (convert numpy -> python float)
    probability = float(model.predict_proba(features)[0][1])

    result = "Autism Detected" if prediction == 1 else "No Autism"

    return {
        "prediction": result,
        "probability": round(probability * 100, 2)
    }