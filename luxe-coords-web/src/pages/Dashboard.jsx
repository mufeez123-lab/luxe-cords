import React, { useState } from 'react';
import { Plus, Trash2, Edit3, X, Save, Loader2, Upload, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../supabaseClient';

const AdminDashboard = ({ products, refreshProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', image: '' });

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ name: product.name, price: product.price, image: product.image });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: '', image: '' });
    }
    setIsModalOpen(true);
  };

  // --- NEW: Image Upload Logic ---
  const handleFileUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image: data.publicUrl });
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update({ name: formData.name, price: formData.price, image: formData.image })
          .eq('id', editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products')
          .insert([formData]);
        if (error) throw error;
      }
      await refreshProducts();
      setIsModalOpen(false);
    } catch (error) {
      alert("Error saving product: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure?")) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) await refreshProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-serif text-slate-900">Inventory Manager</h1>
            <p className="text-gray-500 text-sm mt-1">Direct Cloud Upload Enabled</p>
          </div>
          <button onClick={() => openModal()} className="flex items-center gap-2 bg-black text-white px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-gray-800 transition-all">
            <Plus className="w-4 h-4" /> Add New Product
          </button>
        </div>

        {/* Table UI */}
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-xs uppercase tracking-wider font-semibold text-gray-600">Product</th>
                <th className="p-4 text-xs uppercase tracking-wider font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img src={product.image} className="w-12 h-16 object-cover rounded bg-gray-100" />
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs font-mono text-gray-500">₹{product.price}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => openModal(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md p-8 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-serif italic mb-6">{editingProduct ? 'Edit' : 'Add'} Product</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Image Upload Area */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-gray-500">Product Image</label>
                <div className="relative group border-2 border-dashed border-gray-200 hover:border-black transition-colors rounded-sm p-4 text-center">
                  {formData.image ? (
                    <div className="relative">
                      <img src={formData.image} alt="Preview" className="w-full h-48 object-cover mb-2" />
                      <label className="absolute bottom-2 right-2 cursor-pointer bg-white p-2 shadow-md rounded-full hover:bg-gray-100">
                        <Upload className="w-4 h-4" />
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer py-10 flex flex-col items-center">
                      {uploading ? <Loader2 className="w-8 h-8 animate-spin text-gray-400" /> : <Upload className="w-8 h-8 text-gray-400" />}
                      <span className="mt-2 text-sm text-gray-500">Click to upload photo</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-bold mb-1 text-gray-500">Name</label>
                <input type="text" required className="w-full border-b border-gray-200 focus:border-black outline-none py-2" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-bold mb-1 text-gray-500">Price</label>
                <input type="text" required className="w-full border-b border-gray-200 focus:border-black outline-none py-2" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
              </div>

              <button type="submit" disabled={isSubmitting || uploading} className="w-full bg-black text-white py-4 mt-4 text-xs uppercase tracking-[0.2em] font-bold disabled:bg-gray-400 flex justify-center items-center gap-2">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;