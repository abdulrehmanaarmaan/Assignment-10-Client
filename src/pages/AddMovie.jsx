import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import useLoader from '../hooks/useLoader';
import Loader from '../components/Loader';

const AddMovie = () => {
    const { loading, startLoading, stopLoading } = useLoader();

    const { user, axiosPublic } = use(AuthContext);

    const navigate = useNavigate();

    const handleAddMovie = event => {
        startLoading()
        event.preventDefault()

        const title = event.target.title.value;
        const genre = event.target.genre.value;
        const releaseYear = event.target.release_year.value;
        const director = event.target.director.value;
        const cast = event.target.cast.value;
        const rating = event.target.rating.value;
        const duration = event.target.duration.value;
        const plotSummary = event.target.plot_summary.value;
        const posterUrl = event.target.poster_url.value;
        const language = event.target.language.value;
        const country = event.target.country.value;
        const addedBy = event.target.added_by.value;

        const typeReleaseYear = Number(releaseYear);
        const typeRating = Number(rating);
        const typeDuration = Number(duration);

        const newMovie = {
            title: title,
            genre: genre,
            releaseYear: typeReleaseYear,
            director: director,
            cast: cast,
            rating: typeRating,
            duration: typeDuration,
            plotSummary: plotSummary,
            posterUrl: posterUrl,
            language: language,
            country: country,
            addedBy: addedBy
        }

        axiosPublic.post(`/movies?email=${user?.email}`, newMovie)
            .then(res => {
                toast.success('Successfully added')
                // event.target.reset()
                navigate(`/my-collection/${user?.email}`)
                stopLoading()
                console.log(res)
            })
            .catch(error => {
                stopLoading()
                toast.error('Movie already exists')
                console.log(error)
            })

    }

    if (loading) return <Loader></Loader>

    return (
        <div className='px-4'>
            <div className="card bg-base-100 max-w-sm md:w-fit md:max-w-fit shrink-0 shadow-2xl m-auto form">
                <div className="card-body">
                    <h1 className='text-center text-5xl font-bold mb-4'>Add A Movie</h1>
                    <form onSubmit={handleAddMovie}>
                        <fieldset className="fieldset">
                            <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className="label">Title</label>
                                    <input type="text" className="input md:md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Title" name='title' required />
                                </div>
                                <div>
                                    <label className="label">Genre</label>
                                    <input type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Genre" name='genre' required />
                                </div>
                                <div>
                                    <label className="label">Release Year</label>
                                    <input type="text" pattern='\d+' title='Type an integer only.' className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Release Year" name='release_year' required />
                                </div>
                                <div>
                                    <label className="label">Director</label>
                                    <input type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Director" name='director'
                                        required />
                                </div>
                                <div>
                                    <label className="label">Cast</label>
                                    <input type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Cast" name='cast'
                                        required />
                                </div>
                                <div>
                                    <label className="label">Rating</label>
                                    <input type="text" pattern='^\d+\.\d{1,2}$' title='Type a decimal number only.' className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Rating" name='rating'
                                        required />
                                </div>
                                <div>
                                    <label className="label">Duration</label>
                                    <input type="text" pattern='\d+(\.\d{1,2})?' title='Type a numerical value only.' className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Duration" name='duration'
                                        required />
                                </div>
                                <div>
                                    <label className="label">Plot Summary</label>
                                    <input type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Plot Summary" name='plot_summary'
                                        required />
                                </div>
                                <div>
                                    <label className="label">Poster Url</label>
                                    <input type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Poster Url" name='poster_url'
                                        required />
                                </div>
                                <div>
                                    <label className="label">Language</label>
                                    <input type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Language" name='language'
                                        required />
                                </div>
                                <div>
                                    <label className="label">Country</label>
                                    <input type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Country" name='country'
                                        required />
                                </div>
                                <div>
                                    <label className="label">Added By</label>
                                    <input readOnly defaultValue={user && user?.email} type="email" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" name='added_by'
                                        required />
                                </div>
                            </section>

                            <button className="btn btn-neutral mt-8">Add</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div >
    )
};

export default AddMovie;