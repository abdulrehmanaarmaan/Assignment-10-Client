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

    // useEffect(() => {
    // startLoading()
    // axiosPublic.get(`/movies?id=${_id}`)
    // .then(res => {
    // console.log(res)
    // stopLoading()
    // })
    // .catch(error => {
    // console.log(error)
    // stopLoading()
    // })
    // }, [axiosPublic, _id])

    const handleDeleteMovie = () => {
        startLoading()
        axiosPublic.delete(`/movies/${_id}`)
            .then(res => {
                toast.success('Successfully deleted')
                navigate('/all-movies')
                stopLoading()
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
                toast.success('Successfully added to your WatchList')
                navigate('/dashboard/My-WatchList')
                stopLoading()
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
            <h1 className='text-3xl font-semibold text-gray-800 tracking-tight mb-6 text-center route-title'>Details</h1>

            <section className='flex flex-col lg:flex-row max-w-5xl mx-auto font-bold lg:gap-10 md:gap-8 gap-6 px-4 items-center'>
                <img className='w-full rounded-lg h-[200px] md:h-[400px] max-w-xs md:max-w-md' src={posterUrl} alt={`Poster of ${title}`} loading='lazy' />

                <section className='space-y-[30px] text-center lg:text-left'>
                    <h1 className='text-2xl'>{title}</h1>

                    <div className='flex flex-wrap justify-center lg:justify-start items-center gap-4 md:text-xl text-lg font-medium text-gray-700 movie-details'>
                        <h1>{releaseYear}</h1>

                        <h1>{duration} min</h1>

                        <h1>{genre}</h1>

                        <h1>{language}</h1>

                        <h1>{country}</h1>
                    </div>

                    {director.includes(',') ? <p className='text-lg text-gray-700 movie-details'>Directors: <span className='text-blue-500 detail'>{director}</span></p> : <p className='text-lg text-gray-700 movie-details'>Director: <span className='text-blue-500 detail'>{director}</span></p>}

                    <p className='text-lg text-gray-700 movie-details'>Cast: <span className='text-blue-500 detail'>{cast}</span></p>

                    <div className='flex items-center gap-2 text-yellow-500 justify-center lg:justify-start'>
                        <span aria-label='rating'>
                            <img className='w-5 h-5' src={star} alt="Star icon" />
                        </span>

                        <span className='text-lg font-semibold'>{rating}</span>
                    </div>

                    <p className='text-base md:text-lg leading-relaxed max-w-3xl'>{plotSummary}</p>

                    <div className='flex flex-col md:flex-row gap-4 justify-center lg:justify-start mt-6'>
                        <NavLink className='text-center form-btn shadow-none py-3 md:w-[120px] w-full hover:cursor-pointer font-normal' to={`/dashboard/update-movie/${_id}`}>Edit</NavLink>

                        <button onClick={() => document.getElementById('my_modal_5').showModal()} className='text-white rounded-md bg-red-500 hover:bg-red-600 md:w-[120px] hover:cursor-pointer w-full py-3 sensitive-btn font-normal'>Delete</button>

                        <button onClick={handleAddToWatchList} className='shadow-none py-3 form-btn md:w-[220px] w-full hover:cursor-pointer font-normal'>Add To WatchList</button>
                    </div>
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box modal-class">
                            <p className="py-4">Are you sure that you want to delete this movie?</p>
                            <div className="modal-action">
                                <form method="dialog" className='space-x-4'>
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Cancel</button>
                                    <button onClick={handleDeleteMovie} className='btn sensitive-btn'>Delete</button>
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