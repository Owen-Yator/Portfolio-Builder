import React, { useState, useEffect } from 'react';
import { Portfolio } from '../types';
import Header from '../components/common/Header';
import Dashboard from '../components/dashboard/Dashboard';

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
        <Header user={user} onLogout={onLogout} />
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
      <Header user={user} onLogout={onLogout} />
      <div className="flex-1">
        <Dashboard
          portfolios={portfolios}
          onCreatePortfolio={handleCreatePortfolio}
          onEditPortfolio={handleEditPortfolio}
          onDeletePortfolio={handleDeletePortfolio}
          onPreviewPortfolio={handlePreviewPortfolio}
          onUpdatePortfolio={handleUpdatePortfolio}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
