import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, MapPin, Phone, Calendar, Heart, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

// Importing SVGs as components
import {
  SleepyBeeIcon,
  HoneyJarIcon,
  RobotHeartIcon,
  EarthCommunityIcon,
  BeeHiveIcon,
  EventsBeeIcon,
  ContactCowIcon,
  
} from './MyIcons';


interface FooterProps {
  onNavigate?: (page: string) => void;
  onChatClick?: () => void;
  isLoggedIn?: boolean;
}

export function Footer({ onNavigate, onChatClick, isLoggedIn }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('🐝 Welcome to the lab!', {
      description: 'You\'ve been subscribed to our sweet newsletter!',
      duration: 4000,
    });
    
    setEmail('');
    setIsSubscribing(false);
  };

  const quickLinks = [
    { label: 'Home', icon: BeeHiveIcon, page: 'home' },
    { label: 'Events', icon: EventsBeeIcon, page: 'events' },
    { label: 'Community', icon: EarthCommunityIcon, page: 'community' },
    { label: 'About Us', icon: ContactCowIcon, page: 'about' },
  ];

  const resources = [
    { label: 'Beekeeping 101', page: 'beekeeping-101' },
    { label: 'Hive Management', page: 'hive-management' },
    { label: 'Honey Harvesting', page: 'honey-harvesting' },
    { label: 'Disease Prevention', page: 'disease-prevention' },
    { label: 'Free Markets', page: 'free-markets' },
  ];

  const support = [
    { label: 'Contact Us', page: 'contact' },
    { label: 'FAQs', page: 'faq' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: 'https://facebook.com'
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      url: 'https://twitter.com'
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      url: 'https://instagram.com'
    },
    {
      name: 'YouTube',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      url: 'https://youtube.com'
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-sky-200 via-cyan-600 to-pink-600 text-white mt-auto">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-sky-200 via-cyan-500 to-pink-400 py-5 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-2 flex items-center justify-center md:justify-start gap-2" style={{ fontFamily: 'var(--font-family-heading)' }}>
                <HoneyJarIcon size={28} className="animate-bounce" />
                Join Our Sweet Newsletter! 
              </h3>
              <p className="text-slate-500 text-sm sm:text-base" style={{ fontFamily: 'var(--font-family-primary)' }}>
                Get buzzing updates, beekeeping tips, and exclusive hive insights
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto min-w-[280px] sm:min-w-[400px]">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/95 border-white/50 text-blue-700 placeholder:text-blue-700/50 focus:ring-2 focus:ring-white h-11 sm:h-12"
                disabled={isSubscribing}
              />
              <Button
                type="submit"
                disabled={isSubscribing}
                className="bg-blue-700 hover:bg-[#22e60c] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-11 sm:h-12 px-6"
                style={{ fontFamily: 'var(--font-family-primary)' }}
              >
                {isSubscribing ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4 group cursor-pointer" onClick={() => onNavigate?.('home')}>
              <div className="relative">
                <SleepyBeeIcon size={40} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-family-heading)' }}>
                  BeeKind Lab
                </span>
                <span className="text-xs text-white/70 font-medium -mt-1">Let's bee kind and bee nice to each other 🍯</span>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-4 leading-relaxed" style={{ fontFamily: 'var(--font-family-primary)' }}>
              A warm, buzzing community for passionate beekeepers to share knowledge, connect, and grow together.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-[#FFB300] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                  aria-label={social.name}
                >
                  <div className="text-white group-hover:text-blue-700 transition-colors">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#FFB300]" style={{ fontFamily: 'var(--font-family-heading)' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate?.(link.page)}
                    className="text-white/80 hover:text-[#FFB300] transition-colors duration-300 flex items-center gap-2 group text-sm"
                    style={{ fontFamily: 'var(--font-family-primary)' }}
                  >
                    {link.icon && (
                      link.icon === Calendar ? (
                        <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      ) : (
                        <link.icon size={16} className="group-hover:scale-110 transition-transform fill-current" />
                      )
                    )}
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </button>
                </li>
              ))}
              {isLoggedIn && (
                <li>
                  <button
                    onClick={() => onChatClick?.()}
                    className="text-white/80 hover:text-[#FFB300] transition-colors duration-300 flex items-center gap-2 group text-sm"
                    style={{ fontFamily: 'var(--font-family-primary)' }}
                    >
                    <RobotHeartIcon size={16} className="group-hover:scale-110 transition-transform fill-current" />
                    <span className="group-hover:translate-x-1 transition-transform">Ask AI 🤖</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#FFB300]" style={{ fontFamily: 'var(--font-family-heading)' }}>
              Resources
            </h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate?.(link.page)}
                    className="text-white/80 hover:text-[#FFB300] transition-colors duration-300 text-sm group"
                    style={{ fontFamily: 'var(--font-family-primary)' }}
                  >
                    <span className="group-hover:translate-x-1 inline-block transition-transform">{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#FFB300]" style={{ fontFamily: 'var(--font-family-heading)' }}>
              Support
            </h4>
            <ul className="space-y-3 mb-6">
              {support.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate?.(link.page)}
                    className="text-white/80 hover:text-[#FFB300] transition-colors duration-300 text-sm group"
                    style={{ fontFamily: 'var(--font-family-primary)' }}
                  >
                    <span className="group-hover:translate-x-1 inline-block transition-transform">{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-white/70 text-xs">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#FFB300]" />
                <span>hey@beekind.lab</span>
              </div>
              <div className="flex items-start gap-2 text-white/70 text-xs">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#FFB300]" />
                <span>+1 (555) BEE-HIVE</span>
              </div>
              <div className="flex items-start gap-2 text-white/70 text-xs">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#FFB300]" />
                <span>123, Beeville, CA 90210</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white/60 text-sm" style={{ fontFamily: 'var(--font-family-primary)' }}>
              <span>© 2025 BeeKind Lab. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <span style={{ fontFamily: 'var(--font-family-primary)' }}>Made with</span>
              <Heart className="w-4 h-4 text-[#FFB300] fill-[#FFB300] animate-pulse" />
              <span style={{ fontFamily: 'var(--font-family-primary)' }}>by beekeepers, for beekeepers 🐝</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
