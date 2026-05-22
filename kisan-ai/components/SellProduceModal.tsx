import React, { useState, useRef } from 'react';

interface SellProduceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (listing: any) => void;
}

export default function SellProduceModal({ isOpen, onClose, onSubmit }: SellProduceModalProps) {
  const [crop, setCrop] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('Available Now');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a mock listing object
    const newListing = {
      id: Date.now(), // Generate a unique ID
      crop: crop || 'New Crop',
      farmer: 'You', // Since the user is posting
      distance: '0 km away',
      price: price ? `₹${price}/kg` : '₹0/kg',
      date: date,
      quantity: quantity ? `${quantity} kg` : '0 kg',
      // Provide a fallback image if none was uploaded
      image: imagePreview || 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=300&auto=format&fit=crop',
      status: date === 'Available Now' ? 'available' : 'upcoming'
    };

    onSubmit(newListing);
    
    // Reset form
    setCrop('');
    setPrice('');
    setQuantity('');
    setDate('Available Now');
    setImagePreview(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="glass-panel w-full max-w-md rounded-2xl p-6 relative z-10 flex flex-col gap-6 shadow-2xl border border-glass-stroke overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center border-b border-glass-stroke pb-4">
          <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">add_circle</span>
            Sell Your Produce
          </h2>
          <button 
            onClick={onClose}
            className="p-1 text-on-surface-variant hover:text-on-surface transition-colors rounded-full hover:bg-surface-variant/50"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Image Upload Area */}
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Crop Image</label>
            <div 
              className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden
                ${imagePreview ? 'border-primary/50 bg-primary/5 h-48' : 'border-glass-stroke hover:border-primary/50 bg-surface-variant/20 h-32'}`}
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Crop preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <span className="material-symbols-outlined text-3xl text-primary mb-2">add_a_photo</span>
                  <span className="font-body-sm text-on-surface-variant">Tap to capture or upload image</span>
                </>
              )}
            </div>
            {/* Standard file input with capture="environment" to default to rear camera on mobile */}
            <input 
              type="file" 
              ref={fileInputRef}
              accept="image/*" 
              capture="environment"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="cropName" className="font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Crop Name</label>
            <input 
              id="cropName"
              type="text" 
              required
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              placeholder="e.g., Organic Tomatoes" 
              className="bg-surface-variant/30 border border-glass-stroke rounded-lg px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="price" className="font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Price per kg (₹)</label>
              <input 
                id="price"
                type="number" 
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., 35" 
                className="bg-surface-variant/30 border border-glass-stroke rounded-lg px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="quantity" className="font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Quantity (kg)</label>
              <input 
                id="quantity"
                type="number" 
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g., 50" 
                className="bg-surface-variant/30 border border-glass-stroke rounded-lg px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Harvest Status</label>
            <select 
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-surface-variant/30 border border-glass-stroke rounded-lg px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none"
            >
              <option className="bg-surface text-on-surface" value="Available Now">Available Now</option>
              <option className="bg-surface text-on-surface" value="Harvesting Tomorrow">Harvesting Tomorrow</option>
              <option className="bg-surface text-on-surface" value="Harvesting in 3 Days">Harvesting in 3 Days</option>
              <option className="bg-surface text-on-surface" value="Harvesting Next Week">Harvesting Next Week</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="mt-2 w-full bg-primary text-on-primary font-headline-md text-body-lg py-3 rounded-xl hover:bg-primary-fixed-dim transition-colors shadow-lg shadow-primary/20 hover:shadow-primary/40 flex justify-center items-center gap-2"
          >
            <span className="material-symbols-outlined">publish</span>
            Post Listing
          </button>
        </form>
      </div>
    </div>
  );
}
