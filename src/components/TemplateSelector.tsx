import React from 'react';
import { Layout } from 'lucide-react';
import { templates } from '../utils/templates';

interface TemplateSelectorProps {
  onSelect: (template: string) => void;
}

export default function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Layout className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold">Choose a Template</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(templates).map(([key, template]) => (
          <button
            key={key}
            onClick={() => onSelect(template.content)}
            className="group relative aspect-[8.5/11] border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-500 transition-colors"
          >
            <div className="absolute inset-0 bg-white p-3 transform scale-[0.98] shadow-md">
              <div className="text-xs leading-tight text-gray-500">{template.preview}</div>
            </div>
            <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-10 transition-colors flex items-center justify-center">
              <span className="text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Use {template.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}