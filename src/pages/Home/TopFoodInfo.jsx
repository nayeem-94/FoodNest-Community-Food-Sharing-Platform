import React from "react";

const TopFoodInfo = () => {
  return (
    <div className="max-w-5xl mx-auto text-center mt-20 pt-2 px-4">
      
      {/* Gradient Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold  mt-10  ">
        🔥 Top Quantity <span className="text-amber-500"> Foods </span> 
      </h2>

      {/* Subtitle */}
      <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-3xl pt-8 mx-auto">
        Discover the most popular foods that can serve the highest number of people.
        Perfect for sharing with friends, family, or events — these are our top picks
        based on serving capacity.
      </p>

      {/* Glass Card Highlight */}
      <div className="mt-10 flex justify-center">
        <div className="backdrop-blur-md bg-white/70 border border-gray-200 shadow-xl px-8 py-5 rounded-2xl flex items-center gap-3 hover:scale-105 transition duration-300">
          
          <span className="text-2xl">🍽️</span>
          
          <p className="text-gray-700 font-medium">
            Showing <span className="text-amber-600 font-bold">Top 6</span> foods with highest serving capacity
          </p>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="mt-10 flex justify-center">
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
      </div>

    </div>
  );
};

export default TopFoodInfo;