import React from 'react';
import { Camera } from 'lucide-react';

const Footer = () => (
  <footer className="bg-black text-white py-16 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
       <img src="/luxew.png" alt="" className='h-20 invert'/>
        <p className="text-gray-400 max-w-sm mb-6">Elevating everyday essentials into luxury statement pieces.</p>
        <div className="flex gap-4">
          <Camera className="w-5 h-5 cursor-pointer hover:text-luxe-gold" />
        </div>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-widest mb-6 font-bold">Support</h4>
        <ul className="text-gray-400 text-sm space-y-4">
          <li className="hover:text-white cursor-pointer">Shipping Policy</li>
          <li className="hover:text-white cursor-pointer">Returns & Exchanges</li>
          <li className="hover:text-white cursor-pointer">Size Guide</li>
        </ul>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-widest mb-6 font-bold">Newsletter</h4>
        <div className="flex border-b border-gray-600 pb-2">
          <input type="email" placeholder="Email Address" className="bg-transparent outline-none w-full text-sm" />
          <button className="text-xs uppercase tracking-widest font-bold px-2">Join</button>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;