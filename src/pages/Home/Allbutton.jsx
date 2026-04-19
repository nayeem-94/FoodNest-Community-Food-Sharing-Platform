import React from 'react';
import { Navigate, NavLink } from 'react-router';

const Allbutton = () => {
    return (
        <div className="flex justify-center cursor-pointer mt-10">
            <NavLink to="/available-foods">
            <button
                className="relative cursor-pointer px-8 py-3 rounded-full text-white font-semibold 
                   bg-gradient-to-r from-amber-500 to-orange-500
                   shadow-lg hover:shadow-2xl hover:scale-105
                   transition-all duration-300 ease-in-out
                   overflow-hidden"
            >
                <span className="absolute inset-0 bg-white opacity-10 blur-md"></span>

                <span className="relative z-10 flex items-center gap-2">
                    🍽️ Show All Foods →
                </span>
            </button>
            </NavLink>
        </div>
    );
};

export default Allbutton;