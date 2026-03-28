import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialCard = ({ name, location, review, customerPhoto }) => (
  <div className="bg-white border border-gray-100 overflow-hidden shadow-sm p-6 flex flex-col items-center text-center h-full my-4">
    <div className="mb-6">
      <div className="w-[100px] h-[100px] rounded-2xl overflow-hidden border-4 border-gray-50 shadow-inner">
        <img 
          src={customerPhoto} 
          alt={`Review by ${name}`} 
          className="w-full h-full object-cover" 
        />
      </div>
    </div>

    <div className="w-full">
      <div className="flex flex-col items-center mb-4">
        <h4 className="text-sm font-serif font-bold text-gray-900">{name}</h4>
        <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">{location}</p>
        <div className="mt-2 flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tighter border border-green-100">
          <CheckCircle2 className="w-2.5 h-2.5" /> Verified
        </div>
      </div>

      <div className="flex justify-center gap-0.5 mb-4 text-amber-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-current" />
        ))}
      </div>

      <p className="text-gray-600 text-sm italic leading-relaxed">
        "{review}"
      </p>
    </div>
  </div>
);

const Testimonials = () => {
  const reviews = [
    {
      name: "Ananya Kapoor",
      location: "Mumbai, MH",
      customerPhoto: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80",
      review: "Absolutely in love with the fit! The lavender shade is exactly as shown on the site. I felt so elegant."
    },
    {
      name: "Riya Sharma",
      location: "Delhi, NCR",
      customerPhoto: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80",
      review: "The linen is so soft, not itchy at all. Perfect for the Delhi heat. It's become my go-to outfit."
    },
    {
      name: "Sanya M.",
      location: "Bangalore, KA",
      customerPhoto: "https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&q=80",
      review: "The drape of this satin set is magical. It looks very expensive and premium. Highly recommend."
    },
    {
      name: "Ishani P.",
      location: "Pune, MH",
      customerPhoto: "https://images.unsplash.com/photo-1598559069352-3d8437b0d42c?auto=format&fit=crop&q=80",
      review: "Quick delivery and the packaging was beautiful. The quality is top-notch."
    }
  ];

  return (
    <section className="bg-white py-24 px-6 border-t border-gray-50">
      <style>{`
        .swiper-pagination-bullet-active {
          background: black !important;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 text-center md:text-left">
          <div className="max-w-xl">
            <h2 className="text-4xl font-serif italic mb-4">Product Reviews</h2>
            <p className="text-gray-500 leading-relaxed">
              Real customers, real moments. Swipe to see the stories.
            </p>
          </div>
          <div className="flex items-center gap-4 border-l pl-6 border-gray-200">
            <div className="text-3xl font-serif">4.9</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
              Average Rating <br /> 
              <span className="text-amber-400">★★★★★</span>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;