import React from 'react';

const Form = () => {
    return (
        <>
            {/* Name + Photo URL */}
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                        Name
                    </label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Your name"
                        required
                        className="w-full border border-zinc-300 bg-white/70 text-sm rounded-xl px-4 py-3 placeholder-zinc-400 outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                        Photo URL
                    </label>
                    <input
                        name="photourl"
                        type="text"
                        placeholder="https://..."
                        required
                        className="w-full border border-zinc-300 bg-white/70 text-sm rounded-xl px-4 py-3 placeholder-zinc-400 outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    />
                </div>
            </div>

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
            <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Password
                </label>
                <input
                    name="password"
                    type="password"
                    placeholder="Min. 8 characters"
                    required
                    className="w-full border border-zinc-300 bg-white/70 text-sm rounded-xl px-4 py-3 placeholder-zinc-400 outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="w-full cursor-pointer bg-amber-400 hover:bg-amber-300 text-zinc-900 font-semibold text-sm rounded-xl py-3 mt-2 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            >
                Create account →
            </button>
        </>

    );
};

export default Form;