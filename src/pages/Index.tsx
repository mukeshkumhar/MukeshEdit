
import React from 'react';
import { PresentationProvider } from '../contexts/PresentationContext';
import { useScrollSync } from '../hooks/useScrollSync';
import Hero from '../components/Hero';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';
import ThreeScene from '../components/ThreeScene';
import Subtitles from '../components/Subtitles';
import PresentationControls from '../components/PresentationControls';
import PresentationAudio from '../components/PresentationAudio';

const IndexContent = () => {
  useScrollSync();

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <ThreeScene />
      <Navigation />
      
      <div id="section-0">
        <Hero />
      </div>
      <div id="section-1">
        <About />
      </div>
      <div id="section-2">
        <Portfolio />
      </div>
      <div id="section-3">
        <Skills />
      </div>
      <div id="section-4">
        <Experience />
      </div>
      <div id="section-5">
        <Testimonials />
      </div>
      <div id="section-6">
        <Contact />
      </div>

      <Subtitles />
      <PresentationControls />
      <PresentationAudio />
    </div>
  );
};

const Index = () => {
  return (
    <PresentationProvider>
      <IndexContent />
    </PresentationProvider>
  );
};

export default Index;
