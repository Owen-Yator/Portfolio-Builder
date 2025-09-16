import React from 'react';
import { PortfolioSection } from '../../types';

interface SectionEditorProps {
  section: PortfolioSection;
  onUpdateSection: (updates: Partial<PortfolioSection>) => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({ section, onUpdateSection }) => {
  const renderSectionContent = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Title
              </label>
              <input
                type="text"
                value={section.content.title || ''}
                onChange={(e) => onUpdateSection({
                  content: { ...section.content, title: e.target.value }
                })}
                placeholder="Your Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={section.content.subtitle || ''}
                onChange={(e) => onUpdateSection({
                  content: { ...section.content, subtitle: e.target.value }
                })}
                placeholder="Your profession or title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={section.content.description || ''}
                onChange={(e) => onUpdateSection({
                  content: { ...section.content, description: e.target.value }
                })}
                placeholder="Brief description about yourself"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Content
              </label>
              <textarea
                value={section.content.text || ''}
                onChange={(e) => onUpdateSection({
                  content: { ...section.content, text: e.target.value }
                })}
                placeholder="Tell your story..."
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-900">Work Experience</h4>
              <button
                onClick={() => {
                  const experiences = section.content.experiences || [];
                  onUpdateSection({
                    content: {
                      ...section.content,
                      experiences: [...experiences, {
                        id: Date.now().toString(),
                        company: '',
                        position: '',
                        startDate: '',
                        endDate: '',
                        description: ''
                      }]
                    }
                  });
                }}
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add Experience
              </button>
            </div>
            {(section.content.experiences || []).map((exp: any, index: number) => (
              <div key={exp.id} className="p-4 border border-gray-200 rounded-md">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => {
                      const experiences = [...section.content.experiences];
                      experiences[index] = { ...exp, company: e.target.value };
                      onUpdateSection({
                        content: { ...section.content, experiences }
                      });
                    }}
                    placeholder="Company"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    value={exp.position || ''}
                    onChange={(e) => {
                      const experiences = [...section.content.experiences];
                      experiences[index] = { ...exp, position: e.target.value };
                      onUpdateSection({
                        content: { ...section.content, experiences }
                      });
                    }}
                    placeholder="Position"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <textarea
                  value={exp.description || ''}
                  onChange={(e) => {
                    const experiences = [...section.content.experiences];
                    experiences[index] = { ...exp, description: e.target.value };
                    onUpdateSection({
                      content: { ...section.content, experiences }
                    });
                  }}
                  placeholder="Job description"
                  rows={3}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ))}
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-900">Projects</h4>
              <button
                onClick={() => {
                  const projects = section.content.projects || [];
                  onUpdateSection({
                    content: {
                      ...section.content,
                      projects: [...projects, {
                        id: Date.now().toString(),
                        title: '',
                        description: '',
                        technologies: [],
                        link: '',
                        image: ''
                      }]
                    }
                  });
                }}
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add Project
              </button>
            </div>
            {(section.content.projects || []).map((project: any, index: number) => (
              <div key={project.id} className="p-4 border border-gray-200 rounded-md">
                <input
                  type="text"
                  value={project.title || ''}
                  onChange={(e) => {
                    const projects = [...section.content.projects];
                    projects[index] = { ...project, title: e.target.value };
                    onUpdateSection({
                      content: { ...section.content, projects }
                    });
                  }}
                  placeholder="Project Title"
                  className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                  value={project.description || ''}
                  onChange={(e) => {
                    const projects = [...section.content.projects];
                    projects[index] = { ...project, description: e.target.value };
                    onUpdateSection({
                      content: { ...section.content, projects }
                    });
                  }}
                  placeholder="Project description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={section.content.text || ''}
                onChange={(e) => onUpdateSection({
                  content: { ...section.content, text: e.target.value }
                })}
                placeholder="Enter content..."
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Edit {section.title} Section
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => onUpdateSection({ title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default SectionEditor;
