import React, { useState } from 'react';
import { Portfolio } from '../../types';
import Button from '../common/Button';

interface DashboardProps {
  portfolios: Portfolio[];
  onCreatePortfolio: () => void;
  onEditPortfolio: (portfolioId: string) => void;
  onDeletePortfolio: (portfolioId: string) => void;
  onPreviewPortfolio: (portfolioId: string) => void;
  onUpdatePortfolio?: (portfolioId: string, updates: Partial<Portfolio>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  portfolios,
  onCreatePortfolio,
  onEditPortfolio,
  onDeletePortfolio,
  onPreviewPortfolio,
  onUpdatePortfolio
}) => {
  const [showAIBuilder, setShowAIBuilder] = useState(false);
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestedTemplate, setSuggestedTemplate] = useState<string | null>(null);
  const [generatedStructure, setGeneratedStructure] = useState<any>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);

  // AI Portfolio Generation Logic
  const generatePortfolioFromDescription = async (desc: string) => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // AI template suggestion based on description keywords
    const templates = {
      'developer|programming|coding|software|tech': 'developer',
      'design|creative|art|visual|graphic': 'designer', 
      'business|corporate|professional|finance': 'professional',
      'minimal|clean|simple|elegant': 'minimal',
      'modern|contemporary|trendy': 'modern',
      'creative|unique|artistic|innovative': 'creative'
    };
    
    let suggestedTemp = 'modern';
    for (const [keywords, template] of Object.entries(templates)) {
      if (new RegExp(keywords, 'i').test(desc)) {
        suggestedTemp = template;
        break;
      }
    }
    
    setSuggestedTemplate(suggestedTemp);
    
    // Generate portfolio structure based on description
    const structure = {
      title: extractTitle(desc),
      sections: generateSections(desc),
      skills: extractSkills(desc),
      projectIdeas: generateProjectIdeas(desc)
    };
    
    setGeneratedStructure(structure);
    setIsGenerating(false);
  };

  const extractTitle = (desc: string): string => {
    const match = desc.match(/(?:i am|i'm|my name is)\s+([a-zA-Z\s]+)/i);
    return match ? match[1].trim() : 'My Portfolio';
  };

  const generateSections = (desc: string): string[] => {
    const baseSections = ['about', 'skills'];
    if (desc.toLowerCase().includes('experience') || desc.toLowerCase().includes('work')) {
      baseSections.push('experience');
    }
    if (desc.toLowerCase().includes('project') || desc.toLowerCase().includes('portfolio')) {
      baseSections.push('projects');
    }
    if (desc.toLowerCase().includes('education') || desc.toLowerCase().includes('university') || desc.toLowerCase().includes('degree')) {
      baseSections.push('education');
    }
    if (desc.toLowerCase().includes('contact') || desc.toLowerCase().includes('hire')) {
      baseSections.push('contact');
    }
    return baseSections;
  };

  const extractSkills = (desc: string): string[] => {
    const skillKeywords = [
      'javascript', 'typescript', 'react', 'node', 'python', 'java', 'html', 'css',
      'design', 'photoshop', 'figma', 'ui/ux', 'marketing', 'writing', 'photography'
    ];
    
    return skillKeywords.filter(skill => 
      desc.toLowerCase().includes(skill.toLowerCase())
    );
  };

  const generateProjectIdeas = (desc: string): string[] => {
    const ideas: string[] = [];
    
    if (desc.toLowerCase().includes('web')) {
      ideas.push('Personal Website', 'E-commerce Platform');
    }
    if (desc.toLowerCase().includes('mobile')) {
      ideas.push('Mobile App', 'React Native Project');
    }
    if (desc.toLowerCase().includes('design')) {
      ideas.push('UI/UX Case Study', 'Brand Identity Project');
    }
    
    return ideas.length > 0 ? ideas : ['Portfolio Website', 'Creative Project'];
  };

  const handleSharePortfolio = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio);
    setShareModalOpen(true);
  };

  const handleTogglePublic = async (isPublic: boolean) => {
    if (!selectedPortfolio || !onUpdatePortfolio) return;
    
    try {
      const updates = { isPublic };
      onUpdatePortfolio(selectedPortfolio.id, updates);
      setSelectedPortfolio({ ...selectedPortfolio, isPublic });
    } catch (error) {
      console.error('Failed to update portfolio visibility:', error);
    }
  };

  const handleCreateWithAI = () => {
    if (generatedStructure) {
      // Create portfolio with AI-generated structure
      const portfolioData = {
        template: suggestedTemplate,
        structure: generatedStructure
      };
      
      // Store in localStorage for the editor to use
      localStorage.setItem('aiGeneratedPortfolio', JSON.stringify(portfolioData));
      
      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      
      // Navigate to editor
      setTimeout(() => {
        onCreatePortfolio();
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Success Toast Notification */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 animate-float">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>🎉 AI Portfolio Generated! Redirecting to editor...</span>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-float">
            🚀 Your Portfolio Universe
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create stunning portfolios with AI assistance or choose from professional templates
          </p>
        </div>

        {/* AI Builder Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg border">
            <div className="flex">
              <button
                onClick={() => setShowAIBuilder(false)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  !showAIBuilder 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📁 My Portfolios
              </button>
              <button
                onClick={() => setShowAIBuilder(true)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  showAIBuilder 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ✨ AI Builder
              </button>
            </div>
          </div>
        </div>

        {showAIBuilder ? (
          /* AI Builder Section */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  🎨 AI Portfolio Builder
                </h2>
                <p className="text-purple-100">
                  Describe your ideal portfolio and let AI create it for you!
                </p>
              </div>
              
              <div className="p-8">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Describe your portfolio vision
                  </label>
                  <div className="relative">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Example: I'm a full-stack developer with 3 years of experience in React and Node.js. I want a modern portfolio showcasing my web development projects and skills..."
                      rows={5}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                    <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                      {description.length}/500
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mb-6">
                  <Button
                    onClick={() => generatePortfolioFromDescription(description)}
                    disabled={!description.trim() || isGenerating}
                    variant="primary"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {isGenerating ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        Generating Magic...
                      </div>
                    ) : (
                      '✨ Generate Portfolio'
                    )}
                  </Button>
                  <Button
                    onClick={onCreatePortfolio}
                    variant="outline"
                    className="border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    🎯 Manual Creation
                  </Button>
                </div>

                {/* AI Generated Results */}
                {generatedStructure && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      🎯 AI Generated Portfolio Plan
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">📋 Portfolio Title</h4>
                          <p className="text-gray-700">{generatedStructure.title}</p>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">🎨 Recommended Template</h4>
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium capitalize">
                            {suggestedTemplate}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">📑 Suggested Sections</h4>
                          <div className="flex flex-wrap gap-2">
                            {generatedStructure.sections.map((section: string, idx: number) => (
                              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs capitalize">
                                {section}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {generatedStructure.skills.length > 0 && (
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <h4 className="font-medium text-gray-900 mb-2">🔧 Detected Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {generatedStructure.skills.map((skill: string, idx: number) => (
                                <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <Button
                        onClick={handleCreateWithAI}
                        variant="primary"
                        size="lg"
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      >
                        🚀 Create This Portfolio
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Existing Portfolios Section */
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">My Portfolios</h2>
                <p className="mt-2 text-gray-600">
                  Manage and customize your portfolio websites
                </p>
              </div>
              <Button 
                onClick={onCreatePortfolio} 
                variant="primary" 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                ➕ Create New Portfolio
              </Button>
            </div>

            {portfolios.length === 0 ? (
              <div className="text-center py-16">
                <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6 animate-float">
                  <span className="text-4xl">🎨</span>
                </div>
                <h3 className="text-2xl font-medium text-gray-900 mb-4">
                  No portfolios yet
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Ready to showcase your amazing work? Create your first portfolio and let your creativity shine!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => setShowAIBuilder(true)} 
                    variant="primary"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    ✨ Try AI Builder
                  </Button>
                  <Button 
                    onClick={onCreatePortfolio} 
                    variant="outline"
                    className="border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    🎯 Manual Creation
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolios.map((portfolio, index) => (
                  <div
                    key={portfolio.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 truncate flex items-center">
                          <span className="mr-2">📁</span>
                          {portfolio.title}
                        </h3>
                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                          portfolio.isPublic 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {portfolio.isPublic ? '🌐 Public' : '🔒 Private'}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">🎨</span>
                          <span className="font-medium capitalize">{portfolio.template}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">📑</span>
                          <span className="font-medium">{portfolio.template} template</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">📅</span>
                          <span className="font-medium">
                            {new Date(portfolio.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          onClick={() => onEditPortfolio(portfolio.id)}
                          variant="primary"
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        >
                          ✏️ Edit
                        </Button>
                        <Button
                          onClick={() => onPreviewPortfolio(portfolio.id)}
                          variant="outline"
                          size="sm"
                          className="flex-1 border-gray-300 hover:bg-gray-50"
                        >
                          👁️ Preview
                        </Button>
                        <Button
                          onClick={() => handleSharePortfolio(portfolio)}
                          variant="outline"
                          size="sm"
                          className="border-green-300 text-green-600 hover:bg-green-50"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                        </Button>
                        <Button
                          onClick={() => onDeletePortfolio(portfolio.id)}
                          variant="danger"
                          size="sm"
                          className="bg-red-500 hover:bg-red-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Share Portfolio Modal - Placeholder */}
      {selectedPortfolio && shareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Share Portfolio</h3>
            <p className="text-gray-600 mb-4">
              Portfolio: {selectedPortfolio.title}
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShareModalOpen(false);
                  setSelectedPortfolio(null);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
