import tensorflow as tf
import os
from tensorflow.keras.layers import DepthwiseConv2D

class FixedDepthwiseConv2D(DepthwiseConv2D):
    def __init__(self, **kwargs):
        if 'groups' in kwargs:
            del kwargs['groups']
        super().__init__(**kwargs)

model_path = 'backend/model.h5'

print("Diagnostic: Attempting multi-stage load...")

# Strategy 1: Standard
try:
    model = tf.keras.models.load_model(
        model_path, 
        custom_objects={'DepthwiseConv2D': FixedDepthwiseConv2D},
        compile=False
    )
    print("Strategy 1 SUCCESS")
except Exception as e:
    print(f"Strategy 1 FAIL: {e}")

# Strategy 2: Architecture Injection with Name Matching
try:
    base_model = tf.keras.applications.MobileNetV2(
        input_shape=(224, 224, 3), 
        include_top=False, 
        weights=None
    )
    x = tf.keras.layers.GlobalAveragePooling2D()(base_model.output)
    x = tf.keras.layers.Dropout(0.2)(x)
    output = tf.keras.layers.Dense(38, activation='softmax')(x)
    model = tf.keras.Model(inputs=base_model.input, outputs=output)
    
    # Try loading with by_name=True and skip_mismatch=True
    model.load_weights(model_path, by_name=True, skip_mismatch=True)
    print("Strategy 2 SUCCESS (Partial Load)")
    
    # Check if weights were actually loaded by checking mean of a layer
    w = model.layers[1].get_weights()
    if len(w) > 0:
        print(f"Weight Mean: {w[0].mean()}")
    else:
        print("Warning: No weights loaded into first layer.")
except Exception as e:
    print(f"Strategy 2 FAIL: {e}")
