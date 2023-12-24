import axios from 'axios'
import './products.css';
import { useQuery } from 'react-query';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { CartContext } from '../cart/CartContext.jsx';
export default function Products() {
    const { addToCartContext } = useContext(CartContext);
    const { getProductQuantity } = useContext(UserContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');
    console.log(page);
    const getAllProducts = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=4`);
        return data;
    }
    useEffect(() => {
        getAllProducts();
    }, [page]);
    const { data, isLoading } = useQuery('products', getAllProducts);
    if (isLoading) {
        return <h2>... loading</h2>
    }
    const addToCart = async (productId) => {
        const res = await addToCartContext(productId);
        getProductQuantity();
        return res;
    }

    return (
        <>
            <div className="all-products w-100 my-5">
                <div className="container">
                    <div className="row">
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
                    </div>
                    <nav aria-label="Page navigation example ">
                        <ul className="pagination d-flex justify-content-center mt-4">
                            <li className="page-item"><a className="page-link text-dark" href="#">Previous</a></li>
                            {Array.from({ length: data.total / data.page }).map((_, index) => (
                                <li key={index} className="page-item"><Link className="page-link text-dark" to={`?page=${index + 1}`}>{index + 1}</Link></li>
                            ))}
                            <li className="page-item "><a className="page-link text-dark"  href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
