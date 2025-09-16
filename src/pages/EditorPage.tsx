import React, { useState, useEffect } from 'react';
import { Portfolio } from '../types';
import Header from '../components/common/Header';
import PortfolioEditor from '../components/portfolio/PortfolioEditor';

interface EditorPageProps {
  portfolioId?: string;
  user?: {
    name: string;
    profilePicture?: string;
  };
  onLogout?: () => void;
}

const EditorPage: React.FC<EditorPageProps> = ({ portfolioId, user, onLogout }) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Simulate loading portfolio data
    setTimeout(() => {
      const mockPortfolio: Portfolio = {
        id: portfolioId || '1',
        userId: 'user1',
        title: 'My Portfolio',
        template: 'modern',
        sections: [
          {
            id: '1',
            type: 'hero',
            title: 'Hero Section',
            content: {
              title: 'Your Name',
              subtitle: 'Your Title',
              description: 'Brief description about yourself'
            },
            order: 0,
            isVisible: true
          },
          {
            id: '2',
            type: 'about',
            title: 'About Me',
            content: {
              text: 'Tell your story here...'
            },
            order: 1,
            isVisible: true
          },
          {
            id: '3',
            type: 'experience',
            title: 'Experience',
            content: {
              experiences: [
                {
                  id: '1',
                  company: 'Tech Company',
                  position: 'Software Engineer',
                  startDate: '2023-01-01',
                  endDate: 'Present',
                  description: 'Developed web applications using React and Node.js'
                }
              ]
            },
            order: 2,
            isVisible: true
          },
          {
            id: '4',
            type: 'projects',
            title: 'Projects',
            content: {
              projects: [
                {
                  id: '1',
                  title: 'Portfolio Website',
                  description: 'A responsive portfolio website built with React',
                  technologies: ['React', 'TypeScript', 'Tailwind CSS'],
                  link: 'https://example.com',
                  image: ''
                }
              ]
            },
            order: 3,
            isVisible: true
          }
        ],
        isPublic: false,
        slug: 'my-portfolio',
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date()
      };
      
      setPortfolio(mockPortfolio);
      setIsLoading(false);
    }, 1000);
  }, [portfolioId]);

  const handleUpdatePortfolio = (updatedPortfolio: Portfolio) => {
    setPortfolio(updatedPortfolio);
  };

  const handleSave = async () => {
    if (!portfolio) return;
    
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the portfolio with current timestamp
      const updatedPortfolio = {
        ...portfolio,
        updatedAt: new Date()
      };
      
      setPortfolio(updatedPortfolio);
      
      // Show success message
      alert('Portfolio saved successfully!');
    } catch (error) {
      alert('Failed to save portfolio. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header user={user} onLogout={onLogout} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading portfolio editor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header user={user} onLogout={onLogout} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Not Found</h2>
            <p className="text-gray-600 mb-4">The portfolio you're looking for doesn't exist.</p>
            <button
              onClick={() => window.history.back()}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={onLogout} />
      <div className="flex-1">
        {isSaving && (
          <div className="fixed top-0 left-0 right-0 bg-indigo-600 text-white text-center py-2 z-50">
            Saving portfolio...
          </div>
        )}
        <PortfolioEditor
          portfolio={portfolio}
          onUpdatePortfolio={handleUpdatePortfolio}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default EditorPage;
