import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const PreviewPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const template = searchParams.get('template') || 'modern';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const templates = {
    modern: { 
      name: 'Modern', 
      gradient: 'from-blue-500 to-purple-600',
      accent: 'bg-blue-500',
      textAccent: 'text-blue-600'
    },
    minimal: { 
      name: 'Minimal', 
      gradient: 'from-gray-700 to-gray-900',
      accent: 'bg-gray-700',
      textAccent: 'text-gray-700'
    },
    creative: { 
      name: 'Creative', 
      gradient: 'from-pink-500 to-orange-500',
      accent: 'bg-pink-500',
      textAccent: 'text-pink-600'
    },
    professional: { 
      name: 'Professional', 
      gradient: 'from-indigo-600 to-blue-700',
      accent: 'bg-indigo-600',
      textAccent: 'text-indigo-600'
    },
    developer: { 
      name: 'Developer', 
      gradient: 'from-green-500 to-teal-600',
      accent: 'bg-green-500',
      textAccent: 'text-green-600'
    },
    designer: { 
      name: 'Designer', 
      gradient: 'from-purple-500 to-pink-600',
      accent: 'bg-purple-500',
      textAccent: 'text-purple-600'
    }
  };

  const currentTemplate = templates[template as keyof typeof templates] || templates.modern;

  const portfolioData = {
    fullName: 'John Doe',
    title: 'Full Stack Developer',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate full-stack developer with 5+ years of experience creating innovative web applications. I specialize in React, Node.js, and modern web technologies.',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    twitter: 'https://twitter.com/johndoe',
    skills: [
      { name: 'React', level: 90 },
      { name: 'JavaScript', level: 95 },
      { name: 'Node.js', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'MongoDB', level: 80 }
    ],
    experience: [
      {
        company: 'Tech Innovations Inc.',
        position: 'Senior Full Stack Developer',
        period: '2021 - Present',
        description: 'Lead development of modern web applications using React and Node.js. Mentored junior developers and improved team productivity by 40%.'
      },
      {
        company: 'StartupXYZ',
        position: 'Frontend Developer',
        period: '2019 - 2021',
        description: 'Developed responsive web applications and mobile-first designs. Collaborated with UI/UX designers to create exceptional user experiences.'
      }
    ],
    projects: [
      {
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/johndoe/ecommerce'
      },
      {
        title: 'Task Management App',
        description: 'Real-time collaborative task management application',
        technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
        liveUrl: 'https://taskapp.example.com',
        githubUrl: 'https://github.com/johndoe/taskapp'
      }
    ]
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Creating Your Portfolio...</h2>
          <p className="text-gray-600">We're building something beautiful for you!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-indigo-600">
                Portfolio Builder
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Live Preview</span>
              </div>
              <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">
                Dashboard
              </Link>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Publish Portfolio
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`bg-gradient-to-r ${currentTemplate.gradient} text-white py-20`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full mx-auto mb-8 flex items-center justify-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-800">
                  {portfolioData.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4">{portfolioData.fullName}</h1>
            <p className="text-2xl opacity-90 mb-6">{portfolioData.title}</p>
            <p className="text-lg opacity-80 max-w-3xl mx-auto mb-8">{portfolioData.bio}</p>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a href={portfolioData.linkedin} className="text-white hover:text-gray-200 transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href={portfolioData.github} className="text-white hover:text-gray-200 transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
            
            <div className="flex justify-center space-x-4">
              <span className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm">?? {portfolioData.email}</span>
              <span className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm">?? {portfolioData.phone}</span>
              <span className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm">?? {portfolioData.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
            <p className="text-xl text-gray-600">Technologies and tools I work with</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.skills.map((skill, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg text-gray-900">{skill.name}</h3>
                  <span className={`text-sm font-medium ${currentTemplate.textAccent}`}>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`${currentTemplate.accent} h-3 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience</h2>
            <p className="text-xl text-gray-600">My professional journey</p>
          </div>
          
          <div className="space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                    <p className={`text-lg font-semibold ${currentTemplate.textAccent}`}>{exp.company}</p>
                  </div>
                  <span className="text-gray-600 font-medium">{exp.period}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600">Some of my notable work</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className={`px-3 py-1 ${currentTemplate.accent} text-white text-sm rounded-full`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a href={project.liveUrl} className={`inline-flex items-center px-4 py-2 ${currentTemplate.accent} text-white rounded-lg hover:opacity-90 transition-opacity`}>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                    <a href={project.githubUrl} className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-20 bg-gradient-to-r ${currentTemplate.gradient} text-white`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl opacity-90 mb-8">Ready to bring your project to life? Let's connect!</p>
          
          <div className="flex justify-center space-x-6">
            <a href={`mailto:${portfolioData.email}`} className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Message
            </a>
            <a href={portfolioData.linkedin} className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">? 2024 {portfolioData.fullName}. Built with Portfolio Builder.</p>
        </div>
      </footer>

      {/* Success Banner */}
      <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Portfolio created successfully!
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
