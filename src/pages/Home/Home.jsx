import React from 'react';
import HeroSection from './HeroSection';
import TopFoodInfo from './TopFoodInfo';
import TopFood from './TopFood';
import Allbutton from './Allbutton';


const Home = () => {
    return (
        <section className="relative bg-yellow-50 overflow-hidden py-15">
            {/* Floating blobs */}
            <div className="absolute -top-32 -left-24 w-72 h-72 bg-yellow-300 rounded-full opacity-30 filter blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-yellow-300 rounded-full opacity-25 filter blur-3xl pointer-events-none"></div>

            <HeroSection></HeroSection>
            <TopFoodInfo></TopFoodInfo>
            <TopFood></TopFood>
            <Allbutton></Allbutton>

        </section>
    );
};

export default Home;