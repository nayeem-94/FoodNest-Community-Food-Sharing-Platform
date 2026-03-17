import React from 'react';
import { NavLink } from 'react-router';
import Navber from './Navber';

const Header = () => {
    return (
        <div>
            {/* <div>
                <NavLink to="/home">Home</NavLink>
            </div>
            <div>
                <NavLink to="/login">Login</NavLink>
            </div> */}
                <Navber />
        </div>
    );
};

export default Header;