// src/pages/ErrorPage.jsx
import React from "react";
import { NavLink } from "react-router";

const ErrorPage = () => {
    return (
        <section className="relative overflow-hidden bg-yellow-50 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">

            {/* Decorative blobs like hero */}
            <div>

                <div className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none"></div>
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>
            </div>

            {/* Content Box */}
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col items-center text-center max-w-md">
                <h1 className="text-6xl sm:text-7xl font-bold text-black mb-4">😕</h1>
                <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
                    Oops! Page not found
                </h2>
                <p className="text-gray-700 mb-6">
                    Looks like the food you are looking for isn’t here. Maybe it’s been shared already or never existed.
                </p>


                <NavLink to='/'
                    className="px-6 py-3 bg-black text-yellow-400 font-semibold rounded-full hover:bg-gray-900 hover:text-yellow-300 transition"
                >
                    Go Back Home
                </NavLink>

                {/* Optional fun stats like hero section */}
                <div className="flex gap-6 mt-8">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-black">2.4k+</span>
                        <span className="text-xs text-gray-500 uppercase">Meals Shared</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-black">840</span>
                        <span className="text-xs text-gray-500 uppercase">Active Donors</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-black">12kg</span>
                        <span className="text-xs text-gray-500 uppercase">Waste Saved</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;