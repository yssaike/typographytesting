import React from 'react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight leading-tight">
          Clean Code,
          <br />
          <span className="text-gray-600">Beautiful Solutions</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          Crafting elegant web experiences through minimalist design 
          and thoughtful JavaScript development.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="px-8 py-4 bg-gray-900 text-white text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors duration-300 rounded-sm">
            View My Work
          </button>
          <button className="px-8 py-4 text-gray-600 text-sm font-medium tracking-wide hover:text-gray-900 transition-colors duration-300 border border-gray-300 hover:border-gray-400 rounded-sm">
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
}