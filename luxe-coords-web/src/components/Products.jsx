import React, { useState } from 'react';
import { ChevronRight, MessageCircle, Loader2 } from 'lucide-react';

const ProductCard = ({ name, price, image }) => {
  const [isShortening, setIsShortening] = useState(false);

  const handleWhatsAppOrder = async (e) => {
    e.stopPropagation();
    setIsShortening(true);

    const phoneNumber = "916362514956"; // Your number
    let finalImageUrl = image;

    try {
      // Fetch shortened URL from TinyURL API
      const response = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(image)}`
      );
      if (response.ok) {
        finalImageUrl = await response.text();
      }
    } catch (error) {
      console.error("Link shortening failed, using original URL", error);
    } finally {
      setIsShortening(false);
    }
    
    // Formatting the message
    const message = `*New Order Inquiry*%0A%0A` +
                    `*Product:* ${name}%0A` +
                    `*Price:* ₹${price}%0A` +
                    `*Image:* ${finalImageUrl}%0A%0A` +
                    `Is this item available?`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div id="products" className="group cursor-pointer">
      <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-gray-100">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105" 
        />
        
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/95 backdrop-blur-sm">
          <button 
            onClick={handleWhatsAppOrder}
            disabled={isShortening}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors border border-black disabled:opacity-70"
          >
            {isShortening ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <MessageCircle className="w-4 h-4" />
            )}
            {isShortening ? "Loading..." : "Order via WhatsApp"}
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-serif text-lg leading-tight">{name}</h3>
        <p className="text-gray-500 text-sm font-medium">₹{price}</p>
      </div>
    </div>
  );
};

const Products = ({ items }) => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="products">
      <div className="flex flex-col md:flex-row justify-between items-baseline md:items-end mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-serif italic text-gray-900">The Signature Edit</h2>
          <p className="text-gray-400 mt-2 tracking-wide">Curated for the modern woman</p>
        </div>
        
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