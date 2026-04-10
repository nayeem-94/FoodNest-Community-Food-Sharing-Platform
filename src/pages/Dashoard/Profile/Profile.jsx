import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/Authprovider';
import Swal from 'sweetalert2';

const Profile = () => {

    const { user } = useContext(AuthContext);
    const [bio, setBio] = React.useState(
        "Passionate about sharing food 🍲 and reducing waste. I love connecting with people and building a strong community through FoodNest."
    );


    const handleEditBio = () => {

        Swal.fire({
            title: "Edit your Bio",
            input: "textarea",
            inputValue: bio,
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
            inputAttributes: {
                maxlength: 200,
                autocapitalize: "sentences",
                autocorrect: "on",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setBio(result.value);
                Swal.fire("Saved!", "Your bio has been updated.", "success");
            }
        });
    };


    return (
        <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-50 to-yellow-50 overflow-hidden py-16 px-4">

            {/* Background Blobs */}
            <div className="absolute -top-32 -left-24 w-72 h-72 bg-yellow-300 rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>

            {/* Card */}
            <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-xl border border-yellow-100 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-10">

                {/* Header */}
                <h1 className="text-4xl font-bold text-center  bg-clip-text mt-5 mb-10">
                    🍔 My <span className="text-amber-500">Profile</span>
                </h1>

                

                {/* Profile Info */}
                <div className="flex flex-col items-center text-center">
                    <div className="relative group">
                        <img
                            src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                            alt="Profile"
                            className="w-40 h-40 rounded-full border-4 border-white shadow-xl group-hover:scale-105 transition duration-300"
                        />
                        <span className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></span>
                    </div>

                    <h2 className="text-3xl font-bold mt-5 text-gray-900">
                        {user?.displayName || "Food Lover 😋"}
                    </h2>

                    <p className="text-gray-600 mt-1 text-sm">
                        {user?.email || "user@email.com"}
                    </p>

                    <p className="mt-3 text-orange-500 font-semibold text-sm tracking-wide">
                        🍽️ Food Sharing Community Member
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 mt-12">
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl shadow-md text-center hover:scale-105 hover:shadow-lg transition duration-300">
                        <p className="text-gray-700 font-semibold tracking-wide">Foods Shared</p>
                        <p className="text-4xl font-extrabold text-orange-500 mt-2">24</p>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl shadow-md text-center hover:scale-105 hover:shadow-lg transition duration-300">
                        <p className="text-gray-700 font-semibold tracking-wide">Followers</p>
                        <p className="text-4xl font-extrabold text-orange-500 mt-2">156</p>
                    </div>
                </div>

                {/* Bio */}
                <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                        📝 About Me
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        {bio}
                    </p>
                </div>

                {/* Button */}
                <button onClick={handleEditBio} className="mt-12 w-full cursor-pointer bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 hover:from-yellow-500 hover:to-orange-500 text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 tracking-wide">
                    ✏️ Edit Profile
                </button>

            </div>
        </div>
    );
};

export default Profile;