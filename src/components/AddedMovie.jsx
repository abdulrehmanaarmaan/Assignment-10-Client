import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router';
// import useLoader from '../hooks/useLoader';
import Loader from './Loader';

const AddedMovie = ({ setNewMovies, newMovies, addedMovie, selectedMovieId, setSelectedMovieId, startLoading, stopLoading }) => {

    const { _id, posterUrl, title, releaseYear, rating, duration } = addedMovie;

    const { axiosPublic } = use(AuthContext);

    const handleDeleteMovie = () => {

        if (!selectedMovieId) return;

        startLoading()
        axiosPublic.delete(`/movies/${selectedMovieId}`)
            .then(res => {
                console.log(res)

                const remainingMovies = newMovies.filter(newMovie => newMovie?._id !== selectedMovieId);
                setNewMovies(remainingMovies)

                setSelectedMovieId(null)

                stopLoading()

                toast.success('Successfully deleted')
            })
            .catch(error => {
                console.log(error)

                stopLoading()

                toast.error(error.message)
            })
    }

    // if (loading) return <Loader></Loader>

    return (
        <tr className='form'>
            <td>
                <img
                    src={posterUrl}
                    alt="Product Image"
                    className="mask mask-squircle h-12 w-12"
                    referrerPolicy='no-referrer' />
            </td>
            <td className='font-medium'>{title}</td>
            <td>
                <button>{releaseYear}</button>
            </td>
            <td>
                <button className="">{rating}</button>
            </td>
            <td className=''>{duration} min</td>
            <td className='flex gap-3 justify-center items-center py-6'>
                <NavLink className="btn btn-sm btn-outline btn-info" to={`/dashboard/update-movie/${_id}`}>Edit</NavLink>
                <button className="btn btn-sm btn-error text-white sensitive-btn" onClick={() => {
                    setSelectedMovieId(_id)

                    document.getElementById("my_modal_5").showModal()
                }}>Delete</button>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box modal-class">
                        <p className="py-4 text-left">Are you sure you want to delete this movie?</p>
                        <div className="modal-action">
                            <form method="dialog" className='flex gap-3'>
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-error text-white sensitive-btn" onClick={handleDeleteMovie}>Delete</button>
                                <button className="btn btn-sm btn-outline">Cancel</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </td>
        </tr>
    );
};

export default AddedMovie;