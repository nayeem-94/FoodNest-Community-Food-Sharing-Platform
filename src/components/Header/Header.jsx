import React from 'react';
import { NavLink } from 'react-router';

const Header = () => {
    return (
        <div>
            <div>
                <NavLink to="/home">Home</NavLink>
            </div>
            <div>
                <NavLink to="/login">Login</NavLink>
            </div>
        </div>
    );
};

export default Header;