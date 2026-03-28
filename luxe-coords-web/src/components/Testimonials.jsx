import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => (
  <section className="bg-luxe-beige py-24 px-6">
    <div className="max-w-4xl mx-auto text-center">
      <div className="flex justify-center gap-1 mb-6 text-luxe-gold">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
      </div>
      <p className="text-2xl font-serif italic leading-relaxed mb-8">
        "The quality of the fabric is exceptional. I wore my Lavender set to a brunch and received so many compliments. It’s the perfect blend of comfort and luxury."
      </p>
      <p className="uppercase tracking-[0.2em] text-xs font-bold">— Ananya R., Verified Buyer</p>
    </div>
  </section>
);

export default Testimonials;