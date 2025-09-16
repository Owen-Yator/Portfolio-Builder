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
            <Link to="/templates" className="text-gray-700 hover:text-indigo-600">
              Templates
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-indigo-600">
              Login
            </Link>
            <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
    
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Portfolio Builder
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Create stunning portfolios with ease
        </p>
        <div className="space-x-4">
          <Link to="/templates" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 inline-block">
            Get Started
          </Link>
          <Link to="/templates" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 inline-block">
            View Templates
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const Templates: React.FC = () => (
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
            <Link to="/" className="text-gray-700 hover:text-indigo-600">
              Home
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-indigo-600">
              Login
            </Link>
            <Link to="/dashboard" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
    
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Choose Your Template</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Modern', 'Classic', 'Minimal', 'Creative', 'Professional'].map((template) => (
          <div key={template} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              <span className="text-gray-500">{template} Preview</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{template}</h3>
            <p className="text-gray-600 mb-4">Perfect for showcasing your work professionally</p>
            <Link to="/editor" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 inline-block">
              Use Template
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
);

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
  const [portfolioData, setPortfolioData] = useState({
    title: 'My Portfolio',
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
        { company: 'Company Name', position: 'Position', description: 'Job description...' }
      ]
    },
    projects: {
      items: [
        { title: 'Project Name', description: 'Project description...', technologies: 'React, TypeScript' }
      ]
    },
    contact: {
      email: 'your.email@example.com',
      phone: '+1 234 567 8900',
      message: 'Get in touch with me!'
    }
  });

  const sections = ['Hero', 'About', 'Experience', 'Projects', 'Contact'];

  const renderSectionEditor = () => {
    switch (activeSection) {
      case 'Hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input 
                type="text" 
                value={portfolioData.hero.title}
                onChange={(e) => setPortfolioData(prev => ({
                  ...prev,
                  hero: { ...prev.hero, title: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input 
                type="text" 
                value={portfolioData.hero.subtitle}
                onChange={(e) => setPortfolioData(prev => ({
                  ...prev,
                  hero: { ...prev.hero, subtitle: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                value={portfolioData.hero.description}
                onChange={(e) => setPortfolioData(prev => ({
                  ...prev,
                  hero: { ...prev.hero, description: e.target.value }
                }))}
                rows={4} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
          </div>
        );
      case 'About':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">About Text</label>
              <textarea 
                value={portfolioData.about.text}
                onChange={(e) => setPortfolioData(prev => ({
                  ...prev,
                  about: { ...prev.about, text: e.target.value }
                }))}
                rows={8} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="Tell your story, background, and what drives you..."
              />
            </div>
          </div>
        );
      case 'Experience':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium">Work Experience</h4>
              <button 
                onClick={() => setPortfolioData(prev => ({
                  ...prev,
                  experience: {
                    ...prev.experience,
                    items: [...prev.experience.items, { company: '', position: '', description: '' }]
                  }
                }))}
                className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
              >
                Add Experience
              </button>
            </div>
            {portfolioData.experience.items.map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    placeholder="Company"
                    value={item.company}
                    onChange={(e) => {
                      const newItems = [...portfolioData.experience.items];
                      newItems[index] = { ...item, company: e.target.value };
                      setPortfolioData(prev => ({
                        ...prev,
                        experience: { ...prev.experience, items: newItems }
                      }));
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                  />
                  <input 
                    type="text" 
                    placeholder="Position"
                    value={item.position}
                    onChange={(e) => {
                      const newItems = [...portfolioData.experience.items];
                      newItems[index] = { ...item, position: e.target.value };
                      setPortfolioData(prev => ({
                        ...prev,
                        experience: { ...prev.experience, items: newItems }
                      }));
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                  />
                </div>
                <textarea 
                  placeholder="Job description and achievements"
                  value={item.description}
                  onChange={(e) => {
                    const newItems = [...portfolioData.experience.items];
                    newItems[index] = { ...item, description: e.target.value };
                    setPortfolioData(prev => ({
                      ...prev,
                      experience: { ...prev.experience, items: newItems }
                    }));
                  }}
                  rows={3} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                />
                <button 
                  onClick={() => {
                    const newItems = portfolioData.experience.items.filter((_, i) => i !== index);
                    setPortfolioData(prev => ({
                      ...prev,
                      experience: { ...prev.experience, items: newItems }
                    }));
                  }}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        );
      case 'Projects':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium">Projects</h4>
              <button 
                onClick={() => setPortfolioData(prev => ({
                  ...prev,
                  projects: {
                    ...prev.projects,
                    items: [...prev.projects.items, { title: '', description: '', technologies: '' }]
                  }
                }))}
                className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
              >
                Add Project
              </button>
            </div>
            {portfolioData.projects.items.map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-md space-y-3">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                />
                <textarea 
                  placeholder="Project description"
                  value={item.description}
                  onChange={(e) => {
                    const newItems = [...portfolioData.projects.items];
                    newItems[index] = { ...item, description: e.target.value };
                    setPortfolioData(prev => ({
                      ...prev,
                      projects: { ...prev.projects, items: newItems }
                    }));
                  }}
                  rows={3} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                />
                <input 
                  type="text" 
                  placeholder="Technologies used (e.g., React, TypeScript, Node.js)"
                  value={item.technologies}
                  onChange={(e) => {
                    const newItems = [...portfolioData.projects.items];
                    newItems[index] = { ...item, technologies: e.target.value };
                    setPortfolioData(prev => ({
                      ...prev,
                      projects: { ...prev.projects, items: newItems }
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                />
                <button 
                  onClick={() => {
                    const newItems = portfolioData.projects.items.filter((_, i) => i !== index);
                    setPortfolioData(prev => ({
                      ...prev,
                      projects: { ...prev.projects, items: newItems }
                    }));
                  }}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        );
      case 'Contact':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                value={portfolioData.contact.email}
                onChange={(e) => setPortfolioData(prev => ({
                  ...prev,
                  contact: { ...prev.contact, email: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input 
                type="tel" 
                value={portfolioData.contact.phone}
                onChange={(e) => setPortfolioData(prev => ({
                  ...prev,
                  contact: { ...prev.contact, phone: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Message</label>
              <textarea 
                value={portfolioData.contact.message}
                onChange={(e) => setPortfolioData(prev => ({
                  ...prev,
                  contact: { ...prev.contact, message: e.target.value }
                }))}
                rows={4} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="A message inviting people to get in touch..."
              />
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
            <div className="flex items-center">
              <Link to="/dashboard" className="text-2xl font-bold text-indigo-600">
                Portfolio Builder
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => alert('Portfolio saved!')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Save
              </button>
              <Link to="/preview" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
                Preview
              </Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex h-screen">
        <div className="w-80 bg-white shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Portfolio Editor</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Title</label>
              <input 
                type="text" 
                value={portfolioData.title}
                onChange={(e) => setPortfolioData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Sections</h3>
              <div className="space-y-2">
                {sections.map((section) => (
                  <div 
                    key={section} 
                    onClick={() => setActiveSection(section)}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      activeSection === section 
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{section}</span>
                    {activeSection === section && (
                      <span className="ml-2 text-indigo-600">→ Editing</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6">Edit {activeSection} Section</h2>
            {renderSectionEditor()}
          </div>
        </div>
      </div>
    </div>
  );
};

const Preview: React.FC = () => (
  <div className="min-h-screen">
    <div className="fixed top-4 right-4 z-50">
      <Link to="/editor" className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700">
        Edit Portfolio
      </Link>
    </div>
    
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">John Doe</h1>
        <h2 className="text-2xl mb-6">UI/UX Designer</h2>
        <p className="text-lg max-w-2xl mx-auto">Passionate about creating beautiful, user-centered digital experiences</p>
      </div>
    </section>
    
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
        <p className="text-lg text-gray-600 text-center">
          I'm a designer with over 5 years of experience creating digital products for startups and established companies.
        </p>
      </div>
    </section>
  </div>
);

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
