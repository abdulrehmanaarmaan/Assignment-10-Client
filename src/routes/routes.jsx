import { createBrowserRouter } from "react-router";
import RootLayout from "../root-layout/RootLayout";
import Error from "../pages/Error";
import Home from "../pages/Home";
import UserRegistration from "../pages/UserRegistration";
import UserLogin from "../pages/UserLogin";
import AllMovies from "../pages/AllMovies";
import MovieDetails from "../pages/MovieDetails";
import MyCollection from "../pages/MyCollection";
import AddMovie from "../pages/AddMovie";
import PrivateRoute from "../private-route/PrivateRoute";
import UpdateMovie from "../pages/UpdateMovie";
import MyWatchList from "../pages/MyWatchList";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                path: '/',
                Component: Home,
                loader: () => fetch('https://assignment10server-kappa.vercel.app/movies')
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
                Component: AllMovies,
                loader: () => fetch('https://assignment10server-kappa.vercel.app/movies'),
            },
            {
                path: '/movie-details/:id',
                element: <PrivateRoute>
                    <MovieDetails></MovieDetails>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://assignment10server-kappa.vercel.app/movies?id=${params.id}`)
            },
            {
                path: '/my-collection/:email',
                element: <PrivateRoute>
                    <MyCollection></MyCollection>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://assignment10server-kappa.vercel.app/movies?email=${params.email}`)
            },
            {
                path: 'add-movie',
                element: <PrivateRoute>
                    <AddMovie></AddMovie>
                </PrivateRoute>
            },
            {
                path: 'update-movie/:id',
                element: <PrivateRoute>
                    <UpdateMovie></UpdateMovie>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://assignment10server-kappa.vercel.app/movies?id=${params.id}`)
            },
            {
                path: 'My-WatchList',
                element: <PrivateRoute>
                    <MyWatchList></MyWatchList>
                </PrivateRoute>,
                loader: () => fetch('https://assignment10server-kappa.vercel.app/WatchList')
            }

        ]
    },
]);
