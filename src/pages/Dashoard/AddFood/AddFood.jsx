import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/Authprovider';

const apikey = import.meta.env.VITE_IMGBB_KEY; // 🔑 replace with your key

const AddFood = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        foodName: '',
        foodQuantity: '',
        pickupLocation: '',
        expireDate: '',
        additionalNotes: '',
    });

    const handleChange = (e) => 
    {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const imageFile = form.image.files[0];

        const formData = new FormData();
        formData.append("image", imageFile);

        setLoading(true);

        try {

            const res = await fetch(`https://api.imgbb.com/1/upload?key=${apikey}`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            const imageUrl = data.data.display_url;

            const foodData = {
                foodname: form.foodName.value,
                quantity: Number(form.foodQuantity.value),
                pickupLocation: form.pickupLocation.value,
                expireDate: form.expireDate.value,
                additionalNotes: form.additionalNotes.value,
                image: imageUrl,
                username: user.displayName,
                userimage: user.photoURL,
                useremail: user.email,
            };

            // await fetch("http://localhost:3000/foods",
            await fetch("https://foodnest-community-food-sharing-platform-hoib.onrender.com/foods",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(foodData)
            });




            if (!res.ok) throw new Error('Failed to save food');

            Swal.fire({
                icon: 'success',
                title: 'Food Added! 🎉',
                text: 'Your food has been shared with the community.',
                confirmButtonColor: '#f59e0b',
            }).then(() => navigate('/available-foods'));

        }
        catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: err.message || 'Something went wrong. Please try again.',
                confirmButtonColor: '#f59e0b',
            });
        }
        finally {
            setLoading(false);
        }


    };



    const inputClass =
        'w-full bg-white border border-yellow-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-gray-800 text-sm rounded-xl px-4 py-3 placeholder-gray-400 outline-none transition-all duration-200';

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-50 to-orange-50 overflow-hidden py-16 px-4">

            {/* Background Blobs */}
            <div className="absolute -top-32 -left-24 w-72 h-72 bg-yellow-300 rounded-full opacity-30 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-yellow-300 rounded-full opacity-20 blur-3xl pointer-events-none"></div>

            {/* Card */}

            <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-xl border border-yellow-100 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-10">

                {/* Header */}
                <h1 className="text-4xl font-bold text-center mt-5 mb-10">
                    🍱 Add a <span className="text-amber-500">Food</span>
                </h1>

                {/* Donator Info */}
                <div className="bg-gradient-to-br from-yellow-50 mb-6 to-orange-50 border border-yellow-100 rounded-2xl shadow-md p-5">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                        Donator Info (auto-filled)
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img
                                src={user?.photoURL || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                                alt="Donator"
                                className="w-14 h-14 rounded-full border-4 border-white shadow-md object-cover"
                            />
                            <span className="absolute bottom-0.5 right-0.5 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-white"></span>
                        </div>
                        <div>
                            <p className="text-gray-900 font-bold text-sm">{user?.displayName || 'Food Lover'}</p>
                            <p className="text-gray-500 text-xs mt-0.5">{user?.email || 'user@email.com'}</p>
                        </div>
                        <span className="ml-auto bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
                            ✓ Verified
                        </span>
                    </div>
                </div>



                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Food Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            🍽️ Food Name <span className="text-orange-500">*</span>
                        </label>
                        <input
                            name="foodName"
                            type="text"
                            value={form.foodName}
                            onChange={handleChange}
                            placeholder="e.g. Homemade chicken biryani"
                            required
                            className={inputClass}
                        />
                    </div>

                    {/* food image */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            📸 Food Image <span className="text-orange-500">*</span>
                        </label>

                        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-yellow-300 hover:border-orange-400 bg-yellow-50/60 hover:bg-orange-50/60 rounded-2xl cursor-pointer transition-all duration-200 overflow-hidden">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-52 object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                                    <div className="text-4xl mb-3">🖼️</div>
                                    <p className="text-gray-600 text-sm font-semibold">Click to upload image</p>
                                    <p className="text-gray-400 text-xs mt-1">PNG, JPG, WEBP — hosted on imgbb</p>
                                </div>
                            )}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                        {imagePreview && (
                            <button
                                type="button"
                                onClick={() => { setImageFile(null); setImagePreview(null); }}
                                className="mt-2 text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                            >
                                ✕ Remove image
                            </button>
                        )}
                    </div>

                    {/* Quantity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                🥘 Food Quantity <span className="text-orange-500">*</span>
                            </label>
                            <input
                                name="foodQuantity"
                                type="text"
                                value={form.foodQuantity}
                                onChange={handleChange}
                                placeholder="e.g. Serves 4 people"
                                required
                                className={inputClass}
                            />
                        </div>

                        {/* location */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                📍 Pickup Location <span className="text-orange-500">*</span>
                            </label>
                            <input
                                name="pickupLocation"
                                type="text"
                                value={form.pickupLocation}
                                onChange={handleChange}
                                placeholder="e.g. Mirpur-10, Dhaka"
                                required
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Expire Date */}
                    <div >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            📅 Expire Date <span className="text-orange-500">*</span>
                        </label>

                        <input
                            name="expireDate"
                            type="date"
                            value={form.expireDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            required
                            className={inputClass}

                        />
                    </div>

                    {/* Additional Notes */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            📝 Additional Notes
                        </label>
                        <textarea
                            name="additionalNotes"
                            value={form.additionalNotes}
                            onChange={handleChange}
                            placeholder="Allergy info, serving suggestions, pickup instructions..."
                            rows={4}
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    {/* Food Status */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100 rounded-2xl p-5 flex items-center justify-between shadow-md">
                        <div>
                            <p className="text-sm font-bold text-gray-700">🟢 Food Status</p>
                            <p className="text-xs text-gray-400 mt-0.5">Automatically set on submission</p>
                        </div>
                        <span className="bg-green-100 text-green-700 border border-green-200 text-xs font-bold px-4 py-2 rounded-full">
                            Available
                        </span>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full cursor-pointer bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 hover:from-yellow-500 hover:to-orange-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 tracking-wide text-base"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Uploading & saving...
                            </span>
                        ) : (
                            '🍽️ Add Food to Community'
                        )}
                    </button>



                </form>
            </div>



        </div>
    );
};

export default AddFood;