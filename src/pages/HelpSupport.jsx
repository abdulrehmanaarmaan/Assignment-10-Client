import React from 'react';

const HelpSupport = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 space-y-24 ">

            {/* Page Title */}
            <header className="text-center">
                <h1 className="text-3xl font-semibold text-gray-800 tracking-tight mb-6 text-center route-title">
                    Help & Support
                </h1>
                <p className="text-gray-600 max-w-3xl mx-auto movie-data text-lg">
                    Need assistance? Find answers to common questions or learn how to
                    use MovieMaster Pro effectively.
                </p>
            </header>

            {/* FAQ Section */}
            <section className="">
                <h2 className="text-3xl font-semibold text-gray-800 tracking-tight text-center mb-6 route-title">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-6 text-center md:text-left">
                    <div className="border border-gray-200 rounded-lg p-6 support">
                        <h3 className="font-semibold text-gray-900 exceptional-title">
                            How do I add a movie to my watchlist?
                        </h3>
                        <p className="text-gray-700 mt-2 web-app">
                            Navigate to a movie’s detail page and click on
                            “Add to WatchList”. The movie will be saved to your dashboard.
                        </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 support">
                        <h3 className="font-semibold text-gray-900 exceptional-title">
                            Can I edit or delete movies I added?
                        </h3>
                        <p className="text-gray-700 mt-2 web-app">
                            Yes. Movies added by you can be edited or deleted from
                            the movie details page.
                        </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 support">
                        <h3 className="font-semibold text-gray-900 exceptional-title">
                            Why can’t I see analytics data?
                        </h3>
                        <p className="text-gray-700 mt-2 web-app">
                            Analytics become available once you have sufficient
                            data such as ratings and watchlist activity.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Support */}
            <section className="bg-gray-100 rounded-xl p-8 space-y-4 genre-bg text-center md:text-left">
                <h2 className="exceptional-title text-3xl font-semibold text-gray-800 tracking-tight mb-6 route-title">
                    Still need help?
                </h2>
                <p className="text-gray-700 web-app">
                    If your issue isn’t covered above, feel free to reach out.
                </p>
                <p className="text-gray-700 web-app">
                    📧 Support Email: <span className="font-medium">support@moviemasterpro.com</span>
                </p>
            </section>

        </div>
    );
};

export default HelpSupport;
