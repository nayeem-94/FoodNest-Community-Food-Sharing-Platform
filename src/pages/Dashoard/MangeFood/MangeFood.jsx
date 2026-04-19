import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/Authprovider";

const MyFoods = () => {
    const { user } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        if (user?.email) {
        fetch(`https://foodnest-community-food-sharing-platform-hoib.onrender.com/my-foods?email=${user.email}`)
            // fetch(`http://localhost:3000/my-foods?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => setFoods(data));
        }
    }, [user]);

    return (
        <section className="relative bg-yellow-50 overflow-hidden py-15">
            {/* Floating blobs */}
            <div className="absolute -top-32 -left-24 w-72 h-72 bg-yellow-300 rounded-full opacity-30 filter blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-yellow-300 rounded-full opacity-25 filter blur-3xl pointer-events-none"></div>


            <div className=" relative min-h-screen z-10 py-10 px-4">
                <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold mb-3">
                            🍱 My Added <span className="text-amber-500">Foods</span>
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Total Foods Added: {foods.length}
                        </p>
                    </div>


                    {/* Table */}
                    <div className="overflow-x-auto rounded-xl border border-orange-100">
                        <table className="table w-full">
                            <thead className="bg-yellow-300 text-gray-800">
                                <tr>
                                    <th>#</th>
                                    <th>Food</th>
                                    <th>Quantity</th>
                                    <th>Pickup</th>
                                    <th>Expire Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {foods.map((food, index) => (
                                    <tr key={food._id} className="hover:bg-yellow-50 transition">
                                        <td>{index + 1}</td>

                                        <td>
                                            <div className="flex flex-col md:flex-row items-center gap-3">
                                                <img
                                                    src={food.image}
                                                    alt={food.foodname}
                                                    className="w-14 h-14 rounded-lg object-cover"
                                                />
                                                <span className="font-medium text-gray-800">
                                                    {food.foodname}
                                                </span>
                                            </div>
                                        </td>

                                        <td>{food.quantity}</td>
                                        <td>{food.pickupLocation}</td>
                                        <td>{food.expireDate}</td>

                                        <td>
                                            <span className="px-4 py-2  rounded-full text-sm font-semibold bg-green-100 text-green-700">
                                                Available
                                            </span>
                                        </td>

                                        <td>
                                            <div className="flex gap-3">
                                                <button className="px-4 py-2 cursor-pointer rounded-lg bg-blue-500 text-white text-sm font-semibold shadow-sm hover:bg-blue-600 transition">
                                                    Update
                                                </button>

                                                <button className="px-4 py-2 cursor-pointer rounded-lg bg-red-500 text-white text-sm font-semibold shadow-sm hover:bg-red-600 transition">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {foods.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-8 text-gray-500">
                                            No foods added yet 🍽️
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyFoods;