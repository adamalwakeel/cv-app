import React from 'react';
import { CheckCircle2, AlertTriangle, List, KeyRound, Globe } from 'lucide-react';
import { checkATSCompatibility } from '../utils/atsChecker';

interface ATSCheckerProps {
  content: string;
}

export default function ATSChecker({ content }: ATSCheckerProps) {
  const result = checkATSCompatibility(content);
  const isSwedish = result.language === 'swedish';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">
            {isSwedish ? 'ATS-Kompatibilitetskontroll' : 'ATS Compatibility Check'}
          </h2>
          <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-full">
            <Globe size={16} className="text-blue-500" />
            <span className="text-sm text-blue-700 capitalize">{result.language}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{result.score}%</span>
          {result.score >= 80 ? (
            <CheckCircle2 className="text-green-500" size={24} />
          ) : (
            <AlertTriangle className="text-yellow-500" size={24} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="text-yellow-500" size={20} />
            <h3 className="font-semibold">
              {isSwedish ? 'Problem att åtgärda' : 'Issues to Address'}
            </h3>
          </div>
          <ul className="space-y-2">
            {result.issues.map((issue, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-yellow-500">•</span>
                {issue}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <KeyRound className="text-blue-500" size={20} />
            <h3 className="font-semibold">
              {isSwedish ? 'Upptäckta nyckelord' : 'Detected Keywords'}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <List className="text-green-500" size={20} />
            <h3 className="font-semibold">
              {isSwedish ? 'Optimeringsförslag' : 'Optimization Suggestions'}
            </h3>
          </div>
          <ul className="space-y-2">
            {result.suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-green-500">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}