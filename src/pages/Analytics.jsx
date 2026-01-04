import { BarChart3, ChartPie } from 'lucide-react';
import React, { use } from 'react';
import { useLoaderData } from 'react-router';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AuthContext } from '../contexts/AuthContext';

const Analytics = () => {

    const movies = useLoaderData()

    console.log(movies)

    const { user } = use(AuthContext)

    const addedMovies = movies.filter(movie => movie?.addedBy == user?.email)

    console.log(addedMovies)

    const fiveMostDurational = addedMovies.sort((a, b) => b?.duration - a?.duration).slice(0, 5)

    console.log(fiveMostDurational)

    const getPieChartData = data => {
        const lowRatedMovies = data.filter(movie => movie?.rating >= 0.0 && movie?.rating <= 6.9).length;
        const highRatedMovies = data.filter(movie => movie?.rating >= 7.0 && movie?.rating <= 10.0).length;

        return [
            { name: 'Low-rated', value: lowRatedMovies },
            { name: 'High-rated', value: highRatedMovies }
        ]
    }

    const getBarChartData = data => {
        return data.map(movie => { return { name: movie?.title, duration: movie?.duration } })
    }

    return (
        <div>
            <h1 className="text-3xl font-semibold text-gray-800 tracking-tight text-center mb-6 route-title">Analytics Dashboard</h1>
            <div className='px-4 md:px-6 lg:px-8'>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Pie Chart Section */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm form">
                        <div className="flex items-center gap-2 mb-4">
                            <ChartPie className="w-5 h-5 text-gray-600 movie-data" />
                            <h2 className="text-lg font-semibold">
                                Low-rated vs High-rated Movies
                            </h2>
                        </div>
                        <div className="w-full h-72 flex justify-center items-center">
                            {addedMovies.length > 0 ? <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={getPieChartData(addedMovies)}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label
                                    >
                                        <Cell key='Low-rated' fill='#FCA5A5' />
                                        <Cell key='High-rated' fill='#34D399' />
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                                :
                                <p className='text-gray-500 text-sm'>No movies added yet</p>}
                        </div>
                    </div>
                    {/* Bar Chart Section */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm form">
                        <div className="flex items-center gap-2 mb-4">
                            <BarChart3 className="w-5 h-5 text-gray-600 movie-data" />
                            <h2 className="text-lg font-semibold">Top 5 Most Durational Movies</h2>
                        </div>
                        <div className="w-full h-72 flex justify-center items-center">
                            {fiveMostDurational.length > 0 ? <ResponsiveContainer>
                                <BarChart data={getBarChartData(fiveMostDurational)}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tick={{ textAnchor: 'middle' }} />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="duration" fill="#34D399" />
                                </BarChart>
                            </ResponsiveContainer>
                                : <p className='text-gray-500 text-sm'>No movies added yet</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;