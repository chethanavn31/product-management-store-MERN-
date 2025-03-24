import React from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'; // Import edit & delete icons
import { useProductStore } from '../store/product';

const ProductCard = ( {product} ) => {
  const {deleteProducts} = useProductStore()
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProducts(pid);
    // try {
    //   const { success, message } = await deleteProducts(pid);

    //     if (success) {
    //         setFlashMessage(" Product deleted successfully!");
    //         setFlashType("success");
    //         setNewProduct({ name: "", price: "", image: "" });
    //     } else {
    //         setFlashMessage("❌ Error: " + message);
    //         setFlashType("error");
    //     }

    //     setTimeout(() => setFlashMessage(""), 3000);

    // } catch (error) {
    //     setFlashMessage("❌ Something went wrong. Please try again.");
    //     setFlashType("error");
    //     setTimeout(() => setFlashMessage(""), 3000);
    // }
  }
  return (
    <div>
        <div key={product._id} className="bg-white p-4 shadow-lg rounded-lg text-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-700">₹{product.price}</p>
            <p className="text-gray-700">₹{product._id}</p>
            {/* Edit & Delete Buttons */}
            <div className="flex justify-center space-x-50  ">
              <button className="text-black hover:text-green-700 text-xl cursor-pointer">
                <AiFillEdit /> {/* Edit Icon */}
              </button>
              <button className="text-black hover:text-red-700 text-xl cursor-pointer" onClick={() => handleDeleteProduct(product._id)}>
                <AiFillDelete /> {/* Delete Icon */}
              </button>
            </div>
        </div>
    </div>
  )
}

export default ProductCard