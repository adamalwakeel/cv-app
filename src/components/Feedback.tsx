import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface FeedbackProps {
  feedback: {
    type: 'success' | 'warning' | 'error';
    message: string;
  }[];
}

export default function Feedback({ feedback }: FeedbackProps) {
  const icons = {
    success: <CheckCircle className="text-green-500" size={20} />,
    warning: <AlertCircle className="text-yellow-500" size={20} />,
    error: <XCircle className="text-red-500" size={20} />
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">CV Analysis Feedback</h2>
      <div className="space-y-3">
        {feedback.map((item, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-3 rounded-lg ${
              item.type === 'success' ? 'bg-green-50' :
              item.type === 'warning' ? 'bg-yellow-50' : 'bg-red-50'
            }`}
          >
            {icons[item.type]}
            <p className="text-gray-700">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}