import axios from 'axios';
import React, { useContext } from 'react'
import './product.css'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom';
import { CartContext } from '../cart/CartContext.jsx';
import { UserContext } from '../context/UserContext.jsx';
export default function Product() {
    const { productId } = useParams();
    const { addToCartContext } = useContext(CartContext);
    const { getProductQuantity } = useContext(UserContext);
    const getProduct = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        return data.product;
    }
    const { data, isLoading } = useQuery("product_details", getProduct);

    if (isLoading) {
        return <p>loading ...</p>
    }

    const addToCart = async (productId) => {
        const res = await addToCartContext(productId);
        getProductQuantity();
        return res;
    }
    return (
        <div className='product my-5'>
            <div className="container">
                <div className="row">
                    <div className="image-section col-md-12 col-lg-5 col-12">
                        <div className="main-image">
                            <img src={data.mainImage.secure_url} alt='' />
                            <div className="sub-images p-0 m-0 mt-3 d-flex justify-content-between">
                                {data.subImages.map((image, index) =>
                                    <div className="image" key={index}>
                                        <img src={image.secure_url} alt=" product-image" />
                                    </div>

                                )}
                            </div>
                        </div>
                    </div>
                    <div className="details-section mt-5 col-md12 col-lg-7">
                        <div className="details">
                            <h2>{data.name}</h2>
                            <p className='fs-2'>${data.price}
                            </p>
                            <div className="submit">
                                <div className="d-grid gap-2 d-flex ">
                                    <div className="quantity p-4 position-relative">
                                        <p className=' num-quantity'>1</p>
                                        <div className="btn-plus"><button className='plus'>+</button></div>
                                        <div className="btn-minus">
                                            <button className='minus'>-</button>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary w-100" type="submit" onClick={() => addToCart(data._id)}>ADD TO CART</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
