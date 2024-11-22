import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface CVEditorProps {
  content: string;
  onSave: (content: string) => void;
}

export default function CVEditor({ content, onSave }: CVEditorProps) {
  const [editedContent, setEditedContent] = useState(content);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">CV Editor</h2>
        <button
          onClick={() => onSave(editedContent)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Save size={20} />
          Save Changes
        </button>
      </div>
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="w-full h-[500px] p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Your CV content will appear here..."
      />
    </div>
  );
}