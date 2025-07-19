
import { useEffect, useCallback } from 'react';
import { usePresentationContext } from '../contexts/PresentationContext';

export const useScrollSync = () => {
  const { state, setAutoScrolling, seekToSection } = usePresentationContext();

  const scrollToSection = useCallback((sectionIndex: number) => {
    const section = document.getElementById(`section-${sectionIndex}`);
    if (section) {
      console.log(`Scrolling to section ${sectionIndex}`);
      // Temporarily disable scroll listeners to prevent interference
      setAutoScrolling(true);
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [setAutoScrolling]);

  // Manual scroll detection (when user scrolls manually)
  useEffect(() => {
    const handleScroll = () => {
      // Only handle manual scrolling when not auto-scrolling and not playing
      if (state.isAutoScrolling || state.isPlaying) return;

      const sections = document.querySelectorAll('[id^="section-"]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;

        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          if (index !== state.currentSection) {
            console.log(`Manual scroll detected - section ${index}`);
            seekToSection(index);
          }
        }
      });
    };

    const handleWheel = () => {
      // When user manually scrolls during playback, pause auto-scrolling
      if (state.isPlaying && state.isAutoScrolling) {
        console.log('Manual scroll detected during playback - disabling auto-scroll');
        setAutoScrolling(false);
      }
    };

    // Only add listeners when not auto-scrolling
    if (!state.isAutoScrolling) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('wheel', handleWheel, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [state.isAutoScrolling, state.isPlaying, state.currentSection, seekToSection, setAutoScrolling]);

  // Auto scroll when playing and section changes
  useEffect(() => {
    if (state.isPlaying && state.isAutoScrolling) {
      console.log(`Auto-scrolling triggered for section ${state.currentSection}`);
      // Add a small delay to ensure the section update is complete
      const timeoutId = setTimeout(() => {
        scrollToSection(state.currentSection);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [state.currentSection, state.isAutoScrolling, state.isPlaying, scrollToSection]);

  return { scrollToSection };
};
