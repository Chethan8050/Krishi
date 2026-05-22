from fastapi import FastAPI, File, UploadFile, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
import io
import os
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow.keras.layers import DepthwiseConv2D

def verify_api_key(x_api_key: str = Header(None)):
    """Verify API key for protected endpoints"""
    if x_api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API key")

# ── COMPATIBILITY FIX ──
# Fixes the 'Unrecognized keyword arguments passed to DepthwiseConv2D: {'groups': 1}' error
class FixedDepthwiseConv2D(DepthwiseConv2D):
    def __init__(self, **kwargs):
        if 'groups' in kwargs:
            del kwargs['groups']
        super().__init__(**kwargs)

app = FastAPI(title="KisanAI Custom Model Server")

# Security: Allowed origins (replace with your actual frontend URL in production)
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
]

# Add CORS middleware with restricted origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)

# API Key protection (for production)
API_KEY = os.environ.get("KISANAI_API_KEY", "dev-key-12345")

print("Loading ML model... (Deep Load Strategy)")
model = None

try:
    # Attempt 1: Standard Load with Compatibility Patch
    model = tf.keras.models.load_model(
        'model.h5', 
        custom_objects={'DepthwiseConv2D': FixedDepthwiseConv2D},
        compile=False
    )
    print("SUCCESS: Model loaded using Standard strategy.")
except Exception as e1:
    print(f"Stage 1 Load Failed: {e1}")
    try:
        # Attempt 2: Architecture Injection with EXACT Name Matching
        # My deep analysis showed the H5 uses 'mobilenetv2_1.00_224'
        print("Attempting Stage 2: Exact Name-Matched Injection...")
        base_model = tf.keras.applications.MobileNetV2(
            input_shape=(224, 224, 3), 
            include_top=False, 
            weights=None,
            name='mobilenetv2_1.00_224' 
        )
        x = tf.keras.layers.GlobalAveragePooling2D(name='global_average_pooling2d')(base_model.output)
        x = tf.keras.layers.Dropout(0.2, name='dropout')(x)
        output = tf.keras.layers.Dense(38, activation='softmax', name='dense')(x)
        
        model = tf.keras.Model(inputs=base_model.input, outputs=output)
        
        # Load weights by name matching
        model.load_weights('model.h5', by_name=True)
        print("SUCCESS: Model loaded using Exact Name Injection!")
    except Exception as e2:
        print(f"Stage 2 Load Failed: {e2}")
        print("CRITICAL: All loading strategies failed. Please ensure 'model.h5' is a valid Keras model.")
        model = None

# ── Advanced Pre-trained Validator ──
print("Loading Image Validator (MobileNetV2)...")
try:
    validator_model = tf.keras.applications.MobileNetV2(weights='imagenet')
    decode_predictions = tf.keras.applications.mobilenet_v2.decode_predictions
    preprocess_input = tf.keras.applications.mobilenet_v2.preprocess_input
    print("Validator loaded!")
except Exception as e:
    print(f"Validator failed to load (no internet?): {e}")
    validator_model = None

# ── GLOBAL 38-CLASS MAPPING ──
CLASS_NAMES = {
    0: 'Apple___Apple_scab', 1: 'Apple___Black_rot', 2: 'Apple___Cedar_apple_rust', 3: 'Apple___healthy',
    4: 'Blueberry___healthy', 5: 'Cherry___Powdery_mildew', 6: 'Cherry___healthy',
    7: 'Corn___Cercospora_leaf_spot', 8: 'Corn___Common_rust', 9: 'Corn___Northern_Leaf_Blight', 10: 'Corn___healthy',
    11: 'Grape___Black_rot', 12: 'Grape___Esca_(Black_Measles)', 13: 'Grape___Leaf_blight', 14: 'Grape___healthy',
    15: 'Orange___Haunglongbing', 16: 'Peach___Bacterial_spot', 17: 'Peach___healthy',
    18: 'Pepper___Bacterial_spot', 19: 'Pepper___healthy', 20: 'Potato___Early_blight', 21: 'Potato___Late_blight', 22: 'Potato___healthy',
    23: 'Raspberry___healthy', 24: 'Soybean___healthy', 25: 'Squash___Powdery_mildew', 26: 'Strawberry___Leaf_scorch', 27: 'Strawberry___healthy',
    28: 'Tomato___Bacterial_spot', 29: 'Tomato___Early_blight', 30: 'Tomato___Late_blight', 31: 'Tomato___Leaf_Mold',
    32: 'Tomato___Septoria_leaf_spot', 33: 'Tomato___Spider_mites', 34: 'Tomato___Target_Spot',
    35: 'Tomato___Yellow_Leaf_Curl_Virus', 36: 'Tomato___mosaic_virus', 37: 'Tomato___healthy'
}

