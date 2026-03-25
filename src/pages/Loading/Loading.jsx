import React from 'react';

const Loading = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-4">
            <span className="loading loading-spinner loading-xl text-warning"></span>
            <p className="text-gray-500 text-lg">Loading, please wait...</p>
        </div>
    );
};


export default Loading;