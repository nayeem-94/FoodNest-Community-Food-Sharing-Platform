import React, { useContext } from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router';

import Footer from '../components/Footer/Footer';
import { AuthContext } from '../pages/Provider/Authprovider';
import Loading from '../pages/Loading/Loading';

const Homelayout = () => {

    const { loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div>
                <Header />
                <Loading />
                <Footer />
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Homelayout;