import express from "express";
import axios from "axios";
import { storage } from "./storage";
import { insertPredictionSchema } from "../shared/schema";
const router = express.Router();
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:5001";
router.post("/api/predict", async (req, res) => {
    try {
        const { sepalLength, sepalWidth, petalLength, petalWidth } = req.body;
        const mlResponse = await axios.post(`${ML_SERVICE_URL}/predict`, {
            sepalLength,
            sepalWidth,
            petalLength,
            petalWidth,
        });
        const predictedSpecies = mlResponse.data.species;
        const predictionData = insertPredictionSchema.parse({
            sepalLength,
            sepalWidth,
            petalLength,
            petalWidth,
            predictedSpecies,
        });
        const savedPrediction = await storage.savePrediction(predictionData);
        res.json({
            prediction: savedPrediction,
            species: predictedSpecies,
        });
    }
    catch (error) {
        console.error("Prediction error:", error.message);
        res.status(500).json({ error: error.message || "Failed to make prediction" });
    }
});
router.get("/api/predictions", async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 50;
        const predictions = await storage.getPredictions(limit);
        res.json(predictions);
    }
    catch (error) {
        console.error("Error fetching predictions:", error.message);
        res.status(500).json({ error: "Failed to fetch predictions" });
    }
});
export default router;
