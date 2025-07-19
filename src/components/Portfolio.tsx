
import React, { useState, useEffect, useRef } from 'react';
import { Play, ExternalLink, Calendar, Clock, Volume2, Maximize2, Eye } from 'lucide-react';

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (portfolioRef.current) {
      observer.observe(portfolioRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'music', name: 'Music Videos' },
    { id: 'documentary', name: 'Documentary' },
    { id: 'corporate', name: 'Corporate' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Brand Revolution',
      category: 'commercial',
      duration: '2:30',
      year: '2024',
      views: '1.2M',
      description: 'A dynamic commercial showcasing the evolution of a tech brand',
      thumbnail: 'commercial-1'
    },
    {
      id: 2,
      title: 'Midnight Dreams',
      category: 'music',
      duration: '3:45',
      year: '2024',
      views: '890K',
      description: 'Ethereal music video with stunning visual effects',
      thumbnail: 'music-1'
    },
    {
      id: 3,
      title: 'Ocean Guardians',
      category: 'documentary',
      duration: '45:00',
      year: '2023',
      views: '2.1M',
      description: 'Environmental documentary about ocean conservation',
      thumbnail: 'documentary-1'
    },
    {
      id: 4,
      title: 'Tech Innovations',
      category: 'corporate',
      duration: '1:20',
      year: '2024',
      views: '450K',
      description: 'Corporate presentation showcasing innovative solutions',
      thumbnail: 'corporate-1'
    },
    {
      id: 5,
      title: 'Urban Pulse',
      category: 'music',
      duration: '4:12',
      year: '2023',
      views: '1.5M',
      description: 'High-energy music video shot in urban landscapes',
      thumbnail: 'music-2'
    },
    {
      id: 6,
      title: 'Future Forward',
      category: 'commercial',
      duration: '1:45',
      year: '2024',
      views: '720K',
      description: 'Futuristic commercial with cutting-edge visual effects',
      thumbnail: 'commercial-2'
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div ref={portfolioRef} className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent animate-pulse">
                Portfolio
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A showcase of my best work across different genres and styles
            </p>
            
            {/* Video Statistics */}
            <div className="flex justify-center space-x-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 animate-pulse">50+</div>
                <div className="text-gray-400 text-sm">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 animate-pulse">10M+</div>
                <div className="text-gray-400 text-sm">Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 animate-pulse">25+</div>
                <div className="text-gray-400 text-sm">Awards</div>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black animate-pulse'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group cursor-pointer transition-all duration-1000 delay-${(index + 1) * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-yellow-400/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-yellow-400/20">
                  {/* Video Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-yellow-400/20 to-orange-500/20 relative overflow-hidden">
                    {/* Simulated Video Frame */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50 flex items-center justify-center">
                      <div className={`w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center transition-all duration-300 ${
                        hoveredProject === project.id ? 'scale-110 animate-pulse' : ''
                      }`}>
                        <Play className="w-8 h-8 text-black fill-current" />
                      </div>
                    </div>
                    
                    {/* Video Controls Overlay */}
                    <div className={`absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4`}>
                      <div className="flex justify-between items-start">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <div className="text-white text-xs">● LIVE</div>
                        </div>
                        <div className="flex space-x-2">
                          <Volume2 className="w-5 h-5 text-white hover:text-yellow-400 cursor-pointer" />
                          <Maximize2 className="w-5 h-5 text-white hover:text-yellow-400 cursor-pointer" />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <ExternalLink className="w-8 h-8 text-yellow-400 mx-auto mb-2 animate-bounce" />
                        <p className="text-white font-semibold">Watch Full Video</p>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-700 rounded-full h-1">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1 rounded-full animate-pulse" style={{ width: `${Math.random() * 100}%` }}></div>
                      </div>
                    </div>

                    {/* Video Quality Badge */}
                    <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-yellow-400 text-xs font-bold">
                      4K
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-semibold capitalize animate-pulse">
                        {project.category}
                      </span>
                      <div className="flex items-center space-x-4 text-gray-400 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{project.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{project.views}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Audio Waveform Visualization */}
                    <div className="flex items-center space-x-1 h-8">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-t from-yellow-400/30 to-orange-500/30 w-1 rounded-full transition-all duration-300"
                          style={{
                            height: `${Math.random() * 20 + 5}px`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25 animate-pulse">
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Complete Showreel</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
