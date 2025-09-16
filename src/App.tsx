import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Simple components for now
const Home: React.FC = () => (
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
            <Link to="/templates" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Templates
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
    
    {/* Hero Section */}
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient with animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-gradient-shift bg-300%"></div>
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Floating shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      
      <div className="relative text-center max-w-5xl mx-auto px-4">
        <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          Build Your Perfect
          <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            Portfolio
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up">
          Create stunning, professional portfolios in minutes. Choose from beautiful templates 
          and customize them to showcase your work and skills perfectly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <Link 
            to="/templates" 
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started Free
          </Link>
          <Link 
            to="/templates" 
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
          >
            View Templates
          </Link>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white animate-slide-up">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">10,000+</div>
            <div className="text-gray-200">Portfolios Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">6</div>
            <div className="text-gray-200">Professional Templates</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">98%</div>
            <div className="text-gray-200">User Satisfaction</div>
          </div>
        </div>
      </div>
    </div>

    {/* Features Section */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Portfolio Builder?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional tools and beautiful templates to help you stand out from the crowd
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow transition-all duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
            <p className="text-gray-600 leading-relaxed">
              Create your portfolio in minutes with our intuitive editor and real-time preview
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow transition-all duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Templates</h3>
            <p className="text-gray-600 leading-relaxed">
              Choose from expertly designed templates perfect for any profession or industry
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow transition-all duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile Optimized</h3>
            <p className="text-gray-600 leading-relaxed">
              Your portfolio looks perfect on all devices, from desktop to mobile
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* How it Works Section */}
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Create Your Portfolio in 3 Simple Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get online in minutes, not hours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full text-xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">Choose Template</h3>
            <p className="text-gray-600 text-center">
              Pick from our collection of professionally designed templates that match your style
            </p>
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
          </div>

          <div className="relative">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full text-xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">Customize Content</h3>
            <p className="text-gray-600 text-center">
              Add your information, projects, and experience with our easy-to-use editor
            </p>
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
          </div>

          <div>
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full text-xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">Publish & Share</h3>
            <p className="text-gray-600 text-center">
              Preview your portfolio and share it with the world to land your dream job
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Build Your Portfolio?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of professionals who've already created their perfect portfolio
        </p>
        <Link 
          to="/signup" 
          className="inline-flex items-center bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Start Building Now - It's Free
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </section>
  </div>
);

