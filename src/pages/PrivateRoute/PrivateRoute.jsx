import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/Authprovider';
import { useLocation, useNavigate } from 'react-router';
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [showLoading, setShowLoading] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 750);
        return () => clearTimeout(timer);
    }, []);



    useEffect(() => {
        if (!loading && !showLoading && !user) {
            Swal.fire({
                title: "Access Denied 🚫",
                text: "Hungry? 🍔 Please login to see your delicious foods!",
                icon: "warning",
                background: "#1f2937",
                color: "#fff",
                confirmButtonColor: "#f59e0b",
                confirmButtonText: "Go to Login 🍕",
                showCancelButton: true,
                cancelButtonText: "Stay Here",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", {
                        state: location.pathname
                    });
                } else {
                    navigate("/");
                }
            });
        }
    }, [user, loading, showLoading, navigate, location]);


    if (loading || showLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        );
    }


    if (!user) {
        return null;
    }

    return children;
};

export default PrivateRoute;