import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="p-10">
      {products.length > 0 ? (
        <div>
          <div className="grid grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product}/>
            ))}
          </div>
          <br />
          <Link to="/create">Create new products</Link>
        </div>
      ) : (
        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold">Currently no products</h3>
          <h5 className="text-blue-500 mt-2">
            <Link to="/create">Create new products</Link>
          </h5>
        </div>
      )}
    </div>
  );
};

export default HomePage;




// import React from 'react'
// import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useProductStore } from '../store/product';

// const HomePage = () => {
//   const { fetchProducts, products } = useProductStore();
//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);
//   console.log("in homepage.jsx");
//   console.log(products);
//   return (
//     <div>
//       <div className='grid grid-cols-4 gap-4 space-y-10 p-20'>
//         <div className="bg-amber-500 w-60 h-60"></div>
//         <div className="bg-amber-500 w-60 h-60"></div>
//         <div className="bg-amber-500 w-60 h-60"></div>
//         <div className="bg-amber-500 w-60 h-60"></div>
//         <div className="bg-amber-500 w-60 h-60"></div>
//         <div className="bg-amber-500 w-60 h-60"></div>
//       </div>
//       <div>
//         <h3>Currently no products</h3>
//         <h5><Link to="/create">Create new products</Link></h5>
//       </div>
      
      
//     </div>
//   )
// }

// export default HomePage