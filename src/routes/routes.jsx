import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
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
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardError from "../pages/DashboardError";
import Profile from "../pages/Profile";
import Analytics from "../pages/Analytics";
import About from "../pages/About";
import HelpSupport from "../pages/HelpSupport";

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
                path: '/about',
                Component: About
            },
            {
                path: '/help-support',
                Component: HelpSupport
            }
        ]
    },
    {
        path: '/dashboard',
        Component: DashboardLayout,
        children: [
            {
                path: 'my-collection/:email',
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
            },
            {
                path: 'profile',
                element: <PrivateRoute>
                    <Profile></Profile>
                </PrivateRoute>
            },
            {
                path: 'analytics',
                element: <PrivateRoute>
                    <Analytics></Analytics>
                </PrivateRoute>,
                loader: () => fetch('https://assignment10server-kappa.vercel.app/movies')
            },
            {
                path: '*',
                Component: DashboardError
            }
        ]
    }
]);
