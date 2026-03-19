import React from 'react';
import heroImage from '../../assets/bg-pasta.jpg'; // Replace with your own image
import { NavLink } from 'react-router';

const HeroSection = () => {
    return (
        <section className="relative bg-yellow-50 overflow-hidden py-15">
            {/* Floating blobs */}
            <div className="absolute -top-32 -left-24 w-72 h-72 bg-yellow-300 rounded-full opacity-30 filter blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-yellow-300 rounded-full opacity-25 filter blur-3xl pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* White Card */}
                <div className="bg-white rounded-3xl shadow-2xl flex flex-col-reverse lg:flex-row items-center gap-10 p-8 sm:p-12 relative z-10">

                    {/* Left: Text */}
                    <div className="flex-1 text-center lg:text-left space-y-6">
                        <div className="inline-flex items-center gap-2 bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                            Reduce waste · Feed community and nayeem
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
                            Share food, <span className="text-yellow-600">spread joy</span>
                        </h1>

                        <p className="text-gray-700 text-base sm:text-lg lg:text-lg max-w-md">
                            Discover surplus meals from neighbours and local kitchens. Give good food a second life — and make mealtime brighter for everyone.
                        </p>

                        <div className="flex justify-center lg:justify-start gap-4 mt-4">
                            <NavLink to="/available-foods">
                                <button className="px-6 py-3 cursor-pointer bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition transform hover:-translate-y-1 hover:scale-105">
                                    Search Food →
                                </button>
                            </NavLink>

                            <NavLink to="/available-foods">
                                <button className="px-6 py-3 cursor-pointer bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300 transition transform hover:-translate-y-1 hover:scale-105">
                                    Browse All
                                </button>
                            </NavLink>
                        </div>

                        {/* Simple stats */}
                        <div className="flex gap-6 mt-6 justify-center lg:justify-start text-sm text-gray-700">
                            <div className="flex flex-col">
                                <span className="font-bold text-black">2.4k+</span>
                                Meals shared
                            </div>
                            <div className="w-px bg-yellow-300"></div>
                            <div className="flex flex-col">
                                <span className="font-bold text-black">840</span>
                                Active donors
                            </div>
                            <div className="w-px bg-yellow-300"></div>
                            <div className="flex flex-col">
                                <span className="font-bold text-black">12 kg</span>
                                Waste saved
                            </div>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="flex-1 relative">
                        <div className="rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={heroImage}
                                alt="Delicious food"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;