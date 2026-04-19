import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const FeaturedFoods = () => {
    const [food, setFoods] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3000/featured-foods")
        // fetch("https://foodnest-community-food-sharing-platform-hoib.onrender.com/featured-foods")
            .then((res) => res.json())
            .then((data) => {
                setFoods(data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);

    // ── Format date ───────────────────────────────────────────────────────────
    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric',
        });
    };

    // ── Expire badge color ────────────────────────────────────────────────────
    const expireBadge = (dateStr) => {
        if (!dateStr) return 'bg-gray-100 text-gray-500';
        const diff = (new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24);
        if (diff < 1) return 'bg-red-100 text-red-600 border-red-200';
        if (diff < 3) return 'bg-orange-100 text-orange-600 border-orange-200';
        return 'bg-green-100 text-green-700 border-green-200';
    };

    // ── Skeleton card ─────────────────────────────────────────────────────────
    const SkeletonCard = () => (
        <div className="bg-white/70 border border-yellow-100 rounded-2xl shadow-md overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-yellow-100"></div>
            <div className="p-5 space-y-3">
                <div className="h-4 bg-yellow-100 rounded w-3/4"></div>
                <div className="h-3 bg-yellow-100 rounded w-1/2"></div>
                <div className="h-3 bg-yellow-100 rounded w-2/3"></div>
                <div className="h-10 bg-orange-100 rounded-xl mt-4"></div>
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {
                loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) :
                    (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                            {food.map((food) => (
                                <div
                                    key={food._id}
                                    className="bg-white/70 backdrop-blur-xl border border-yellow-100 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col"
                                >
                                    {/* Food Image */}
                                    <div className="relative w-full h-48 overflow-hidden">
                                        <img
                                            src={food.image}
                                            alt={food.foodname}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Expire badge */}
                                        <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${expireBadge(food.expireDate)}`}>
                                            📅 {formatDate(food.expireDate)}
                                        </span>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-5 flex flex-col flex-1 gap-3">

                                        {/* Food Name */}
                                        <h2 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1">
                                            {food.foodname}
                                        </h2>

                                        {/* Donator */}
                                        <div className="flex  items-center gap-2">
                                            <img
                                                src={food.userimage || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                                                alt={food.username}
                                                className="w-7 h-7 rounded-full object-cover border-2 border-yellow-200"
                                            />
                                            <div>
                                                <p className="text-xs text-gray-400 leading-none">Donated by</p>
                                                <p className="text-xs font-semibold text-gray-700 leading-tight">{food.username || 'Anonymous'}</p>
                                            </div>
                                        </div>

                                        {/* Info Pills */}
                                        <div className="flex flex-wrap justify-between gap-2 mt-1">
                                            <span className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                                                🥘Quantity :  {food.quantity}
                                            </span>
                                            <span className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                                                📍 {food.pickupLocation}
                                            </span>
                                        </div>

                                        {/* View Details Button */}
                                        <button
                                            onClick={() => handleViewDetails(food._id)}
                                            className="mt-auto w-full cursor-pointer bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 hover:from-yellow-500 hover:to-orange-500 text-white font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-sm tracking-wide"
                                        >
                                            View Details →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    )
            }

        </div>
    );
};

export default FeaturedFoods;