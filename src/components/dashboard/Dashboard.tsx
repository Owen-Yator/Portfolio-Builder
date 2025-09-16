import React from 'react';
import { Portfolio } from '../../types';
import Button from '../common/Button';

interface DashboardProps {
  portfolios: Portfolio[];
  onCreatePortfolio: () => void;
  onEditPortfolio: (portfolioId: string) => void;
  onDeletePortfolio: (portfolioId: string) => void;
  onPreviewPortfolio: (portfolioId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  portfolios,
  onCreatePortfolio,
  onEditPortfolio,
  onDeletePortfolio,
  onPreviewPortfolio
}) => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Portfolios</h1>
          <p className="mt-2 text-gray-600">
            Manage and customize your portfolio websites
          </p>
        </div>
        <Button onClick={onCreatePortfolio} variant="primary" size="lg">
          Create New Portfolio
        </Button>
      </div>

      {portfolios.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No portfolios yet
          </h3>
          <p className="text-gray-500 mb-8">
            Get started by creating your first portfolio
          </p>
          <Button onClick={onCreatePortfolio} variant="primary">
            Create Your First Portfolio
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {portfolio.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    portfolio.isPublic 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {portfolio.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    Template: <span className="font-medium capitalize">{portfolio.template}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Sections: <span className="font-medium">{portfolio.sections.length}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Updated: <span className="font-medium">
                      {new Date(portfolio.updatedAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => onEditPortfolio(portfolio.id)}
                    variant="primary"
                    size="sm"
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => onPreviewPortfolio(portfolio.id)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Preview
                  </Button>
                  <Button
                    onClick={() => onDeletePortfolio(portfolio.id)}
                    variant="danger"
                    size="sm"
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
    </div>
  );
};

export default Dashboard;
