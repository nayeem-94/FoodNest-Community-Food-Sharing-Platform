import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router';

import bg from "../assets/bg-pasta2.jpg"
import Footer from '../components/Footer/Footer';
import HeroSection from '../pages/Home/HeroSection';

const Homelayout = () => {
    return (
        <div className='container mx-auto '>

            <Header></Header>
            <HeroSection></HeroSection>
            <Outlet></Outlet>

            <Footer></Footer>

        </div>
    );
};

export default Homelayout;