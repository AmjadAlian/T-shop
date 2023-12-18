import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext.jsx';
import { useQuery } from 'react-query';

export default function Order() {
    let { userToken } = useContext(UserContext);
    const getOrders = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`, { headers: { authorization: `Tariq__${userToken}` } });
        return data.orders;
    }
    const { data, isLoading } = useQuery('orders', getOrders);
    if (isLoading) {
        return <h2>...loading</h2>
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





