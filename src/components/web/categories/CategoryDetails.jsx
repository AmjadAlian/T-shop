import axios from 'axios';
import React from 'react'
import './categoryDetails.css'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'

export default function CategoryDetails() {
    const { categoryId } = useParams();

    const getCategories = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
        return data.products;
    }
    const { data, isLoading } = useQuery("category_details", getCategories);

    if (isLoading) {
        return <p>loading ...</p>
    }
    return (
        <div className='products   py-5'>
            <div className="container">
                <div className="row">
                    {data?.length ? data.map((product) =>
                        <div className="product col-md-4  " key={product._id}>
                            <Link className='text-decoration-none' to = {`/product/${product._id}`}>
                            <div className="card">
                                <img src={product.mainImage.secure_url} alt="product" className='img-fluid' />
                                <h2 className='fs-6 mt-2'>{product.name}</h2>
                                <p className="price">${product.price}</p>
                                <p>Some text about the jeans..</p>
                                <p><button>Add to Cart</button></p>
                            </div>
                            </Link>
                        </div>
                    ) : <h2>product not found</h2>}
                </div>
            </div>


        </div>
    )
}
