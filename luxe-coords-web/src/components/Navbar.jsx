import React from 'react';
import { ShoppingBag, Menu } from 'lucide-react';

const Navbar = () => (
  <nav className="fixed w-full z-50 h-24 border-b border-gray-100 px-6 flex justify-center items-center overflow-hidden">
    
    {/* Background Image Tag */}
    <img 
      src="/120.jpg" 
      alt="Background" 
      className="absolute inset-0 w-full h-full object-cover -z-20"
    />

    {/* Optional Overlay/Blur for readability */}
    <div className="absolute inset-0 bg-white/50  -z-10"></div>
    
    {/* Logo */}
    <img src="/luxew.png" alt="Luxe Logo" className="h-20 z-10 relative"/>

  </nav>
);

export default Navbar;