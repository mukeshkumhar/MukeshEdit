import React, { useEffect, useRef, useState } from 'react';
import { Play, Download, ArrowDown, Volume2, VolumeX } from 'lucide-react';
import { usePresentationContext } from '../contexts/PresentationContext';
import VideoModal from './VideoModal';


const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { state, play, pause } = usePresentationContext();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cubeRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 30;
        const y = (clientY / innerHeight - 0.5) * 30;
        
        cubeRef.current.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePresentationPlay = () => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  // Add this function inside your Hero component:
  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Film Grain Effect */}
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjQiLz48L3N2Zz4=')] animate-pulse"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>

        {/* Floating Video Elements - Adjusted for mobile */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 sm:top-20 left-4 sm:left-10 w-12 sm:w-16 h-9 sm:h-12 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-lg animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="hidden sm:block absolute top-40 right-20 w-20 h-15 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 sm:bottom-40 left-4 sm:left-20 w-10 sm:w-12 h-7 sm:h-9 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Enhanced 3D Floating Cube - Hidden on mobile */}
        <div
          ref={cubeRef}
          className="hidden lg:block absolute right-4 xl:right-10 top-1/2 transform -translate-y-1/2 w-32 xl:w-40 h-32 xl:h-40 transition-transform duration-300 ease-out"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-30 rounded-lg transform rotateY-0 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-30 rounded-lg transform rotateY-90 translate-z-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-30 rounded-lg transform rotateY-180 translate-z-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-30 rounded-lg transform rotateY-270 translate-z-20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div ref={heroRef} className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          {/* Enhanced Video Player Interface */}
          <div className="mb-6 sm:mb-8 relative">
            <div className="bg-black/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-400/30">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button
                    onClick={handlePresentationPlay}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    {state.isPlaying ? (
                      <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    ) : (
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 text-black fill-current" />
                    )}
                  </button>
                  <div className="text-yellow-400 text-xs sm:text-sm font-semibold text-center sm:text-left">
                    {state.isPlaying ? 'Presentation Playing' : 'Click to Start Experience'}
                  </div>
                </div>
                {/* Enhanced Waveform Visualization */}
                <div className="flex items-center justify-center space-x-0.5 sm:space-x-1 h-0 sm:h-5">
                  {[...Array(window.innerWidth < 640 ? 30 : 35)].map((_, i) => (
                    <div
                      key={i}
                      className={`bg-gradient-to-t from-yellow-400 to-orange-500 w-0.5 sm:w-1 rounded-full transition-all duration-0 ${state.isPlaying ? 'animate-pulse' : ''
                        }`}
                      style={{
                        height: `${Math.random() * (window.innerWidth < 640 ? 40 : 30) + 10}px`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: `${1 + Math.random()}s`,
                        opacity: state.isPlaying ? 1 : 0.5
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(state.currentTime / 210) * 100}%` }}
                ></div>
              </div>

              <div className="text-yellow-400 text-xs sm:text-sm font-mono">
                Interactive Portfolio
              </div>
              
              
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in px-2">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              Visual
            </span>
            <br />
            <span className="text-white animate-fade-in" style={{ animationDelay: '0.5s' }}>Storyteller</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 animate-fade-in px-4" style={{ animationDelay: '0.7s' }}>
            Crafting cinematic experiences through the art of video editing
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in px-4" style={{ animationDelay: '1s' }}>
            <button 
              onClick={openVideoModal}
              className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-semibold flex items-center space-x-2 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25 animate-pulse"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Watch Reel</span>
            </button>
            
            {/* <button className="group border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full font-semibold flex items-center space-x-2 hover:bg-yellow-400 hover:text-black transition-all duration-300">
              
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Resume</span>
            </button> */}
            <a
              href="https://drive.google.com/uc?export=download&id=1KAjzDIRO544DfhEzoo5Uh5Rqw8rCDRRR"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full font-semibold flex items-center space-x-2 hover:bg-yellow-400 hover:text-black transition-all duration-300"
            >
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator with Animation */}
        <button
          onClick={handleScrollToAbout}
          className="absolute bottom-8 justify-center transform -translate-x-1/2 animate-bounce focus:outline-none"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label="Scroll to About section"
        >
          <div className="flex flex-col items-center">
            <ArrowDown className="w-6 h-6 text-yellow-400 animate-pulse" />
            <div className="text-yellow-400 text-sm mt-2 animate-fade-in">Scroll to Explore</div>
          </div>
        </button>
      </section>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={closeVideoModal}
        videoSrc="0wPabaO0iu4"
        title="My Video Editing Showreel"
      />
    </>
  );
};

export default Hero;
