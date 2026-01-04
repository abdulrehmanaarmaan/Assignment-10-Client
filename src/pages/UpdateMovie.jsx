import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useLoaderData, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useLoader from '../hooks/useLoader';
import Loader from '../components/Loader';
import axios from 'axios';

const UpdateMovie = () => {
    const { loading, startLoading, stopLoading } = useLoader();

    const { user, axiosPublic } = use(AuthContext);

    const movieDetails = useLoaderData();

    const { _id, title, genre, releaseYear, director, cast, rating, duration, plotSummary, posterUrl, language, country } = movieDetails;

    const navigate = useNavigate();

    const handleUpdateMovie = async event => {
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
        const posterUrl = event.target.poster_url.files[0];
        const language = event.target.language.value;
        const country = event.target.country.value;
        const addedBy = event.target.added_by.value;

        const typeReleaseYear = Number(releaseYear);
        const typeRating = Number(rating);
        const typeDuration = Number(duration);

        let imageURL;

        if (posterUrl) {

            const form = new FormData();
            form.append('image', posterUrl)
            const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_host_key}`;

            await axios.post(image_API_URL, form)
                .then(res => {
                    console.log(res?.data)
                    imageURL = res?.data?.data?.display_url;
                }
                )
                .catch(err => {
                    console.log(err)
                    stopLoading()
                    toast.error('Failed to update')
                })
        }

        let updatedMovie;

        if (posterUrl) {

            updatedMovie = {
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
        }

        else {
            updatedMovie = {
                title: title,
                genre: genre,
                releaseYear: typeReleaseYear,
                director: director,
                cast: cast,
                rating: typeRating,
                duration: typeDuration,
                plotSummary: plotSummary,
                language: language,
                country: country,
                addedBy: addedBy
            }
        }

        await axiosPublic.patch(`/movies/${_id}`, updatedMovie)
            .then(res => {
                stopLoading()
                {
                    res?.data?.modifiedCount ?
                        toast.success('Successfully updated') && navigate(`/movie-details/${_id}`) :
                        toast.error('No changes in update')
                }
                console.log(res)
            })
            .catch(error => {
                stopLoading()
                toast.error('No changes in update')
                console.log(error)
            })
    }

    if (loading) return <Loader></Loader>

    return (
        <div className='px-4'>
            <div className="card bg-base-100 max-w-sm md:w-fit md:max-w-fit shrink-0 m-auto form">
                <div className="card-body gap-0">
                    <h1 className='text-3xl font-semibold text-gray-800 tracking-tight mb-6 text-center route-title'>Update</h1>
                    <form onSubmit={handleUpdateMovie}>
                        <fieldset className="fieldset gap-0">
                            <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className="label mb-1">Title</label>
                                    <input defaultValue={title} type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Title" name='title' required />
                                </div>
                                <div>
                                    <label className="label mb-1">Genre</label>
                                    <input defaultValue={genre} type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Genre" name='genre' required />
                                </div>
                                <div>
                                    <label className="label mb-1">Release Year</label>
                                    <input defaultValue={releaseYear} type="text" pattern='\d+' title='Type an integer only.' className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full"
                                        placeholder="Release Year" name='release_year' required />
                                </div>
                                <div>
                                    <label className="label mb-1">Director</label>
                                    <input defaultValue={director} type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Director" name='director'
                                        required />
                                </div>
                                <div>
                                    <label className="label mb-1">Cast</label>
                                    <input defaultValue={cast} type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Cast" name='cast'
                                        required />
                                </div>
                                <div>
                                    <label className="label mb-1">Rating</label>
                                    <input defaultValue={rating} type="number" step='0.1' min='0' max='10' className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full"
                                        placeholder="Rating" name='rating'
                                        required />
                                </div>
                                <div>
                                    <label className="label mb-1">Duration</label>
                                    <input defaultValue={duration} type="text" pattern='\d+(\.\d{1,2})?' title='Type a numerical value only.'
                                        className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Duration" name='duration'
                                        required />
                                </div>
                                <div>
                                    <label className="label mb-1">Plot Summary</label>
                                    <input defaultValue={plotSummary} type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Plot Summary" name='plot_summary'
                                        required />
                                </div>
                                <div>
                                    <label className="label mb-1">Poster Url</label>
                                    <input type="file" accept="image/*" className="file-input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Poster Url" name='poster_url' />
                                    <img src={posterUrl} alt="" className='w-32 h-32 rounded-full mt-3' />
                                </div>
                                <div>
                                    <label className="label mb-1">Language</label>
                                    <input defaultValue={language} type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Language" name='language'
                                        required />
                                </div>
                                <div>
                                    <label className="label mb-1">Country</label>
                                    <input defaultValue={country} type="text" className="input md:max-w-[300px] md:w-[300px] block max-w-full w-full" placeholder="Country" name='country'
                                        required />
                                </div>
                                <div>
                                    <label className="label mb-1">Updated By</label>
                                    <input readOnly defaultValue={user && user?.email} type="email" className="cursor-not-allowed input md:max-w-[300px] md:w-[300px] block max-w-full w-full" name='added_by' />
                                </div>
                            </section>

                            <button className="btn btn-neutral form-btn mt-8">Update</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default UpdateMovie;