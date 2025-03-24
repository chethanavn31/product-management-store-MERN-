import React, { useState } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'; // Import edit & delete icons
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
  const { deleteProducts, updateProduct } = useProductStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image
  });
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState("success");

  const handleDeleteProduct = async (pid) => {
    try {
      const { success, message } = await deleteProducts(pid);
      if (success) {
        setFlashMessage("✅ Product deleted successfully!");
        setFlashType("success");
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProduct({
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const handleUpdateProduct = async () => {
    if (!editedProduct.name.trim() || !editedProduct.price.trim() || !editedProduct.image.trim()) {
      setFlashMessage("❌ Please fill all required fields before updating!");
      setFlashType("error");
      setTimeout(() => setFlashMessage(""), 3000);
      return; // Stop execution if validation fails
    }
    try {
        const { success, message } = await updateProduct(product._id, editedProduct);

        if (success) {
            setFlashMessage("✅ Product updated successfully!");
            setFlashType("success");
            setIsEditing(false); // Hide edit form after success
        } else {
            setFlashMessage("❌ Error: " + message);
            setFlashType("error");
        }
    } catch (error) {
        setFlashMessage("❌ Something went wrong. Please try again.");
        setFlashType("error");
    }

    setTimeout(() => setFlashMessage(""), 3000);
  };




  return (
    <div className="bg-white p-4 shadow-lg rounded-lg text-center">
      {flashMessage && (
        <div className={`text-white px-4 py-2 rounded-sm ${flashType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {flashMessage}
        </div>
      )}

     {isEditing ? (
        <div>
          <input
            className='border p-2 w-full rounded'
            value={editedProduct.name}
            onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
          />
          <input
            className='border p-2 w-full rounded mt-2'
            value={editedProduct.price}
            type="number"
            onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
          />
          <input
            className='border p-2 w-full rounded mt-2'
            value={editedProduct.image}
            onChange={(e) => setEditedProduct({ ...editedProduct, image: e.target.value })}
          />
          <div className="flex justify-center space-x-4 mt-2">
            <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={handleUpdateProduct}>Save</button>
            <button className='bg-gray-500 text-white px-4 py-2 rounded' onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
          <p className="text-gray-700">₹{product.price}</p>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="text-black hover:text-green-700 text-xl cursor-pointer" onClick={handleEditClick}>
              <AiFillEdit />
            </button>
            <button className="text-black hover:text-red-700 text-xl cursor-pointer" onClick={() => handleDeleteProduct(product._id)}>
              <AiFillDelete />
            </button>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default ProductCard;

