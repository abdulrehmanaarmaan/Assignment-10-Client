import React, { use, useState } from 'react';
import Movie from '../components/Movie';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import useLoader from '../hooks/useLoader';
import Loader from '../components/Loader';
import { useLoaderData } from 'react-router';

const AllMovies = () => {
    const { loading, startLoading, stopLoading } = useLoader();

    const { axiosPublic } = use(AuthContext);

    const allMovies = useLoaderData();

    // useEffect(() => {
    // startLoading()
    // axiosPublic.get('/movies')
    // .then(res => {
    // stopLoading()
    // console.log(res)
    // })
    // .catch(error => {
    // console.log(error)
    // })
    // }, [axiosPublic])

    const [filteredMovies, setFilteredMovies] = useState(allMovies);

    const [selectedGenres, setSelectedGenres] = useState([]);

    const genres = ['Sci-Fi', 'Action', 'Thriller', 'Drama', 'Crime', 'Adventure', 'Romance', 'Animation', 'Fantasy', 'Biography', 'History'];

    const handleMoviesByGenres = event => {
        startLoading()

        const genre = event.target.value;

        let updatedGenres;

        if (event.target.checked) {
            updatedGenres = [...selectedGenres, genre];

            stopLoading()

            toast.success('Successfully filtered')
        }

        else {
            updatedGenres = selectedGenres.filter(g => g !== genre);

            stopLoading()

            toast.success('Successfully filtered')
        }

        setSelectedGenres(updatedGenres)

        if (updatedGenres.length === 0) {
            setFilteredMovies(allMovies);
            return;
        }

        const genreQuery = updatedGenres.join(',');

        axiosPublic.get(`/movies?genres=${genreQuery}`)
            .then(res => {
                console.log(res)

                stopLoading()

                setFilteredMovies(res?.data)
            })
            .catch(error => {
                console.log(error)

                stopLoading()

                toast.error(error?.message)
            })
    }

    const handleMoviesByRatings = event => {
        startLoading()

        event.preventDefault();

        const minRating = event.target.minRating.value;
        const maxRating = event.target.maxRating.value;

        axiosPublic.get(`/movies?minRating=${minRating}&&maxRating=${maxRating}`)
            .then(res => {
                console.log(res?.data)
                setFilteredMovies(res?.data)

                event.target.reset()

                stopLoading()
                toast.success('Successfully filtered')
            })
            .catch(error => {
                console.log(error)

                stopLoading()

                toast.error(error?.message)
            })
    }

    const resetAllMovies = () => {
        startLoading()
        if (filteredMovies === allMovies) {
            stopLoading()
            toast.error('Already reset')
        }

        else {
            setFilteredMovies(allMovies)
            setSelectedGenres([])
            stopLoading()
            toast.success('Successfully reset')
        }
    }

    return (
        <div>
            <h1 className='text-4xl font-bold text-gray-900 tracking-tight text-center mb-12 exceptional-title'>All Movies</h1>

            <div className=''>
                <h1 className='text-3xl font-semibold text-gray-800 tracking-tight text-center mb-6 route-title'>Filter by Genre</h1>
                <div className='grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 items-center mx-auto w-fit justify-center gap-10 px-4 text-center'>
                    {genres.map(genre => <div key={genre} className='flex items-center gap-2 text-center'>
                        <label className='font-semibold'>{genre}</label>
                        <input className='cursor-pointer' onChange={handleMoviesByGenres} type='checkbox' value={genre} checked={selectedGenres.includes(genre)}></input>
                    </div>)}
                </div>
            </div>

            <div className='px-4 my-24'>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 m-auto form">
                    <div className="card-body gap-0">
                        <h1 className='text-3xl font-semibold text-gray-800 tracking-tight text-center mb-4 route-title'>Filter by Ratings</h1>
                        <form onSubmit={handleMoviesByRatings}>
                            <fieldset className="fieldset gap-0">
                                <div>
                                    <label className="label mb-1">Minimum Rating</label>
                                    <input type="number" step='0.1' min='0' max='10' className="input w-full mb-4" placeholder="Minimum Rating"
                                        name='minRating' required />
                                </div>
                                <div>
                                    <label className="label mb-1">Maximum Rating</label>
                                    <input type="number" step='0.1' min='0' className='input w-full' placeholder="Maximum Rating" name='maxRating' required />
                                </div>
                                <button className="btn btn-neutral mt-6 form-btn">Filter</button>
                            </fieldset>
                        </form>
                        <button onClick={resetAllMovies} className="btn btn-neutral rounded-md border border-teal-600 shadow-none mt-3 bg-transparent hover:bg-teal-50 text-teal-600 hover:text-teal-700 secondary-btn">Reset All Movies</button>
                    </div>
                </div>
            </div>

            {filteredMovies.length > 0 && <section className='gap-6 max-w-[1320px] mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-4'>
                {
                    loading ? <Loader></Loader> : filteredMovies.map(movie => <Movie movie={movie} key={movie._id}></Movie>)
                }
            </section> || allMovies.length === 0 && <p className='text-2xl font-bold mb-6 text-center text-gray-600 movie-data'>No movies added yet</p> || <p className='text-2xl font-bold mb-6 text-center text-gray-600 movie-data'>No movies match your filters</p>}
        </div >
    );
};


export default AllMovies;