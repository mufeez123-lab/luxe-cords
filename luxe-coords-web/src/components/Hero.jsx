import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80" 
        className="w-full h-full object-cover brightness-75"
        alt="Luxe fashion"
      />
    </div>
   <motion.div 
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="relative z-10 text-center text-white px-4"
>
  {/* Added 'flex justify-center' to ensure the span contents are centered */}
  <span className="uppercase tracking-[0.3em] text-sm mb-4  flex justify-center">
    <img src="/lux1.png" alt="" className='h-20 rounded-[20px]'/>
  </span>
  
  <h2 className="text-5xl md:text-7xl font-serif mb-8 italic">Effortless Elegance</h2>
  
<a href="#products">  <button className="bg-white text-black px-8 py-4 uppercase tracking-widest text-sm hover:bg-luxe-gold hover:text-white transition-all duration-300">
    Explore Sets
  </button></a>
</motion.div>
  </section>
);

export default Hero;