import React from 'react';
import { TemplateType } from '../../types';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType | null;
  onSelectTemplate: (template: TemplateType) => void;
}

const templates: { type: TemplateType; name: string; description: string; preview: string }[] = [
  {
    type: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with bold typography',
    preview: '/previews/modern.jpg'
  },
  {
    type: 'classic',
    name: 'Classic',
    description: 'Traditional and professional layout',
    preview: '/previews/classic.jpg'
  },
  {
    type: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant with plenty of white space',
    preview: '/previews/minimal.jpg'
  },
  {
    type: 'creative',
    name: 'Creative',
    description: 'Artistic and unique design for creative professionals',
    preview: '/previews/creative.jpg'
  },
  {
    type: 'professional',
    name: 'Professional',
    description: 'Corporate-focused design for business professionals',
    preview: '/previews/professional.jpg'
  }
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate
}) => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Choose Your Portfolio Template
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Select a template that best represents your style and profession
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.type}
              className={`relative group cursor-pointer rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
                selectedTemplate === template.type
                  ? 'ring-4 ring-indigo-500'
                  : 'hover:ring-2 hover:ring-gray-300'
              }`}
              onClick={() => onSelectTemplate(template.type)}
            >
              <div className="aspect-w-3 aspect-h-4">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-semibold">{template.name}</h3>
                <p className="text-sm opacity-90">{template.description}</p>
              </div>
              {selectedTemplate === template.type && (
                <div className="absolute top-2 right-2 bg-indigo-500 text-white rounded-full p-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
