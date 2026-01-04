# Iris Flower Classifier

## Overview

This is a full-stack machine learning application that classifies iris flowers based on sepal and petal measurements. The project combines a Python-based ML service (Decision Tree classifier trained on the Iris dataset) with a modern web application for user interaction. Users can input flower measurements through a React frontend, which communicates with an Express backend that proxies requests to a Flask ML service, with predictions stored in a PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7 for fast development and bundling
- **Routing**: Wouter (lightweight React router)
- **HTTP Client**: Axios for API communication
- **Structure**: Single-page application with component-based architecture in `client/src/`

### Backend Architecture
- **Primary Server**: Express 5 (TypeScript) handling API routes and serving the React frontend via Vite middleware
- **ML Service**: Separate Flask server (Python) that loads the trained scikit-learn model and handles prediction requests
- **Communication**: Express backend proxies `/api/predict` requests to the Flask ML service

### Machine Learning Pipeline
- **Model**: Decision Tree Classifier (scikit-learn) with configurable depth
- **Training Script**: `src/train.py` with CLI interface for training parameters
- **Model Storage**: Trained models saved as `.joblib` files in `outputs/`
- **Model Wrapper**: Custom `IrisClassifier` class in `src/model.py`

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema**: Single `predictions` table storing flower measurements, predicted species, and timestamp
- **Validation**: Zod schemas generated from Drizzle schema for type-safe data handling

### API Structure
- `POST /api/predict` - Submit flower measurements, get species prediction, save to database
- `GET /api/predictions` - Retrieve prediction history with optional limit parameter
- Flask service endpoints: `/health`, `/predict`

## External Dependencies

### Database
- **PostgreSQL**: Primary data store for prediction history
- **Connection**: Requires `DATABASE_URL` environment variable

### Python ML Dependencies
- scikit-learn (model training and inference)
- pandas (data manipulation)
- matplotlib (visualization/confusion matrix)
- joblib (model serialization)
- Flask + Flask-CORS (ML API service)
- pytest (testing)

### Node.js Dependencies
- Express (web server)
- Drizzle ORM + drizzle-zod (database operations and validation)
- postgres (PostgreSQL driver)
- React, Vite, TypeScript (frontend stack)
- Axios (HTTP client)

### Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection string
- `ML_SERVICE_URL` - Flask ML service URL (defaults to `http://localhost:5001`)