import React, { useState, useEffect } from 'react';
import { Portfolio } from '../types';
import PortfolioPreview from '../components/portfolio/PortfolioPreview';

interface PreviewPageProps {
  portfolioId?: string;
  slug?: string;
}

const PreviewPage: React.FC<PreviewPageProps> = ({ portfolioId, slug }) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading portfolio data
    setTimeout(() => {
      try {
        const mockPortfolio: Portfolio = {
          id: portfolioId || '1',
          userId: 'user1',
          title: 'John Doe - UI/UX Designer',
          template: 'modern',
          sections: [
            {
              id: '1',
              type: 'hero',
              title: 'Hero',
              content: {
                title: 'John Doe',
                subtitle: 'UI/UX Designer & Creative Professional',
                description: 'Passionate about creating beautiful, user-centered digital experiences that make a difference in people\'s lives.'
              },
              order: 0,
              isVisible: true
            },
            {
              id: '2',
              type: 'about',
              title: 'About Me',
              content: {
                text: 'I\'m a UI/UX designer with over 5 years of experience creating digital products for startups and established companies. I believe in the power of good design to solve complex problems and create meaningful connections between people and technology. When I\'m not designing, you can find me exploring new coffee shops, hiking, or experimenting with photography.'
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
                    company: 'TechStart Inc.',
                    position: 'Senior UI/UX Designer',
                    startDate: '2022-01-01',
                    endDate: 'Present',
                    description: 'Lead design for mobile and web applications, conducting user research and creating design systems that improved user engagement by 40%.'
                  },
                  {
                    id: '2',
                    company: 'Creative Agency',
                    position: 'UI/UX Designer',
                    startDate: '2020-06-01',
                    endDate: '2021-12-31',
                    description: 'Designed websites and mobile apps for various clients, focusing on user experience and visual design. Collaborated with development teams to ensure pixel-perfect implementation.'
                  },
                  {
                    id: '3',
                    company: 'Design Studio',
                    position: 'Junior Designer',
                    startDate: '2019-01-01',
                    endDate: '2020-05-31',
                    description: 'Started my design career working on branding projects, print materials, and digital designs. Learned the fundamentals of design thinking and user-centered design.'
                  }
                ]
              },
              order: 2,
              isVisible: true
            },
            {
              id: '4',
              type: 'projects',
              title: 'Featured Projects',
              content: {
                projects: [
                  {
                    id: '1',
                    title: 'E-commerce Mobile App',
                    description: 'Complete redesign of a shopping app that increased conversion rates by 35% and improved user satisfaction scores.',
                    technologies: ['Figma', 'Principle', 'User Research'],
                    link: 'https://example.com/project1',
                    image: '/project1.jpg'
                  },
                  {
                    id: '2',
                    title: 'SaaS Dashboard',
                    description: 'Designed a comprehensive dashboard for a B2B SaaS platform, focusing on data visualization and workflow optimization.',
                    technologies: ['Sketch', 'InVision', 'Prototyping'],
                    link: 'https://example.com/project2',
                    image: '/project2.jpg'
                  },
                  {
                    id: '3',
                    title: 'Healthcare Platform',
                    description: 'User experience design for a telemedicine platform, ensuring accessibility and ease of use for patients of all ages.',
                    technologies: ['Adobe XD', 'Accessibility', 'User Testing'],
                    link: 'https://example.com/project3',
                    image: '/project3.jpg'
                  }
                ]
              },
              order: 3,
              isVisible: true
            },
            {
              id: '5',
              type: 'skills',
              title: 'Skills & Expertise',
              content: {
                skills: [
                  'UI/UX Design',
                  'User Research',
                  'Prototyping',
                  'Figma',
                  'Sketch',
                  'Adobe Creative Suite',
                  'Design Systems',
                  'Accessibility',
                  'HTML/CSS',
                  'JavaScript',
                  'React',
                  'Responsive Design'
                ]
              },
              order: 4,
              isVisible: true
            },
            {
              id: '6',
              type: 'contact',
              title: 'Get In Touch',
              content: {
                text: 'I\'m always interested in new opportunities and collaborations. Let\'s create something amazing together!',
                email: 'john.doe@email.com',
                linkedin: 'https://linkedin.com/in/johndoe',
                github: 'https://github.com/johndoe'
              },
              order: 5,
              isVisible: true
            }
          ],
          isPublic: true,
          slug: slug || 'john-doe-designer',
          createdAt: new Date('2025-01-01'),
          updatedAt: new Date('2025-01-15')
        };
        
        setPortfolio(mockPortfolio);
      } catch (err) {
        setError('Failed to load portfolio');
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  }, [portfolioId, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Not Found</h2>
          <p className="text-gray-600 mb-4">
            {error || 'The portfolio you\'re looking for doesn\'t exist or is not public.'}
          </p>
          <a
            href="/"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-preview-page">
      <PortfolioPreview portfolio={portfolio} />
      
      {/* Edit button for portfolio owner */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => window.open(`/editor/${portfolio.id}`, '_blank')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200"
        >
          Edit Portfolio
        </button>
      </div>
    </div>
  );
};

export default PreviewPage;
