import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import MovieToWatch from '../components/MovieToWatch';

const MyWatchList = () => {
    const moviesToWatch = useLoaderData();

    const [movies, setMovies] = useState(moviesToWatch);

    return (
        <div>
            <h1 className='font-bold text-[48px] mb-10 text-center'>My WatchList</h1>

            <section className='space-y-6 md:space-y-4 px-4'>
                {
                    movies.map(movieToWatch => <MovieToWatch movies={movies} setMovies={setMovies} movieToWatch={movieToWatch} key={movieToWatch._id}></MovieToWatch>)
                }
            </section>
        </div>
    );
};

export default MyWatchList;