@app.get("/")
def read_root():
    return {
        "status": "online", 
        "model_loaded": model is not None,
        "validator_active": validator_model is not None
    }

@app.post("/predict")
async def predict_crop_disease(file: UploadFile = File(...), x_api_key: str = Header(None)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File provided is not an image.")

    if model is None:
        raise HTTPException(status_code=500, detail="Model 'model.h5' not found.")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        
        # ── STEP 1: VALIDATE (Is it a plant?) ──
        if validator_model:
            val_img = image.resize((224, 224))
            val_array = np.array(val_img)
            val_batch = preprocess_input(np.expand_dims(val_array, axis=0))
            
            val_preds = validator_model.predict(val_batch)
            top_3 = decode_predictions(val_preds, top=3)[0]
            
            # DEEP DEBUG: Show what the AI sees
            print("--- AI VISION DEBUG ---")
            for i, (id, label, prob) in enumerate(top_3):
                print(f"Top {i+1}: {label} ({prob:.2%})")
            
            plant_keywords = [
                'leaf', 'plant', 'tree', 'corn', 'pot', 'garden', 'daisy', 'vegetable', 'fruit',
                'tomato', 'potato', 'pepper', 'apple', 'grape', 'orange', 'cherry', 'peach',
                'strawberry', 'raspberry', 'blueberry', 'soybean', 'squash', 'fig', 'lemon',
                'nature', 'foliage', 'flora', 'grass', 'herb', 'shrub', 'blossom', 'petal',
                'agriculture', 'crop', 'field', 'meadow', 'forest', 'jungle', 'buckeye', 'conifer',
                'earthstar', 'mushroom', 'fungus', 'potted'
            ]
            
            # FUZZY MATCH: Accept if any keyword is in any of top 3
            is_plant = any(any(kw in label.lower() for kw in plant_keywords) for id, label, prob in top_3)
            
            if not is_plant:
                # One last check: If the top prediction is very confident (over 30%) and not a person/animal
                forbidden = ['person', 'dog', 'cat', 'car', 'computer', 'screen', 'phone', 'building']
                if top_3[0][2] > 0.30 and not any(f in top_3[0][1].lower() for f in forbidden):
                    is_plant = True # Give it the benefit of the doubt
            
            if not is_plant:
                return {
                    "success": False,
                    "prediction": "Not a Plant",
                    "message": f"This looks like a {top_3[0][1].replace('_', ' ')}. Please provide a clear photo of a plant leaf."
                }

        # ── STEP 2: DIAGNOSE ──
        # Updated to 224x224 for the new MobileNetV2 model
        img_resized = image.resize((224, 224)) 
        img_array = np.array(img_resized) / 127.5 - 1.0 
        img_batch = np.expand_dims(img_array, axis=0)
        
        predictions = model.predict(img_batch)
        class_idx = int(np.argmax(predictions[0]))
        confidence = float(np.max(predictions[0]))
        
        print(f"DEBUG: Predicted Index: {class_idx}, Confidence: {confidence:.2f}")
        
        predicted_disease = CLASS_NAMES.get(class_idx, f"Unrecognized (Idx {class_idx})")
        is_healthy = "healthy" in predicted_disease.lower()
        
        return {
            "success": True,
            "prediction": predicted_disease,
            "confidence": confidence,
            "is_healthy": is_healthy
        }
            
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
