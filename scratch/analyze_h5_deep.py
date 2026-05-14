import h5py

def print_structure(name, obj):
    if isinstance(obj, h5py.Dataset):
        print(f"Dataset: {name}, Shape: {obj.shape}")

model_path = 'backend/model.h5'
with h5py.File(model_path, 'r') as f:
    f.visititems(print_structure)
