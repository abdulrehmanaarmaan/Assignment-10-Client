import React from 'react';

const About = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 space-y-24">

            {/* Page Title */}
            <header className="text-center space-y-4">
                <h1 className="route-title text-3xl font-semibold text-gray-800 tracking-tight text-center mb-6 route-title">
                    About MovieMaster Pro
                </h1>
                <p className="max-w-3xl mx-auto text-lg mb-6 text-center text-gray-600 movie-data font-normal">
                    A modern movie management and discovery platform built for film enthusiasts
                    who value organization, insight, and simplicity.
                </p>
            </header>

            {/* Mission Section */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-2xl font-semibold text-gray-900 exceptional-title">
                        Our Mission
                    </h2>
                    <p className="text-gray-700 leading-relaxed web-app">
                        MovieMaster Pro was created to help users explore, organize, and analyze
                        movies effortlessly. Whether you’re tracking your watchlist or managing
                        a growing collection, our goal is to provide a fast, intuitive, and
                        enjoyable experience.
                    </p>
                </div>

                <div className="bg-gray-100 rounded-xl p-8 genre-bg">
                    <ul className="space-y-4 text-gray-700 web-app list-disc list-outside">
                        <li>Discover top-rated and recent movies</li>
                        <li>Manage personal collections and watchlists</li>
                        <li>Analyze viewing trends and ratings</li>
                        <li>Enjoy a clean, distraction-free UI</li>
                    </ul>
                </div>
            </section>

            {/* Technology Section */}
            <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-gray-800 tracking-tight text-center mb-6 route-title">
                    Built with Modern Technology
                </h2>
                <p className="text-gray-700 max-w-4xl web-app mx-auto text-center">
                    The platform is built using modern web technologies to ensure
                    performance, scalability, and maintainability. Every feature is
                    designed with user experience and long-term growth in mind.
                </p>
            </section>

        </div>
    );
};

export default About;
