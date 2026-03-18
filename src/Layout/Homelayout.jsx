import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router';

import bg from "../assets/bg-pasta2.jpg"
import Footer from '../components/Footer/Footer';

const Homelayout = () => {
    return (
        <div className='container mx-auto '>
            <div  className=' '>
                <Header></Header>
            </div>
            
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Homelayout;