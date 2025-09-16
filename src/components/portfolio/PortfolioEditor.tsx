import React, { useState } from 'react';
import { Portfolio, PortfolioSection } from '../../types';
import SectionEditor from './SectionEditor';

interface PortfolioEditorProps {
  portfolio: Portfolio;
  onUpdatePortfolio: (portfolio: Portfolio) => void;
  onSave: () => void;
}

const PortfolioEditor: React.FC<PortfolioEditorProps> = ({
  portfolio,
  onUpdatePortfolio,
  onSave
}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const updateSection = (sectionId: string, updates: Partial<PortfolioSection>) => {
    const updatedSections = portfolio.sections.map(section =>
      section.id === sectionId ? { ...section, ...updates } : section
    );
    onUpdatePortfolio({ ...portfolio, sections: updatedSections });
  };

  const addSection = (type: PortfolioSection['type']) => {
    const newSection: PortfolioSection = {
      id: Date.now().toString(),
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      content: {},
      order: portfolio.sections.length,
      isVisible: true
    };
    onUpdatePortfolio({
      ...portfolio,
      sections: [...portfolio.sections, newSection]
    });
  };

  const removeSection = (sectionId: string) => {
    const updatedSections = portfolio.sections.filter(section => section.id !== sectionId);
    onUpdatePortfolio({ ...portfolio, sections: updatedSections });
  };

  const reorderSections = (dragIndex: number, hoverIndex: number) => {
    const updatedSections = [...portfolio.sections];
    const draggedSection = updatedSections[dragIndex];
    updatedSections.splice(dragIndex, 1);
    updatedSections.splice(hoverIndex, 0, draggedSection);
    
    // Update order values
    updatedSections.forEach((section, index) => {
      section.order = index;
    });
    
    onUpdatePortfolio({ ...portfolio, sections: updatedSections });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Portfolio Editor</h2>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Portfolio Title
              </label>
              <input
                type="text"
                value={portfolio.title}
                onChange={(e) => onUpdatePortfolio({ ...portfolio, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Portfolio Sections
              </label>
              <div className="space-y-2">
                {portfolio.sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      activeSection === section.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{section.title}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateSection(section.id, { isVisible: !section.isVisible });
                          }}
                          className={`p-1 rounded ${
                            section.isVisible ? 'text-green-600' : 'text-gray-400'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSection(section.id);
                          }}
                          className="p-1 text-red-600 hover:text-red-800"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 capitalize">{section.type}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addSection(e.target.value as PortfolioSection['type']);
                      e.target.value = '';
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Add new section...</option>
                  <option value="hero">Hero</option>
                  <option value="about">About</option>
                  <option value="experience">Experience</option>
                  <option value="projects">Projects</option>
                  <option value="skills">Skills</option>
                  <option value="education">Education</option>
                  <option value="contact">Contact</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {activeSection ? (
          <SectionEditor
            section={portfolio.sections.find(s => s.id === activeSection)!}
            onUpdateSection={(updates) => updateSection(activeSection, updates)}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a section to edit
              </h3>
              <p className="text-gray-500">
                Choose a section from the sidebar to start editing your portfolio
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioEditor;
