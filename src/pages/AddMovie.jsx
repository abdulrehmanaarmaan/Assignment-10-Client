import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import useLoader from '../hooks/useLoader';
import Loader from '../components/Loader';
import axios from 'axios';

const AddMovie = () => {
    const { loading, startLoading, stopLoading } = useLoader();

    const { user, axiosPublic } = use(AuthContext);

    const navigate = useNavigate();

    const handleAddMovie = async event => {
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

        const posterURL = event.target.poster_url.files[0];

        const language = event.target.language.value;
        const country = event.target.country.value;
        const addedBy = event.target.added_by.value;

        const typeReleaseYear = Number(releaseYear);
        const typeRating = Number(rating);
        const typeDuration = Number(duration);

        const form = new FormData();
        form.append('image', posterURL)
        const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_host_key}`;

        let imageURL;

        await axios.post(image_API_URL, form)
            .then(res => {
                console.log(res?.data)
                imageURL = res?.data?.data?.display_url;
            }
            )
            .catch(err => {
                console.log(err)
                stopLoading()
                toast.error('Failed to add')
            })

        const newMovie = {
            title: title,
            genre: genre,
            releaseYear: typeReleaseYear,
            director: director,
            cast: cast,
            rating: typeRating,
            duration: typeDuration,
            plotSummary: plotSummary,
            posterUrl: imageURL,
            language: language,
            country: country,
            addedBy: addedBy
        }

        await axiosPublic.post(`/movies?email=${user?.email}`, newMovie)
            .then(res => {
                console.log(res)
                // event.target.reset()
                navigate(`/dashboard/my-collection/${user?.email}`)
                stopLoading()
                toast.success('Successfully added')
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
            <div className="card bg-base-100 max-w-sm md:w-fit md:max-w-fit shrink-0 m-auto form">
                <div className="card-body gap-0">
                    <h1 className='text-3xl font-semibold text-gray-800 tracking-tight text-center mb-6 route-title'>Add a Movie</h1>
                    <form onSubmit={handleAddMovie}>
                        <fieldset className="fieldset gap-0">
                            <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className="label mb-1">Title</label>
                                    <input type="text" className="input md:md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Title" name='title' required />
                                </div>
                                <div>
                                    <label className="label mb-1">Genre</label>
                                    <input type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Genre" name='genre' required />
                                </div>
                                <div>
                                    <label className="label mb-1">Release Year</label>
                                    <input type="text" pattern='\d+' title='Type an integer only.' className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Release Year" name='release_year' required />
                                </div>
                                <div>
                                    <label className="label mb-1">Director</label>
                                    <input type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Director" name='director'
                                        required />
                                </div>
                                <div>
                                    <label className="label mb-1">Cast</label>
                                    <input type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Cast" name='cast'
                                        required />
                                </div>
                                <div>
                                    <label className="label mb-1">Rating</label>
                                    <input type="number" step='0.1' min='0' max='10' className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Rating" name='rating'
                                        required />
                                </div>
                                <div>
                                    <label className="label mb-1">Duration</label>
                                    <input type="text" pattern='\d+(\.\d{1,2})?' title='Type a numerical value only.' className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Duration" name='duration'
                                        required />
                                </div>
                                <div>
                                    <label className="label mb-1">Plot Summary</label>
                                    <input type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Plot Summary" name='plot_summary'
                                        required />
                                </div>
                                <div>
                                    <label className="label mb-1">Poster Url</label>
                                    <input type="file" accept="image/*" className="file-input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Poster Url" name='poster_url'
                                        required />
                                </div>
                                <div>
                                    <label className="label mb-1">Language</label>
                                    <input type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Language" name='language'
                                        required />
                                </div>
                                <div>
                                    <label className="label mb-1">Country</label>
                                    <input type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Country" name='country'
                                        required />
                                </div>
                                <div>
                                    <label className="label mb-1">Added By</label>
                                    <input readOnly defaultValue={user && user?.email} type="email" className="cursor-not-allowed input md:max-w-[300px] md:w-[300px] block max-w-full w-full" name='added_by' />
                                </div>
                            </section>

                            <button className="btn btn-neutral form-btn mt-8">Add</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div >
    )
};

export default AddMovie;