import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let UserContext = createContext();

export function UserContextProvider({ children }) {
    let [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);
    let [cartQuantity, setQuantity] = useState(0);
    let [loading,setLoading] = useState(true);
    const getUserData = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile/`,
            { headers: { authorization: `Tariq__${userToken}` } });
        setUserData(data.user);
        setLoading(false);

    }
    const getProductQuantity = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, { headers: { authorization: `Tariq__${userToken}` } });
        setQuantity(data?.count);
    }


    useEffect(() => {
        getProductQuantity();
        getUserData();

    }, [userToken])
    return <UserContext.Provider value={{ userToken, setUserToken, userData, setUserData, cartQuantity, getProductQuantity ,loading}}>
        {children}
    </UserContext.Provider>
}