
import React, { useEffect } from 'react';
import { usePresentationContext } from '../contexts/PresentationContext';

const subtitleData = [
  { start: 0, end: 30, text: "Welcome to my video editing portfolio" },
  { start: 30, end: 60, text: "I'm a passionate video editor with 8+ years of experience" },
  { start: 60, end: 90, text: "Here are some of my best projects across different genres" },
  { start: 90, end: 120, text: "I specialize in video editing, color grading, and motion graphics" },
  { start: 120, end: 150, text: "My professional journey and achievements" },
  { start: 150, end: 180, text: "What my clients say about working with me" },
  { start: 180, end: 210, text: "Let's create something amazing together" }
];

const Subtitles = () => {
  const { state, updateSubtitles } = usePresentationContext();

  useEffect(() => {
    const currentSubtitle = subtitleData.find(
      subtitle => state.currentTime >= subtitle.start && state.currentTime < subtitle.end
    );
    
    updateSubtitles(currentSubtitle ? currentSubtitle.text : '');
  }, [state.currentTime, updateSubtitles]);

  if (!state.subtitles) return null;

  return (
    <div className="fixed bottom-24 sm:bottom-32 left-1/2 transform -translate-x-1/2 z-40 px-4">
      <div className="bg-black/80 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-2 sm:py-3 max-w-xs sm:max-w-2xl mx-auto">
        <p className="text-white text-center text-sm sm:text-lg font-medium">
          {state.subtitles}
        </p>
      </div>
    </div>
  );
};

export default Subtitles;
