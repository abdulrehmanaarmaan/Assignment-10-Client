import React, { use } from 'react';
import star from '../assets/star.png'
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router';
import useLoader from '../hooks/useLoader';
import Loader from './Loader';

const AddedMovie = ({ setNewMovies, newMovies, addedMovie }) => {
    const { loading, startLoading, stopLoading } = useLoader();

    const { _id, posterUrl, title, releaseYear, rating, duration } = addedMovie;

    const { axiosPublic } = use(AuthContext);

    const handleDeleteMovie = () => {
        startLoading()
        axiosPublic.delete(`/movies/${_id}`)
            .then(res => {
                stopLoading()
                const remainingMovies = newMovies.filter(newMovie => newMovie._id !== _id);
                setNewMovies(remainingMovies)

                toast.success('Successfully deleted')
                console.log(res)
            })
            .catch(error => {
                stopLoading()
                toast.error(error.message)
                console.log(error)
            })
    }

    if (loading) return <Loader></Loader>

    return (
        <div className='max-w-[1440px] rounded-sm p-4 flex flex-col md:flex-row md:gap-0 gap-4 justify-between items-center bg-white mx-auto movie'>
            <aside className='flex flex-col md:flex-row items-center gap-4 max-w-full w-full md:max-w-fit md:w-fit'>
                <img className='max-w-full w-full md:max-w-20 md:w-20 max-h-[1%] md:max-h-20 md:h-20 rounded-lg' src={posterUrl} alt="" />
                <div className='space-y-4 md:text-left text-center md:max-w-fit md:w-fit w-full max-w-full'>
                    <h1 className='font-bold text-xl'>{title}</h1>
                    <div className='flex gap-0 md:gap-4 items-center font-bold md:justify-normal justify-between'>
                        <h1>{releaseYear}</h1>
                        <div className='flex items-center gap-1'>
                            <span className='max-w-4 max-h-4'>
                                <img className='w-full h-full' src={star} alt="" />
                            </span>
                            <h1 className='text-yellow-500'>{rating}</h1>
                        </div>
                        <h1>{duration} min</h1>
                    </div>
                </div>
            </aside>

            <aside className='flex md:flex-row flex-col items-center gap-4 font-bold md:max-w-fit md:w-fit max-w-full w-full'>
                <NavLink className='text-center text-white py-3 rounded-sm bg-blue-400 max-w-full w-full md:max-w-[100px] md:w-[100px] non-sensitive-btn' to={`/update-movie/${_id}`}>Edit</NavLink>

                <button onClick={() => document.getElementById('my_modal_5').showModal()} className='text-white py-3 rounded-sm bg-red-400 max-w-full w-full md:max-w-[100px] md:w-[100px] hover:cursor-pointer sensitive-btn'>Delete</button>
            </aside>

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <p className="py-4 text-xl">Are you sure that you want to delete this movie?</p>
                    <div className="modal-action">
                        <form method="dialog" className='space-x-4'>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Cancel</button>
                            <button onClick={handleDeleteMovie} className='btn'>Delete</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AddedMovie;