import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] mt-8 text-center bg-base text-text px-4">
      <div className="relative mb-6">
        <FaArrowUp className="text-4xl text-overlay0 animate-bounce" />
        <p className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 text-xs w-[400px] text-text">Search your first stock</p>
      </div>
      <h1 className="text-6xl font-bold text-lavender mb-3">twinkle</h1>
      <p className="text-3xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 ">
        your symbol twinkling at the distance
      </p>
      <p className="text-lg text-overlay1-dark mb-4 max-w-2xl mx-auto px-4">
        Welcome to <span className="font-bold text-lavender">twinkle</span>, your charming companion for keeping an eye on your favorite stocks. ✨
      </p>
      <p className="text-lg text-overlay1-dark mb-8 max-w-2xl mx-auto px-4">
        Powered by our magical <span className="font-bold text-lavender">sparkle aggregator API</span>, twinkle makes it a breeze to stay updated with the latest stock prices in a delightful and user-friendly way.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
        <a
          href="https://code.lgbt/ryanamay/sparkle"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300"
        >
          View Sparkle Source Code on Code.lgbt
        </a>
        
        <a
          href="https://code.lgbt/ryanamay/twinkle"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300"
        >
          View Twinkle Source Code on Code.lgbt
        </a>
      </div>
    </div>
  );
};

export default HeroSection;