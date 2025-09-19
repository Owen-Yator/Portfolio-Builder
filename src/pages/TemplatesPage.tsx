
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TemplatesPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean, contemporary design perfect for tech professionals',
      preview: '/api/placeholder/400/300',
      gradient: 'from-blue-500 to-purple-600',
      accent: 'bg-blue-500',
      features: ['Dark mode support', 'Animated sections', 'Mobile optimized']
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple, elegant layout focusing on content and readability',
      preview: '/api/placeholder/400/300',
      gradient: 'from-gray-700 to-gray-900',
      accent: 'bg-gray-700',
      features: ['Typography focused', 'Clean layouts', 'Fast loading']
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold, artistic design for designers and creative professionals',
      preview: '/api/placeholder/400/300',
      gradient: 'from-pink-500 to-orange-500',
      accent: 'bg-pink-500',
      features: ['Vibrant colors', 'Interactive elements', 'Portfolio showcase']
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Corporate-friendly design for business and consulting',
      preview: '/api/placeholder/400/300',
      gradient: 'from-indigo-600 to-blue-700',
      accent: 'bg-indigo-600',
      features: ['Conservative styling', 'Business focused', 'PDF export ready']
    },
    {
      id: 'developer',
      name: 'Developer',
      description: 'Code-focused template for software engineers and developers',
      preview: '/api/placeholder/400/300',
      gradient: 'from-green-500 to-teal-600',
      accent: 'bg-green-500',
      features: ['Code syntax highlighting', 'GitHub integration', 'Terminal theme']
    },
    {
      id: 'designer',
      name: 'Designer',
      description: 'Visual-first template showcasing design work and case studies',
      preview: '/api/placeholder/400/300',
      gradient: 'from-purple-500 to-pink-600',
      accent: 'bg-purple-500',
      features: ['Large imagery', 'Case study layouts', 'Color palettes']
    }
  ];

  const TemplatePreview = ({ template }: { template: typeof templates[0] }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">{template.name} Template Preview</h3>
            <button
              onClick={() => setSelectedTemplate(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Mock Portfolio Preview */}
          <div className={`bg-gradient-to-r ${template.gradient} rounded-lg p-8 text-white mb-6`}>
            <div className="text-center">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full"></div>
              </div>
              <h1 className="text-3xl font-bold mb-2">John Doe</h1>
              <p className="text-lg opacity-90 mb-4">Full Stack Developer</p>
              <p className="opacity-80 max-w-2xl mx-auto">
                Passionate about creating innovative solutions and beautiful user experiences.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Template Features</h4>
              <ul className="space-y-2">
                {template.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className={`w-2 h-2 ${template.accent} rounded-full mr-3`}></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">What You'll Get</h4>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Fully responsive design</li>
                <li>✓ Easy customization</li>
                <li>✓ SEO optimized</li>
                <li>✓ Fast loading times</li>
              </ul>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/create"
              className={`flex-1 ${template.accent} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-center`}
            >
              Use This Template
            </Link>
            <button
              onClick={() => setSelectedTemplate(null)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-indigo-600">
                Portfolio Builder
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">
                Dashboard
              </Link>
              <Link to="/" className="text-gray-700 hover:text-indigo-600">
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Perfect Template</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select a professionally designed template that matches your style and profession. 
            Each template is fully customizable and optimized for all devices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              {/* Template Preview */}
              <div className={`relative h-48 bg-gradient-to-r ${template.gradient} overflow-hidden`}>
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative h-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <div className="w-8 h-8 bg-white rounded"></div>
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 w-20 bg-white bg-opacity-40 rounded mx-auto"></div>
                      <div className="h-2 w-16 bg-white bg-opacity-30 rounded mx-auto"></div>
                    </div>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setSelectedTemplate(template.id)}
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold transform scale-95 group-hover:scale-100 transition-transform duration-300"
                  >
                    Preview Template
                  </button>
                </div>
              </div>
              
              {/* Template Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                  <div className={`w-3 h-3 ${template.accent} rounded-full`}></div>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">{template.description}</p>
                
                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
                  <div className="space-y-1">
                    {template.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className={`w-1.5 h-1.5 ${template.accent} rounded-full mr-2`}></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-3">
                  <Link
                    to="/create"
                    className={`flex-1 ${template.accent} text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity text-center text-sm`}
                  >
                    Use Template
                  </Link>
                  <button 
                    onClick={() => setSelectedTemplate(template.id)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Can't decide? Start with Modern!</h2>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Our most popular template combines professional design with modern aesthetics. 
              Perfect for any profession and fully customizable to match your style.
            </p>
            <Link 
              to="/create?template=modern"
              className="inline-flex items-center bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start with Modern Template
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Template Preview Modal */}
      {selectedTemplate && (
        <TemplatePreview template={templates.find(t => t.id === selectedTemplate)!} />
      )}
    </div>
  );
};

export default TemplatesPage;
