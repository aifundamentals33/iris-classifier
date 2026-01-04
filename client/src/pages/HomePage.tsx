import React, { useState } from "react";
import axios from "axios";
import type { Prediction } from "@shared/schema";

export default function HomePage() {
  const [formData, setFormData] = useState({
    sepalLength: "",
    sepalWidth: "",
    petalLength: "",
    petalWidth: "",
  });
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Prediction[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await axios.post("/api/predict", {
        sepalLength: parseFloat(formData.sepalLength),
        sepalWidth: parseFloat(formData.sepalWidth),
        petalLength: parseFloat(formData.petalLength),
        petalWidth: parseFloat(formData.petalWidth),
      });

      setPrediction(response.data.species);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to make prediction");
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async () => {
    try {
      const response = await axios.get("/api/predictions?limit=20");
      setHistory(response.data);
      setShowHistory(true);
    } catch (err) {
      console.error("Failed to load history:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getSpeciesColor = (species: string) => {
    const colors: Record<string, string> = {
      setosa: "#10b981",
      versicolor: "#3b82f6",
      virginica: "#8b5cf6",
    };
    return colors[species] || "#6366f1";
  };

  return (
    <div style={{ color: "#fff" }}>
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "0.5rem" }} data-testid="text-title">
          🌸 Iris Flower Classifier
        </h1>
        <p style={{ fontSize: "1.125rem", opacity: 0.9 }} data-testid="text-subtitle">
          Enter flower measurements to predict the iris species
        </p>
      </header>

      <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: showHistory ? "1fr 1fr" : "1fr" }}>
        <div style={{ 
          background: "rgba(255, 255, 255, 0.1)", 
          backdropFilter: "blur(10px)",
          borderRadius: "1rem",
          padding: "2rem",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
        }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }} data-testid="text-form-heading">
            Flower Measurements
          </h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem" }}>
                Sepal Length (cm)
              </label>
              <input
                type="number"
                name="sepalLength"
                step="0.1"
                required
                value={formData.sepalLength}
                onChange={handleChange}
                data-testid="input-sepal-length"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  fontSize: "1rem"
                }}
                placeholder="e.g., 5.1"
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem" }}>
                Sepal Width (cm)
              </label>
              <input
                type="number"
                name="sepalWidth"
                step="0.1"
                required
                value={formData.sepalWidth}
                onChange={handleChange}
                data-testid="input-sepal-width"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  fontSize: "1rem"
                }}
                placeholder="e.g., 3.5"
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem" }}>
                Petal Length (cm)
              </label>
              <input
                type="number"
                name="petalLength"
                step="0.1"
                required
                value={formData.petalLength}
                onChange={handleChange}
                data-testid="input-petal-length"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  fontSize: "1rem"
                }}
                placeholder="e.g., 1.4"
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem" }}>
                Petal Width (cm)
              </label>
              <input
                type="number"
                name="petalWidth"
                step="0.1"
                required
                value={formData.petalWidth}
                onChange={handleChange}
                data-testid="input-petal-width"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  fontSize: "1rem"
                }}
                placeholder="e.g., 0.2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              data-testid="button-predict"
              style={{
                padding: "1rem",
                borderRadius: "0.5rem",
                background: loading ? "#9ca3af" : "#10b981",
                color: "#fff",
                fontSize: "1.125rem",
                fontWeight: "bold",
                marginTop: "1rem",
                transition: "all 0.2s"
              }}
            >
              {loading ? "Classifying..." : "Classify Flower"}
            </button>
          </form>

          {error && (
            <div style={{
              marginTop: "1.5rem",
              padding: "1rem",
              borderRadius: "0.5rem",
              background: "rgba(239, 68, 68, 0.2)",
              border: "2px solid #ef4444"
            }} data-testid="text-error">
              {error}
            </div>
          )}

          {prediction && (
            <div style={{
              marginTop: "1.5rem",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              background: `${getSpeciesColor(prediction)}20`,
              border: `2px solid ${getSpeciesColor(prediction)}`,
              textAlign: "center"
            }} data-testid="text-prediction-result">
              <div style={{ fontSize: "0.875rem", opacity: 0.9, marginBottom: "0.5rem" }}>
                Predicted Species
              </div>
              <div style={{ fontSize: "2rem", fontWeight: "bold", textTransform: "capitalize" }} data-testid="text-species">
                {prediction}
              </div>
            </div>
          )}

          <button
            onClick={loadHistory}
            data-testid="button-show-history"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              background: "rgba(255, 255, 255, 0.2)",
              color: "#fff",
              fontSize: "1rem",
              marginTop: "1.5rem"
            }}
          >
            {showHistory ? "Hide History" : "Show History"}
          </button>
        </div>

        {showHistory && (
          <div style={{ 
            background: "rgba(255, 255, 255, 0.1)", 
            backdropFilter: "blur(10px)",
            borderRadius: "1rem",
            padding: "2rem",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
          }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }} data-testid="text-history-heading">
              Recent Predictions
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxHeight: "600px", overflowY: "auto" }}>
              {history.length === 0 ? (
                <p style={{ opacity: 0.7 }} data-testid="text-no-history">No predictions yet</p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    data-testid={`history-item-${item.id}`}
                    style={{
                      padding: "1rem",
                      borderRadius: "0.5rem",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: `1px solid ${getSpeciesColor(item.predictedSpecies)}40`
                    }}
                  >
                    <div style={{ 
                      fontWeight: "bold", 
                      marginBottom: "0.5rem",
                      color: getSpeciesColor(item.predictedSpecies),
                      textTransform: "capitalize"
                    }} data-testid={`text-species-${item.id}`}>
                      {item.predictedSpecies}
                    </div>
                    <div style={{ fontSize: "0.875rem", opacity: 0.8 }}>
                      <div>Sepal: {item.sepalLength} × {item.sepalWidth} cm</div>
                      <div>Petal: {item.petalLength} × {item.petalWidth} cm</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <div style={{
        marginTop: "3rem",
        padding: "2rem",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: "1rem"
      }}>
        <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>About the Iris Dataset</h3>
        <p style={{ opacity: 0.9, lineHeight: "1.6" }}>
          The Iris dataset contains measurements from 150 iris flowers across three species: 
          <span style={{ color: "#10b981", fontWeight: "bold" }}> Setosa</span>,
          <span style={{ color: "#3b82f6", fontWeight: "bold" }}> Versicolor</span>, and
          <span style={{ color: "#8b5cf6", fontWeight: "bold" }}> Virginica</span>.
          This classifier uses a Decision Tree model trained on sepal and petal measurements to predict the species.
        </p>
      </div>
    </div>
  );
}
