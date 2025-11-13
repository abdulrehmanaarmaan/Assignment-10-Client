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

    const sortedMoviesByRating = allMovies.sort((a, b) => b.rating - a.rating);

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
                setUsers(res.data)
                stopLoading()
            })
            .catch(error => {
                console.log(error)
                stopLoading()
            })
    }, [axiosPublic])

    if (loading) return <Loader></Loader>;

    const genres = ['Sci-Fi', 'Action', 'Thriller', 'Drama', 'Crime', 'Adventure', 'Romance', 'Animation', 'Fantasy',
        'Biography', 'History'];

    return (
        <div className='space-y-50'>
            <section>
                <h1 className='font-bold text-[48px] md:text-8xl text-center mb-10 animate__animated animate__pulse animate__infinite'>Featured Movies</h1>

                <FeaturedMovie threeMostRatedMovies={threeMostRatedMovies}></FeaturedMovie>
            </section >

            <section>
                <h1 className='font-bold text-[48px] text-center mb-10 animate__animated animate__pulse animate__infinite'>Statistics</h1>

                <section className='flex md:justify-center justify-between items-center md:gap-[200px] gap-0 font-bold text-center px-4'>
                    <div>
                        <h1>Total Movies</h1>

                        <h1 className='text-[48px]'>{allMovies.length}</h1>
                    </div>

                    <div>
                        <h1>Total Users</h1>

                        <h1 className='text-[48px]'>{users.length}</h1>
                    </div>

                </section>

            </section>

            <section>
                <h1 className='font-bold text-[48px] text-center mb-10 animate__animated animate__pulse animate__infinite'>Top Rated Movies</h1>

                <section className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 max-w-[1320px] mx-auto px-4'>
                    {
                        fiveMostRatedMovies.map(movie => <Movie key={movie._id} movie={movie}></Movie>)
                    }
                </section>
            </section>

            <section>
                <h1 className='font-bold text-[48px] text-center mb-10 animate__animated animate__pulse animate__infinite'>Recently Added</h1>

                <section className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 max-w-[1320px] mx-auto px-4'>
                    {
                        lastSixMovies.map(movie => <Movie key={movie._id} movie={movie}></Movie>)
                    }
                </section>

            </section>

            <section>
                <h1 className='font-bold text-[48px] text-center mb-10 animate__animated animate__pulse animate__infinite'>Genre</h1>

                <section className='flex flex-wrap gap-10 text-left justify-center px-4'>
                    {genres.map(genre => <h1 className='font-bold text-[30px]'>{genre}</h1>)}
                </section>

            </section>

            <section className=''>
                <h1 className='text-[48px] text-center mb-10 animate__animated animate__pulse animate__infinite font-bold'>About Platform</h1>

                <div className='max-w-[1493px] mx-auto text-3xl space-y-10 font-medium px-4'>
                    <p className='leading-relaxed'><span className='font-bold text-red-600 platform'>MovieMaster Pro</span> is a next generation movie management and discovery platform built for true film lovers.
                        Whether you want to explore the latest hits, curate your personal collection, or track your WatchList - everything is just a click away.
                    </p>

                    <ul className='list-disc list-inside space-y-6 md:space-y-5'>
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