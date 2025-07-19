
import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Creative Director',
      company: 'BrandVision Agency',
      avatar: 'SJ',
      rating: 5,
      text: 'Working with this editor has been transformative for our brand. The attention to detail and creative vision brought our campaign to life in ways we never imagined.'
    },
    {
      name: 'Michael Chen',
      role: 'Music Producer',
      company: 'SoundWave Records',
      avatar: 'MC',
      rating: 5,
      text: 'The music video editing was absolutely phenomenal. Every cut, every transition perfectly matched the rhythm and emotion of our track. Truly exceptional work.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Documentary Filmmaker',
      company: 'TruthTeller Films',
      avatar: 'ER',
      rating: 5,
      text: 'The editing brought such depth and emotion to our documentary. The pacing and storytelling techniques used helped us win multiple film festival awards.'
    },
    {
      name: 'David Thompson',
      role: 'Marketing Manager',
      company: 'TechFlow Solutions',
      avatar: 'DT',
      rating: 5,
      text: 'Professional, creative, and always delivers on time. Our corporate videos have never looked better. The ROI on our video marketing has increased by 200%.'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <div ref={testimonialsRef} className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                What Clients Say
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear from the amazing clients I've had the pleasure to work with
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-gray-700 relative overflow-hidden">
              {/* Background Quote */}
              <Quote className="absolute top-6 right-6 w-16 h-16 text-yellow-400/10" />

              {/* Testimonial Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-300 text-center mb-6 sm:mb-8 leading-relaxed font-light italic px-2">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-base sm:text-lg">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="text-white font-semibold text-base sm:text-lg">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {testimonials[currentTestimonial].role}
                    </p>
                    <p className="text-yellow-400 text-sm font-medium">
                      {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
