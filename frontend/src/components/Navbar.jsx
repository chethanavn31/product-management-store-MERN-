import React from 'react'
import { useProductStore } from '../store/product'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  // const { products } = useProductStore()
  const navigate = useNavigate();
  return (
    <nav className='flex flex-direction:row w-full justify-between item-center px-10 py-5 bg-slate-700 '>
      <h1 className='text-3xl font-bold text-white'>PRODUCT STORE</h1> 
      <button className='text-white rounded-lg cursor-pointer' onClick={() => navigate('/')}>Home</button>
    </nav>
  )
}

export default Navbar