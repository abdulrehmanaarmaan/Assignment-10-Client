import React from 'react';
import { NavLink } from 'react-router';
import star from '../assets/star.png';

const Movie = ({ movie }) => {
    const { _id, posterUrl, title, rating, genre, releaseYear } = movie;

    return (
        <div className='p-4 rounded-lg bg-white space-y-3 border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:bg-gray-300 h-fit hover:cursor-pointer movie-card'>
            <img className='w-full rounded-md aspect-[2/3] object-cover lg:h-[300px] md:h-[260px] h-[200px] border border-gray-200 grid-img' src={posterUrl} alt={title} />

            <h1 className='text-lg font-semibold text-gray-900 exceptional-title'>{title}</h1>

            <div className='flex items-center gap-2'>
                <img className='w-4 h-4' src={star} alt="rating" />

                <span className='text-sm font-medium text-yellow-500'>{rating}</span>
            </div>

            <div className='text-sm text-gray-600 line-clamp-1 movie-data'>
                <span>{genre}</span>

                <span className='mx-2'>.</span>

                <span>{releaseYear}</span>
            </div>

            <NavLink className='block text-white text-center w-full py-2.5 rounded-md bg-teal-600 hover:bg-teal-700 form-btn transition' to={`/movie-details/${_id}`}>View Details</NavLink>
        </div >
    );
};

export default Movie;