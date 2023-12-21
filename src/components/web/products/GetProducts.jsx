import axios from 'axios'
import './products.css';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import { CartContext } from '../cart/CartContext.jsx';

export default function GetProducts() {
    const { addToCartContext } = useContext(CartContext);
    const { getProductQuantity } = useContext(UserContext);
    const getAllProducts = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=8`);
        return data;
    }
    const { data, isLoading } = useQuery('products', getAllProducts);
    if (isLoading) {
        return <h2>... loading</h2>
    }
    console.log(data);
    const addToCart = async (productId) => {
        const res = await addToCartContext(productId);
        console.log(productId);
        getProductQuantity();
        return res;
    }
    return (
        <>
            {data ? data?.products.map((product, index) =>
                <div key={index} className="col-xl-3 col-lg-4 col-md-4">
                    <div className="products-info ">
                        <div className="product-image position-relative">
                            <Link>  <img src={product.mainImage.secure_url} className='img-fluid ' alt="product image" />  </Link>
                            <div className="buttons-nav position-absolute  d-flex justify-content-between">
                                <Link className='icon-col' onClick={() => addToCart(product._id)}><i class="fa-solid fa-bag-shopping"></i></Link>
                                <Link className='icon-col'><i class="fa-regular fa-heart"></i></Link>
                                <Link to={`/product/${product._id}`}><i class="fa-solid fa-magnifying-glass"></i></Link>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className='product-information mt-2'>
                                <p className='m-0'><Link to={`/product/${product._id}`}>{product.name}</Link></p>
                                <Link className='desc d-block' to={`/product/${product._id}`}>{product.description.substring(0, 38)}...</Link>
                                <p className='price'>${product.price}</p>
                            </div>
                            <div className='star-rating mt-2'>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <h2>no data</h2>}
        </>
    )
}
