from tensorflow.keras.models import load_model
from src.preprocessing import preprocess_image

# Load the model once when this module is imported
MODEL_PATH = "models/pneumonia_model.h5"
model = load_model(MODEL_PATH)

def predict_image(file_bytes):
    """
    Given raw image bytes, preprocess and predict pneumonia or normal.

    Args:
        file_bytes (bytes): The uploaded image content.

    Returns:
        str: "PNEUMONIA" or "NORMAL" prediction label.
    """
    image = preprocess_image(file_bytes)
    pred_prob = model.predict(image)[0][0]  # Assuming binary output between 0 and 1

    return "PNEUMONIA" if pred_prob > 0.5 else "NORMAL"
