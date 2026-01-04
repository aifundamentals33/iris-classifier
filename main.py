import os
import sys

if __name__ == "__main__":
    print("Running Iris Training Script...")
    exit_code = os.system("python src/train.py --test-size 0.2 --random-state 42")
    if exit_code != 0:
        sys.exit(1)
