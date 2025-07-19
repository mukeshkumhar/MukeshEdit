
import React, { useEffect, useRef, useState } from 'react';
import { Camera, Film, Scissors, Award } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Film, label: 'Projects Completed', value: '150+' },
    { icon: Camera, label: 'Years Experience', value: '8+' },
    { icon: Scissors, label: 'Hours Edited', value: '5000+' },
    { icon: Award, label: 'Awards Won', value: '12' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <div ref={aboutRef} className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I'm a passionate video editor with over 8 years of experience in crafting compelling visual narratives. 
              From commercial advertisements to documentary films, I bring stories to life through the power of editing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
            <div className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl overflow-hidden">
                  <div className="absolute inset-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Film className="w-10 h-10 text-black" />
                      </div>
                      <p className="text-gray-300">Professional Portrait</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">My Journey</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Started as a freelance editor in 2016, I've evolved into a versatile creative professional 
                specializing in narrative storytelling, motion graphics, and color grading. My work spans 
                across multiple genres including music videos, corporate content, and independent films.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I believe that great editing is invisible—it should serve the story and evoke emotion 
                without drawing attention to itself. Every cut, every transition, every effect is carefully 
                crafted to enhance the viewer's experience.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center group cursor-pointer transition-all duration-1000 delay-${(index + 1) * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-yellow-400/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-yellow-400/10">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">{stat.value}</h4>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
