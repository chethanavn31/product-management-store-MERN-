import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { fetchProducts, products, flashMessage, flashType } = useProductStore();

  useEffect(() => {
    fetchProducts(); // Fetch products only on mount
  }, []);

  return (
    <div className="p-10">
      {flashMessage && (
        <div className={`text-white px-4 py-2 rounded-sm ${flashType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {flashMessage}
        </div>
      )}
      {products.length > 0 ? (
        <div>
          <div className="grid grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <br />
          <Link to="/create" className="text-blue-500 hover:underline">Create new products</Link>
        </div>
      ) : (
        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold">Currently no products</h3>
          <h5 className="text-blue-500 mt-2">
            <Link to="/create" className="hover:underline">Create new products</Link>
          </h5>
        </div>
      )}
    </div>
  );
};

export default HomePage;