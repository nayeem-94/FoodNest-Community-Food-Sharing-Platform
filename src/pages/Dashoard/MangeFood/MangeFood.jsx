import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/Authprovider";
import Swal from 'sweetalert2';

const MyFoods = () => {
    const { user } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFood, setSelectedFood] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://foodnest-community-food-sharing-platform-hoib.onrender.com/my-foods?email=${user.email}`)
            // fetch(`http://localhost:3000/my-foods?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setFoods(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [user]);


    const handleUpdate = async (e, id) => {
        e.preventDefault();
        const form = e.target;

        const updatedFood = {
            foodname: form.foodname.value,
            quantity: parseInt(form.quantity.value),
            pickupLocation: form.pickupLocation.value,
            expireDate: form.expireDate.value,
            additionalNotes: form.additionalNotes.value,
        };

        try {
            // const res = await fetch(`http://localhost:3000/foods/${id}`, {
            const res = await fetch(`https://foodnest-community-food-sharing-platform-hoib.onrender.com/foods/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedFood),
            });

            const data = await res.json();

            if (data.modifiedCount > 0 || data.matchedCount > 0) {
                const updatedFoods = foods.map(food =>
                    food._id === id ? { ...food, ...updatedFood } : food
                );

                setFoods(updatedFoods);
                setSelectedFood(null);
                Swal.fire({
                    title: "Success!",
                    text: "Food details updated successfully.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    timer: 2000
                });


                console.log("Update successful");
            } else {
                Swal.fire({
                    title: "No Changes",
                    text: "You didn't change any information.",
                    icon: "info"
                });
                // alert("No changes were made or item not found.");
            }

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "Something went wrong while updating the food item. Please try again later.",
                confirmButtonColor: "#ef4444",
            });
        }
    };

    const handleDelete = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444", // Red for delete
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {

            const res = await fetch(`https://foodnest-community-food-sharing-platform-hoib.onrender.com/foods/${id}`, {
                // const res = await fetch(`http://localhost:3000/foods/${id}`, {
                    method: "DELETE",
                });
                const data = await res.json();

                if (data.deletedCount > 0) 
                {
                    Swal.fire("Deleted!", "Your food item has been removed.", "success");
                    const remainingFoods = foods.filter(food => food._id !== id);
                    setFoods(remainingFoods);
                }
            } catch (error) {
                console.error("Delete failed:", error);
                Swal.fire("Error!", "Could not delete the item.", "error");
            }
        }
    });
};

    // ── Skeleton card ─────────────────────────────────────────────────────────
    const SkeletonCard = () => (
        <tr className="animate-pulse">
            <td><div className="h-4 w-6 bg-gray-200 rounded"></div></td>

            <td>
                <div className="flex flex-col md:flex-row items-center gap-3">
                    <div className="w-14 h-14 rounded-lg bg-gray-200"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
            </td>

            <td><div className="h-4 w-12 bg-gray-200 rounded"></div></td>
            <td><div className="h-4 w-24 bg-gray-200 rounded"></div></td>
            <td><div className="h-4 w-20 bg-gray-200 rounded"></div></td>
            <td><div className="h-8 w-24 bg-gray-200 rounded-full"></div></td>

            <td>
                <div className="flex gap-3">
                    <div className="h-10 w-20 bg-gray-200 rounded-lg"></div>
                    <div className="h-10 w-20 bg-gray-200 rounded-lg"></div>
                </div>
            </td>
        </tr>
    );

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
                                {
                                    loading ?
                                        (
                                            [...Array(5)].map((_, index) => <SkeletonCard key={index} />)
                                        ) : (

                                            foods.map((food, index) => (
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
                                                            <button onClick={() => setSelectedFood(food)} className="px-4 py-2 cursor-pointer rounded-lg bg-blue-500 text-white text-sm font-semibold shadow-sm hover:bg-blue-600 transition">
                                                                Update
                                                            </button>

                                                            <button onClick={() => handleDelete(food._id)} className="px-4 py-2 cursor-pointer rounded-lg bg-red-500 text-white text-sm font-semibold shadow-sm hover:bg-red-600 transition">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))

                                        )
                                }

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

            {selectedFood && (
                /* Clicking the overlay will now close the modal */
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                    onClick={() => setSelectedFood(null)}
                >
                    {/* StopPropagation prevents the modal from closing when clicking inside the white box */}
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                            Update Food Details
                        </h2>

                        <form
                            onSubmit={(e) => handleUpdate(e, selectedFood._id)}
                            className="space-y-5"
                        >
                            {/* Food Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Food Name</label>
                                <input
                                    type="text"
                                    name="foodname"
                                    defaultValue={selectedFood.foodname}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    required
                                />
                            </div>

                            {/* Quantity & Date Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        defaultValue={selectedFood.quantity}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Expire Date</label>
                                    <input
                                        type="date"
                                        name="expireDate"
                                        defaultValue={selectedFood.expireDate}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Pickup Location */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Pickup Location</label>
                                <input
                                    type="text"
                                    name="pickupLocation"
                                    defaultValue={selectedFood.pickupLocation}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    required
                                />
                            </div>

                            {/* Additional Notes */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Notes</label>
                                <textarea
                                    name="additionalNotes"
                                    defaultValue={selectedFood.additionalNotes}
                                    rows="3"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setSelectedFood(null)}
                                    className="px-6 py-2 rounded-lg bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md transition cursor-pointer"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MyFoods;