import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-10">
            
            {/* Main Footer */}
            <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Logo + Description */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-3">🥗 FoodNest</h2>
                    <p className="text-sm leading-relaxed">
                        Share food, spread happiness. Reduce waste and help your community with FoodNest.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer">Home</li>
                        <li className="hover:text-white cursor-pointer">Available Foods</li>
                        <li className="hover:text-white cursor-pointer">Add Food</li>
                        <li className="hover:text-white cursor-pointer">My Requests</li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer">Help Center</li>
                        <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                        <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
                        <li className="hover:text-white cursor-pointer">Contact Us</li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Stay Updated</h3>
                    <p className="text-sm mb-3">Subscribe to get latest updates</p>
                    
                    <div className="flex items-center bg-gray-800 rounded-full overflow-hidden">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="bg-transparent px-4 py-2 text-sm outline-none w-full"
                        />
                        <button className="bg-yellow-400 text-black px-4 py-2 text-sm font-medium hover:bg-yellow-300 transition">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-700">
                <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">

                    <p>© {new Date().getFullYear()} FoodNest. All rights reserved.</p>

                    {/* Social Icons */}
                    <div className="flex gap-4 text-lg">
                        <span className="cursor-pointer hover:text-white">🌐</span>
                        <span className="cursor-pointer hover:text-white">📘</span>
                        <span className="cursor-pointer hover:text-white">🐦</span>
                        <span className="cursor-pointer hover:text-white">📸</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;