import axios from 'axios'
import './products.css';
import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';
export default function Products() {
    const getAllProducts = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=8`);
        return data;
    }
    const { data, isLoading } = useQuery('products', getAllProducts);
    if (isLoading) {
        return <h2>... loading</h2>
    }
    return (
        <>
            <div className="all-products w-100 my-5">
                <div className="container">
                    <div className="row">
                        <Outlet />
                    </div>
                    <nav aria-label="Page navigation example ">
                        <ul className="pagination d-flex justify-content-center mt-4">
                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                            {Array.from({ length: data.total / data.page }).map((_, index) => (
                                <li key={index} className="page-item"><Link className="page-link" to={`?page=${index + 1}`}>{index + 1}</Link></li>
                            ))}
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
