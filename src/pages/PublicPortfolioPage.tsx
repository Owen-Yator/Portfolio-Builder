import React from 'react';
import { useParams } from 'react-router-dom';

const PublicPortfolioPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Portfolio: {slug || 'Demo'}</h1>
            <div className="flex space-x-3">
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Print / Save PDF
              </button>
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = `http://localhost:5000/api/portfolios/public/${slug}/download`;
                  link.download = `portfolio-${slug}.html`;
                  link.click();
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Download HTML
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-8">
            {/* Demo Portfolio Content */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">John Doe</h1>
              <p className="text-xl text-gray-600 mb-4">Full Stack Developer</p>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Passionate developer with 5+ years of experience building scalable web applications. 
                Specialized in React, Node.js, and cloud technologies.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
                <div className="space-y-2">
                  {['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS'].map((skill) => (
                    <div key={skill} className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
                <div className="space-y-2">
                  <p className="text-gray-700">📧 john.doe@example.com</p>
                  <p className="text-gray-700">📱 +1 (555) 123-4567</p>
                  <p className="text-gray-700">🔗 linkedin.com/in/johndoe</p>
                  <p className="text-gray-700">💻 github.com/johndoe</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-indigo-600 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900">Senior Developer</h3>
                  <p className="text-gray-600">Tech Company • 2021 - Present</p>
                  <p className="text-gray-700 mt-2">
                    Lead development of customer-facing applications serving 100k+ users.
                  </p>
                </div>
                <div className="border-l-4 border-indigo-600 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900">Full Stack Developer</h3>
                  <p className="text-gray-600">Startup Inc • 2019 - 2021</p>
                  <p className="text-gray-700 mt-2">
                    Built MVP from scratch using React and Node.js, helping secure Series A funding.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">E-commerce Platform</h3>
                  <p className="text-gray-700 mb-3">
                    Full-stack e-commerce solution with React, Node.js, and PostgreSQL.
                  </p>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">React</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Node.js</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Task Management App</h3>
                  <p className="text-gray-700 mb-3">
                    Collaborative task management tool with real-time updates.
                  </p>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Vue.js</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Firebase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicPortfolioPage;
