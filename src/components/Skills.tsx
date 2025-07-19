
import React, { useState, useEffect, useRef } from 'react';
import { Monitor, Palette, Zap, Layers, Video, Music } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    {
      icon: Monitor,
      title: 'Video Editing',
      description: 'Expert in Adobe Premiere Pro, Final Cut Pro, and DaVinci Resolve',
      percentage: 95,
      tools: ['Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve']
    },
    {
      icon: Palette,
      title: 'Color Grading',
      description: 'Professional color correction and cinematic color grading',
      percentage: 90,
      tools: ['DaVinci Resolve', 'Lumetri Color', 'FilmConvert']
    },
    {
      icon: Layers,
      title: 'Motion Graphics',
      description: 'Creating stunning animations and visual effects',
      percentage: 85,
      tools: ['After Effects', 'Cinema 4D', 'Blender']
    },
    {
      icon: Music,
      title: 'Audio Editing',
      description: 'Professional audio mixing and sound design',
      percentage: 80,
      tools: ['Pro Tools', 'Audition', 'Logic Pro']
    },
    {
      icon: Zap,
      title: 'VFX & Compositing',
      description: 'Advanced visual effects and compositing techniques',
      percentage: 75,
      tools: ['After Effects', 'Nuke', 'Fusion']
    },
    {
      icon: Video,
      title: 'Storytelling',
      description: 'Crafting compelling narratives through visual storytelling',
      percentage: 92,
      tools: ['Narrative Structure', 'Pacing', 'Emotion']
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6">
        <div ref={skillsRef} className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Mastery across all aspects of video production and post-production
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`group transition-all duration-1000 delay-${(index + 1) * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-yellow-400/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-yellow-400/10 h-full">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <skill.icon className="w-8 h-8 text-black" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                    {skill.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 text-sm font-semibold">Proficiency</span>
                      <span className="text-yellow-400 text-sm font-bold">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: isVisible ? `${skill.percentage}%` : '0%',
                          transitionDelay: `${(index + 1) * 200}ms`
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-2">
                    {skill.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-xs font-medium border border-yellow-400/20"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
