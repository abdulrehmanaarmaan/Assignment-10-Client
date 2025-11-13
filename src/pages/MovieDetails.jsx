import React, { use } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import star from '../assets/star.png';
import { NavLink } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import useLoader from '../hooks/useLoader';
import Loader from '../components/Loader';

const MovieDetails = () => {
    const { loading, startLoading, stopLoading } = useLoader();

    const movieDetails = useLoaderData();

    const { _id, posterUrl, title, releaseYear, director, cast, duration, genre, rating, plotSummary, language, country } = movieDetails;

    const { axiosPublic, user } = use(AuthContext);

    const navigate = useNavigate();

    const handleDeleteMovie = () => {
        startLoading()
        axiosPublic.delete(`/movies/${_id}`)
            .then(res => {
                stopLoading()
                toast.success('Successfully deleted')
                navigate('/all-movies')
                console.log(res)
            })
            .catch(error => {
                stopLoading()
                toast.error(error.message)
                console.log(error)
            })
    }

    const handleAddToWatchList = () => {

        startLoading()

        const movieToAdd = {
            title: title,
            genre: genre,
            releaseYear: releaseYear,
            director: director,
            cast: cast,
            rating: rating,
            duration: duration,
            plotSummary: plotSummary,
            posterUrl: posterUrl,
            language: language,
            country: country,
            addedBy: user?.email
        }

        axiosPublic.post('/WatchList', movieToAdd)
            .then(res => {
                stopLoading()
                toast.success('Successfully added to your WatchList')
                navigate('/My-WatchList')
                console.log(res)
            })
            .catch(error => {
                stopLoading()
                toast.error('Movie already exists in your WatchList')
                console.log(error)
            })
    }

    if (loading) return <Loader></Loader>

    return (
        <div>
            <h1 className='font-bold text-[48px] mb-10 text-center'>Details</h1>

            <section className='flex flex-col lg:flex-row items-center max-w-[1493px] mx-auto font-bold gap-10 px-4'>
                <img className='max-w-full w-full md:max-w-[600px] md:w-[600px] md:max-h-[600px] rounded-lg' src={posterUrl} alt="" />

                <section className='space-y-[30px] text-center lg:text-left'>
                    <h1 className='text-[32px]'>{title}</h1>

                    <div className='flex flex-col lg:flex-row items-center gap-10 text-2xl'>
                        <h1>{releaseYear}</h1>

                        <h1>{duration} min</h1>

                        <h1>{genre}</h1>

                        <h1>{language}</h1>

                        <h1>{country}</h1>
                    </div>

                    {director.includes(',') ? <h1 className='text-2xl'>Directors: <span className='text-blue-400 detail'>{director}</span></h1> : <h1 className='text-2xl'>Director: <span className='text-blue-400 detail'>{director}</span></h1>}

                    <h1 className='text-2xl'>Cast: <span className='text-blue-400 detail'>{cast}</span></h1>

                    <div className='flex items-center gap-4 text-yellow-500 text-xl justify-center lg:justify-normal'>
                        <span>
                            <img className='max-w-5' src={star} alt="" />
                        </span>

                        <h1>{rating}</h1>
                    </div>

                    <p className='text-lg'>{plotSummary}</p>

                    <div className='text-xl flex flex-col md:flex-row gap-10 justify-center lg:justify-normal mt-20'>
                        <NavLink className='text-center text-white py-3 rounded-sm bg-blue-400 lg:max-w-[100px] lg:w-[100px] non-sensitive-btn max-w-full w-full ' to={`/update-movie/${_id}`}>Edit</NavLink>

                        <button onClick={() => document.getElementById('my_modal_5').showModal()} className='text-white py-3 rounded-sm bg-red-400 lg:max-w-[100px] lg:w-[100px] hover:cursor-pointer sensitive-btn max-w-full w-full'>Delete</button>

                        <button onClick={handleAddToWatchList} className='text-white py-3 rounded-sm bg-blue-400 lg:max-w-[202px] lg:w-[202px] max-w-full w-full hover:cursor-pointer non-sensitive-btn'>Add To WatchList</button>
                    </div>
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <p className="py-4">Are you sure that you want to delete this movie?</p>
                            <div className="modal-action">
                                <form method="dialog" className='space-x-4'>
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Cancel</button>
                                    <button onClick={handleDeleteMovie} className='btn'>Delete</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </section>
            </section>
        </div>
    );
};

export default MovieDetails;