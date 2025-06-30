import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-32 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 tracking-tight">
              About
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 font-light">
              I believe in the power of simplicity. Every line of code, every design decision, 
              and every user interaction should serve a purpose. My approach combines clean 
              architecture with intuitive user experiences.
            </p>
            <p className="text-gray-600 leading-relaxed font-light">
              With a focus on modern JavaScript frameworks and minimalist design principles, 
              I create digital solutions that are both functional and beautiful.
            </p>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4 tracking-wide uppercase">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {['JavaScript', 'React', 'TypeScript', 'Node.js', 'CSS3'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-sm hover:bg-gray-100 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4 tracking-wide uppercase">
                Principles
              </h3>
              <ul className="space-y-2 text-gray-600 font-light">
                <li>• Clean, readable code</li>
                <li>• User-centered design</li>
                <li>• Performance optimization</li>
                <li>• Accessibility first</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}