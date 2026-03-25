import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/Authprovider';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { Eye, EyeOff } from "lucide-react";


const Login = () => {



    const { signIn, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);   // password toggle state


    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // console.log(email, password);

        signIn(email, password)
            .then((result) => {
                const user = result.user;
                form.reset();

                Swal.fire({
                    title: "Welcome back 🎉",
                    text: "Login successful!",
                    icon: "success"
                }).then(() => {
                    navigate("/");
                });

            })
            .catch((error) => {
                let message = "Login failed!";

                if (error.code === "auth/user-not-found") {
                    message = "No account found!";
                } else if (error.code === "auth/wrong-password") {
                    message = "Incorrect password!";
                } else if (error.code === "auth/invalid-credential") {
                    message = "Invalid email or password!";
                }

                setError(message);

                Swal.fire({
                    title: "Error!",
                    text: message,
                    icon: "error"
                });
            });
        e.target.reset();
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                const user = result.user;

                console.log(user);

                Swal.fire({
                    title: "Welcome to FoodNest 🥗",
                    text: "Account Logged in successfully 🎉",
                    icon: "success",
                    background: "#fff",
                    color: "#333",
                    confirmButtonColor: "#f59e0b"
                })
                    .then(() => {
                        navigate("/");
                    });

            })
            .catch((error) => {
                let message = "Login failed!";

                if (error.code === "auth/user-not-found") {
                    message = "No account found!";
                } else if (error.code === "auth/wrong-password") {
                    message = "Incorrect password!";
                } else if (error.code === "auth/invalid-credential") {
                    message = "Invalid email or password!";
                }

                setError(message);

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
                    <h1 className="text-3xl font-bold text-zinc-800 mb-1">  Login to your account </h1>
                    <p className="text-zinc-500 text-sm mb-7"> Join the community. Share food, reduce waste.  </p>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="w-full border border-zinc-300 bg-white/70 text-sm rounded-xl px-4 py-3 placeholder-zinc-400 outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div className="">
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Min. 8 characters"
                                    required
                                    className="w-full border border-zinc-300 bg-white/70 text-sm rounded-xl px-4 py-3 placeholder-zinc-400 outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                                />
                                <div
                                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-amber-400 hover:bg-amber-300 text-zinc-900 font-semibold text-sm rounded-xl py-3 mt-2 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                        >
                            Login in →
                        </button>
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
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-amber-500 hover:text-amber-600 font-semibold transition-colors"
                        >
                            Sign up
                        </Link>
                    </p>

                </div>
            </div>
        </section>
    );
};

export default Login;