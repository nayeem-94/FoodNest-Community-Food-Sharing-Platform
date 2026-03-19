import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router';

import Footer from '../components/Footer/Footer';

const Homelayout = () => {

    return (
        <div className='container mx-auto '>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Homelayout;