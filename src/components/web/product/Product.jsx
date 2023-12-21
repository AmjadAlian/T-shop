import axios from 'axios';
import React, { useContext } from 'react'
import './product.css'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom';
import { CartContext } from '../cart/CartContext.jsx';
import { UserContext } from '../context/UserContext.jsx';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import Input from '../../pages/Input.jsx';
export default function Product() {
    const { getProductQuantity, userToken } = useContext(UserContext);
    const { productId } = useParams();
    const { addToCartContext } = useContext(CartContext);
    const initialValues = {
        comment: '',
        rating: '',
    };
    const onSubmit = async users => {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`, users, { headers: { Authorization: `Tariq__${userToken}` } });
        if (data.message == 'success') {
            toast.success(' Review Posted Successfully!', {
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
    };
    const formik = useFormik({
        initialValues,
        onSubmit,

    });
    const inputs = [
        {
            title: 'comment',
            id: "comment",
            type: 'text',
            name: 'comment',
            value: formik.values.comment
        },
        {
            title: 'rating',
            id: 'rating',
            type: 'rating',
            name: 'rating',
            value: formik.values.rating,
        },


    ];
    const renderInput = inputs.map((ele, index) =>
        <Input type={ele.type} key={index} name={ele.name} id={ele.id} value={ele.value} placeholder={ele.name} onChange={formik.handleChange} errors={formik.errors} onBlur={formik.handleBlur} touched={formik.touched} />
    );

    


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
        <>
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
            <section className='reviews mt-5 pt-4 border-top'>
                <div className="container">
                    <div className="review-title d-flex justify-content-center">
                        <h2>REVIEWS[{data.reviews.length}]</h2>
                    </div>
                    <div className="product-review">
                        <p>{data.reviews.length} REVIEWS FOR <span className='text-danger'>{data.name}.</span></p>
                    </div>
                    <div className="product-reviews pt-3">
                        <div className="row">
                            {data ? data.reviews.map((product) =>
                                <div key={product._id} className="col-md-6 mb-3">
                                    <div className="review position-relative">
                                        <div className='star-rating text-end position-absolute'>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                        <div className="client-info d-flex">
                                            <div className="client-image">
                                                <img src={product.createdBy.image.secure_url} className='img-fluid' alt="" />
                                            </div>
                                            <div className="client-data ps-3 pt-1">
                                                <div className="client-name">
                                                    <p className='m-0 p-0'>{product.createdBy.userName}</p>
                                                </div>
                                                <div className="review-date">
                                                    <p className='p-0 m-0'>{product.createdAt}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="review-description mt-2">
                                            <p>{product.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : <h2>no reviews yes</h2>}
                        </div>
                    </div>
                    <div className="add-review mt-5">
                        <div className="add-review-content ">
                            <i class="fa-solid fa-feather"></i> <span> ADD A REVIEW</span>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="review-comment">
                                        <textarea className='w-100' name='comment' id='comment' placeholder='Your Review *' onChange={formik.handleChange} onBlur={formik.handleBlur} touched={formik.touched} cols="30" rows="10"></textarea>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="rating-box mb-3">
                                        <input className='w-100' type='text' name='rating' id='rating' placeholder='Your Rating In Numbers 1-5 *' onChange={formik.handleChange} onBlur={formik.handleBlur} touched={formik.touched} />
                                    </div>
                                    <div className="submit-button">
                                        <button type='submit' className="w-100"> Submit </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>

    )
}
