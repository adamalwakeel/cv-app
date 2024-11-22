import keyword_extractor from 'keyword-extractor';
import * as franc from 'franc';
import LanguageDetect from 'languagedetect';

interface ATSCheckResult {
  score: number;
  issues: string[];
  keywords: string[];
  suggestions: string[];
  language: string;
}

const swedishKeywords = {
  sections: ['erfarenhet', 'utbildning', 'kompetenser', 'sammanfattning', 'färdigheter'],
  roles: ['utvecklare', 'projektledare', 'chef', 'konsult', 'ingenjör'],
  skills: ['ledarskap', 'projektledning', 'teamarbete', 'kommunikation', 'problemlösning']
};

const englishKeywords = {
  sections: ['experience', 'education', 'skills', 'summary', 'competencies'],
  roles: ['developer', 'manager', 'engineer', 'consultant', 'analyst'],
  skills: ['leadership', 'project management', 'teamwork', 'communication', 'problem-solving']
};

function detectLanguage(content: string): string {
  const lngDetector = new LanguageDetect();
  const francResult = franc.franc(content);
  const languageDetectResult = lngDetector.detect(content, 1)[0];

  if (francResult === 'swe' || (languageDetectResult && languageDetectResult[0].toLowerCase().includes('swedish'))) {
    return 'swedish';
  }
  return 'english';
}

function getLanguageSpecificChecks(content: string, language: string) {
  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 100;

  const keywords = language === 'swedish' ? swedishKeywords : englishKeywords;
  const sections = keywords.sections;
  
  const missingSections = sections.filter(section => 
    !content.toLowerCase().includes(section)
  );

  if (missingSections.length > 0) {
    issues.push(
      language === 'swedish' 
        ? `Saknade viktiga sektioner: ${missingSections.join(', ')}`
        : `Missing key sections: ${missingSections.join(', ')}`
    );
    score -= (missingSections.length * 5);
  }

  // Check for common formatting issues
  if (content.includes('•')) {
    issues.push(
      language === 'swedish'
        ? 'Ersätt punkter (•) med bindestreck (-)'
        : 'Replace bullet points (•) with hyphens (-)'
    );
    score -= 5;
  }

  // Check content length
  const words = content.split(/\s+/).length;
  if (words < 300) {
    issues.push(
      language === 'swedish'
        ? 'CV:t kan vara för kort - sikta på 300-700 ord'
        : 'CV content may be too brief - aim for 300-700 words'
    );
    score -= 10;
  }

  // Add language-specific suggestions
  if (language === 'swedish') {
    suggestions.push(
      'Använd standardrubriker (Erfarenhet, Utbildning, Kompetenser)',
      'Se till att kontaktinformation finns överst',
      'Använd omvänd kronologisk ordning för erfarenheter',
      'Inkludera mätbara prestationer med siffror'
    );
  } else {
    suggestions.push(
      'Use standard section headings (Experience, Education, Skills)',
      'Ensure contact information is at the top',
      'Use reverse chronological order for experience',
      'Include measurable achievements with numbers'
    );
  }

  return { issues, suggestions, score };
}

export function checkATSCompatibility(content: string): ATSCheckResult {
  const language = detectLanguage(content);
  const { issues, suggestions, score } = getLanguageSpecificChecks(content, language);

  // Extract keywords based on language
  const keywords = keyword_extractor.extract(content, {
    language: language === 'swedish' ? 'swedish' : 'english',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true
  });

  return {
    score: Math.max(0, score),
    issues,
    keywords: keywords.slice(0, 15),
    suggestions,
    language
  };
}