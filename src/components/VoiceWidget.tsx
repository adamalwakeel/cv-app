import React from 'react';

interface VoiceWidgetProps {
  onTranscript: (text: string) => void;
  onAIResponse: (response: string) => void;
}

export default function VoiceWidget({ onTranscript, onAIResponse }: VoiceWidgetProps) {
  return (
    <div className="fixed bottom-2 right-2">
      <iframe 
        id="audio_iframe" 
        src="https://widget.synthflow.ai/widget/v2/1732192787798x382251618127196200/1732192787677x320232322289415400" 
        allow="microphone" 
        width="250"
        height="450"
        style={{
          background: 'transparent',
          border: 'none',
          zIndex: 999,
          pointerEvents: 'auto',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          borderRadius: '12px'
        }}
      />
    </div>
  );
}