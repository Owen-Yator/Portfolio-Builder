import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

// Types
interface PortfolioData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  skills: string[];
  experience: any[];
  education: any[];
  projects: any[];
  github: string;
  linkedin: string;
  website: string;
  twitter: string;
  languages: string[];
  certifications: string[];
  interests: string[];
  theme: string;
  template: string;
}

interface Portfolio {
  id: string;
  userId: string;
  title: string;
  template: string;
  data: PortfolioData;
  isPublic: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Home Page Component
const HomePage: React.FC = () => (
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
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <div className="relative text-center max-w-5xl mx-auto px-4">
        <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
          Build Your Perfect
          <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            Portfolio
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          Create stunning, professional portfolios in minutes. Choose from beautiful templates 
          and customize them to showcase your work and skills perfectly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/create" 
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Creating →
          </Link>
          <Link 
            to="/templates" 
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
          >
            View Templates
          </Link>
        </div>
      </div>
    </div>

    {/* Features Section */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Portfolio Builder?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create a professional portfolio that stands out
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Create your portfolio in minutes, not hours</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile Responsive</h3>
            <p className="text-gray-600">Looks perfect on all devices and screen sizes</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Print Ready</h3>
            <p className="text-gray-600">Export as PDF or print directly from your browser</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// Templates Page Component
const TemplatesPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean, contemporary design perfect for tech professionals',
      gradient: 'from-blue-500 to-purple-600',
      features: ['Dark mode support', 'Animated sections', 'Mobile optimized']
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple, elegant layout focusing on content and readability',
      gradient: 'from-gray-700 to-gray-900',
      features: ['Typography focused', 'Clean layouts', 'Fast loading']
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold, artistic design for designers and creative professionals',
      gradient: 'from-pink-500 to-orange-500',
      features: ['Vibrant colors', 'Interactive elements', 'Portfolio showcase']
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Corporate-friendly design for business and consulting',
      gradient: 'from-indigo-600 to-blue-700',
      features: ['Conservative styling', 'Business focused', 'PDF export ready']
    },
    {
      id: 'developer',
      name: 'Developer',
      description: 'Code-focused template for software engineers and developers',
      gradient: 'from-green-500 to-teal-600',
      features: ['Terminal styling', 'Code syntax highlighting', 'GitHub integration']
    }
  ];

