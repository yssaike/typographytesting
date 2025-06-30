import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 tracking-tight">
          Let's Work Together
        </h2>
        
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          Have a project in mind? I'd love to hear about it and discuss how we can 
          bring your vision to life with clean, effective solutions.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <a
            href="mailto:hello@example.com"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm font-medium tracking-wide"
          >
            hello@example.com
          </a>
          <div className="w-px h-4 bg-gray-300 hidden sm:block"></div>
          <a
            href="tel:+1234567890"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm font-medium tracking-wide"
          >
            +1 (234) 567-890
          </a>
        </div>
        
        <div className="mt-16 pt-16 border-t border-gray-200">
          <p className="text-xs text-gray-500 tracking-wide">
            © 2024 Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}