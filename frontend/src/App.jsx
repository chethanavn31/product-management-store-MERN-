




import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { useProductStore } from './store/product'


function App() {
  const { products } = useProductStore();
  return (
    <>
   
      <Navbar /> {/* Navbar stays on all pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
  
    </>
  )
}

export default App
