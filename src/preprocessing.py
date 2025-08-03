import cv2
import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array

def preprocess_image(image_file, target_size=(150, 150)):
    image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)
    image = cv2.resize(image, target_size)
    image = img_to_array(image)
    image = image / 255.0  # normalize
    return np.expand_dims(image, axis=0)
