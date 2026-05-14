import h5py
import os

model_path = 'backend/model.h5'
if os.path.exists(model_path):
    try:
        with h5py.File(model_path, 'r') as f:
            # Look for the last dense layer weights to find class count
            # This works even if the model structure is "broken" for Keras
            if 'model_weights' in f:
                weights = f['model_weights']
                # Search for the last layer that has 'bias' or 'kernel'
                last_layer = None
                for key in weights.keys():
                    if 'dense' in key.lower():
                        last_layer = key
                
                if last_layer:
                    # In H5, the bias shape usually tells us the class count
                    # Look inside the layer for 'bias'
                    layer_group = weights[last_layer]
                    for subkey in layer_group.keys():
                        if 'bias' in subkey.lower():
                            bias_shape = layer_group[subkey][subkey][:].shape
                            print(f"Detected Classes in Weights: {bias_shape[0]}")
            else:
                # Some H5 formats are flatter
                for key in f.keys():
                    if 'dense' in key.lower():
                        # Check sub-groups
                        pass
        print("H5 Analysis Complete.")
    except Exception as e:
        print(f"Error analyzing H5: {e}")
else:
    print("File not found.")
