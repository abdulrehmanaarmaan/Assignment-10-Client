import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
// import useLoader from '../hooks/useLoader';
import Loader from './Loader';

const MovieToWatch = ({ movies, setMovies, movieToWatch, selectedMovieId, setSelectedMovieId, startLoading, stopLoading }) => {
    // const [loading, setLoading] = useState(false);

    // const { loading, startLoading, stopLoading } = useLoader();

    const { _id, posterUrl, title, releaseYear, rating, duration } = movieToWatch;

    const { axiosPublic } = use(AuthContext);

    const handleRemoveMovie = () => {
        startLoading()

        if (!selectedMovieId) return;

        // setLoading(true)

        axiosPublic.delete(`/WatchList/${selectedMovieId}`)
            .then(res => {
                console.log(res)

                const remainingMovies = movies.filter(movie => movie._id !== selectedMovieId);

                setMovies(remainingMovies)

                setSelectedMovieId(null)

                // setLoading(false)
                stopLoading()

                toast.success('Successfully removed')
            })
            .catch(error => {
                console.log(error)

                // setLoading(false)
                stopLoading()

                toast.error(error.message)
            })
    }

    // if (loading) return <Loader></Loader>

    return (
        <tr className='w-full lg-w-auto form'>
            < td >
                <img
                    src={posterUrl}
                    alt="Movie Poster"
                    className="mask mask-squircle h-12 w-12" />
            </td >
            <td className='font-medium whitespace-nowrap'>{title}</td>
            <td>
                <button className="">{releaseYear}</button>
            </td>
            <td className=''>{rating}</td>
            <td>{duration} min</td>
            <td className='flex gap-3 justify-center items-center py-6 min-w-[150px]'>
                <button className="btn btn-sm btn-error text-white sensitive-btn" onClick={() => {
                    setSelectedMovieId(_id)

                    document.getElementById('my_modal_5').showModal()
                }}>Remove</button>
            </td>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id='my_modal_5' className="modal modal-bottom sm:modal-middle">
                <div className="modal-box modal-class">
                    <p className="py-4 text-left">Are you sure you want to remove this movie from your WatchList?</p>
                    <div className="modal-action">
                        <form method="dialog" className='flex gap-3'>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-error text-white sensitive-btn" onClick={handleRemoveMovie}>Remove</button>
                            <button className="btn btn-sm btn-outline">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </tr >
    );
};

export default MovieToWatch;