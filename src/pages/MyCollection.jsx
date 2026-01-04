import React, { use, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import AddedMovie from '../components/AddedMovie';
import useLoader from '../hooks/useLoader';
import { AuthContext } from '../contexts/AuthContext';
import Loader from '../components/Loader';

const MyCollection = () => {
    const addedMovies = useLoaderData();

    const [newMovies, setNewMovies] = useState(addedMovies);

    const { loading, startLoading, stopLoading } = useLoader();

    const { axiosPublic, user } = use(AuthContext);

    const [selectedMovieId, setSelectedMovieId] = useState(null);

    useEffect(() => {
        startLoading()
        axiosPublic.get(`/movies?email=${user?.email}`)
            .then(res => {
                console.log(res)

                stopLoading()
            })
            .catch(error => {
                console.log(error)

                stopLoading()
            })
    }, [axiosPublic, user?.email])

    return (
        <div>
            <h1 className='text-3xl font-semibold text-gray-800 tracking-tight mb-6 text-center route-title'>My Collection</h1>

            {newMovies.length === 0 ? <p className='text-2xl font-bold mb-6 text-center text-gray-600 movie-data'>No movies added yet</p> :

                <div className="shadow-sm overflow-x-auto">
                    <table className="table text-center border-t border-gray-300 rounded-none table-border">
                        {/* head */}
                        <thead className='bg-gray-100 text-gray-600 movie-data headings-row'>
                            <tr>
                                <th>Movie Poster</th>
                                <th>Name</th>
                                <th>Release Year</th>
                                <th>Rating</th>
                                <th>Duration</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody className=''>
                            {loading ? <Loader></Loader> : newMovies.map(addedMovie => <AddedMovie setNewMovies={setNewMovies} newMovies={newMovies} addedMovie={addedMovie} key={addedMovie._id} selectedMovieId={selectedMovieId} setSelectedMovieId={setSelectedMovieId} startLoading={startLoading} stopLoading={stopLoading}></AddedMovie>
                            )}
                        </tbody>
                    </table>
                </div>}
        </div>
    )
};

export default MyCollection;