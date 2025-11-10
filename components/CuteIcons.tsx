// import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Cute heart icon with pulse animation
export const CuteHeartIcon = ({ className = "", size = 24 }: IconProps) => (
  <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path 
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
        fill="url(#heartGradient)" 
        className="animate-pulse"
        style={{ animationDuration: '1.5s' }}
      />
      <defs>
        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B9D"/>
          <stop offset="100%" stopColor="#FF4757"/>
        </linearGradient>
      </defs>
      {/* Sparkles */}
      <circle cx="8" cy="8" r="1" fill="#FFB300" className="animate-ping" opacity="0.8"/>
      <circle cx="16" cy="10" r="0.5" fill="#8BC34A" className="animate-ping" style={{ animationDelay: '0.5s' }} opacity="0.6"/>
    </svg>
  </div>
);



// Cute share icon with sparkles
export const CuteShareIcon = ({ className = "", size = 24 }: IconProps) => (
  <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      {/* Main share circles */}
      <circle cx="6" cy="12" r="3" fill="url(#shareGradient1)" stroke="#8BC34A" strokeWidth="0.5"/>
      <circle cx="18" cy="6" r="3" fill="url(#shareGradient2)" stroke="#FFB300" strokeWidth="0.5"/>
      <circle cx="18" cy="18" r="3" fill="url(#shareGradient3)" stroke="#B3E5FC" strokeWidth="0.5"/>
      
      {/* Connection lines */}
      <line x1="8.5" y1="10.5" x2="15.5" y2="7.5" stroke="#6D4C41" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="8.5" y1="13.5" x2="15.5" y2="16.5" stroke="#6D4C41" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      
      {/* Cute faces */}
      <circle cx="5.5" cy="11.5" r="0.3" fill="#6D4C41"/>
      <circle cx="6.5" cy="11.5" r="0.3" fill="#6D4C41"/>
      <path d="M 5.2 12.8 Q 6 13.3 6.8 12.8" stroke="#6D4C41" strokeWidth="0.3" fill="none"/>
      
      {/* Sparkles */}
      <g className="animate-ping" style={{ animationDuration: '2s' }}>
        <path d="M 12 2 L 12.5 3.5 L 14 4 L 12.5 4.5 L 12 6 L 11.5 4.5 L 10 4 L 11.5 3.5 Z" fill="#FFB300" opacity="0.8"/>
      </g>
      <g className="animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
        <path d="M 4 4 L 4.3 4.7 L 5 5 L 4.3 5.3 L 4 6 L 3.7 5.3 L 3 5 L 3.7 4.7 Z" fill="#8BC34A" opacity="0.6"/>
      </g>
      
      <defs>
        <linearGradient id="shareGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8BC34A"/>
          <stop offset="100%" stopColor="#66BB6A"/>
        </linearGradient>
        <linearGradient id="shareGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB300"/>
          <stop offset="100%" stopColor="#FFA000"/>
        </linearGradient>
        <linearGradient id="shareGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B3E5FC"/>
          <stop offset="100%" stopColor="#81D4FA"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export const CuteSettingsIcon = ({ className = "", size = 24 }: IconProps) => (
  <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 512 512" className="w-full h-full">
      <g transform="translate(1 1)">
        <g className="animate-spin" style={{ animationDuration: '8s', transformOrigin: '255px 255px' }}>
          <path style={{ fill: '#63D3FD' }} d="M255,127H75.8l29.867,234.667c2.56,17.067,17.067,29.867,34.133,29.867H255h114.347
            c17.067,0,32.427-12.8,34.133-29.867L434.2,127H255z"/>
          <path style={{ fill: '#FFE100' }} d="M434.2,127H75.8c-9.387,0-17.067-7.68-17.067-17.067s7.68-17.067,17.067-17.067h358.4
            c9.387,0,17.067,7.68,17.067,17.067S443.587,127,434.2,127"/>
          <path style={{ fill: '#FFA800' }} d="M425.667,109.933c0-9.387-7.68-17.067-17.067-17.067h25.6c9.387,0,17.067,7.68,17.067,17.067
            S443.587,127,434.2,127h-25.6C417.987,127,425.667,119.32,425.667,109.933"/>
          <path style={{ fill: '#FFFFFF' }} d="M84.333,109.933c0-9.387,7.68-17.067,17.067-17.067H75.8c-9.387,0-17.067,7.68-17.067,17.067
            S66.413,127,75.8,127h25.6C92.013,127,84.333,119.32,84.333,109.933"/>
          <path style={{ fill: '#FFE100' }} d="M393.24,92.867c-28.16-18.773-54.613-40.96-79.36-64C299.373,16.067,278.893,7.533,255,7.533
            s-44.373,8.533-58.88,21.333c-24.747,23.04-51.2,45.227-79.36,64H393.24z"/>
          <path style={{ fill: '#FFA800' }} d="M312.173,28.867c-13.653-12.8-34.987-21.333-58.88-21.333c-5.973,0-11.093,0.853-16.213,1.707
            c17.067,2.56,31.573,10.24,42.667,19.627c24.747,23.04,51.2,45.227,79.36,64h32.427C363.373,74.093,336.92,51.907,312.173,28.867"/>
          <path style={{ fill: '#FFFFFF' }} d="M196.973,28.867c14.507-12.8,34.987-21.333,58.88-21.333c5.973,0,11.093,0.853,16.213,1.707
            C255,11.8,240.493,19.48,229.4,28.867c-24.747,23.04-51.2,45.227-79.36,64h-32.427C145.773,74.093,172.227,51.907,196.973,28.867"/>
        </g>
        
        <g className="animate-pulse" style={{ animationDuration: '2s' }}>
          <path style={{ fill: '#FFE100' }} d="M255,306.2c-11.947,0-23.893-2.56-34.133-6.827V357.4c0,18.773,15.36,34.133,34.133,34.133
            s34.133-15.36,34.133-34.133v-58.027C278.893,303.64,266.947,306.2,255,306.2"/>
          <path style={{ fill: '#FFE100' }} d="M289.133,349.72v7.68c0,18.773-15.36,34.133-34.133,34.133s-34.133-15.36-34.133-34.133v-7.68
            c-76.8,8.533-136.533,73.387-136.533,152.747l0,0h341.333l0,0C425.667,423.107,365.933,358.253,289.133,349.72"/>
        </g>
        
        <path style={{ fill: '#FFA800' }} d="M289.133,349.72v5.12c64,18.773,110.933,77.653,110.933,147.627l0,0h25.6l0,0
          C425.667,423.107,365.933,358.253,289.133,349.72"/>
        <path style={{ fill: '#FFFFFF' }} d="M220.867,349.72v5.12c-64,18.773-110.933,77.653-110.933,147.627l0,0h-25.6l0,0
          C84.333,423.107,144.067,358.253,220.867,349.72"/>
        <path style={{ fill: '#63D3FD' }} d="M348.867,502.467H161.133v-41.813c0-14.507,11.947-26.453,26.453-26.453h134.827
          c14.507,0,26.453,11.947,26.453,26.453V502.467z"/>
        <path style={{ fill: '#3DB9F9' }} d="M322.413,434.2h-25.6c14.507,0,26.453,11.947,26.453,26.453v41.813h25.6v-41.813
          C348.867,446.147,336.92,434.2,322.413,434.2"/>
        
        <g className="animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
          <path style={{ fill: '#FDCC00' }} d="M348.867,161.133c-3.413,0-5.973,0.853-8.533,1.707v47.787c2.56,0.853,5.12,1.707,8.533,1.707
            c14.507,0,25.6-11.093,25.6-25.6C374.467,172.227,363.373,161.133,348.867,161.133"/>
          <path style={{ fill: '#FDCC00' }} d="M161.133,212.333c3.413,0,5.973-0.853,8.533-1.707V162.84c-2.56-0.853-5.12-1.707-8.533-1.707
            c-14.507,0-25.6,11.093-25.6,25.6C135.533,201.24,146.627,212.333,161.133,212.333"/>
          <path style={{ fill: '#FDCC00' }} d="M173.933,127c-2.56,7.68-4.267,17.067-4.267,25.6v68.267c0,46.933,38.4,85.333,85.333,85.333
            s85.333-38.4,85.333-85.333V152.6c0-8.533-1.707-17.92-4.267-25.6H173.933z"/>
        </g>
        
        <path style={{ fill: '#FFA800' }} d="M336.067,127h-25.6c2.56,7.68,4.267,17.067,4.267,25.6v68.267c0,42.667-31.573,78.507-72.533,84.48
          c4.267,0.853,8.533,0.853,12.8,0.853c46.933,0,85.333-38.4,85.333-85.333V152.6C340.333,144.067,338.627,134.68,336.067,127"/>
      </g>
    </svg>
  </div>
);

// Cute plus icon for adding posts
export const CutePlusIcon = ({ className = "", size = 24 }: IconProps) => (
  <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      {/* Plus circle */}
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        fill="url(#plusGradient)" 
        stroke="#8BC34A" 
        strokeWidth="1"
        className="hover:animate-pulse"
      />
      {/* Plus lines */}
      <line x1="12" y1="8" x2="12" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <line x1="8" y1="12" x2="16" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      
      <defs>
        <linearGradient id="plusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8BC34A"/>
          <stop offset="100%" stopColor="#66BB6A"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// Cute home icon
export const CuteHomeIcon = ({ className = "", size = 24 }: IconProps) => (
  <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      {/* House */}
      <path d="M3 12 L12 3 L21 12 L21 20 Q21 21 20 21 L4 21 Q3 21 3 20 Z" fill="url(#houseGradient)" stroke="#6D4C41" strokeWidth="0.5"/>
      {/* Roof */}
      <path d="M2 12 L12 2 L22 12 L20 12 L12 4 L4 12 Z" fill="#6D4C41"/>
      {/* Door */}
      <rect x="10" y="16" width="4" height="5" rx="2" fill="#FFB300"/>
      {/* Windows */}
      <rect x="6" y="12" width="3" height="3" rx="0.5" fill="#B3E5FC"/>
      <rect x="15" y="12" width="3" height="3" rx="0.5" fill="#B3E5FC"/>
      {/* Window crosses */}
      <line x1="7.5" y1="12" x2="7.5" y2="15" stroke="#6D4C41" strokeWidth="0.3"/>
      <line x1="6" y1="13.5" x2="9" y2="13.5" stroke="#6D4C41" strokeWidth="0.3"/>
      <line x1="16.5" y1="12" x2="16.5" y2="15" stroke="#6D4C41" strokeWidth="0.3"/>
      <line x1="15" y1="13.5" x2="18" y2="13.5" stroke="#6D4C41" strokeWidth="0.3"/>
      {/* Door knob */}
      <circle cx="13" cy="18.5" r="0.3" fill="#6D4C41"/>
      
      <defs>
        <linearGradient id="houseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB"/>
          <stop offset="100%" stopColor="#FFF8E1"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// Cute community icon with multiple bees
export const CuteCommunityIcon = ({ className = "", size = 24 }: IconProps) => (
  <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      {/* Community circle background */}
      <circle cx="12" cy="12" r="10" fill="url(#communityGradient)" stroke="#8BC34A" strokeWidth="0.5" opacity="0.9"/>
      
      {/* Three cute bees representing community */}
      {/* First bee - center */}
      <g transform="translate(12, 10)">
        <ellipse cx="0" cy="2" rx="2" ry="3" fill="#FFB300" stroke="#FF8F00" strokeWidth="0.3"/>
        <ellipse cx="0" cy="1" rx="1.5" ry="0.5" fill="#6D4C41"/>
        <ellipse cx="0" cy="3" rx="1.5" ry="0.5" fill="#6D4C41"/>
        <circle cx="0" cy="-1" r="1.2" fill="#FFB300"/>
        <circle cx="-0.4" cy="-1.2" r="0.2" fill="#6D4C41"/>
        <circle cx="0.4" cy="-1.2" r="0.2" fill="#6D4C41"/>
        <ellipse cx="-1.5" cy="-0.5" rx="1.2" ry="0.8" fill="white" fillOpacity="0.7" transform="rotate(-20)"/>
        <ellipse cx="1.5" cy="-0.5" rx="1.2" ry="0.8" fill="white" fillOpacity="0.7" transform="rotate(20)"/>
      </g>
      
      {/* Second bee - left */}
      <g transform="translate(7, 8) scale(0.7)">
        <ellipse cx="0" cy="2" rx="2" ry="3" fill="#FFB300" stroke="#FF8F00" strokeWidth="0.3"/>
        <ellipse cx="0" cy="1" rx="1.5" ry="0.5" fill="#6D4C41"/>
        <ellipse cx="0" cy="3" rx="1.5" ry="0.5" fill="#6D4C41"/>
        <circle cx="0" cy="-1" r="1.2" fill="#FFB300"/>
        <circle cx="-0.4" cy="-1.2" r="0.2" fill="#6D4C41"/>
        <circle cx="0.4" cy="-1.2" r="0.2" fill="#6D4C41"/>
        <ellipse cx="-1.5" cy="-0.5" rx="1.2" ry="0.8" fill="white" fillOpacity="0.7" transform="rotate(-20)"/>
        <ellipse cx="1.5" cy="-0.5" rx="1.2" ry="0.8" fill="white" fillOpacity="0.7" transform="rotate(20)"/>
      </g>
      
      {/* Third bee - right */}
      <g transform="translate(17, 8) scale(0.7)">
        <ellipse cx="0" cy="2" rx="2" ry="3" fill="#FFB300" stroke="#FF8F00" strokeWidth="0.3"/>
        <ellipse cx="0" cy="1" rx="1.5" ry="0.5" fill="#6D4C41"/>
        <ellipse cx="0" cy="3" rx="1.5" ry="0.5" fill="#6D4C41"/>
        <circle cx="0" cy="-1" r="1.2" fill="#FFB300"/>
        <circle cx="-0.4" cy="-1.2" r="0.2" fill="#6D4C41"/>
        <circle cx="0.4" cy="-1.2" r="0.2" fill="#6D4C41"/>
        <ellipse cx="-1.5" cy="-0.5" rx="1.2" ry="0.8" fill="white" fillOpacity="0.7" transform="rotate(-20)"/>
        <ellipse cx="1.5" cy="-0.5" rx="1.2" ry="0.8" fill="white" fillOpacity="0.7" transform="rotate(20)"/>
      </g>
      
      {/* Connection lines showing community */}
      <line x1="9" y1="9" x2="12" y2="11" stroke="#8BC34A" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="15" y1="9" x2="12" y2="11" stroke="#8BC34A" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      
      {/* Hearts floating around */}
      <g className="animate-ping" style={{ animationDuration: '2s' }}>
        <path d="M 6 6 L 6.5 5.5 L 7 6 L 6.5 6.5 Z" fill="#FF6B9D" opacity="0.7"/>
      </g>
      <g className="animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.7s' }}>
        <path d="M 18 6 L 18.5 5.5 L 19 6 L 18.5 6.5 Z" fill="#FF6B9D" opacity="0.7"/>
      </g>
      <g className="animate-ping" style={{ animationDuration: '3s', animationDelay: '1.2s' }}>
        <path d="M 12 18 L 12.5 17.5 L 13 18 L 12.5 18.5 Z" fill="#FF6B9D" opacity="0.7"/>
      </g>
      
      <defs>
        <linearGradient id="communityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8F5E8"/>
          <stop offset="50%" stopColor="#C8E6C8"/>
          <stop offset="100%" stopColor="#A5D6A7"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// Cute events/calendar icon with bee theme
export const CuteEventsIcon = ({ className = "", size = 24 }: IconProps) => (
  <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      {/* Calendar base */}
      <rect x="4" y="6" width="16" height="14" rx="2" fill="url(#calendarGradient)" stroke="#8BC34A" strokeWidth="0.8"/>
      
      {/* Calendar header */}
      <rect x="4" y="6" width="16" height="4" rx="2" fill="url(#headerGradient)" stroke="#8BC34A" strokeWidth="0.8"/>
      
      {/* Spiral binding */}
      <rect x="7" y="3" width="2" height="5" rx="1" fill="#6D4C41"/>
      <rect x="15" y="3" width="2" height="5" rx="1" fill="#6D4C41"/>
      
      {/* Calendar grid lines */}
      <line x1="4" y1="10" x2="20" y2="10" stroke="#8BC34A" strokeWidth="0.4" opacity="0.6"/>
      <line x1="7.5" y1="10" x2="7.5" y2="20" stroke="#8BC34A" strokeWidth="0.4" opacity="0.4"/>
      <line x1="11" y1="10" x2="11" y2="20" stroke="#8BC34A" strokeWidth="0.4" opacity="0.4"/>
      <line x1="14.5" y1="10" x2="14.5" y2="20" stroke="#8BC34A" strokeWidth="0.4" opacity="0.4"/>
      <line x1="18" y1="10" x2="18" y2="20" stroke="#8BC34A" strokeWidth="0.4" opacity="0.4"/>
      <line x1="4" y1="13" x2="20" y2="13" stroke="#8BC34A" strokeWidth="0.4" opacity="0.4"/>
      <line x1="4" y1="16" x2="20" y2="16" stroke="#8BC34A" strokeWidth="0.4" opacity="0.4"/>
      
      {/* Special event days with honey drops */}
      <circle cx="9" cy="11.5" r="0.8" fill="#FFB300" className="animate-pulse" style={{ animationDuration: '2s' }}/>
      <circle cx="16" cy="14.5" r="0.8" fill="#FFB300" className="animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}/>
      <circle cx="6" cy="17.5" r="0.8" fill="#FFB300" className="animate-pulse" style={{ animationDuration: '2s', animationDelay: '1s' }}/>
      
      {/* Cute bee flying around calendar */}
      <g className="animate-bounce" style={{ animationDuration: '3s', transformOrigin: '21px 5px' }}>
        <g transform="translate(21, 5) scale(0.4)">
          <ellipse cx="0" cy="2" rx="2" ry="3" fill="#FFB300" stroke="#FF8F00" strokeWidth="0.5"/>
          <ellipse cx="0" cy="1" rx="1.5" ry="0.5" fill="#6D4C41"/>
          <ellipse cx="0" cy="3" rx="1.5" ry="0.5" fill="#6D4C41"/>
          <circle cx="0" cy="-1" r="1.2" fill="#FFB300"/>
          <circle cx="-0.4" cy="-1.2" r="0.2" fill="#6D4C41"/>
          <circle cx="0.4" cy="-1.2" r="0.2" fill="#6D4C41"/>
          <ellipse cx="-1.5" cy="-0.5" rx="1.2" ry="0.8" fill="white" fillOpacity="0.8" transform="rotate(-20)" className="animate-pulse"/>
          <ellipse cx="1.5" cy="-0.5" rx="1.2" ry="0.8" fill="white" fillOpacity="0.8" transform="rotate(20)" className="animate-pulse"/>
        </g>
      </g>
      
      {/* Calendar month text area */}
      <rect x="5" y="7" width="14" height="2" rx="0.5" fill="rgba(255, 255, 255, 0.3)"/>
      
      {/* Event indicators (small hearts for community events) */}
      <g className="animate-ping" style={{ animationDuration: '3s' }}>
        <path d="M 12.5 11 L 13 10.5 L 13.5 11 L 13 11.5 Z" fill="#FF6B9D" opacity="0.8"/>
      </g>
      <g className="animate-ping" style={{ animationDuration: '2.5s', animationDelay: '1s' }}>
        <path d="M 19 14 L 19.5 13.5 L 20 14 L 19.5 14.5 Z" fill="#FF6B9D" opacity="0.8"/>
      </g>
      
      <defs>
        <linearGradient id="calendarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB"/>
          <stop offset="100%" stopColor="#FFF8E1"/>
        </linearGradient>
        <linearGradient id="headerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8BC34A"/>
          <stop offset="100%" stopColor="#66BB6A"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default {
  CuteHeartIcon,
  CuteShareIcon,
  CuteSettingsIcon,
  CutePlusIcon,
  CuteHomeIcon,
  CuteCommunityIcon,
  CuteEventsIcon,
};