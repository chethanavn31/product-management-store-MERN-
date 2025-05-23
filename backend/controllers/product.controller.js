import Product from "../models/product.model.js";
import mongoose from 'mongoose';

export const getProducts = async (req,res) => {
    //const { id } = req.params;
    try {
        const p = await Product.find({});
        res.status(200).json( {success: true, message: "Products listed", data: p})
        console.log("Products:",p)
        console.log("fist product",p[0])
    } catch (error) {
        console.error("Error in fetching product:", error);
        res.status(500).json({ success: false, message: "Server error"});
    }
};

export const createProduct = async (req, res) => {
    const product = req.body //user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product)

    try{
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct});
    } catch (error) {
        console.error("Error in Create product:", error);
        res.status(500).json({ success: false, message: "Server error"});
    }
};

export const updateProduct = async (req,res) => {
    const { id } =req.params;
    const product = req.body
    console.log("am i here?")
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json( {success: false, message: "Product not found"})
    }
    try{
        const updatedp = await Product.findByIdAndUpdate(id, product, {new:true})
        res.status(200).json( {success: true, data:updatedp, message: "Product updated"})
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error"});
        
    }
};

export const deleteProduct = async (req,res) => {
    const { id } = req.params;
    console.log("id:", id);
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json( {success: false, message: "Product not found"})
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json( {success: true, message: "Product deleted"})
    } catch (error) {
        res.status(500).json( {success: false, message: "Server error"})
    }
};