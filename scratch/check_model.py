import tensorflow as tf
import os
from tensorflow.keras.layers import DepthwiseConv2D

# Fix for the 'groups' compatibility error in some MobileNetV2 models
class FixedDepthwiseConv2D(DepthwiseConv2D):
    def __init__(self, **kwargs):
        if 'groups' in kwargs:
            del kwargs['groups']
        super().__init__(**kwargs)

model_path = 'backend/model.h5'
if os.path.exists(model_path):
    try:
        # Try loading with the fix
        model = tf.keras.models.load_model(model_path, custom_objects={'DepthwiseConv2D': FixedDepthwiseConv2D})
        print(f"Model Summary:")
        print(f"Input shape: {model.input_shape}")
        print(f"Output shape: {model.output_shape}")
        print(f"Number of classes: {model.output_shape[-1]}")
    except Exception as e:
        print(f"Error loading model: {e}")
else:
    print(f"Model not found at {model_path}")
