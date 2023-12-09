import axios from 'axios'
import './categories.css'
import { useQuery } from 'react-query'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../cart/CartContext.jsx';


export default function Categories() {
  const getCategories = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=7`);
    return data;
  }
  const { data, isLoading } = useQuery('web_categories', getCategories);
  if (isLoading) {
    return (
      <>
        <div className="loading vh-100 d-flex justify-content-center align-items-center bg-black z-2" >
          <h2 className='z-3 text-white'>loading...</h2>
        </div>
      </>
    )
  }
  const x = useContext(CartContext);
  console.log(x);
  return (
    <>
      <div className="container">

        <div className="swiper-custom-pagination"></div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          loop={true}
          autoplay={
            {
              delay: 1000
            }
          }
          pagination={{
            clickable: true,
            el: '.swiper-custom-pagination'
          }}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {data?.categories.length? data?.categories.map((category) =>
            <SwiperSlide key={category._id}>
              <Link to = {`/products/category/${category._id}`}>
              <div className="category">
                <img src={category.image.secure_url} />
              </div>
              </Link>
            </SwiperSlide>
            
          ) : '<h2> no category found</h2>'}
          
        </Swiper>
        
      </div>
    </>
  )
}
