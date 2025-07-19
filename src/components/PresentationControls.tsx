
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { usePresentationContext } from '../contexts/PresentationContext';

const PresentationControls = () => {
  const { state, play, pause, seekToSection, audioRef } = usePresentationContext();

  const sections = [
    'Welcome', 'About', 'Portfolio', 'Skills', 'Experience', 'Testimonials', 'Contact'
  ];

  const handlePlayPause = () => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handlePrevSection = () => {
    const prevSection = Math.max(0, state.currentSection - 1);
    seekToSection(prevSection);
  };

  const handleNextSection = () => {
    const nextSection = Math.min(sections.length - 1, state.currentSection + 1);
    seekToSection(nextSection);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-4">
      <div className="bg-black/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-yellow-400/30 max-w-xs sm:max-w-none">
        <div className="flex items-center justify-between sm:space-x-4">
          {/* Previous Section */}
          <button
            onClick={handlePrevSection}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
            disabled={state.currentSection === 0}
          >
            <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={handlePlayPause}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
          >
            {state.isPlaying ? (
              <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            ) : (
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-black fill-current" />
            )}
          </button>

          {/* Next Section */}
          <button
            onClick={handleNextSection}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
            disabled={state.currentSection === sections.length - 1}
          >
            <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>

          {/* Volume - Hidden on mobile */}
          <button className="hidden sm:flex w-10 h-10 bg-gray-700 rounded-full items-center justify-center hover:bg-gray-600 transition-colors">
            <Volume2 className="w-5 h-5 text-white" />
          </button>

          {/* Time Display - Hidden on mobile */}
          <div className="hidden sm:block text-white text-sm font-mono">
            {formatTime(state.currentTime)} / {formatTime(state.duration || 210)}
          </div>

          {/* Current Section - Truncated on mobile */}
          <div className="text-yellow-400 text-xs sm:text-sm font-semibold max-w-20 sm:max-w-none truncate">
            {sections[state.currentSection]}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2 mt-3 sm:mt-4">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
            style={{ width: `${(state.currentTime / (state.duration || 210)) * 100}%` }}
          ></div>
        </div>

        {/* Section Indicators */}
        <div className="flex justify-between mt-2 space-x-1">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => seekToSection(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === state.currentSection
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PresentationControls;
