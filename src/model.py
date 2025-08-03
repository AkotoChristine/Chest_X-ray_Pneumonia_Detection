import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint

# Set paths
MODEL_PATH = 'models/chest_xray_cnn_model.h5'  
TRAIN_DIR = 'datasets/train'
VAL_DIR = 'datasets/val'
RETRAINED_MODEL_PATH = 'models/retrained_chest_xray_cnn_model.h5'

# Load existing model
model = load_model(MODEL_PATH)

# Data generators
train_datagen = ImageDataGenerator(rescale=1./255)
val_datagen = ImageDataGenerator(rescale=1./255)

train_data = train_datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=(150, 150),
    batch_size=32,
    class_mode='binary'
)

val_data = val_datagen.flow_from_directory(
    VAL_DIR,
    target_size=(150, 150),
    batch_size=32,
    class_mode='binary'
)

# Compile (you can change learning rate here)
model.compile(optimizer=Adam(learning_rate=0.00005),  # smaller LR for fine-tuning
              loss='binary_crossentropy',
              metrics=['accuracy'])

# Callbacks
early_stop = EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)
checkpoint = ModelCheckpoint(RETRAINED_MODEL_PATH, monitor='val_accuracy', save_best_only=True)

# Retrain the model
history = model.fit(
    train_data,
    validation_data=val_data,
    epochs=10,
    callbacks=[early_stop, checkpoint]
)

print("Retraining complete. Model saved to:", RETRAINED_MODEL_PATH)

# Save the model
model.save(RETRAINED_MODEL_PATH)
print("Model saved to:", RETRAINED_MODEL_PATH)