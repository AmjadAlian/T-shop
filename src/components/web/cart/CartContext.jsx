import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
    const [isLoading,setLoading]= useState(true);
    const addToCartContext = async (productId) => {
        try {
            const token = localStorage.getItem('userToken');
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cart`, { productId }, { headers: { Authorization: `Tariq__${token}` } });
            if (data.message == 'success') {
                toast.success(' Item Added To Cart ', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    const getCartContext = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, { headers: { Authorization: `Tariq__${token}` } });
            setLoading(false);
            return data;
        } catch (error) {
            return error;
        }
    }
    const removeCartContext = async (productId) => {
        
        try {
            setLoading(true);
            const token = localStorage.getItem('userToken');
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`, { productId },
                { headers: { Authorization: `Tariq__${token}` } })
                setLoading(true);
                return data;
        }
        catch (error) {
            return error;
        }
    }
    const increaseQuantityContext = async (productId) => {
        const token = localStorage.getItem('userToken');
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`, { productId }, { headers: { Authorization: `Tariq__${token}` } });
        if (data.message == 'success') {
            toast.success(' Item Added Successfully ', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    const decreaseQuantityContext = async (productId) => {
        const token = localStorage.getItem('userToken');
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`, { productId }, { headers: { Authorization: `Tariq__${token}` } });
        if (data.message == 'success') {
            toast.success(' Item Deleted Successfully ', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    return <CartContext.Provider value={{ addToCartContext, getCartContext, removeCartContext, increaseQuantityContext, decreaseQuantityContext ,isLoading,setLoading}}>
        {children}
    </CartContext.Provider>;

}