from sklearn.tree import DecisionTreeClassifier

class IrisClassifier:
    def __init__(self, max_depth=3, random_state=42):
        self.model = DecisionTreeClassifier(
            max_depth=max_depth,
            random_state=random_state
        )

    def fit(self, X, y):
        """Train the model."""
        self.model.fit(X, y)
        return self

    def predict(self, X):
        """Make predictions."""
        return self.model.predict(X)

    def get_params(self, deep=True):
        """Get parameters for this estimator."""
        return self.model.get_params(deep)
