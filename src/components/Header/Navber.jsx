import React, { useContext, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../pages/Provider/Authprovider';
import Swal from 'sweetalert2';

const Navber = () => {

    const { user, logOut } = useContext(AuthContext);
    const [loggingOut, setLoggingOut] = useState(false);

    const isLoggedIn = !!user;
    const Navigate = useNavigate();


    const handleLogout = () => {

        setLoggingOut(true);

        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f59e0b', // amber
            cancelButtonColor: '#d1d5db', // gray
            confirmButtonText: 'Yes, log me out!'
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire({
                            title: 'Logged out!',
                            text: 'You have successfully logged out.',
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false
                        }).then(() => {

                            setTimeout(() => {
                                setLoggingOut(false); // hide spinner
                                Navigate("/login"); // redirect to login after logout
                            }, 1000);

                        });
                    })
                    .catch((error) => {
                        setLoggingOut(false);
                        Swal.fire({
                            title: 'Error!',
                            text: error.message,
                            icon: 'error'
                        });
                    });
            }
            else {
                setLoggingOut(false);
            }
        });
    }

    if (loggingOut) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        );
    }

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
                                className="menu menu-sm dropdown-content mt-3 z-[50] p-3 shadow bg-white rounded-2xl w-44 space-y-1">
                                <li><NavLink to="home">🏠 Home</NavLink></li>
                                <li><NavLink to="available-foods">🍽️ Available Foods</NavLink></li>
                            </ul>
                        </div>

                        <NavLink to="home">
                            <h1 className="text-base sm:text-xl font-bold text-gray-800 whitespace-nowrap">
                                🥗 Food<span className="text-amber-500">Nest</span>
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

                        {
                            isLoggedIn ? (
                                <>
                                    <button onClick={handleLogout} className="cursor-pointer bg-amber-400 rounded-full text-black px-4 py-2 text-sm font-medium hover:bg-yellow-300 transition">
                                        Logout
                                    </button>
                                    {/* Profile  */}
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                            <div className="w-8 sm:w-10 rounded-full ring ring-gray-200">
                                                <img
                                                    alt="profile"
                                                    src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                                />
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
                                </>
                            )
                                :
                                (
                                    <>
                                        <div className="sm:flex items-center gap-2">
                                            <NavLink to="/login">
                                                <button className="cursor-pointer px-4 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800 transition">
                                                    Login
                                                </button>
                                            </NavLink>

                                            <NavLink to="/register">
                                                <button className="cursor-pointer bg-amber-400 rounded-full text-black px-4 py-2 text-sm font-medium hover:bg-yellow-300 transition">
                                                    Sign Up
                                                </button>
                                            </NavLink>
                                        </div>
                                    </>
                                )


                        }








                    </div>
                </div>

            </div>
        </div>
    );
};

export default Navber;