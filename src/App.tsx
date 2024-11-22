import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import CVUploader from './components/CVUploader';
import VoiceWidget from './components/VoiceWidget';
import CVEditor from './components/CVEditor';
import Feedback from './components/Feedback';
import ExportMenu from './components/ExportMenu';
import TemplateSelector from './components/TemplateSelector';
import ATSChecker from './components/ATSChecker';

function App() {
  const [cvContent, setCvContent] = useState('');
  const [feedback, setFeedback] = useState([
    {
      type: 'success' as const,
      message: 'Your CV has a clear structure'
    },
    {
      type: 'warning' as const,
      message: 'Consider adding more quantifiable achievements'
    },
    {
      type: 'error' as const,
      message: 'Missing key contact information'
    }
  ]);

  const handleVoiceTranscript = (text: string) => {
    console.log('Voice input:', text);
  };

  const handleAIResponse = (response: string) => {
    console.log('AI response:', response);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">CV Assistant</h1>
            </div>
            {cvContent && <ExportMenu content={cvContent} />}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {!cvContent ? (
              <>
                <TemplateSelector onSelect={setCvContent} />
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 bg-gray-50 text-sm text-gray-500">or</span>
                  </div>
                </div>
                <CVUploader onFileContent={setCvContent} />
              </>
            ) : (
              <>
                <CVEditor content={cvContent} onSave={setCvContent} />
                <ATSChecker content={cvContent} />
              </>
            )}
          </div>
          <div className="space-y-8">
            <div className="relative -ml-5">
              <div className="bg-white h-[400px] w-[300px] rounded-lg shadow-md">
                <Feedback feedback={feedback} />
              </div>
            </div>
          </div>
        </div>
        <VoiceWidget
          onTranscript={handleVoiceTranscript}
          onAIResponse={handleAIResponse}
        />
      </main>
    </div>
  );
}

export default App;