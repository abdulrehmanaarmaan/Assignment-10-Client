import { createBrowserRouter } from "react-router";
import RootLayout from "../main-layout/RootLayout";
import Error from "../pages/Error";
import Home from "../pages/Home";
import UserRegistration from "../pages/UserRegistration";
import UserLogin from "../pages/UserLogin";
import AllMovies from "../pages/AllMovies";
import MovieDetails from "../pages/MovieDetails";
import MyCollection from "../pages/MyCollection";
import AddMovie from "../pages/AddMovie";
import Delete from "../pages/Delete";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                path: '/',
                Component: Home
            },

            {
                path: 'user-registration',
                Component: UserRegistration
            },
            {
                path: 'user-login',
                Component: UserLogin
            },
            {
                path: 'all-movies',
                Component: AllMovies
            },
            {
                path: 'movie-details',
                Component: MovieDetails
            },
            {
                path: 'my-collection',
                Component: MyCollection
            },
            {
                path: 'add-movie',
                Component: AddMovie
            },
            {
                path: 'delete',
                Component: Delete
            }
        ]
    },
]);
