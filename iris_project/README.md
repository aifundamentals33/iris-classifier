# Iris Flower Classifier

A complete machine learning project structure for training and evaluating a Decision Tree classifier on the Iris dataset.

## Project Structure

```
iris_project/
├── notebooks/          # Jupyter notebooks for exploration
├── outputs/            # Saved models and plots
├── src/                # Source code
│   ├── model.py        # Model definition
│   └── train.py        # Training script
├── tests/              # Unit tests
├── requirements.txt    # Dependencies
└── README.md           # Documentation
```

## Quick Start

1.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

2.  **Train the model:**
    ```bash
    python src/train.py --output-dir outputs/
    ```
    This will save `iris_model.joblib` and `confusion_matrix.png` to the `outputs/` directory.

3.  **Run tests:**
    ```bash
    pytest tests/
    ```

## Features

- **CLI Interface**: Easy-to-use command line interface for training.
- **Visualizations**: Automatically generates confusion matrix plots.
- **Testing**: Includes basic unit tests for model logic.
- **Reproducibility**: Structured for easy replication and extension.

## License

MIT License
