
import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, ExternalLink } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    { name: 'Email', icon: Mail, value: 'hello@cineedit.com', href: 'mailto:hello@cineedit.com' },
    { name: 'Phone', icon: Phone, value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { name: 'Location', icon: MapPin, value: 'Los Angeles, CA', href: '#' }
  ];

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div ref={contactRef} className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Let's Create Together
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to bring your vision to life? Let's discuss your next project
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <h3 className="text-2xl font-bold text-white mb-8">Get in Touch</h3>
              
              <div className="space-y-6 mb-8">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-center space-x-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <link.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{link.name}</p>
                      <p className="text-white font-semibold group-hover:text-yellow-400 transition-colors duration-300">
                        {link.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
                <h4 className="text-xl font-bold text-white mb-4">Project Timeline</h4>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Initial Consultation</span>
                    <span className="text-yellow-400">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Project Planning</span>
                    <span className="text-yellow-400">1-2 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Editing & Revisions</span>
                    <span className="text-yellow-400">3-7 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Final Delivery</span>
                    <span className="text-yellow-400">24 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition-colors duration-300"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition-colors duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">
                    Project Type
                  </label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition-colors duration-300"
                    required
                  >
                    <option value="">Select project type</option>
                    <option value="commercial">Commercial</option>
                    <option value="music-video">Music Video</option>
                    <option value="documentary">Documentary</option>
                    <option value="corporate">Corporate</option>
                    <option value="social-media">Social Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell me about your project, timeline, and budget..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20 pt-8">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-black" />
                </div>
                <span className="text-xl font-bold text-white">CineEdit</span>
              </div>
              <p className="text-gray-400 text-center text-sm sm:text-base">
                © 2024 CineEdit. All rights reserved. | Crafting visual stories since 2016
              </p>
            </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
