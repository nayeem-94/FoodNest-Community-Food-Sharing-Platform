import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router';

const Homelayout = () => {
    return (
         <div className='container mx-auto ' >
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Homelayout;