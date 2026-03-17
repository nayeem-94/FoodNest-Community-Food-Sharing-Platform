import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router';

import bg from "../assets/bg-pasta2.jpg"

const Homelayout = () => {
    return (
        <div className='container mx-auto '>
            <div  className=' '>
                <Header></Header>
            </div>
            
            <Outlet></Outlet>
        </div>
    );
};

export default Homelayout;