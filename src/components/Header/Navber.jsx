import React from 'react';
import { NavLink } from 'react-router';

const Navber = () => {
    return (
        <div className="bg-yellow-300 py-3 sm:py-4">
             {/* <div className="bg-yellow-200/40 py-3 sm:py-4 backdrop-blur-sm"> */}
            <div className="max-w-6xl mx-auto flex items-center justify-between px-2 sm:px-0">

                {/* Main Rounded Container */}
                <div className="flex items-center justify-between w-full bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-md">

                    {/* Left: Logo + Menu */}
                    <div className="flex items-center gap-3 sm:gap-8">

                        {/* Mobile Menu */}
                        <div className="md:hidden dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-lg">
                                ☰
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-white rounded-2xl w-44 space-y-1">
                                <li><NavLink to="home">🏠 Home</NavLink></li>
                                <li><NavLink to="available-foods">🍽️ Available Foods</NavLink></li>
                            </ul>
                        </div>

                        <NavLink to="home">
                            <h1 className="text-base sm:text-xl font-bold text-gray-800 whitespace-nowrap">
                                🥗 Food<span className="text-yellow-600">Nest</span>
                            </h1>
                        </NavLink>

                        {/* Desktop Menu */}
                        <ul className="hidden md:flex items-center gap-6 text-gray-600 text-sm">
                            <NavLink to="home" className="hover:text-black cursor-pointer">Home</NavLink>
                            <NavLink to="available-foods" className="hover:text-black cursor-pointer">Available Foods</NavLink>
                        </ul>
                    </div>

                    {/* Right: Buttons */}
                    <div className="flex items-center gap-2">

                        <div className="sm:flex items-center gap-2">
                            <NavLink to="/login">
                                <button className="cursor-pointer px-4 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800 transition">
                                    Login
                                </button>
                            </NavLink>

                            <NavLink to="/register">

                                <button className="cursor-pointer bg-yellow-400 rounded-full text-black px-4 py-2 text-sm font-medium hover:bg-yellow-300 transition">
                                    Sign Up
                                </button>
                            </NavLink>
                        </div>

                        {/* Profile always visible */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-8 sm:w-10 rounded-full ring ring-gray-200">
                                    <img
                                        alt="profile"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={-1}
                                className="menu menu-sm dropdown-content bg-white rounded-2xl z-50 mt-3 w-52 p-2 shadow-lg">
                                <li><a>👤 Profile</a></li>
                                <li><a>➕ Add Food</a></li>
                                <li><a>📦 Manage My Foods</a></li>
                                <li><a>📩 Requests</a></li>
                                <li><a>🚪 Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Navber;