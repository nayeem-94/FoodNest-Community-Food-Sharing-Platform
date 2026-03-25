import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Form from './Form';
import { AuthContext } from '../../Provider/Authprovider';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';


const Register = () => {

    const { createUser, googleLogin, setLoading } = useContext(AuthContext);
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handelRegister = (e) => {


        setNameError("");
        setPasswordError("");


        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photourl = form.photourl.value;
        const email = form.email.value;
        const password = form.password.value;

        // name validation
        if (name.length < 5) {
            setNameError("Name should be more than 5 characters");
            return;
        } else {
            setNameError("");
        }

        // // password validation
        if (!/[A-Z]/.test(password)) {
            setPasswordError("Password must contain at least one uppercase letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setPasswordError("Password must contain at least one lowercase letter");
            return;
        }
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return;
        } else {
            setPasswordError("");
        }



        // USER CREATION by email and password 
        createUser(email, password)
            .then((result) => {
                const createdUser = result.user;
                form.reset();

                Swal.fire({
                    title: "Welcome to FoodNest 🥗",
                    text: "Account created successfully 🎉",
                    icon: "success",
                    background: "#fff",
                    color: "#333",
                    confirmButtonColor: "#f59e0b"
                });


                updateProfile(createdUser, {
                    displayName: name,
                    photoURL: photourl
                })
                    .then(() => {
                        navigate("/home");

                    })
                    .catch((error) => {
                        console.error("Error updating profile:", error);
                    });

            })
            .catch((error) => {

                let message = "Something went wrong!";

                if (error.message.includes("email-already-in-use")) {
                    message = "Email already exists!";
                }

                Swal.fire({
                    title: "Error!",
                    text: message,
                    icon: "error"
                });

                e.target.reset();
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                const user = result.user;

                console.log(user);

                Swal.fire({
                    title: "Welcome to FoodNest 🥗",
                    text: "Account created successfully 🎉",
                    icon: "success",
                    background: "#fff",
                    color: "#333",
                    confirmButtonColor: "#f59e0b"
                })
                    .then(() => {
                        setLoading(false);
                        navigate("/");
                    });

            })
            .catch((error) => {
                let message = "Something went wrong!";

                if (error.message.includes("email-already-in-use")) {
                    message = "Email already exists!";
                }

                Swal.fire({
                    title: "Error!",
                    text: message,
                    icon: "error"
                });
            });
    };


    return (
        <section className="relative overflow-hidden ">
            {/* Floating blobs */}
            <div className="absolute -top-32 -left-24 w-80 h-90 bg-yellow-300 rounded-full opacity-30 filter blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-yellow-300 rounded-full opacity-25 filter blur-3xl pointer-events-none"></div>

            <div className="min-h-screen flex items-center justify-center px-4 py-12">

                <div className="w-full max-w-md backdrop-blur-xl bg-white/80 border border-zinc-200 shadow-2xl rounded-3xl p-8 sm:p-10 transition-all duration-300">

                    {/* Logo */}
                    <div className='flex items-center justify-center text-2xl mb-6'>
                        <h1 className="text-3xl font-bold text-gray-800 whitespace-nowrap">
                            🥗Food<span className="text-amber-500">Nest</span>
                        </h1>
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl font-bold text-zinc-800 mb-1">   Create account </h1>
                    <p className="text-zinc-500 text-sm mb-7"> Join the community. Share food, reduce waste.  </p>

                    {/* Form */}
                    <form onSubmit={handelRegister} className="space-y-5">
                        <Form>

                        </Form>
                        {nameError && <p className="text-red-400 text-sm">{nameError}</p>}
                        {passwordError && <p className="text-red-400 text-sm">{passwordError}</p>}
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-zinc-300"></div>
                        <span className="text-xs text-zinc-400">or</span>
                        <div className="flex-1 h-px bg-zinc-300"></div>
                    </div>

                    {/* Google Button */}
                    <button onClick={handleGoogleLogin} className="btn  w-full rounded-lg bg-white text-black border-[#e5e5e5]  transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
                        <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Continue with Google
                    </button>

                    {/* Footer */}
                    <p className="text-center text-zinc-500 text-sm mt-6">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-amber-500 hover:text-amber-600 font-semibold transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>

                </div>
            </div>
        </section>
    );
};

export default Register;