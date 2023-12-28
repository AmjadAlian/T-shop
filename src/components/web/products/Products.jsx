import axios from 'axios'
import './products.css';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { CartContext } from '../cart/CartContext.jsx';
import { useFormik } from 'formik';
import Input from '../../pages/Input.jsx';
import Loading from '../../Loading/Loading.jsx';
export default function Products() {
    const { addToCartContext } = useContext(CartContext);
    const { getProductQuantity } = useContext(UserContext);
    const [data, setData] = useState();
    const [sort, setSort] = useState('');
    const [from, setFrom] = useState('5');
    const [to, setTo] = useState('300');
    const [name, setName] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    let [loading, setLoading] = useState(true);
    const getAllProducts = async () => {
        if (name != '') {
            setCurrentPage(1);
        }
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${currentPage}&limit=4&sort=${sort}&price[gte]=${from}&price[lte]=${to}&search=${name}`);
        setData(data);
        setPageNumber(Math.ceil(data.total / 4));
        setLoading(false);
    }
    const initialValues = {
        from: '5',
        to: '250',
    };
    const onSubmit = (e) => {
        setFrom(e.from);
        setTo(e.to);
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
    });
    const inputs = [
        {
            title: 'from',
            id: 'from',
            type: 'text',
            name: 'from',
            value: formik.values.from,
        },
        {
            title: 'to',
            id: "lowPrice",
            type: 'text',
            name: 'to',
            value: formik.values.to
        },
    ];
    const renderInput = inputs.map((ele, index) =>
        <Input type={ele.type} key={index} name={ele.name} id={ele.id} value={ele.value} placeholder={ele.name} onChange={formik.handleChange} errors={formik.errors} onBlur={formik.handleBlur} touched={formik.touched} />
    );
    const addToCart = async (productId) => {
        const res = await addToCartContext(productId);
        getProductQuantity();
        return res;
    }
    const handleSort = (e) => {
        setSort(e.target.value);
    }
    const handelData = (e) => {
        setName(e.target.value);
    }
    const handelSearch = (e) => {
        e.preventDefault();

    }
    const handelPage = (index) => {
        setCurrentPage(index);
    }
    useEffect(() => {
        getAllProducts();
    }, [currentPage, pageNumber, sort, name]);


    if (loading) {
        return (
            <>
                <Loading />
            </>
        );
    }

    return (
        <>
            <div className="all-products w-100 my-5">
                <aside>
                    <div className='products-sort ps-2'>
                        <nav>
                            <div className="search" >
                                <form class="d-flex" role="search" onSubmit={handelSearch}>
                                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handelData} />
                                    <button class="btn btn-outline-success" type="submit">Search</button>
                                </form>
                            </div>
                            <div className="form ">
                                <form onSubmit={formik.handleSubmit} className='d-flex'>
                                    {renderInput}
                                    <button type='submit' className="btn form-control w-25" >Go</button>
                                </form>
                                <select class="form-select" aria-label="Default select example" onChange={handleSort}>
                                    <option selected >Sort by</option>
                                    <option value="price">price low - heigh</option>
                                    <option value="-price">price heigh - low</option>
                                    <option value="name">name</option>
                                </select>
                            </div>
                        </nav>
                    </div>
                </aside>
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
                            {Array.from({ length: pageNumber }).map((_, index) => (
                                <li key={index} className="page-item"><button className="page-link text-dark" onClick={() => handelPage(index + 1)}>{index + 1}</button></li>
                            ))}
                            <li className="page-item "><button className="page-link text-dark" href="#" >Next</button></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
