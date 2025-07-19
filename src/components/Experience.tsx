
import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, Award } from 'lucide-react';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const experienceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (experienceRef.current) {
      observer.observe(experienceRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      title: 'Senior Video Editor',
      company: 'CreativeMotion Studios',
      location: 'Los Angeles, CA',
      period: '2022 - Present',
      type: 'Full-time',
      achievements: [
        'Led post-production for 50+ commercial projects',
        'Implemented new workflow increasing efficiency by 40%',
        'Mentored junior editors and interns',
        'Specialized in high-end color grading and motion graphics'
      ]
    },
    {
      title: 'Video Editor & Motion Designer',
      company: 'Digital Storytellers',
      location: 'New York, NY',
      period: '2020 - 2022',
      type: 'Full-time',
      achievements: [
        'Edited documentary series for streaming platforms',
        'Created motion graphics templates for the team',
        'Collaborated with directors on creative vision',
        'Managed multiple projects simultaneously'
      ]
    },
    {
      title: 'Freelance Video Editor',
      company: 'Independent',
      location: 'Remote',
      period: '2018 - 2020',
      type: 'Freelance',
      achievements: [
        'Built client base of 30+ regular customers',
        'Specialized in music videos and social media content',
        'Developed signature editing style',
        'Maintained 98% client satisfaction rate'
      ]
    },
    {
      title: 'Junior Editor',
      company: 'Metro Media House',
      location: 'Chicago, IL',
      period: '2016 - 2018',
      type: 'Full-time',
      achievements: [
        'Assisted in editing feature-length documentaries',
        'Learned advanced color correction techniques',
        'Contributed to award-winning projects',
        'Gained expertise in various editing software'
      ]
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div ref={experienceRef} className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A journey through my professional career in video editing and post-production
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 to-orange-500"></div>

            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative mb-12 transition-all duration-1000 delay-${(index + 1) * 200} ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-4 border-black"></div>

                {/* Content Card */}
                <div className="ml-16 sm:ml-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700 hover:border-yellow-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-400/10">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 space-y-3 lg:space-y-0">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{exp.title}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-400 mb-2 space-y-1 sm:space-y-0">
                        <div className="flex items-center space-x-1">
                          <Briefcase className="w-4 h-4" />
                          <span className="text-yellow-400 font-semibold text-sm">{exp.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-1 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                        <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-xs font-medium w-fit">
                          {exp.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start space-x-3">
                        <Award className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-300 text-sm leading-relaxed">{achievement}</span>
                      </div>
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

export default Experience;
