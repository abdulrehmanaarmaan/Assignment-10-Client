import React, { use, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import MovieToWatch from '../components/MovieToWatch';
import useLoader from '../hooks/useLoader';
import { AuthContext } from '../contexts/AuthContext';
import Loader from '../components/Loader';

const MyWatchList = () => {
    const moviesToWatch = useLoaderData();

    const [movies, setMovies] = useState(moviesToWatch);

    const { axiosPublic } = use(AuthContext);

    const { loading, startLoading, stopLoading } = useLoader();

    const [selectedMovieId, setSelectedMovieId] = useState(null);

    useEffect(() => {
        startLoading()
        axiosPublic.get('/movies/WatchList')
            .then(res => {
                stopLoading()
                console.log(res)
            })
            .catch(error => {
                stopLoading()
                console.log(error)
            })
    }, [axiosPublic])

    return (
        <div>
            <h1 className='text-3xl font-semibold text-gray-800 tracking-tight mb-6 text-center route-title'>My WatchList</h1>

            {movies.length === 0 ? <p className='text-2xl font-bold mb-6 text-center text-gray-600 movie-data'>No movies added to WatchList yet</p> :

                <div className="shadow-sm overflow-x-auto w-full">
                    <table className="table text-center border-t border-gray-300 rounded-none w-full table-border">
                        {/* head */}
                        <thead className='bg-gray-100 text-gray-600 movie-data headings-row'>
                            <tr>
                                <th>Movie Poster</th>
                                <th>Name</th>
                                <th>Release Year</th>
                                <th>Rating</th>
                                <th>Duration</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='w-full'>
                            {loading ? <Loader></Loader> : movies.map(movieToWatch =>

                                <MovieToWatch movies={movies} setMovies={setMovies} movieToWatch={movieToWatch} key={movieToWatch._id} selectedMovieId={selectedMovieId} setSelectedMovieId={setSelectedMovieId} startLoading={startLoading} stopLoading={stopLoading}></MovieToWatch>
                            )}
                        </tbody>
                    </table>
                </div>}
        </div>
    );
};

export default MyWatchList;