import React from 'react';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const FeaturedMovie = ({ threeMostRatedMovies }) => {

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            className="mySwiper">

            {
                threeMostRatedMovies.map(mostRatedMovie => <SwiperSlide>
                    <div className='px-4 max-h-fit'>
                        <img className='max-w-full w-full md:max-w-[400px] md:w-[400px] rounded-lg md:max-h-[400px] h-[400px] mx-auto mb-4 max-h-1/2' src={mostRatedMovie.posterUrl} alt="" />
                        <h1 className='font-bold text-xl text-center'>{mostRatedMovie.title}</h1>
                    </div>
                </SwiperSlide>)
            }
        </Swiper >
    );
};

export default FeaturedMovie;