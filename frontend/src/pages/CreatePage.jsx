import React, { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState("success");
  const { createProduct } = useProductStore();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      setFlashMessage("❌ Please fill all required fields!");
      setFlashType("error");
      setTimeout(() => setFlashMessage(""), 3000);
      return;
    }
    try {
      const { success, message } = await createProduct(newProduct);
      setFlashMessage(success ? "✅ Product added successfully!" : `❌ Error: ${message}`);
      setFlashType(success ? "success" : "error");
      if (success) setNewProduct({ name: "", price: "", image: "" });
      setTimeout(() => setFlashMessage(""), 3000);
    } catch {
      setFlashMessage("❌ Something went wrong. Please try again.");
      setFlashType("error");
      setTimeout(() => setFlashMessage(""), 3000);
    }
  };

  return (
    <form onSubmit={handleAddProduct} className="mt-10 space-y-8 text-center">
      <h1 className="text-xl font-semibold">CREATE A NEW PRODUCT</h1>
      {flashMessage && <div className={`px-4 py-2 rounded-sm ${flashType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>{flashMessage}</div>}
      <div className="space-y-3 border px-5 py-5 rounded-sm flex flex-col w-1/3 mx-auto">
        <input className="border p-2 rounded" placeholder='Product Name' value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input className="border p-2 rounded" placeholder='Price' type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
        <input className="border p-2 rounded" placeholder='Image URL' value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Add Product</button>
      </div>
    </form>
  );
};
export default CreatePage;