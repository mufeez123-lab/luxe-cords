import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient'; // Ensure this file exists with your credentials

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ScrollSmooth from './components/gsap';
import AdminDashboard from './pages/Dashboard';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch products from Supabase on mount
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Define the Main Website Layout
  const Storefront = () => (
    <>
      <ScrollSmooth />
      <Navbar />
      <Hero />
      {loading ? (
        <div className="py-24 text-center font-serif italic text-gray-400">
          Loading Collection...
        </div>
      ) : (
        <Products items={products} />
      )}
      <Testimonials />
      <Footer />
    </>
  );

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Main Shop Route */}
          <Route path="/" element={<Storefront />} />

          {/* Admin Route - We pass fetchProducts so the dashboard can trigger updates */}
          <Route 
            path="/luxe-admin" 
            element={
              <AdminDashboard 
                products={products} 
                refreshProducts={fetchProducts} 
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;