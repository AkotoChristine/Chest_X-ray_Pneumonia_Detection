import tensorflow as tf
tf.config.run_functions_eagerly(True)

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List
import os
from tensorflow.keras.optimizers import Adam
import shutil
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np
import cv2
from tensorflow.keras.preprocessing.image import img_to_array


app = FastAPI(title="Chest X-ray Pneumonia Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust for your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "datasets/val"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

MODEL_PATH = "models/chest_xray_cnn_model.h5"

# Load model once at startup
model = load_model(MODEL_PATH)

def preprocess_image(image_bytes, target_size=(150, 150)):
    """
    Preprocess a raw image bytes into a numpy array suitable for CNN model prediction.

    Args:
        image_bytes (bytes): Raw image bytes
        target_size (Tuple[int, int], optional): Target size (height, width)
            of the preprocessed image. Defaults to (224, 224).

    Returns:
        numpy.ndarray: Preprocessed image data as a numpy array of shape
            (1, height, width, channels) with values in the range [0, 1]
    """
    image_array = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError("Invalid image data")
    image = cv2.resize(image, target_size)
    image = img_to_array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        file_bytes = await file.read()
        image = preprocess_image(file_bytes)
        prediction = model.predict(image)[0][0]
        label = "PNEUMONIA" if prediction > 0.5 else "NORMAL"
        return JSONResponse(content={"result": label})
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction failed: {str(e)}")

@app.post("/upload-data")
async def upload_data(files: List[UploadFile] = File(...)):
    try:
        saved_files = []
        for file in files:
            file_location = os.path.join(UPLOAD_FOLDER, file.filename)
            with open(file_location, "wb") as f:
                shutil.copyfileobj(file.file, f)
            saved_files.append(file.filename)
        return {"message": f"Uploaded {len(saved_files)} files successfully."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Upload failed: {str(e)}")

@app.post("/retrain")
async def retrain():
    try:
        datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)
        train_generator = datagen.flow_from_directory(
            UPLOAD_FOLDER,
            target_size=(150, 150),
            batch_size=32,
            class_mode='binary',
            subset='training'
        )
        val_generator = datagen.flow_from_directory(
            UPLOAD_FOLDER,
            target_size=(150, 150),
            batch_size=32,
            class_mode='binary',
            subset='validation'
        )

        global model
        model = load_model(MODEL_PATH)
        
        # Compile the model with optimizer and loss before training
       
        model.compile(optimizer=Adam(learning_rate=0.0005), loss='binary_crossentropy', metrics=['accuracy'])

        model.fit(
            train_generator,
            validation_data=val_generator,
            epochs=5
        )
        model.save(MODEL_PATH)
        return {"message": "Retraining completed and model saved."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Retraining failed: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Chest X-ray Pneumonia Detection API is running."}
