import React, { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });

    const [flashMessage, setFlashMessage] = useState("");
    const [flashType, setFlashType] = useState("success");

    const { createProduct } = useProductStore();

    const handleAddProduct = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // 🔹 Manual validation (removes default form alerts)
        if (newProduct.name.trim() === "" || newProduct.price.trim() === "" || newProduct.image.trim() === "") {
            setFlashMessage("❌ Please fill all required fields!");
            setFlashType("error");
            setTimeout(() => setFlashMessage(""), 3000);
            return;
        }

        try {
            const { success, message } = await createProduct(newProduct);

            if (success) {
                setFlashMessage("✅ Product added successfully!");
                setFlashType("success");
                setNewProduct({ name: "", price: "", image: "" });
            } else {
                setFlashMessage("❌ Error: " + message);
                setFlashType("error");
            }

            setTimeout(() => setFlashMessage(""), 3000);

        } catch (error) {
            setFlashMessage("❌ Something went wrong. Please try again.");
            setFlashType("error");
            setTimeout(() => setFlashMessage(""), 3000);
        }
    };

    return (
        <form onSubmit={handleAddProduct} className='content-center place-items-center mt-10 space-y-8 '>
            <h1 className='text-xl font-semibold'>CREATE A NEW PRODUCT</h1>

            {/* Flash Message UI */}
            {flashMessage && (
                <div className={`text-white px-4 py-2 rounded-sm ${flashType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {flashMessage}
                </div>
            )}

            <div className='space-y-3 border-1 border-black px-5 py-5 rounded-sm flex flex-col'>
                <input 
                    className='pl-2 border-1 border-black h-10 w-100 rounded-sm' 
                    placeholder='Product Name' 
                    name='name' 
                    value={newProduct.name} 
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
                />
                <input 
                    className='pl-2 border-1 border-black h-10 w-100 rounded-sm' 
                    placeholder='Price' 
                    name='price' 
                    type="number" 
                    value={newProduct.price} 
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
                />
                <input 
                    className='pl-2 border-1 border-black h-10 w-100 rounded-sm' 
                    placeholder='Image URL' 
                    name='image' 
                    value={newProduct.image} 
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} 
                />
                
                <button 
                    type="submit" 
                    className='border-1 border-black h-10 w-100 rounded-sm hover:bg-slate-600 hover:text-white transition cursor-pointer'>
                    Add Product
                </button>
            </div>
        </form>
    );
}

export default CreatePage;
