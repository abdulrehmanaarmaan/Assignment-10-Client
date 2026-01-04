import React from 'react';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loader from './Loader';

const FeaturedMovie = ({ threeMostRatedMovies, loading }) => {

    return (
        <Swiper
            modules={[Pagination, Autoplay]}
            breakpoints={{
                640: { spaceBetween: 20 },
                768: { spaceBetween: 30 },
                1024: { spaceBetween: 40 }
            }}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            className="mySwiper">

            {loading ? <Loader></Loader> :
                threeMostRatedMovies.map(mostRatedMovie => <SwiperSlide aria-label={`Featured Movie: ${mostRatedMovie?.title}`}>
                    <div className='px-4'>

                        <img className='w-full max-w-xs md:max-w-md rounded-lg h-[200px] md:h-[400px] mx-auto mb-4 object-cover aspect-[2/3]' src={mostRatedMovie.posterUrl} alt={`${mostRatedMovie?.title} Poster`} />

                        <h1 className='font-bold text-xl md:text-2xl text-center truncate mb-8'>{mostRatedMovie.title}</h1>
                    </div>
                </SwiperSlide>)}
        </Swiper >
    );
};

export default FeaturedMovie;