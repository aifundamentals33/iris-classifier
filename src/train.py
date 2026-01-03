import argparse
import os
import joblib
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.metrics import accuracy_score, confusion_matrix, ConfusionMatrixDisplay
from sklearn.model_selection import train_test_split
from model import IrisClassifier

def main():
    parser = argparse.ArgumentParser(description='Train Iris Classifier')
    parser.add_argument('--output-dir', type=str, default='outputs', help='Directory to save outputs')
    parser.add_argument('--test-size', type=float, default=0.2, help='Test set size ratio')
    parser.add_argument('--random-state', type=int, default=42, help='Random seed')
    args = parser.parse_args()

    # Create output directory
    os.makedirs(args.output_dir, exist_ok=True)

    print("Loading data...")
    iris = load_iris()
    X, y = iris.data, iris.target
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=args.test_size, random_state=args.random_state
    )

    print("Training model...")
    model = IrisClassifier(random_state=args.random_state)
    model.fit(X_train, y_train)

    print("Evaluating...")
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Accuracy: {accuracy:.4f}")

    # Save model
    model_path = os.path.join(args.output_dir, 'iris_model.joblib')
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")

    # Generate and save confusion matrix
    print("Generating confusion matrix...")
    cm = confusion_matrix(y_test, y_pred)
    disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=iris.target_names)
    
    plt.figure(figsize=(8, 6))
    disp.plot(cmap=plt.cm.Blues)
    plt.title(f'Confusion Matrix (Accuracy: {accuracy:.2f})')
    
    cm_path = os.path.join(args.output_dir, 'confusion_matrix.png')
    plt.savefig(cm_path)
    print(f"Confusion matrix saved to {cm_path}")

if __name__ == '__main__':
    main()
