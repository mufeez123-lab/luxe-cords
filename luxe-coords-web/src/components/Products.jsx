import React, { useState } from 'react';
import { MessageCircle, Loader2, X, Minus, Plus } from 'lucide-react';

const ProductCard = ({ name, price, image, sizes = [] }) => {
  const [isShortening, setIsShortening] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Calculate dynamic price based on quantity
  const totalPrice = Number(price) * quantity;

  const handleWhatsAppOrder = async (e) => {
    if (e) e.stopPropagation();
    
    if (!selectedSize && sizes.length > 0) {
      alert("Please select a size first");
      return;
    }

    setIsShortening(true);
    const phoneNumber = "916362514956";
    let finalImageUrl = image;

    try {
      const response = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(image)}`
      );
      if (response.ok) finalImageUrl = await response.text();
    } catch (error) {
      console.error("Link shortening failed", error);
    } finally {
      setIsShortening(false);
      setShowSizeModal(false);
    }
    
    const message = `*New Order Inquiry*%0A%0A` +
                    `*Product:* ${name}%0A` +
                    `*Unit Price:* ₹${price}%0A` +
                    `*Quantity:* ${quantity}%0A` +
                    `*Total Price:* ₹${totalPrice}%0A` +
                    `*Selected Size:* ${selectedSize || 'Not specified'}%0A` +
                    `*Image:* ${finalImageUrl}%0A%0A` +
                    `Is this available? I'd like to order.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const resetAndClose = () => {
    setShowSizeModal(false);
    setQuantity(1);
    setSelectedSize("");
  };

  return (
    <>
      <div className="group cursor-pointer" onClick={() => setShowSizeModal(true)}>
        <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-gray-100">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute bottom-0 left-0 w-full flex items-center justify-center gap-2 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/95 backdrop-blur-sm border-t border-gray-100 text-center">
             <img src="/whatsapp.png" alt="" className='h-6' /> 
             <span className="text-xs uppercase tracking-widest font-bold">Order Now</span>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="font-serif text-lg leading-tight">{name}</h3>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm font-medium">₹{price}</p>
            <p className="text-[12px] text-gray-400 uppercase tracking-wider">
              {sizes.slice(0, 3).join(' ')} {sizes.length > 3 ? '+' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* --- SIZE & QUANTITY SELECTION MODAL --- */}
      {showSizeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={resetAndClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-4 mb-6">
              <img src={image} className="w-20 h-24 object-cover bg-gray-50 rounded" alt="thumbnail" />
              <div>
                <h4 className="font-serif text-xl leading-tight">{name}</h4>
                <p className="text-gray-400 text-sm ">10% Discount</p>
                <p className="text-black font-bold text-lg">Total: ₹{price}</p>
              </div>
            </div>

            {/* Size Selection */}
            <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-3">
              Select Your Size
            </label>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {sizes.length > 0 ? (
                sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-xs font-bold border transition-all ${
                      selectedSize === size 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-200 hover:border-black text-gray-600'
                    }`}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <p className="col-span-4 text-xs italic text-gray-400">Standard Size Only</p>
              )}
            </div>

            {/* Quantity Selection */}
            <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-3">
              Quantity
            </label>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-200">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[15px] text-gray-700 font-bold italic">₹{totalPrice}</p>
            </div>

            <button 
              onClick={handleWhatsAppOrder}
              disabled={isShortening || (sizes.length > 0 && !selectedSize)}
              className="w-full flex items-center justify-center gap-2 py-4 text-xs uppercase tracking-widest font-bold bg-black text-white transition-colors hover:bg-gray-800 disabled:bg-gray-300"
            >
              {isShortening ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <img src="/whatsapp.png" alt="" className='h-5 w-5 object-contain ' /> 
              )}
              {isShortening ? "Generating Link..." : `Confirm & Order`}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const Products = ({ items }) => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="products">
      <div className="mb-12">
        <h2 className="text-4xl font-serif italic text-gray-900">The Signature Collection</h2>
        <p className="text-gray-400 mt-2 tracking-wide">Select an item to view options</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
        {items && items.length > 0 ? (
          items.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 italic py-10">
            No products in the collection yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default Products;