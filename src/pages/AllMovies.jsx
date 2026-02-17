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

    const [filteredMovies, setFilteredMovies] = useState(allMovies);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    const genres = [
        'Sci-Fi', 'Action', 'Thriller', 'Drama', 'Crime',
        'Adventure', 'Romance', 'Animation', 'Fantasy',
        'Biography', 'History'
    ];

    // ⭐ Rating presets for horizontal scroll
    const ratingRanges = [
        { label: '8+ Rating', min: 8, max: 10 },
        { label: '7+ Rating', min: 7, max: 10 },
        { label: '6+ Rating', min: 6, max: 10 },
        { label: '5+ Rating', min: 5, max: 10 },
        { label: 'Below 5', min: 0, max: 4.9 }
    ];

    // ================= GENRE FILTER =================
    const handleMoviesByGenres = event => {
        startLoading();

        const genre = event.target.value;
        let updatedGenres;

        if (event.target.checked) {
            updatedGenres = [...selectedGenres, genre];
        } else {
            updatedGenres = selectedGenres.filter(g => g !== genre);
        }

        setSelectedGenres(updatedGenres);

        if (updatedGenres.length === 0) {
            setFilteredMovies(allMovies);
            stopLoading();
            toast.success('Filter updated');
            return;
        }

        const genreQuery = updatedGenres.join(',');

        axiosPublic.get(`/movies?genres=${genreQuery}`)
            .then(res => {
                setFilteredMovies(res?.data);
                stopLoading();
                toast.success('Filter updated');
            })
            .catch(error => {
                stopLoading();
                toast.error(error?.message);
            });
    };

    // ================= RATING FILTER (HORIZONTAL SCROLL) =================
    const handleRatingFilter = (min, max) => {
        startLoading();

        axiosPublic.get(`/movies?minRating=${min}&&maxRating=${max}`)
            .then(res => {
                setFilteredMovies(res?.data);
                stopLoading();
                toast.success('Filter updated');
            })
            .catch(error => {
                stopLoading();
                toast.error(error?.message);
            });
    };

    // ================= RESET =================
    const resetAllMovies = () => {
        startLoading();

        if (filteredMovies === allMovies) {
            stopLoading();
            toast('Already reset');
            return;
        }

        setFilteredMovies(allMovies);
        setSelectedGenres([]);
        stopLoading();
        toast.success('All filters cleared');
    };

    return (
        <div className='max-w-7xl mx-auto px-4'>

            {/* Title */}
            <h1 className='route-title text-3xl font-semibold text-gray-800 tracking-tight text-center mb-6'>
                All Movies
            </h1>

            {/* Mobile filter toggle */}
            <div className='lg:hidden mb-6 flex justify-center'>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className='btn btn-neutral form-btn'
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            <div className='flex flex-col lg:flex-row gap-10'>

                {/* ================= SIDEBAR ================= */}
                <aside className={`
                    lg:w-1/4
                    ${showFilters ? 'block mb-8 lg:mb-0' : 'hidden'}
                    lg:block
                `}>

                    <div className='lg:sticky lg:top-24'>
                        <h2 className='text-2xl font-semibold mb-4 text-center lg:text-left'>
                            Filter by Genre
                        </h2>

                        <div className='space-y-2'>
                            {genres.map(genre => (
                                <label
                                    key={genre}
                                    className='flex items-center justify-between bg-base-200 hover:bg-base-300 rounded-lg px-4 py-2 cursor-pointer transition form'
                                >
                                    <span className='font-medium'>{genre}</span>

                                    <input
                                        type='checkbox'
                                        value={genre}
                                        onChange={handleMoviesByGenres}
                                        checked={selectedGenres.includes(genre)}
                                        className='checkbox checkbox-sm'
                                    />
                                </label>
                            ))}
                        </div>

                        {/* Reset button */}
                        <button
                            onClick={resetAllMovies}
                            className='btn w-full mt-6 secondary-btn btn-neutral rounded-md border border-teal-600 shadow-none bg-transparent hover:bg-teal-50 text-teal-600 hover:text-teal-700 secondary-btn'
                        >
                            Reset All Filters
                        </button>
                    </div>
                </aside>

                {/* ================= RIGHT CONTENT ================= */}
                <main className='lg:w-3/4'>

                    {/* ⭐ Horizontal Rating Filter */}
                    <div className='mb-10'>
                        <h2 className='text-2xl font-semibold mb-4 text-center lg:text-left'>
                            Filter by Rating
                        </h2>

                        <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center lg:justify-start'>
                            {ratingRanges.map((rating, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleRatingFilter(rating.min, rating.max)}
                                    className='btn btn-sm whitespace-nowrap transition secondary-btn btn-neutral rounded-md border border-teal-600 shadow-none bg-transparent hover:bg-teal-50 text-teal-600 hover:text-teal-700 secondary-btn'
                                >
                                    {rating.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Movies */}
                    {loading ? (
                        <Loader />
                    ) : filteredMovies.length > 0 ? (
                        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {filteredMovies.map(movie => (
                                <Movie movie={movie} key={movie._id} />
                            ))}
                        </section>
                    ) : allMovies.length === 0 ? (
                        <p className='text-lg text-center font-semibold opacity-70'>
                            No movies added yet
                        </p>
                    ) : (
                        <p className='text-lg text-center font-semibold opacity-70'>
                            No movies match your filters
                        </p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AllMovies;