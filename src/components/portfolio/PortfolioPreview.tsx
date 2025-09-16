import React from 'react';
import { Portfolio } from '../../types';

interface PortfolioPreviewProps {
  portfolio: Portfolio;
}

const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ portfolio }) => {
  const renderSection = (section: any) => {
    if (!section.isVisible) return null;

    switch (section.type) {
      case 'hero':
        return (
          <section key={section.id} className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">{section.content.title || 'Your Name'}</h1>
              <h2 className="text-2xl mb-6">{section.content.subtitle || 'Your Title'}</h2>
              <p className="text-lg max-w-2xl mx-auto">{section.content.description || 'Your description'}</p>
            </div>
          </section>
        );

      case 'about':
        return (
          <section key={section.id} className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">{section.title}</h2>
              <div className="prose prose-lg mx-auto">
                <p>{section.content.text || 'About content goes here...'}</p>
              </div>
            </div>
          </section>
        );

      case 'experience':
        return (
          <section key={section.id} className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">{section.title}</h2>
              <div className="space-y-8">
                {(section.content.experiences || []).map((exp: any, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold">{exp.position || 'Position'}</h3>
                    <h4 className="text-lg text-gray-600 mb-2">{exp.company || 'Company'}</h4>
                    <p className="text-gray-700">{exp.description || 'Job description...'}</p>
                  </div>
                ))}
                {(!section.content.experiences || section.content.experiences.length === 0) && (
                  <p className="text-center text-gray-500">No experience added yet.</p>
                )}
              </div>
            </div>
          </section>
        );

      case 'projects':
        return (
          <section key={section.id} className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">{section.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(section.content.projects || []).map((project: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">{project.title || 'Project Title'}</h3>
                    <p className="text-gray-700 mb-4">{project.description || 'Project description...'}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                ))}
                {(!section.content.projects || section.content.projects.length === 0) && (
                  <div className="col-span-full">
                    <p className="text-center text-gray-500">No projects added yet.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case 'skills':
        return (
          <section key={section.id} className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">{section.title}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(section.content.skills || []).map((skill: string, index: number) => (
                  <div key={index} className="bg-white p-4 rounded-lg text-center shadow">
                    <span className="font-medium">{skill}</span>
                  </div>
                ))}
                {(!section.content.skills || section.content.skills.length === 0) && (
                  <div className="col-span-full">
                    <p className="text-center text-gray-500">No skills added yet.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case 'contact':
        return (
          <section key={section.id} className="py-16 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-8">{section.title}</h2>
              <p className="text-lg mb-8">{section.content.text || 'Get in touch with me!'}</p>
              <div className="space-x-4">
                {section.content.email && (
                  <a
                    href={`mailto:${section.content.email}`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
                  >
                    Email Me
                  </a>
                )}
                {section.content.linkedin && (
                  <a
                    href={section.content.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-800 hover:bg-blue-900 px-6 py-3 rounded-lg font-medium"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </section>
        );

      default:
        return (
          <section key={section.id} className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">{section.title}</h2>
              <div className="prose prose-lg mx-auto">
                <p>{section.content.text || 'Content goes here...'}</p>
              </div>
            </div>
          </section>
        );
    }
  };

  const sortedSections = [...portfolio.sections].sort((a, b) => a.order - b.order);

  return (
    <div className="portfolio-preview">
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Preview Mode</h3>
          <p className="text-sm text-gray-600">Template: {portfolio.template}</p>
        </div>
      </div>
      
      {sortedSections.map(renderSection)}
      
      {sortedSections.length === 0 && (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Portfolio</h1>
            <p className="text-lg text-gray-600">Add sections to start building your portfolio</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPreview;
