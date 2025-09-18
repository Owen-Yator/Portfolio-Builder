import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Simple Portfolio interface for this page
interface Portfolio {
  id: string;
  userId: string;
  title: string;
  template: string;
  sections: any[];
  isPublic: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DashboardPageProps {
  user?: {
    name: string;
    profilePicture?: string;
  };
  onLogout?: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onLogout }) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading portfolios
    setTimeout(() => {
      setPortfolios([
        {
          id: '1',
          userId: 'user1',
          title: 'My Design Portfolio',
          template: 'modern',
          sections: [
            {
              id: '1',
              type: 'hero',
              title: 'Hero',
              content: { title: 'John Doe', subtitle: 'UI/UX Designer' },
              order: 0,
              isVisible: true
            },
            {
              id: '2',
              type: 'about',
              title: 'About',
              content: { text: 'I am a passionate designer...' },
              order: 1,
              isVisible: true
            }
          ],
          isPublic: true,
          slug: 'my-design-portfolio',
          createdAt: new Date('2025-01-01'),
          updatedAt: new Date('2025-01-15')
        },
        {
          id: '2',
          userId: 'user1',
          title: 'Developer Portfolio',
          template: 'professional',
          sections: [
            {
              id: '3',
              type: 'hero',
              title: 'Hero',
              content: { title: 'Jane Smith', subtitle: 'Full Stack Developer' },
              order: 0,
              isVisible: true
            }
          ],
          isPublic: false,
          slug: 'developer-portfolio',
          createdAt: new Date('2025-01-10'),
          updatedAt: new Date('2025-01-20')
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCreatePortfolio = () => {
    // Navigate to template selector or portfolio creation
    console.log('Create new portfolio');
  };

  const handleEditPortfolio = (portfolioId: string) => {
    // Navigate to portfolio editor
    console.log('Edit portfolio:', portfolioId);
  };

  const handleDeletePortfolio = (portfolioId: string) => {
    if (window.confirm('Are you sure you want to delete this portfolio?')) {
      setPortfolios(prev => prev.filter(p => p.id !== portfolioId));
    }
  };

  const handlePreviewPortfolio = (portfolioId: string) => {
    // Navigate to portfolio preview
    console.log('Preview portfolio:', portfolioId);
  };

  const handleUpdatePortfolio = (portfolioId: string, updates: Partial<Portfolio>) => {
    setPortfolios(prev =>
      prev.map(portfolio =>
        portfolio.id === portfolioId
          ? { ...portfolio, ...updates, updatedAt: new Date() }
          : portfolio
      )
    );
    console.log('Updated portfolio:', portfolioId, updates);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Simple Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="text-2xl font-bold text-indigo-600">
                Portfolio Builder
              </Link>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user?.name || 'User'}</span>
                <button 
                  onClick={onLogout}
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your portfolios...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              Portfolio Builder
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name || 'User'}</span>
              <Link to="/templates" className="text-gray-700 hover:text-indigo-600">
                Templates
              </Link>
              <button 
                onClick={onLogout}
                className="text-gray-700 hover:text-indigo-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="flex-1 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Portfolios
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create, manage, and share your professional portfolios with the world. 
            Build your digital presence and showcase your best work.
          </p>
        </div>

        {/* Create New Portfolio Button */}
        <div className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to showcase your work?</h2>
              <p className="text-gray-600">Create a new portfolio to highlight your skills and achievements.</p>
            </div>
            <Link
              to="/templates"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Portfolio
            </Link>
          </div>
        </div>

        {/* Portfolios Grid */}
        {portfolios.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Create Your First Portfolio</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Showcase your skills and experience with a beautiful, professional portfolio. 
              Choose from our collection of stunning templates and customize it to match your style.
            </p>
            <div className="space-y-4">
              <Link
                to="/templates"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Get Started Now
              </Link>
              <div className="flex items-center justify-center space-x-8 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Choose Template</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Customize</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Share</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map((portfolio) => {
              const templateGradients = {
                modern: 'from-blue-500 to-purple-600',
                professional: 'from-indigo-600 to-blue-700',
                creative: 'from-pink-500 to-orange-500',
                minimal: 'from-gray-700 to-gray-900',
                developer: 'from-green-500 to-teal-600',
                designer: 'from-purple-500 to-pink-600'
              };
              
              const gradient = templateGradients[portfolio.template as keyof typeof templateGradients] || 'from-gray-500 to-gray-700';
              
              return (
                <div key={portfolio.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  {/* Portfolio Preview */}
                  <div className={`relative h-40 bg-gradient-to-r ${gradient} overflow-hidden`}>
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="relative h-full flex flex-col justify-center items-center text-white p-6">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-3">
                        <div className="w-6 h-6 bg-white rounded"></div>
                      </div>
                      <h4 className="font-semibold text-lg text-center">{portfolio.title}</h4>
                      <p className="text-sm opacity-90 capitalize">{portfolio.template} Template</p>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        portfolio.isPublic 
                          ? 'bg-green-500 text-white shadow-lg' 
                          : 'bg-gray-800 bg-opacity-50 text-white'
                      }`}>
                        {portfolio.isPublic ? (
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                            Live
                          </div>
                        ) : 'Draft'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Portfolio Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{portfolio.title}</h3>
                        <p className="text-sm text-gray-500">
                          Updated {portfolio.updatedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                        </svg>
                        {portfolio.sections.length} sections
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {portfolio.isPublic ? 'Public' : 'Private'}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <Link
                          to="/editor"
                          className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-center text-sm flex items-center justify-center"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </Link>
                        <Link
                          to="/preview"
                          className="flex-1 bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-center text-sm flex items-center justify-center"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Preview
                        </Link>
                      </div>
                      
                      <button
                        onClick={() => handleDeletePortfolio(portfolio.id)}
                        className="w-full px-4 py-2 border border-red-300 text-red-700 rounded-lg text-sm hover:bg-red-50 transition-colors flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Portfolio
                      </button>
                    </div>
                    
                    {/* Public Link */}
                    {portfolio.isPublic && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          <p className="text-sm font-medium text-green-800">Public Portfolio URL</p>
                        </div>
                        <div className="flex rounded-lg overflow-hidden">
                          <input
                            type="text"
                            readOnly
                            value={`${window.location.origin}/portfolio/${portfolio.slug}`}
                            className="flex-1 text-sm bg-white border-0 px-3 py-2 text-gray-700"
                          />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(`${window.location.origin}/portfolio/${portfolio.slug}`);
                            }}
                            className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
