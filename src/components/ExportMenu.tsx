import React, { useState } from 'react';
import { FileText, Download, FileOutput } from 'lucide-react';
import { exportToDocx, exportToPdf } from '../utils/exportUtils';

interface ExportMenuProps {
  content: string;
}

export default function ExportMenu({ content }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Download size={20} />
        Export CV
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu">
            <button
              onClick={() => {
                exportToDocx(content);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
              role="menuitem"
            >
              <FileText size={16} />
              Export as DOCX
            </button>
            <button
              onClick={() => {
                exportToPdf(content);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
              role="menuitem"
            >
              <FileOutput size={16} />
              Export as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}