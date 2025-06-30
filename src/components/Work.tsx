import React from 'react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  year: string;
}

export default function Work() {
  const projects: Project[] = [
    {
      title: 'E-commerce Platform',
      description: 'A minimal, fast-loading online store with focus on user experience and conversion optimization.',
      tech: ['React', 'Node.js', 'Stripe'],
      year: '2024'
    },
    {
      title: 'Portfolio Website',
      description: 'Clean, responsive portfolio showcasing creative work with smooth animations and intuitive navigation.',
      tech: ['JavaScript', 'CSS3', 'Webpack'],
      year: '2024'
    },
    {
      title: 'Task Management App',
      description: 'Streamlined productivity tool with drag-and-drop functionality and real-time collaboration.',
      tech: ['TypeScript', 'React', 'WebSocket'],
      year: '2023'
    }
  ];

  return (
    <section id="work" className="py-32 px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-16 tracking-tight">
          Selected Work
        </h2>
        
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="bg-white p-8 md:p-12 hover:shadow-lg transition-all duration-500 rounded-sm border border-gray-100 hover:border-gray-200">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-2 md:mb-0 group-hover:text-gray-700 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-sm text-gray-500 font-medium tracking-wide">
                    {project.year}
                  </span>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-6 font-light">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}