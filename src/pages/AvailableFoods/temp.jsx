import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from "../Provider/Authprovider";

const FoodDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [food, setFood] = useState(null);
    const [requesting, setRequesting] = useState(false);

    useEffect(() => {
         fetch(`http://localhost:3000/food/${id}`)
            .then((res) => res.json())
            .then((data) => setFood(data));
    }, [id]);

    // ── Helpers ───────────────────────────────────────────────────────────────

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric',
        });
    };

    const getExpireBadge = (dateStr) => {
        if (!dateStr) return { label: 'Unknown', cls: 'bg-gray-100 text-gray-500 border-gray-200' };
        const diff = (new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24);
        if (diff < 1) return { label: 'Expires today!', cls: 'bg-red-50 text-red-600 border-red-200' };
        if (diff < 3) return { label: `Expires in ${Math.ceil(diff)} days`, cls: 'bg-orange-50 text-orange-600 border-orange-200' };
        return { label: `Expires ${formatDate(dateStr)}`, cls: 'bg-green-50 text-green-700 border-green-200' };
    };

    // ── Request handler ───────────────────────────────────────────────────────

    const handleRequest = () => {
        if (!user) { navigate('/login'); return; }
        if (food.donator?.email === user.email) {
            Swal.fire({ icon: 'info', title: 'This is your food!', text: 'You cannot request your own donation.', confirmButtonColor: '#d97706' });
            return;
        }
        Swal.fire({
            title: 'Request this food?',
            html: `<p style="color:#6b7280;font-size:14px;">You are requesting <strong>${food.foodName}</strong>.<br/>Pickup at <strong>${food.pickupLocation}</strong>.</p>`,
            showCancelButton: true,
            confirmButtonText: 'Yes, request it',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d97706',
        }).then(async (result) => {
            if (!result.isConfirmed) return;
            setRequesting(true);
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/foods/${id}/request`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        requesterName: user.displayName,
                        requesterEmail: user.email,
                        requesterImage: user.photoURL,
                        requestDate: new Date().toISOString(),
                    }),
                });
                if (!res.ok) throw new Error('Request failed');
                Swal.fire({ icon: 'success', title: 'Request sent!', text: 'The donor will get in touch with you soon.', confirmButtonColor: '#d97706' })
                    .then(() => navigate('/available-foods'));
            } catch (err) {
                Swal.fire({ icon: 'error', title: 'Oops!', text: err.message, confirmButtonColor: '#d97706' });
            } finally {
                setRequesting(false);
            }
        });
    };

    // ── Loading state ─────────────────────────────────────────────────────────

    if (!food) return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center">
            <div className="text-center">
                <div className="text-5xl mb-4 animate-bounce">🍲</div>
                <p className="text-gray-400 font-medium text-sm animate-pulse">Loading food details...</p>
            </div>
        </div>
    );

    const expire = getExpireBadge(food.expireDate);

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen bg-amber-50 py-10 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-amber-600 transition-colors mb-7 cursor-pointer"
                >
                    <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
                    Back to available foods
                </button>

                {/* Main card */}
                <div className="bg-white border border-amber-100 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-2">

                    {/* ── Left: Image ─────────────────────────────────────── */}
                    <div className="relative overflow-hidden min-h-80">
                        <img
                            src={food.foodImage}
                            alt={food.foodName}
                            className="w-full h-full object-cover min-h-80 hover:scale-105 transition-transform duration-700"
                        />
                        {/* Dark overlay at bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />

                        {/* Quantity badge */}
                        <span className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                            {food.foodQuantity}
                        </span>

                        {/* Status badge */}
                        <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                            ✓ {food.food_status || 'Available'}
                        </span>
                    </div>

                    {/* ── Right: Details ──────────────────────────────────── */}
                    <div className="p-8 lg:p-10 flex flex-col gap-5">

                        {/* Title + expire */}
                        <div>
                            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-3">
                                {food.foodName}
                            </h1>
                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${expire.cls}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 inline-block"></span>
                                {expire.label}
                            </span>
                        </div>

                        {/* Info grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pickup</p>
                                <p className="text-sm font-semibold text-gray-800 leading-snug">{food.pickupLocation}</p>
                            </div>
                            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Expires</p>
                                <p className="text-sm font-semibold text-gray-800">{formatDate(food.expireDate)}</p>
                            </div>
                        </div>

                        {/* Notes */}
                        {food.additionalNotes && (
                            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Notes</p>
                                <p className="text-sm text-gray-500 italic leading-relaxed">"{food.additionalNotes}"</p>
                            </div>
                        )}

                        {/* Divider */}
                        <div className="h-px bg-amber-100" />

                        {/* Donator */}
                        <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-2xl p-4">
                            <div className="relative flex-shrink-0">
                                <img
                                    src={food.donator?.image || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                                    alt={food.donator?.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-amber-200"
                                />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Donated by</p>
                                <p className="text-sm font-bold text-gray-900 mt-0.5 truncate">{food.donator?.name || 'Anonymous'}</p>
                                <p className="text-xs text-gray-400 truncate">{food.donator?.email}</p>
                            </div>
                        </div>

                        {/* CTA */}
                        <button
                            onClick={handleRequest}
                            disabled={requesting}
                            className="mt-auto w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-2xl py-4 transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-md shadow-amber-100 tracking-wide"
                        >
                            {requesting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Sending request...
                                </span>
                            ) : (
                                'Request This Food →'
                            )}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;