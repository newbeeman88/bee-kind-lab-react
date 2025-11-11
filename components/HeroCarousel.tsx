import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './fallback/ImageWithFallback';

interface CarouselImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const heroImages: CarouselImage[] = [
  {
    src: "/000001.jpg",
    alt: "Bees on flowers in sunlight",
    title: 'Nature\'s Golden Workers',
    description: 'Beautiful bees collecting nectar from vibrant flowers'
  },
  {
    src: "/000006.jpg",
    alt: "Honeycomb close up",
    title: 'So pink and so cute! ',
    description: 'What a picture with a cute bee and beautiful flower'
  },
  {
    src: "/000007.jpg",
    alt: "Beautiful hives",
    title: 'Beautiful hives',
    description: 'So golden and so beautiful. What a hive!'
  },
    {
    src: "https://images.unsplash.com/photo-1586106901159-815a40383396?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA3fHxiZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900",
    alt: "Honey looks so sweet",
    title: 'Honey looks so sweet',
    description: 'Wanna have a try?'
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1681506399058-89fb8a9fc714?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMyfHxiZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900",
    alt: "Beekeeper with hive",
    title: 'The Art of Beekeeping',
    description: 'A beekeeper is working so hard.'
  },
    {
    src: "/000009.jpg",
    alt: "The QUEEN!",
    title: 'The QUEEN!',
    description: 'Are you seeing the queen there?'
  },

  
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 10000; // 5 seconds
  const PROGRESS_UPDATE_INTERVAL = 50; // Update progress every 50ms

  // Auto-advance slides
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setProgress(0);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev);
    if (!isAutoPlaying) {
      setProgress(0); // Reset progress when resuming
    }
  }, [isAutoPlaying]);

  // Handle auto-play and progress
  useEffect(() => {
    if (!isAutoPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (PROGRESS_UPDATE_INTERVAL / SLIDE_DURATION) * 100;
        
        if (newProgress >= 100) {
          nextSlide();
          return 0;
        }
        
        return newProgress;
      });
    }, PROGRESS_UPDATE_INTERVAL);

    return () => clearInterval(progressInterval);
  }, [isAutoPlaying, nextSlide]);

  // Reset progress when manually changing slides
  useEffect(() => {
    setProgress(0);
  }, [currentSlide]);

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-3xl shadow-2xl group">
      {/* Image Slides */}
      <div className="relative w-full h-full">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <ImageWithFallback
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
          </div>
        ))}
      </div>

      {/* Main Content Overlay */}
      <div className="absolute inset-0 flex items-start justify-start mt-3 z-20">
        <div className="text-center text-white px-6 max-w-5xl">

          {/* Current Image Info */}
          <div className="bg-white/15 backdrop-blur-md rounded-3xl px-8 py-6 max-w-lg mx-auto border border-white/20 shadow-2xl animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-600">
            <h3 className="font-bold text-xl mb-2 transition-all duration-500" 
                style={{ fontFamily: 'var(--font-family-heading)' }}>
              {heroImages[currentSlide].title}
            </h3>
            <p className="text-sm md:text-base opacity-90 transition-all duration-500" 
               style={{ fontFamily: 'var(--font-family-primary)' }}>
              {heroImages[currentSlide].description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-30 bg-gradient-to-r from-white/25 to-white/15 hover:from-white/40 hover:to-white/30 active:from-white/50 active:to-white/40 text-white backdrop-blur-md rounded-full w-14 h-14 transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl border border-white/20 opacity-80 group-hover:opacity-100"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-7 h-7" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30 bg-gradient-to-l from-white/25 to-white/15 hover:from-white/40 hover:to-white/30 active:from-white/50 active:to-white/40 text-white backdrop-blur-md rounded-full w-14 h-14 transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl border border-white/20 opacity-80 group-hover:opacity-100"
        onClick={nextSlide}
      >
        <ChevronRight className="w-7 h-7" />
      </Button>

      {/* Auto-Play Control */}
      <div className="absolute top-4 md:top-8 right-4 md:right-8 z-30 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          variant="ghost"
          size="icon"
          className="bg-gradient-to-r from-white/25 to-white/15 hover:from-white/35 hover:to-white/25 text-white backdrop-blur-md rounded-full w-12 h-12 transition-all duration-300 hover:scale-110 shadow-lg border border-white/20"
          onClick={toggleAutoPlay}
          title={isAutoPlaying ? 'Pause auto-play' : 'Resume auto-play'}
        >
          {isAutoPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Slide Indicators with Progress */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-4">
        {heroImages.map((image, index) => (
          <button
            key={index}
            className={`relative group transition-all duration-300 ${
              index === currentSlide ? 'scale-110' : 'hover:scale-105'
            }`}
            onClick={() => goToSlide(index)}
            title={image.title}
          >
            {/* Progress ring for current slide */}
            {index === currentSlide && (
              <div className="absolute inset-0 -m-1">
                <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#FFB300"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 10}`}
                    strokeDashoffset={`${2 * Math.PI * 10 * (1 - progress / 100)}`}
                    className="transition-all duration-100 ease-linear"
                  />
                </svg>
              </div>
            )}
            
            <div className={`w-4 h-4 rounded-full transition-all duration-300 relative z-10 ${
              index === currentSlide 
                ? 'bg-gradient-to-r from-[#FFB300] to-[#FFA000] shadow-lg' 
                : 'bg-white/60 hover:bg-white/80'
            }`} />

          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/30 z-20">
        <div 
          className="h-full bg-gradient-to-r from-[#FFB300] via-[#FFA000] to-[#FF8F00] transition-all duration-100 ease-linear shadow-lg"
          style={{ 
            width: `${progress}%`
          }}
        />
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FFB300]/20 to-transparent opacity-60 z-5"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#8BC34A]/20 to-transparent opacity-60 z-5"></div>
    </div>
  );
}