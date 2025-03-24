

import {create} from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    flashMessage: "",
    flashType: "", 

    setProducts: (products) => ({ products }),
    setFlashMessage: (message, type) => set({ flashMessage: message, flashType: type }),

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
                return {success:false, message: "Please fill in all fields"}
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct)
        });
        const data = await res.json()
        set((state) => ({ products:[...state.products, data.data] }))
        return {success: true, message: "Product created successfully"}
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products"); //fetch is making network request to access a resource  from an API having the specified API endpoint, await will make the code wait for the network request to complete before moving on to the next line.
        const data = await res.json(); // json() method reads the response body and parses it as JSON, parses the body as javascript object
        console.log(data);
        set({ products: data.data });
    },
    deleteProducts: async (pid) => {
        const res = await fetch(`/api/products/${pid}`,{ method:"DELETE" });
        const data = await res.json();
        if (!data.success) return { success:false, message: data.message};
        set( state => ({ 
            products: state.products.filter(product => product._id !==pid),
            flashMessage: "✅ Product deleted successfully!",
            flashType: "success"
        })); 
        setTimeout(() => set({ flashMessage: "", flashType: "" }), 3000);
        return { success: true, message: data.message };  
    },
    updateProduct: async (pid, updatedProduct) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct),
            });
    
            const data = await res.json();
    
            if (!data.success) return { success: false, message: data.message };
    
            set((state) => ({
                products: state.products.map(product =>
                    product._id === pid ? { ...product, ...updatedProduct } : product
                ),
            }));
    
            return { success: true, message: "Product updated successfully!" };
        } catch (error) {
            return { success: false, message: "Something went wrong!" };
        }
    },
    
    // updateProduct: async (pid, updatedProduct) => {
    //     try {
    //         const res = await fetch(`/api/products/${pid}`, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(updatedProduct),
    //         });
    
    //         const data = await res.json();
    
    //         if (!data.success) return { success: false, message: data.message };
    
    //         set((state) => ({
    //             products: state.products.map((product) =>
    //                 product._id === pid ? { ...product, ...updatedProduct } : product
    //             ),
    //         }));
    
    //         return { success: true, message: "Product updated successfully" };
    //     } catch (error) {
    //         return { success: false, message: "Something went wrong!" };
    //     }
    // }
}));