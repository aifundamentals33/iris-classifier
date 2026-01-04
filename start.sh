#!/bin/bash

# Start Flask ML service in the background
echo "Starting ML service on port 5001..."
python ml_service/app.py &
ML_PID=$!

# Wait a moment for Flask to start
sleep 2

# Start Express + Vite server
echo "Starting Express server on port 5000..."
node server/index.js

# If Express exits, kill Flask
kill $ML_PID
