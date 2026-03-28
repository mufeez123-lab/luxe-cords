import React from 'react';
import { ChevronRight } from 'lucide-react';

const ProductCard = ({ name, price, image }) => (
  <div className="group cursor-pointer">
    <div className="relative overflow-hidden aspect-[3/4] mb-4">
      <img src={image} alt={name} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform bg-white/90 text-center">
        <p className="text-xs uppercase tracking-widest font-semibold">Quick Add +</p>
      </div>
    </div>
    <h3 className="font-serif text-lg">{name}</h3>
    <p className="text-gray-500 text-sm">₹{price}</p>
  </div>
);

const Products = () => {
  const items = [
    { name: "Lavender Silk Set", price: "2,729", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80" },
    { name: "Ivory Linen Coord", price: "3,199", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80" },
    { name: "Midnight Satin Lounge", price: "2,450", image: "https://images.unsplash.com/photo-1539109132314-347551cd9c7c?auto=format&fit=crop&q=80" },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-serif italic">The Signature Edit</h2>
          <p className="text-gray-400 mt-2">Curated for the modern woman</p>
        </div>
        <a href="#" className="flex items-center gap-2 text-sm uppercase tracking-widest border-b border-black pb-1">
          View All <ChevronRight className="w-4 h-4"/>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {items.map((item, i) => <ProductCard key={i} {...item} />)}
      </div>
    </section>
  );
};

export default Products;