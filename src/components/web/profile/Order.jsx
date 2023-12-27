import axios from 'axios';
import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext.jsx';
import { useQuery } from 'react-query';
import Loading from '../../Loading/Loading.jsx';

export default function Order() {
    let { userToken } = useContext(UserContext);
    let [isLoading,setLoading] = useState(true);
    const getOrders = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`, { headers: { authorization: `Tariq__${userToken}` } });
        setLoading(false);
        return data.orders;

    }
    const { data } = useQuery('orders', getOrders);
    if (isLoading) {
        return <Loading/>
    }
    return (
        <>
            {data ? (data.map((product, index) =>
                <div className='details w-100' key={index}>
                    <div className="order-list">
                        <div className="order">
                            <div className="order-number">Order #{index + 1}</div>
                            <div className="order-date">Date:{product.createdAt}</div>
                            <div className="customer-name">Address:{product.address}</div>
                            <div className="phoneNumber">Phone Number:{product.phoneNumber}</div>
                            <div className="paymentMethod">Payment Method:{product.paymentType}</div>
                            <div className="price">Final Price:${product.finalPrice}</div>
                        </div>

                        {/* Add more orders as needed */}
                    </div>

                </div>

            )) : <h2>no orders</h2>}

        </>
    )
}