  const handleUseTemplate = (templateId: string) => {
    navigate(`/create?template=${templateId}`);
  };

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
              <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Home
              </Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Template</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select from our professionally designed templates and customize them to match your style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className={`h-40 bg-gradient-to-br ${template.gradient} relative`}>
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{template.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{template.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {template.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedTemplate(template.id)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleUseTemplate(template.id)}
                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Template Preview</h2>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="border rounded-lg p-8 bg-gray-50">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Template Preview</h3>
                    <p className="text-gray-600 mb-4">This is how your portfolio will look</p>
                    <button
                      onClick={() => handleUseTemplate(selectedTemplate)}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Start with this template
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Portfolio Creation Form Component
const PortfolioCreationForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  
  // Get template from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const template = urlParams.get('template');
    if (template) {
      setSelectedTemplate(template);
    }
  }, []);

  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    skills: [],
    experience: [],
    education: [],
    projects: [],
    github: '',
    linkedin: '',
    website: '',
    twitter: '',
    languages: [],
    certifications: [],
    interests: [],
    theme: 'modern',
    template: selectedTemplate || 'modern'
  });

  const [isCreating, setIsCreating] = useState(false);

  // Helper functions for dynamic lists
  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      company: '',
      position: '',
      duration: '',
      description: '',
      location: ''
    };
    setPortfolioData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id: number, field: string, value: string) => {
    setPortfolioData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: number) => {
    setPortfolioData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      description: '',
      technologies: '',
      url: '',
      github: ''
    };
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: number, field: string, value: string) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
  };

  const removeProject = (id: number) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !portfolioData.skills.includes(skill.trim())) {
      setPortfolioData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const steps = [
    'Personal Info',
    'Professional Details', 
    'Skills & Experience',
    'Projects & Portfolio',
    'Social Links',
    'Review & Create'
  ];

  const handleInputChange = (field: keyof PortfolioData, value: any) => {
    setPortfolioData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!portfolioData.fullName || !portfolioData.title || !portfolioData.bio) {
      alert('Please fill in the required fields: Name, Title, and Bio');
      return;
    }

    setIsCreating(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      });

      if (response.ok) {
        const result = await response.json();
        const portfolio = result.data?.portfolio || result; // Handle both response formats
        const portfolioId = portfolio.id;
        localStorage.setItem('portfolioId', portfolioId);
        navigate(`/preview/${portfolioId}`);
      } else {
        const errorData = await response.text();
        console.error('API Error:', response.status, errorData);
        throw new Error(`Failed to create portfolio: ${response.status} ${errorData}`);
      }
    } catch (error) {
      console.error('Error creating portfolio:', error);
      
      // Type guard for error handling
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      // If backend is not available, create a local demo portfolio
      if (errorMessage.includes('fetch') || errorMessage.includes('network') || errorMessage.includes('connect')) {
        console.log('Backend not available, creating local demo portfolio');
        const demoPortfolioId = `demo_${Date.now()}`;
        localStorage.setItem('portfolioId', demoPortfolioId);
        localStorage.setItem(`portfolio_${demoPortfolioId}`, JSON.stringify(portfolioData));
        navigate(`/preview/${demoPortfolioId}`);
      } else {
        alert(`Error creating portfolio: ${errorMessage}. Please make sure the backend server is running.`);
      }
    } finally {
      setIsCreating(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={portfolioData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Title *
                </label>
                <input
                  type="text"
                  value={portfolioData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Full Stack Developer"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={portfolioData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={portfolioData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Your phone number"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={portfolioData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio / Professional Summary *
              </label>
              <textarea
                value={portfolioData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Brief description about yourself and your professional background..."
                required
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills & Professional Details</h3>
            
            {/* Skills Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technical Skills
              </label>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 mb-3">
                  {portfolioData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-indigo-600 hover:text-indigo-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="skillInput"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Type a skill and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        addSkill(input.value);
                        input.value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('skillInput') as HTMLInputElement;
                      addSkill(input.value);
                      input.value = '';
                    }}
                    className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Languages
              </label>
              <input
                type="text"
                value={portfolioData.languages.join(', ')}
                onChange={(e) => handleInputChange('languages', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., English (Native), Spanish (Fluent), French (Basic)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certifications
              </label>
              <input
                type="text"
                value={portfolioData.certifications.join(', ')}
                onChange={(e) => handleInputChange('certifications', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., AWS Certified, Google Cloud Professional"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Work Experience</h3>
              <button
                type="button"
                onClick={addExperience}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                + Add Experience
              </button>
            </div>
            
            {portfolioData.experience.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">No work experience added yet.</p>
                <p className="text-sm text-gray-400">Click "Add Experience" to get started.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {portfolioData.experience.map((exp, index) => (
                  <div key={exp.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-medium text-gray-900">Experience #{index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeExperience(exp.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Company name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Position
                        </label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Job title"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="e.g., Jan 2020 - Present"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="City, Country"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Description
                        </label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Describe your responsibilities and achievements..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Projects & Portfolio</h3>
              <button
                type="button"
                onClick={addProject}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                + Add Project
              </button>
            </div>
            
            {portfolioData.projects.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">No projects added yet.</p>
                <p className="text-sm text-gray-400">Click "Add Project" to showcase your work.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {portfolioData.projects.map((project, index) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-medium text-gray-900">Project #{index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeProject(project.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Name
                        </label>
                        <input
                          type="text"
                          value={project.name}
                          onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Project title"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Technologies
                        </label>
                        <input
                          type="text"
                          value={project.technologies}
                          onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="e.g., React, Node.js, MongoDB"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Live URL
                        </label>
                        <input
                          type="url"
                          value={project.url}
                          onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="https://your-project.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          GitHub URL
                        </label>
                        <input
                          type="url"
                          value={project.github}
                          onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="https://github.com/user/repo"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Description
                        </label>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Describe what this project does and your role in it..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Links</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={portfolioData.github}
                  onChange={(e) => handleInputChange('github', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://github.com/yourusername"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={portfolioData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={portfolioData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://yourwebsite.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter URL
                </label>
                <input
                  type="url"
                  value={portfolioData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://twitter.com/yourusername"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Review & Create</h3>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Portfolio Summary</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="ml-2 text-gray-600">{portfolioData.fullName || 'Not provided'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Title:</span>
                  <span className="ml-2 text-gray-600">{portfolioData.title || 'Not provided'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="ml-2 text-gray-600">{portfolioData.email || 'Not provided'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <span className="ml-2 text-gray-600">{portfolioData.location || 'Not provided'}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-700">Skills:</span>
                  <span className="ml-2 text-gray-600">{portfolioData.skills.length > 0 ? portfolioData.skills.join(', ') : 'Not provided'}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-700">Experience:</span>
                  <span className="ml-2 text-gray-600">{portfolioData.experience.length} positions</span>
                </div>
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-700">Projects:</span>
                  <span className="ml-2 text-gray-600">{portfolioData.projects.length} projects</span>
                </div>
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-700">Bio:</span>
                  <p className="ml-2 text-gray-600 mt-1">{portfolioData.bio || 'Not provided'}</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                disabled={!portfolioData.fullName || !portfolioData.title || !portfolioData.bio || isCreating}
                className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {isCreating ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Creating Your Portfolio...
                  </div>
                ) : (
                  <>
                    <span className="mr-2">🚀</span>
                    Create My Portfolio
                  </>
                )}
              </button>
              
              {(!portfolioData.fullName || !portfolioData.title || !portfolioData.bio) && (
                <p className="text-sm text-red-600 mt-4">
                  Please fill in the required fields: Name, Title, and Bio
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-indigo-600">
                Portfolio Builder
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Home
              </Link>
              <Link to="/templates" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Templates
              </Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    index <= currentStep
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <span className={`ml-2 font-medium ${index <= currentStep ? 'text-indigo-600' : 'text-gray-500'}`}>
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${index < currentStep ? 'bg-indigo-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex justify-between items-center mb-4">
              <Link 
                to="/templates" 
                className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Templates
              </Link>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Create Your Portfolio</h2>
              </div>
              <div className="w-32"></div> {/* Spacer for centering */}
            </div>
            <p className="text-gray-600">Step {currentStep + 1} of {steps.length}</p>
            {selectedTemplate && (
              <p className="text-sm text-indigo-600 mt-2">Using {selectedTemplate} template</p>
            )}
          </div>

          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="flex space-x-3">
              {currentStep === 0 ? (
                <Link
                  to="/templates"
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
              )}
            </div>
            
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Next
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

// Preview Page Component
const PreviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPortfolio = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        // First try to load from backend
        const response = await fetch(`http://localhost:5000/api/portfolios/${id}`);
        if (response.ok) {
          const result = await response.json();
          const portfolioData = result.data?.portfolio || result;
          setPortfolio(portfolioData);
        } else {
          throw new Error('Portfolio not found on server');
        }
      } catch (error) {
        console.log('Backend not available, checking local storage');
        
        // If backend fails, try local storage for demo portfolios
        const localPortfolioData = localStorage.getItem(`portfolio_${id}`);
        if (localPortfolioData) {
          const parsedData = JSON.parse(localPortfolioData);
          const portfolio: Portfolio = {
            id: id,
            userId: 'demo_user',
            title: parsedData.title || 'My Portfolio',
            template: parsedData.template || 'modern',
            data: parsedData,
            isPublic: true,
            slug: parsedData.title?.toLowerCase().replace(/\s+/g, '-') || 'my-portfolio',
            createdAt: new Date(),
            updatedAt: new Date()
          };
          setPortfolio(portfolio);
        } else {
          // Fallback to mock data
          const mockPortfolio: Portfolio = {
            id: id || '1',
            userId: 'user1',
            title: 'Demo Portfolio',
            template: 'modern',
            data: {
              fullName: 'Demo User',
              title: 'Portfolio Demo',
              email: 'demo@example.com',
              phone: '+1 (555) 123-4567',
              location: 'Demo City, DC',
              bio: 'This is a demo portfolio created when the backend server is not available.',
              skills: ['JavaScript', 'React', 'Node.js', 'Demo Skills'],
              experience: [],
              education: [],
              projects: [],
              github: 'https://github.com/demo',
              linkedin: 'https://linkedin.com/in/demo',
              website: 'https://demo.dev',
              twitter: 'https://twitter.com/demo',
              languages: ['English (Native)'],
              certifications: ['Demo Certification'],
              interests: ['Demo Interests'],
              theme: 'modern',
              template: 'modern'
            },
            isPublic: true,
            slug: 'demo-portfolio',
            createdAt: new Date(),
            updatedAt: new Date()
          };
          setPortfolio(mockPortfolio);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPortfolio();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // This would integrate with a PDF generation service
    alert('PDF download functionality would be implemented here');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h2>
          <p className="text-gray-600 mb-4">The portfolio you're looking for doesn't exist.</p>
          <Link to="/" className="text-indigo-600 hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Print Controls */}
      <div className="bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Portfolio Preview</h1>
              <p className="text-sm text-gray-600">Review your portfolio before publishing</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handlePrint}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </button>
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Publish
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Enhanced Modern Header with Profile Section */}
          <div className="relative">
            {/* Animated gradient background */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 h-64 sm:h-80 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10"></div>
              
              {/* Decorative circles */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-16 left-16 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            {/* Enhanced Profile Card Overlay */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="bg-white rounded-2xl shadow-2xl p-6 text-center min-w-80 border border-gray-100 hover:shadow-3xl transition-all duration-300">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300">
                  {portfolio.data.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                  {portfolio.data.fullName}
                </h1>
                <h2 className="text-lg text-indigo-600 font-medium mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {portfolio.data.title}
                </h2>
                <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
                  {portfolio.data.email && (
                    <span className="flex items-center hover:text-indigo-600 transition-colors">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                      {portfolio.data.email}
                    </span>
                  )}
                  {portfolio.data.phone && (
                    <span className="flex items-center hover:text-indigo-600 transition-colors">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                      </svg>
                      {portfolio.data.phone}
                    </span>
                  )}
                  {portfolio.data.location && (
                    <span className="flex items-center hover:text-indigo-600 transition-colors">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                      </svg>
                      {portfolio.data.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="px-6 sm:px-12 pt-24 pb-12">
            {/* About Section */}
            <section className="mb-16">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">About Me</h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto"></div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-8">
                  <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                    {portfolio.data.bio}
                  </p>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            {portfolio.data.skills.length > 0 && (
              <section className="mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Technical Skills</h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  {portfolio.data.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="group bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 text-center border border-gray-100 hover:border-indigo-200"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {skill}
                      </h4>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages Section */}
            {portfolio.data.languages.length > 0 && (
              <section className="mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Languages</h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-600 mx-auto"></div>
                </div>
                <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                  {portfolio.data.languages.map((language, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-full px-6 py-3"
                    >
                      <span className="text-green-800 font-medium">{language}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications Section */}
            {portfolio.data.certifications.length > 0 && (
              <section className="mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Certifications</h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-600 mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {portfolio.data.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">{cert}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Experience Section */}
            {portfolio.data.experience.length > 0 && (
              <section className="mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Professional Experience</h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 mx-auto"></div>
                </div>
                <div className="max-w-4xl mx-auto space-y-8">
                  {portfolio.data.experience.map((exp, index) => (
                    <div
                      key={exp.id || index}
                      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{exp.position}</h4>
                          <h5 className="text-lg font-semibold text-blue-600 mb-2">{exp.company}</h5>
                          {exp.location && (
                            <p className="text-gray-600 mb-2 flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                              </svg>
                              {exp.location}
                            </p>
                          )}
                        </div>
                        <div className="md:text-right">
                          {exp.duration && (
                            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {exp.duration}
                            </span>
                          )}
                        </div>
                      </div>
                      {exp.description && (
                        <div className="mt-4">
                          <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {portfolio.data.projects.length > 0 && (
              <section className="mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {portfolio.data.projects.map((project, index) => (
                    <div
                      key={project.id || index}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="p-8">
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                            {project.name}
                          </h4>
                          <div className="flex space-x-2">
                            {project.url && (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                                title="View Live Project"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"></path>
                                </svg>
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                                title="View Source Code"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                        
                        {project.description && (
                          <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                        )}
                        
                        {project.technologies && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.split(',').map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                                >
                                  {tech.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex space-x-4 pt-4 border-t border-gray-100">
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors"
                            >
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"></path>
                              </svg>
                              Live Demo
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
                            >
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
                              </svg>
                              Source Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Connect Section */}
            <section className="text-center">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white">
                <h3 className="text-3xl font-bold mb-6">Let's Connect</h3>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  I'm always interested in new opportunities and collaborations. Feel free to reach out!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {portfolio.data.github && (
                    <a href={portfolio.data.github} target="_blank" rel="noopener noreferrer"
                       className="group flex items-center px-6 py-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {portfolio.data.linkedin && (
                    <a href={portfolio.data.linkedin} target="_blank" rel="noopener noreferrer"
                       className="group flex items-center px-6 py-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                  {portfolio.data.website && (
                    <a href={portfolio.data.website} target="_blank" rel="noopener noreferrer"
                       className="group flex items-center px-6 py-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"></path>
                      </svg>
                      Website
                    </a>
                  )}
                  {portfolio.data.twitter && (
                    <a href={portfolio.data.twitter} target="_blank" rel="noopener noreferrer"
                       className="group flex items-center px-6 py-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const DashboardPage: React.FC = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load real user portfolios from localStorage
    const loadPortfolios = async () => {
      try {
        // Try to load from backend first
        const response = await fetch('http://localhost:5000/api/portfolios');
        if (response.ok) {
          const data = await response.json();
          if (data.portfolios && Array.isArray(data.portfolios)) {
            setPortfolios(data.portfolios);
          }
        } else {
          throw new Error('Backend unavailable');
        }
      } catch (error) {
        // Fallback to localStorage
        const localPortfolios: Portfolio[] = [];
        
        // Get all portfolio keys from localStorage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('portfolio_')) {
            try {
              const portfolioData = JSON.parse(localStorage.getItem(key) || '{}');
              if (portfolioData.fullName) {
                const portfolio: Portfolio = {
                  id: key.replace('portfolio_', ''),
                  userId: 'local_user',
                  title: `${portfolioData.fullName}'s Portfolio`,
                  template: 'modern',
                  data: portfolioData,
                  isPublic: true,
                  slug: portfolioData.fullName.toLowerCase().replace(/\s+/g, '-'),
                  createdAt: new Date(),
                  updatedAt: new Date()
                };
                localPortfolios.push(portfolio);
              }
            } catch (err) {
              console.error('Error parsing portfolio from localStorage:', err);
            }
          }
        }
        setPortfolios(localPortfolios);
      }
      setIsLoading(false);
    };

    loadPortfolios();
  }, []);

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
              <Link to="/create" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Create New Portfolio
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Portfolios</h1>
          <p className="text-gray-600">Manage and customize your portfolio websites</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your portfolios...</p>
          </div>
        ) : portfolios.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No portfolios yet</h3>
            <p className="text-gray-600 mb-6">Create your first portfolio to get started</p>
            <Link
              to="/create"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Create Your First Portfolio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <div key={portfolio.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{portfolio.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">Template: {portfolio.template}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Updated {portfolio.updatedAt.toLocaleDateString()}
                  </p>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/preview/${portfolio.id}`}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-center hover:bg-gray-200 transition-colors"
                    >
                      Preview
                    </Link>
                    <Link
                      to={`/editor?id=${portfolio.id}`}
                      className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-700 transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Simple Auth Pages
const LoginPage: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
          Login
        </button>
      </form>
      <p className="text-center mt-4">
        <Link to="/signup" className="text-indigo-600 hover:underline">Don't have an account? Sign up</Link>
      </p>
      <p className="text-center mt-2">
        <Link to="/" className="text-gray-600 hover:underline">← Back to Home</Link>
      </p>
    </div>
  </div>
);

const SignUpPage: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
          Sign Up
        </button>
      </form>
      <p className="text-center mt-4">
        <Link to="/login" className="text-indigo-600 hover:underline">Already have an account? Login</Link>
      </p>
      <p className="text-center mt-2">
        <Link to="/" className="text-gray-600 hover:underline">← Back to Home</Link>
      </p>
    </div>
  </div>
);

// Main App Component
const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/create" element={<PortfolioCreationForm />} />
          <Route path="/preview/:id" element={<PreviewPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/editor" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Portfolio Editor</h2>
                <p className="text-gray-600 mb-4">Advanced editing features coming soon...</p>
                <Link to="/dashboard" className="text-indigo-600 hover:underline">← Back to Dashboard</Link>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;