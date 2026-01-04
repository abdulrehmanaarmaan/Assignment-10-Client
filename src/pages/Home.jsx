import React, { use, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import Movie from '../components/Movie';
import { AuthContext } from '../contexts/AuthContext';
import FeaturedMovie from '../components/FeaturedMovie';
import 'animate.css';
import useLoader from '../hooks/useLoader';
import Loader from '../components/Loader';

const Home = () => {

    const { loading, startLoading, stopLoading } = useLoader();

    const { axiosPublic } = use(AuthContext);

    const allMovies = useLoaderData();

    const sortedMoviesByRating = [...allMovies].sort((a, b) => b.rating - a.rating);

    const fiveMostRatedMovies = sortedMoviesByRating.slice(0, 5);
    console.log(fiveMostRatedMovies)

    const threeMostRatedMovies = sortedMoviesByRating.slice(0, 3)
    console.log(threeMostRatedMovies)

    const reversedMovies = [...allMovies].reverse();
    console.log(reversedMovies)

    const lastSixMovies = reversedMovies.slice(0, 6);
    console.log(lastSixMovies)
    console.log(allMovies)

    const [users, setUsers] = useState([]);

    useEffect(() => {
        startLoading()
        axiosPublic.get('users')
            .then(res => {
                setUsers(res?.data)
                stopLoading()
            })
            .catch(error => {
                console.log(error)
                stopLoading()
            })
    }, [axiosPublic])

    // if (loading) return <Loader></Loader>;

    const genres = ['Sci-Fi', 'Action', 'Thriller', 'Drama', 'Crime', 'Adventure', 'Romance', 'Animation', 'Fantasy',
        'Biography', 'History'];

    return (
        <div className='space-y-24 px-4'>
            <section>
                <h1 className='font-bold text-4xl md:text-6xl text-center mb-10 animate__animated animate__fadeInUp'>Featured Movies</h1>

                <FeaturedMovie threeMostRatedMovies={threeMostRatedMovies} loading={loading}></FeaturedMovie>
            </section >

            <section className='mt-32'>
                <h1 className='text-3xl font-semibold text-gray-800 tracking-tight mb-4 text-center route-title'>Statistics</h1>

                <section className='flex md:justify-center justify-between items-center md:gap-[200px] gap-4 font-bold text-center px-4 md:flex-row flex-col'>
                    <div className='bg-base-100 rounded-xl p-6 border border-gray-300 form'>
                        <h1 className='text-gray-500 web-data'>Total Movies</h1>

                        {loading ? <Loader></Loader> : <h1 className='text-2xl font-bold'>{allMovies.length}</h1>}
                    </div>

                    <div className='bg-base-100 rounded-xl p-6 border border-gray-300 form'>
                        <h1 className='text-gray-500 web-data'>Total Users</h1>

                        {loading ? <Loader></Loader> : <h1 className='text-2xl font-bold'>{users.length}</h1>}
                    </div>

                </section >

            </section >

            <section>
                <h1 className='text-3xl font-semibold text-gray-800 tracking-tight mb-4 text-center route-title'>Top Rated Movies</h1>

                <section className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 max-w-[1320px] mx-auto px-4'>
                    {
                        loading ? <Loader></Loader> : fiveMostRatedMovies.map(movie => <Movie key={movie._id} movie={movie}></Movie>)
                    }
                </section>
            </section>

            <section>
                <h1 className='text-3xl font-semibold text-gray-800 tracking-tight mb-4 text-center route-title'>Recently Added</h1>

                <section className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 max-w-[1320px] mx-auto px-4'>
                    {
                        loading ? <Loader></Loader> : lastSixMovies.map(movie => <Movie key={movie._id} movie={movie}></Movie>)
                    }
                </section>

            </section>

            <section>
                <h1 className='text-3xl font-semibold text-gray-800 tracking-tight mb-4 text-center route-title'>Genre</h1>

                <section className='flex flex-wrap gap-10 text-left justify-center px-4'>
                    {loading ? <Loader></Loader> : genres.map(genre => <span className='font-medium text-sm px-4 py-2 rounded-full bg-gray-100 text-gray-700 .web-app genre-bg'>{genre}</span>)}
                </section>

            </section>

            <section className=''>
                <h1 className='text-3xl font-semibold text-gray-800 tracking-tight mb-4 text-center route-title'>About Platform</h1>

                <div className='max-w-5xl mx-auto text-lg space-y-6 leading-relaxed'>
                    <p className='leading-relaxed'><span className='font-bold text-red-600 platform'>MovieMaster Pro</span> is a next generation movie management and discovery platform built for true film lovers.
                        Whether you want to explore the latest hits, curate your personal collection, or track your WatchList - everything is just a click away.
                    </p>

                    <ul className='list-disc list-outside pl-5 space-y-3 md:space-y-4'>
                        <li className='leading-relaxed'><span className='font-bold text-green-700 feature'>Add & Manage:</span> Add your favorite movies and edit details easily.</li>
                        <li className='leading-relaxed'><span className='font-bold text-green-700 feature'>Rating Filter:</span> Filter by ratings using dynamic range filters with real-time
                            updates.
                        </li>
                        <li className='leading-relaxed'>
                            <span className='font-bold text-green-700 feature'>Collections:</span> Keep your personalized movie lists organized by genre or category.
                        </li>
                        <li className='leading-relaxed'>
                            <span className='font-bold text-green-700 feature'>Theme Toggle:</span> Switch seamlessly between light and dark themes for comfort.
                        </li>
                        <li className='leading-relaxed'>
                            <span className='font-bold text-green-700 feature'>Smooth UX:</span> Enjoy lightning-fast performance with real-time data fetching and pagination.
                        </li>
                    </ul>

                    <p className='leading-relaxed'>With <span className='font-bold text-red-600 platform'>MovieMaster Pro</span>, experience movies like never before - your personal cinema dashboard powered by modern technology.</p>
                </div>
            </section>
        </div >
    );
};

export default Home;