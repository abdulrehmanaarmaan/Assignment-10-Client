import React from 'react';
import { NavLink } from 'react-router';
import star from '../assets/star.png';

const Movie = ({ movie }) => {
    const { _id, posterUrl, title, rating, genre, releaseYear } = movie;

    return (
        <div className='p-4 rounded-lg max-w-full md:max-w-[464px] bg-white space-y-4 font-bold movie max-h-fit h-[600px]'>
            <img className='max-w-full w-full rounded-lg max-h-1/2' src={posterUrl} alt="" />

            <h1 className='text-xl'>{title}</h1>

            <div className='flex items-center gap-4'>
                <span className='max-w-5 max-h-5'>
                    <img className='w-full h-full' src={star} alt="" />
                </span>

                <h1 className='text-yellow-500'>{rating}</h1>
            </div>

            <h1>{genre}</h1>

            <h1>{releaseYear}</h1>

            <NavLink className='block text-white text-center max-w-full py-3 rounded-sm bg-blue-400 non-sensitive-btn' to={`/movie-details/${_id}`}>View Details</NavLink>
        </div >
    );
};

export default Movie;