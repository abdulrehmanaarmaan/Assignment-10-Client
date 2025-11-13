import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import AddedMovie from '../components/AddedMovie';

const MyCollection = () => {
    const addedMovies = useLoaderData();

    const [newMovies, setNewMovies] = useState(addedMovies);

    return (
        <div>
            <h1 className='font-bold text-[48px] mb-10 text-center'>My Collection</h1>

            <section className='space-y-6 md:space-y-4 px-4'>
                {
                    newMovies.map(addedMovie => <AddedMovie setNewMovies={setNewMovies} newMovies={newMovies} addedMovie={addedMovie} key={addedMovie._id}></AddedMovie>)
                }
            </section>
        </div>
    );
};

export default MyCollection;