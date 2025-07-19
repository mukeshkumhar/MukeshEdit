
import React, { useEffect } from 'react';
import { usePresentationContext } from '../contexts/PresentationContext';

const PresentationAudio = () => {
  const { audioRef, updateTime, state } = usePresentationContext();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      updateTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      // Set initial duration and other metadata
    };

    const handleEnded = () => {
      // Handle presentation end
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef, updateTime]);

  return (
    <audio
      ref={audioRef}
      preload="auto"
      className="hidden"
    >
      <source src="/presentation-audio.mp3" type="audio/mpeg" />
      <source src="/presentation-audio.wav" type="audio/wav" />
      {/* Fallback for demo - you can replace with actual audio file */}
    </audio>
  );
};

export default PresentationAudio;
