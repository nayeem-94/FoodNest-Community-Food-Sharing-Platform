import React from 'react';
import { NavLink } from 'react-router';

const Navber = () => {
    return (
        <div className="bg-yellow-300 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">

                {/* Main Rounded Container */}
                <div className="flex items-center justify-between w-full bg-white rounded-full px-6 py-3 shadow-md">

                    {/* Left: Logo + Menu */}
                    <div className="flex items-center gap-8">
                        <h1 className="text-xl mr-10 font-bold text-gray-800">
                            🥗 FoodNest
                        </h1>

                        <ul className="hidden md:flex items-center gap-6 text-gray-600 text-sm">
                            <NavLink to="home" className="hover:text-black cursor-pointer">Home</NavLink>
                            <NavLink to="available-foods" className="hover:text-black cursor-pointer">Available Foods</NavLink>
                        </ul>
                    </div>

                    {/* Right: Buttons */}
                    <div className="flex items-center gap-3">

                        <NavLink to="/login">
                            <button className="cursor-pointer px-4 py-1.5 rounded-full bg-gray-200 text-gray-700 text-sm hover:bg-gray-200 transition">
                                Log in
                            </button>
                        </NavLink>
                        <NavLink to="/signup">
                            <button className="cursor-pointer px-5 py-1.5 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition">
                                Sign up free
                            </button>
                        </NavLink>
                    </div>
                </div>

                {/* Heart container */}
                <div className="ml-4 bg-white p-3 rounded-full shadow-md cursor-pointer hover:scale-105 transition">
                    ❤️
                </div>
            </div>
        </div>
    );
};

export default Navber;