const Templates: React.FC = () => {
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
                      <div className="h-2 bg-white bg-opacity-40 rounded w-20 mx-auto"></div>
                      <div className="h-2 bg-white bg-opacity-30 rounded w-16 mx-auto"></div>
                    </div>
                  </div>
                </div>
                <div className={`absolute top-4 right-4 w-3 h-3 ${template.accent} rounded-full shadow-lg`}></div>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    Template
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {template.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Link 
                    to={`/editor?template=${template.id}`}
                    className={`flex-1 bg-gradient-to-r ${template.gradient} text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 text-center font-medium`}
                  >
                    Use Template
                  </Link>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
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
              to="/editor?template=modern"
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
    </div>
  );
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/" className="flex justify-center">
            <h2 className="text-3xl font-bold text-indigo-600">Portfolio Builder</h2>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Link to="/dashboard" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </Link>
          </div>
          <div className="text-center">
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const SignUp: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="max-w-md w-full space-y-8">
      <div>
        <Link to="/" className="flex justify-center">
          <h2 className="text-3xl font-bold text-indigo-600">Portfolio Builder</h2>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>
      <form className="mt-8 space-y-6">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <Link to="/templates" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Get Started
          </Link>
        </div>
        <div className="text-center">
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const hasPortfolios = false; // For new users, set to false

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
              <Link to="/templates" className="text-gray-700 hover:text-indigo-600">
                Templates
              </Link>
              <Link to="/editor" className="text-gray-700 hover:text-indigo-600">
                Editor
              </Link>
              <Link to="/" className="text-gray-700 hover:text-indigo-600">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {!hasPortfolios ? (
          <div className="text-center">
            <div className="max-w-lg mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Portfolio Builder!</h1>
              <p className="text-xl text-gray-600 mb-8">
                Create your professional portfolio in minutes. Choose from beautiful templates and customize them to showcase your work.
              </p>
              <Link 
                to="/templates" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Your First Portfolio
              </Link>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Choose a Template</h3>
                <p className="text-gray-600">Pick from our collection of professional templates</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✏️</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Customize Content</h3>
                <p className="text-gray-600">Add your information, projects, and experience</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Publish & Share</h3>
                <p className="text-gray-600">Preview and share your portfolio with the world</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">My Portfolios</h1>
              <Link to="/templates" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Create New Portfolio
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((portfolio) => (
                <div key={portfolio} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Portfolio Preview {portfolio}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">My Portfolio {portfolio}</h3>
                    <p className="text-gray-600 mb-4">Created 2 days ago</p>
                    <div className="flex space-x-2">
                      <Link to="/editor" className="bg-indigo-600 text-white px-3 py-2 rounded text-sm hover:bg-indigo-700">
                        Edit
                      </Link>
                      <Link to="/preview" className="border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-50">
                        Preview
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Editor: React.FC = () => {
  const [activeSection, setActiveSection] = useState('Hero');
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  // Get template from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const selectedTemplate = urlParams.get('template') || 'modern';
  
  const [portfolioData, setPortfolioData] = useState(() => {
    // Try to load AI-generated portfolio first
    const aiGenerated = localStorage.getItem('aiGeneratedPortfolio');
    if (aiGenerated) {
      try {
        const aiData = JSON.parse(aiGenerated);
        localStorage.removeItem('aiGeneratedPortfolio'); // Remove after use
        
        // Create portfolio data from AI structure
        const baseData = {
          title: aiData.structure.title || 'My Portfolio',
          template: aiData.template || selectedTemplate,
          hero: {
            title: aiData.structure.title || 'Your Name',
            subtitle: 'Your Title',
            description: 'Brief description about yourself'
          },
          about: {
            text: 'Tell your story here...'
          },
          experience: {
            items: [
              { company: 'Company Name', position: 'Position', description: 'Job description...', startDate: '', endDate: '' }
            ]
          },
          projects: {
            items: aiData.structure.projectIdeas?.map((idea: string) => ({
              title: idea,
              description: 'Project description...',
              technologies: aiData.structure.skills?.slice(0, 3) || ['Technology'],
              link: '',
              github: ''
            })) || [
              { title: 'Project Name', description: 'Project description...', technologies: ['React', 'TypeScript'], link: '', github: '' }
            ]
          },
          education: {
            items: [
              { school: 'University Name', degree: 'Degree', field: 'Field of Study', year: '', gpa: '' }
            ]
          },
          skills: {
            items: aiData.structure.skills || ['JavaScript', 'React', 'TypeScript']
          },
          contact: {
            email: '',
            phone: '',
            location: '',
            linkedin: '',
            github: '',
            website: ''
          }
        };
        
        return baseData;
      } catch (e) {
        console.error('Failed to parse AI-generated portfolio data');
      }
    }
    
    // Try to load from localStorage draft
    const saved = localStorage.getItem('portfolio-draft');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved portfolio data');
      }
    }
    
    // Default data based on template
    return {
      title: 'My Portfolio',
      template: selectedTemplate,
      hero: {
        title: 'Your Name',
        subtitle: 'Your Title',
        description: 'Brief description about yourself'
      },
      about: {
        text: 'Tell your story here...'
      },
      experience: {
        items: [
          { company: 'Company Name', position: 'Position', description: 'Job description...', startDate: '', endDate: '' }
        ]
      },
      projects: {
        items: [
          { title: 'Project Name', description: 'Project description...', technologies: 'React, TypeScript', url: '', image: '' }
        ]
      },
      skills: {
        items: ['JavaScript', 'React', 'TypeScript', 'Node.js']
      },
      contact: {
        email: 'your.email@example.com',
        phone: '+1 234 567 8900',
        message: 'Get in touch with me!',
        linkedin: '',
        github: ''
      }
    };
  });

  // Auto-save functionality
  React.useEffect(() => {
    const saveToLocal = () => {
      setIsAutoSaving(true);
      localStorage.setItem('portfolio-draft', JSON.stringify(portfolioData));
      setTimeout(() => {
        setIsAutoSaving(false);
        setLastSaved(new Date());
      }, 500);
    };

    const timeoutId = setTimeout(saveToLocal, 1000);
    return () => clearTimeout(timeoutId);
  }, [portfolioData]);

  const sections = [
    { id: 'Hero', icon: '🏠', description: 'Main banner with your name and title' },
    { id: 'About', icon: '👤', description: 'Tell your story and background' },
    { id: 'Experience', icon: '💼', description: 'Work history and achievements' },
    { id: 'Projects', icon: '🚀', description: 'Showcase your best work' },
    { id: 'Skills', icon: '⚡', description: 'Technical and soft skills' },
    { id: 'Contact', icon: '📧', description: 'How people can reach you' }
  ];

  const addSkill = () => {
    setPortfolioData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        items: [...prev.skills.items, '']
      }
    }));
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...portfolioData.skills.items];
    newSkills[index] = value;
    setPortfolioData(prev => ({
      ...prev,
      skills: { ...prev.skills, items: newSkills }
    }));
  };

  const removeSkill = (index: number) => {
    const newSkills = portfolioData.skills.items.filter((_, i) => i !== index);
    setPortfolioData(prev => ({
      ...prev,
      skills: { ...prev.skills, items: newSkills }
    }));
  };

  const renderSectionEditor = () => {
    switch (activeSection) {
      case 'Hero':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                <input 
                  type="text" 
                  value={portfolioData.hero.title}
                  onChange={(e) => setPortfolioData(prev => ({
                    ...prev,
                    hero: { ...prev.hero, title: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                  placeholder="e.g., John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Title</label>
                <input 
                  type="text" 
                  value={portfolioData.hero.subtitle}
                  onChange={(e) => setPortfolioData(prev => ({
                    ...prev,
                    hero: { ...prev.hero, subtitle: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                  placeholder="e.g., Full Stack Developer"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Summary</label>
              <textarea 
                value={portfolioData.hero.description}
                onChange={(e) => setPortfolioData(prev => ({
                  ...prev,
                  hero: { ...prev.hero, description: e.target.value }
                }))}
                rows={4} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                placeholder="A compelling one-liner about what you do and what makes you unique..."
              />
              <p className="text-sm text-gray-500 mt-1">This appears prominently on your homepage. Keep it concise and impactful.</p>
            </div>
          </div>
        );

      case 'About':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">About You</label>
              <textarea 
                value={portfolioData.about.text}
                onChange={(e) => setPortfolioData(prev => ({
                  ...prev,
                  about: { ...prev.about, text: e.target.value }
                }))}
                rows={10} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                placeholder="Tell your professional story. Include your background, passion, what drives you, and what you're working toward. This is where you can really connect with visitors..."
              />
              <p className="text-sm text-gray-500 mt-1">Aim for 150-300 words. Share your journey, values, and what makes you passionate about your work.</p>
            </div>
          </div>
        );

      case 'Skills':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Skills & Technologies</h4>
                <p className="text-sm text-gray-600">Add the skills that best represent your expertise</p>
              </div>
              <button 
                onClick={addSkill}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Skill</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolioData.skills.items.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <input 
                    type="text" 
                    placeholder="e.g., React, Python, Design..."
                    value={skill}
                    onChange={(e) => updateSkill(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                  />
                  <button 
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Experience':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Work Experience</h4>
                <p className="text-sm text-gray-600">List your most relevant professional experience</p>
              </div>
              <button 
                onClick={() => setPortfolioData(prev => ({
                  ...prev,
                  experience: {
                    ...prev.experience,
                    items: [...prev.experience.items, { company: '', position: '', description: '', startDate: '', endDate: '' }]
                  }
                }))}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Experience</span>
              </button>
            </div>
            <div className="space-y-6">
              {portfolioData.experience.items.map((item, index) => (
                <div key={index} className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <h5 className="font-semibold text-gray-900">Experience #{index + 1}</h5>
                    <button 
                      onClick={() => {
                        const newItems = portfolioData.experience.items.filter((_, i) => i !== index);
                        setPortfolioData(prev => ({
                          ...prev,
                          experience: { ...prev.experience, items: newItems }
                        }));
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Company Name"
                      value={item.company}
                      onChange={(e) => {
                        const newItems = [...portfolioData.experience.items];
                        newItems[index] = { ...item, company: e.target.value };
                        setPortfolioData(prev => ({
                          ...prev,
                          experience: { ...prev.experience, items: newItems }
                        }));
                      }}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                    />
                    <input 
                      type="text" 
                      placeholder="Job Title"
                      value={item.position}
                      onChange={(e) => {
                        const newItems = [...portfolioData.experience.items];
                        newItems[index] = { ...item, position: e.target.value };
                        setPortfolioData(prev => ({
                          ...prev,
                          experience: { ...prev.experience, items: newItems }
                        }));
                      }}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Start Date (e.g., Jan 2022)"
                      value={item.startDate}
                      onChange={(e) => {
                        const newItems = [...portfolioData.experience.items];
                        newItems[index] = { ...item, startDate: e.target.value };
                        setPortfolioData(prev => ({
                          ...prev,
                          experience: { ...prev.experience, items: newItems }
                        }));
                      }}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                    />
                    <input 
                      type="text" 
                      placeholder="End Date (e.g., Present)"
                      value={item.endDate}
                      onChange={(e) => {
                        const newItems = [...portfolioData.experience.items];
                        newItems[index] = { ...item, endDate: e.target.value };
                        setPortfolioData(prev => ({
                          ...prev,
                          experience: { ...prev.experience, items: newItems }
                        }));
                      }}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                    />
                  </div>
                  <textarea 
                    placeholder="Describe your role, responsibilities, and key achievements. Use bullet points or paragraphs..."
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...portfolioData.experience.items];
                      newItems[index] = { ...item, description: e.target.value };
                      setPortfolioData(prev => ({
                        ...prev,
                        experience: { ...prev.experience, items: newItems }
                      }));
                    }}
                    rows={4} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'Projects':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Projects</h4>
                <p className="text-sm text-gray-600">Showcase your best work and accomplishments</p>
              </div>
              <button 
                onClick={() => setPortfolioData(prev => ({
                  ...prev,
                  projects: {
                    ...prev.projects,
                    items: [...prev.projects.items, { title: '', description: '', technologies: '', url: '', image: '' }]
                  }
                }))}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Project</span>
              </button>
            </div>
            <div className="space-y-6">
              {portfolioData.projects.items.map((item, index) => (
                <div key={index} className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <h5 className="font-semibold text-gray-900">Project #{index + 1}</h5>
                    <button 
                      onClick={() => {
                        const newItems = portfolioData.projects.items.filter((_, i) => i !== index);
                        setPortfolioData(prev => ({
                          ...prev,
                          projects: { ...prev.projects, items: newItems }
                        }));
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Project Title"
                    value={item.title}
                    onChange={(e) => {
                      const newItems = [...portfolioData.projects.items];
                      newItems[index] = { ...item, title: e.target.value };
                      setPortfolioData(prev => ({
                        ...prev,
                        projects: { ...prev.projects, items: newItems }
                      }));
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="url" 
                      placeholder="Project URL (optional)"
                      value={item.url}
                      onChange={(e) => {
                        const newItems = [...portfolioData.projects.items];
                        newItems[index] = { ...item, url: e.target.value };
                        setPortfolioData(prev => ({
                          ...prev,
                          projects: { ...prev.projects, items: newItems }
                        }));
                      }}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                    />
                    <input 
                      type="text" 
                      placeholder="Technologies (e.g., React, Node.js)"
                      value={item.technologies}
                      onChange={(e) => {
                        const newItems = [...portfolioData.projects.items];
                        newItems[index] = { ...item, technologies: e.target.value };
                        setPortfolioData(prev => ({
                          ...prev,
                          projects: { ...prev.projects, items: newItems }
                        }));
                      }}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                    />
                  </div>
                  <textarea 
                    placeholder="Describe the project, your role, challenges you solved, and the impact it had..."
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...portfolioData.projects.items];
                      newItems[index] = { ...item, description: e.target.value };
                      setPortfolioData(prev => ({
                        ...prev,
                        projects: { ...prev.projects, items: newItems }
                      }));
                    }}
                    rows={4} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'Contact':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
              <p className="text-sm text-gray-600 mb-6">Add the ways people can reach out to you</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={portfolioData.contact.email}
                  onChange={(e) => setPortfolioData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, email: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number (Optional)</label>
                <input 
                  type="tel" 
                  value={portfolioData.contact.phone}
                  onChange={(e) => setPortfolioData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, phone: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn Profile</label>
                <input 
                  type="url" 
                  value={portfolioData.contact.linkedin}
                  onChange={(e) => setPortfolioData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, linkedin: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                  placeholder="https://linkedin.com/in/yourname"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">GitHub Profile</label>
                <input 
                  type="url" 
                  value={portfolioData.contact.github}
                  onChange={(e) => setPortfolioData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, github: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                  placeholder="https://github.com/yourname"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Message</label>
              <textarea 
                value={portfolioData.contact.message}
                onChange={(e) => setPortfolioData(prev => ({
                  ...prev,
                  contact: { ...prev.contact, message: e.target.value }
                }))}
                rows={4} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                placeholder="A friendly message inviting people to get in touch..."
              />
              <p className="text-sm text-gray-500 mt-1">This appears on your contact section to encourage visitors to reach out.</p>
            </div>
          </div>
        );

      default:
        return <div>Select a section to edit</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-2xl font-bold text-indigo-600">
                Portfolio Builder
              </Link>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <span>Template:</span>
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium capitalize">
                  {selectedTemplate}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Auto-save indicator */}
              <div className="hidden md:flex items-center space-x-2 text-sm">
                {isAutoSaving ? (
                  <div className="flex items-center text-indigo-600">
                    <svg className="animate-spin w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Saving...
                  </div>
                ) : lastSaved ? (
                  <span className="text-green-600">
                    ✓ Saved {lastSaved.toLocaleTimeString()}
                  </span>
                ) : null}
              </div>
              
              <button 
                onClick={() => setShowPreview(!showPreview)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  showPreview 
                    ? 'bg-indigo-600 text-white' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              
              <Link to="/preview" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
                Full Preview
              </Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-lg p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Portfolio Editor</h2>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Portfolio Title</label>
              <input 
                type="text" 
                value={portfolioData.title}
                onChange={(e) => setPortfolioData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                placeholder="My Awesome Portfolio"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sections</h3>
              <div className="space-y-3">
                {sections.map((section) => (
                  <div 
                    key={section.id} 
                    onClick={() => setActiveSection(section.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      activeSection === section.id 
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md' 
                        : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{section.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{section.id}</span>
                          {activeSection === section.id && (
                            <span className="text-indigo-600 text-sm">→ Editing</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{section.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${showPreview ? 'w-1/2' : 'w-full'}`}>
          <div className="p-8 overflow-y-auto h-full">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-2xl">
                  {sections.find(s => s.id === activeSection)?.icon}
                </span>
                <h2 className="text-2xl font-bold text-gray-900">
                  Edit {activeSection} Section
                </h2>
              </div>
              {renderSectionEditor()}
            </div>
          </div>
        </div>
        
        {/* Live Preview Sidebar */}
        {showPreview && (
          <div className="w-1/2 border-l border-gray-200 bg-white overflow-y-auto">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Live Preview</h3>
              <p className="text-sm text-gray-600">See your changes in real-time</p>
            </div>
            <div className="p-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg text-center">
                <h1 className="text-3xl font-bold mb-2">{portfolioData.hero.title || 'Your Name'}</h1>
                <h2 className="text-xl mb-4">{portfolioData.hero.subtitle || 'Your Title'}</h2>
                <p className="text-lg opacity-90">{portfolioData.hero.description || 'Your description'}</p>
              </div>
              
              <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed">
                  {portfolioData.about.text || 'Your about section will appear here...'}
                </p>
              </div>
              
              {portfolioData.skills.items.length > 0 && (
                <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {portfolioData.skills.items.map((skill, index) => (
                      skill && (
                        <span key={index} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Preview: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState(null);

  React.useEffect(() => {
    // Load the portfolio data from localStorage
    const saved = localStorage.getItem('portfolio-draft');
    if (saved) {
      try {
        setPortfolioData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved portfolio data');
      }
    }
  }, []);

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-50 flex space-x-3">
        <Link to="/editor" className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700 flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Edit Portfolio</span>
        </Link>
        <button 
          onClick={() => window.print()}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>Print</span>
        </button>
      </div>
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white relative">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            {portfolioData.hero?.title || 'Your Name'}
          </h1>
          <h2 className="text-2xl md:text-3xl mb-8 text-blue-100 animate-slide-up">
            {portfolioData.hero?.subtitle || 'Your Title'}
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-slide-up">
            {portfolioData.hero?.description || 'Your professional summary goes here'}
          </p>
          <div className="mt-8 animate-bounce-light">
            <svg className="w-8 h-8 mx-auto text-white opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      {portfolioData.about?.text && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">About Me</h2>
            <div className="prose prose-lg mx-auto text-center">
              <p className="text-xl text-gray-600 leading-relaxed whitespace-pre-line">
                {portfolioData.about.text}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {portfolioData.skills?.items?.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Skills & Technologies</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {portfolioData.skills.items.map((skill, index) => (
                skill && (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                    <span className="font-medium text-gray-900">{skill}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Experience Section */}
      {portfolioData.experience?.items?.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Experience</h2>
            <div className="space-y-8">
              {portfolioData.experience.items.map((exp, index) => (
                (exp.company || exp.position) && (
                  <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{exp.position || 'Position'}</h3>
                        <h4 className="text-xl text-indigo-600 font-semibold">{exp.company || 'Company'}</h4>
                      </div>
                      {(exp.startDate || exp.endDate) && (
                        <div className="text-gray-600 font-medium mt-2 md:mt-0">
                          {exp.startDate} {exp.startDate && exp.endDate && '—'} {exp.endDate}
                        </div>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {portfolioData.projects?.items?.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData.projects.items.map((project, index) => (
                project.title && (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-900">{project.title}</h3>
                      {project.description && (
                        <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                      )}
                      {project.technologies && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.split(',').map((tech, techIndex) => (
                              <span key={techIndex} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm">
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          View Project
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            {portfolioData.contact?.message || "I'd love to hear from you. Let's connect!"}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {portfolioData.contact?.email && (
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-lg font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.08a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Me
              </a>
            )}
            {portfolioData.contact?.linkedin && (
              <a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-700 hover:bg-blue-800 px-8 py-4 rounded-lg font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
                LinkedIn
              </a>
            )}
            {portfolioData.contact?.github && (
              <a
                href={portfolioData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-lg font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
            )}
          </div>
          {portfolioData.contact?.phone && (
            <p className="mt-8 text-gray-300">
              Or call me at{' '}
              <a href={`tel:${portfolioData.contact.phone}`} className="text-indigo-400 hover:text-indigo-300">
                {portfolioData.contact.phone}
              </a>
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-4">Page not found</p>
                <Link to="/" className="text-indigo-600 hover:text-indigo-500">Return to Home</Link>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
