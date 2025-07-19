
import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

interface PresentationState {
  isPlaying: boolean;
  currentSection: number;
  currentTime: number;
  duration: number;
  isAutoScrolling: boolean;
  subtitles: string;
}

interface PresentationContextType {
  state: PresentationState;
  audioRef: React.RefObject<HTMLAudioElement>;
  play: () => void;
  pause: () => void;
  seekToSection: (section: number) => void;
  updateTime: (time: number) => void;
  setAutoScrolling: (auto: boolean) => void;
  updateSubtitles: (text: string) => void;
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

export const usePresentationContext = () => {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error('usePresentationContext must be used within PresentationProvider');
  }
  return context;
};

export const PresentationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [state, setState] = useState<PresentationState>({
    isPlaying: false,
    currentSection: 0,
    currentTime: 0,
    duration: 210,
    isAutoScrolling: false,
    subtitles: ''
  });

  const play = useCallback(() => {
    console.log('Play button clicked');
    setState(prev => ({ ...prev, isPlaying: true, isAutoScrolling: true }));
    
    // Start timer to simulate audio playback
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setState(prev => {
        const newTime = prev.currentTime + 1;
        const sectionTimes = [0, 30, 60, 90, 120, 150, 180];
        const newSection = sectionTimes.findIndex((t, i) => 
          newTime >= t && (i === sectionTimes.length - 1 || newTime < sectionTimes[i + 1])
        );
        
        console.log(`Timer update: time=${newTime}, section=${Math.max(0, newSection)}`);
        
        if (newTime >= 210) {
          clearInterval(timerRef.current!);
          return { 
            ...prev, 
            currentTime: 210, 
            isPlaying: false, 
            isAutoScrolling: false,
            currentSection: Math.max(0, newSection)
          };
        }
        
        return { 
          ...prev, 
          currentTime: newTime,
          currentSection: Math.max(0, newSection)
        };
      });
    }, 1000);
  }, []);

  const pause = useCallback(() => {
    console.log('Pause button clicked');
    setState(prev => ({ ...prev, isPlaying: false, isAutoScrolling: false }));
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const seekToSection = useCallback((section: number) => {
    const sectionTimes = [0, 30, 60, 90, 120, 150, 180];
    const time = sectionTimes[section] || 0;
    console.log(`Seeking to section ${section} at time ${time}`);
    
    setState(prev => ({ 
      ...prev, 
      currentSection: section, 
      currentTime: time,
      isAutoScrolling: prev.isPlaying // Maintain auto-scrolling if playing
    }));
    
    // Restart timer if playing
    if (state.isPlaying && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setState(prev => {
          const newTime = prev.currentTime + 1;
          const sectionTimes = [0, 30, 60, 90, 120, 150, 180];
          const newSection = sectionTimes.findIndex((t, i) => 
            newTime >= t && (i === sectionTimes.length - 1 || newTime < sectionTimes[i + 1])
          );
          
          if (newTime >= 210) {
            clearInterval(timerRef.current!);
            return { 
              ...prev, 
              currentTime: 210, 
              isPlaying: false, 
              isAutoScrolling: false,
              currentSection: Math.max(0, newSection)
            };
          }
          
          return { 
            ...prev, 
            currentTime: newTime,
            currentSection: Math.max(0, newSection)
          };
        });
      }, 1000);
    }
  }, [state.isPlaying]);

  const updateTime = useCallback((time: number) => {
    const sectionTimes = [0, 30, 60, 90, 120, 150, 180];
    const currentSection = sectionTimes.findIndex((t, i) => 
      time >= t && (i === sectionTimes.length - 1 || time < sectionTimes[i + 1])
    );
    setState(prev => ({ ...prev, currentTime: time, currentSection: Math.max(0, currentSection) }));
  }, []);

  const setAutoScrolling = useCallback((auto: boolean) => {
    console.log(`Setting auto-scrolling to: ${auto}`);
    setState(prev => ({ ...prev, isAutoScrolling: auto }));
  }, []);

  const updateSubtitles = useCallback((text: string) => {
    setState(prev => ({ ...prev, subtitles: text }));
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <PresentationContext.Provider value={{
      state,
      audioRef,
      play,
      pause,
      seekToSection,
      updateTime,
      setAutoScrolling,
      updateSubtitles
    }}>
      {children}
    </PresentationContext.Provider>
  );
};
