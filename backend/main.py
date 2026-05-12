from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import io
from PIL import Image
import numpy as np
import tensorflow as tf

app = FastAPI(title="KisanAI Custom Model Server")

# Allow requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading ML model... (This might take a few seconds)")
try:
    # Ensure your file is named exactly 'model.h5' and is in the 'backend' folder
    model = tf.keras.models.load_model('model.h5')
    print("Model loaded successfully!")
except Exception as e:
    print(f"WARNING: Could not load 'model.h5'. Ensure the file exists. Error: {e}")
    model = None

# Standard 38-class mapping from the famous PlantVillage dataset.
# If you downloaded your model from Kaggle, it almost certainly uses this exact mapping.
CLASS_NAMES = {
    0: 'Apple___Apple_scab',
    1: 'Apple___Black_rot',
    2: 'Apple___Cedar_apple_rust',
    3: 'Apple___healthy',
    4: 'Blueberry___healthy',
    5: 'Cherry_(including_sour)___Powdery_mildew',
    6: 'Cherry_(including_sour)___healthy',
    7: 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    8: 'Corn_(maize)___Common_rust_',
    9: 'Corn_(maize)___Northern_Leaf_Blight',
    10: 'Corn_(maize)___healthy',
    11: 'Grape___Black_rot',
    12: 'Grape___Esca_(Black_Measles)',
    13: 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    14: 'Grape___healthy',
    15: 'Orange___Haunglongbing_(Citrus_greening)',
    16: 'Peach___Bacterial_spot',
    17: 'Peach___healthy',
    18: 'Pepper,_bell___Bacterial_spot',
    19: 'Pepper,_bell___healthy',
    20: 'Potato___Early_blight',
    21: 'Potato___Late_blight',
    22: 'Potato___healthy',
    23: 'Raspberry___healthy',
    24: 'Soybean___healthy',
    25: 'Squash___Powdery_mildew',
    26: 'Strawberry___Leaf_scorch',
    27: 'Strawberry___healthy',
    28: 'Tomato___Bacterial_spot',
    29: 'Tomato___Early_blight',
    30: 'Tomato___Late_blight',
    31: 'Tomato___Leaf_Mold',
    32: 'Tomato___Septoria_leaf_spot',
    33: 'Tomato___Spider_mites Two-spotted_spider_mite',
    34: 'Tomato___Target_Spot',
    35: 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    36: 'Tomato___Tomato_mosaic_virus',
    37: 'Tomato___healthy'
}

@app.get("/")
def read_root():
    return {"status": "online", "message": "KisanAI Machine Learning API is running.", "model_loaded": model is not None}

@app.post("/predict")
async def predict_crop_disease(file: UploadFile = File(...)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File provided is not an image.")

    if model is None:
        raise HTTPException(status_code=500, detail="Model 'model.h5' not found on server.")

    try:
        # Read the uploaded image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        
        # 1. Resize image to match model input (usually 224x224 or 256x256)
        # Check your Kaggle model's documentation for the correct input size!
        img_resized = image.resize((256, 256)) 
        
        # 2. Convert to numpy array and scale (usually / 255.0)
        img_array = np.array(img_resized) / 255.0
        img_batch = np.expand_dims(img_array, axis=0)
        
        # 3. Predict
        predictions = model.predict(img_batch)
        
        # 4. Get the highest confidence class
        class_idx = int(np.argmax(predictions[0]))
        confidence = float(np.max(predictions[0]))
        
        # 5. Map the index to the human-readable string label
        predicted_disease = CLASS_NAMES.get(class_idx, "Unknown Disease")
        is_healthy = predicted_disease.lower() == "healthy"
        
        if is_healthy:
            return {
                "success": True,
                "prediction": "healthy",
                "confidence": confidence
            }
        else:
            return {
                "success": True,
                "prediction": predicted_disease,
                "confidence": confidence
            }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

