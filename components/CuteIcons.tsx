// import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Cute kawaii-style bee icon inspired by the reference image
export const CuteBeeIcon = ({ className = "", size = 24 }: IconProps) => (
  <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full animate-bounce" style={{ animationDuration: '2s' }}>
      <defs>
        {/* Soft gradients for kawaii style */}
        <linearGradient id="kawaiiBeeBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF59D"/>
          <stop offset="50%" stopColor="#FFB300"/>
          <stop offset="100%" stopColor="#FFA000"/>
        </linearGradient>
        <linearGradient id="kawaiiBeeHead" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF59D"/>
          <stop offset="100%" stopColor="#FFB300"/>
        </linearGradient>
        <radialGradient id="kawaiiBeeWing" cx="30%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#E1F5FE" stopOpacity="0.9"/>
          <stop offset="60%" stopColor="#B3E5FC" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#81D4FA" stopOpacity="0.7"/>
        </radialGradient>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.5"/>
          <feOffset dx="0" dy="1" result="offset"/>
          <feFlood floodColor="#FFB300" floodOpacity="0.2"/>
          <feComposite in2="offset" operator="in"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Kawaii bee body - round and soft */}
      <ellipse cx="12" cy="14" rx="4" ry="5.5" fill="url(#kawaiiBeeBody)" stroke="#FFA000" strokeWidth="0.5" filter="url(#softGlow)"/>
      
      {/* Kawaii head - perfectly round */}
      <circle cx="12" cy="7.5" r="4" fill="url(#kawaiiBeeHead)" stroke="#FFA000" strokeWidth="0.5" filter="url(#softGlow)"/>
      
      {/* Soft bee stripes - rounded edges */}
      <ellipse cx="12" cy="11.5" rx="3.5" ry="1.2" fill="#8D6E63" opacity="0.8"/>
      <ellipse cx="12" cy="14.5" rx="3.8" ry="1.2" fill="#8D6E63" opacity="0.8"/>
      <ellipse cx="12" cy="17.5" rx="3.2" ry="1.2" fill="#8D6E63" opacity="0.8"/>
      
      {/* Kawaii wings - soft and rounded */}
      <ellipse cx="8.5" cy="9" rx="2.5" ry="4" fill="url(#kawaiiBeeWing)" transform="rotate(-15 8.5 9)" className="animate-pulse" style={{ animationDuration: '2s' }}/>
      <ellipse cx="15.5" cy="9" rx="2.5" ry="4" fill="url(#kawaiiBeeWing)" transform="rotate(15 15.5 9)" className="animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.3s' }}/>
      
      {/* Wing details - subtle */}
      <ellipse cx="8.5" cy="9" rx="1.8" ry="3" fill="white" opacity="0.3" transform="rotate(-15 8.5 9)"/>
      <ellipse cx="15.5" cy="9" rx="1.8" ry="3" fill="white" opacity="0.3" transform="rotate(15 15.5 9)"/>
      
      {/* Kawaii closed/sleepy eyes */}
      <path d="M 9.5 7 Q 10.5 6.5 11.5 7" stroke="#8D6E63" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M 12.5 7 Q 13.5 6.5 14.5 7" stroke="#8D6E63" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      
      {/* Small eye highlights for extra cuteness */}
      <circle cx="10" cy="6.8" r="0.3" fill="white" opacity="0.8"/>
      <circle cx="14" cy="6.8" r="0.3" fill="white" opacity="0.8"/>
      
      {/* Kawaii smile */}
      <path d="M 10.5 8.5 Q 12 9.2 13.5 8.5" stroke="#8D6E63" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      
      {/* Cute blushing cheeks */}
      <circle cx="8.5" cy="8" r="0.8" fill="#FFB74D" opacity="0.4"/>
      <circle cx="15.5" cy="8" r="0.8" fill="#FFB74D" opacity="0.4"/>
      
      {/* Simple kawaii antennae */}
      <line x1="10.5" y1="4" x2="10" y2="2.5" stroke="#8D6E63" strokeWidth="1" strokeLinecap="round"/>
      <line x1="13.5" y1="4" x2="14" y2="2.5" stroke="#8D6E63" strokeWidth="1" strokeLinecap="round"/>
      
      {/* Round antennae tips */}
      <circle cx="10" cy="2.5" r="0.6" fill="#8D6E63"/>
      <circle cx="14" cy="2.5" r="0.6" fill="#8D6E63"/>
      
      {/* Optional kawaii flower like in reference image */}
      <g transform="translate(18, 16) scale(0.6)">
        {/* Flower petals */}
        <circle cx="0" cy="-2" r="1.2" fill="white"/>
        <circle cx="1.7" cy="-1" r="1.2" fill="white"/>
        <circle cx="1.7" cy="1" r="1.2" fill="white"/>
        <circle cx="0" cy="2" r="1.2" fill="white"/>
        <circle cx="-1.7" cy="1" r="1.2" fill="white"/>
        <circle cx="-1.7" cy="-1" r="1.2" fill="white"/>
        
        {/* Flower center */}
        <circle cx="0" cy="0" r="0.8" fill="#FFB300"/>
        
        {/* Flower stem */}
        <line x1="0" y1="2" x2="0" y2="4" stroke="#4CAF50" strokeWidth="0.8" strokeLinecap="round"/>
      </g>
      
      {/* Floating hearts for extra kawaii effect */}
      <g className="animate-ping" style={{ animationDuration: '3s' }}>
        <path d="M 5 5 L 5.3 4.7 L 5.6 5 L 5.3 5.3 Z" fill="#FF8A80" opacity="0.6"/>
      </g>
      <g className="animate-ping" style={{ animationDuration: '2.5s', animationDelay: '1s' }}>
        <path d="M 19 4 L 19.3 3.7 L 19.6 4 L 19.3 4.3 Z" fill="#FF8A80" opacity="0.7"/>
      </g>
      <g className="animate-ping" style={{ animationDuration: '3.5s', animationDelay: '2s' }}>
        <path d="M 4 12 L 4.3 11.7 L 4.6 12 L 4.3 12.3 Z" fill="#FF8A80" opacity="0.5"/>
      </g>
      
      {/* Subtle sparkles */}
      <g className="animate-ping" style={{ animationDuration: '2.8s' }}>
        <circle cx="6.5" cy="9" r="0.2" fill="#FFF59D" opacity="0.8"/>
      </g>
      <g className="animate-ping" style={{ animationDuration: '3.2s', animationDelay: '1.5s' }}>
        <circle cx="17.5" cy="7" r="0.15" fill="#FFF59D" opacity="0.9"/>
      </g>
    </svg>
  </div>
);

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

// Cute chat bubble with smile
export const CuteChatIcon = ({ className = "", size = 24 }: IconProps) => (
  <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      {/* Chat bubble */}
      <path 
        d="M12 2C17.5 2 22 6.5 22 12c0 5.5-4.5 10-10 10-1.5 0-3-.3-4.3-.9L2 22l1.9-5.7C3.3 15 3 13.5 3 12 3 6.5 7.5 2 12 2z" 
        fill="url(#chatGradient)"
        stroke="#8BC34A" 
        strokeWidth="0.5"
      />
      <defs>
        <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8BC34A"/>
          <stop offset="100%" stopColor="#66BB6A"/>
        </linearGradient>
      </defs>
      {/* Eyes */}
      <circle cx="9" cy="10" r="1" fill="#6D4C41"/>
      <circle cx="15" cy="10" r="1" fill="#6D4C41"/>
      <circle cx="9.3" cy="9.7" r="0.3" fill="white"/>
      <circle cx="15.3" cy="9.7" r="0.3" fill="white"/>
      {/* Smile */}
      <path d="M 8 13 Q 12 16 16 13" stroke="#6D4C41" strokeWidth="1" fill="none" strokeLinecap="round"/>
      {/* Blush */}
      <circle cx="6.5" cy="12" r="1" fill="#FFB300" fillOpacity="0.3"/>
      <circle cx="17.5" cy="12" r="1" fill="#FFB300" fillOpacity="0.3"/>
    </svg>
  </div>
);

// Cute honey pot icon
export const CuteHoneyIcon = ({ className = "", size = 24 }: IconProps) => (
  <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      {/* Honey pot */}
      <path 
        d="M8 8 L8 18 Q8 20 10 20 L14 20 Q16 20 16 18 L16 8 Z" 
        fill="url(#honeyGradient)"
        stroke="#FF8F00" 
        strokeWidth="0.5"
      />
      {/* Lid */}
      <rect x="7" y="6" width="10" height="3" rx="1" fill="#6D4C41"/>
      {/* Handle */}
      <ellipse cx="12" cy="6" rx="1.5" ry="0.5" fill="#6D4C41"/>
      {/* Honey drip */}
      <path 
        d="M 12 4 Q 12 2 13 2 Q 14 2 14 3 Q 14 4 13 4 Q 12 4 12 4" 
        fill="#FFB300" 
        className="animate-bounce"
        style={{ animationDuration: '3s' }}
      />
      <defs>
        <linearGradient id="honeyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD54F"/>
          <stop offset="100%" stopColor="#FFB300"/>
        </linearGradient>
      </defs>
      {/* Cute face */}
      <circle cx="10.5" cy="12" r="0.5" fill="#6D4C41"/>
      <circle cx="13.5" cy="12" r="0.5" fill="#6D4C41"/>
      <path d="M 10 14 Q 12 15.5 14 14" stroke="#6D4C41" strokeWidth="0.5" fill="none" strokeLinecap="round"/>
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

// Cute settings gear with sparkles
export const CuteSettingsIcon = ({ className = "", size = 24 }: IconProps) => (
  <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      {/* Gear */}
      <g className="animate-spin" style={{ animationDuration: '8s', transformOrigin: '12px 12px' }}>
        <path 
          d="M12 2l1.5 3h3l-1.5 3 1.5 3h-3L12 14l-1.5-3h-3l1.5-3L7.5 5h3L12 2z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" 
          fill="url(#settingsGradient)" 
          stroke="#6D4C41" 
          strokeWidth="0.5"
        />
      </g>
      {/* Center circle */}
      <circle cx="12" cy="12" r="3" fill="url(#centerGradient)" stroke="#6D4C41" strokeWidth="0.5"/>
      {/* Cute face */}
      <circle cx="11" cy="11" r="0.4" fill="#6D4C41"/>
      <circle cx="13" cy="11" r="0.4" fill="#6D4C41"/>
      <path d="M 10.5 13 Q 12 14 13.5 13" stroke="#6D4C41" strokeWidth="0.4" fill="none" strokeLinecap="round"/>
      
      <defs>
        <linearGradient id="settingsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB300"/>
          <stop offset="50%" stopColor="#8BC34A"/>
          <stop offset="100%" stopColor="#B3E5FC"/>
        </linearGradient>
        <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB"/>
          <stop offset="100%" stopColor="#FFF8E1"/>
        </linearGradient>
      </defs>
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
  CuteBeeIcon,
  CuteHeartIcon,
  CuteChatIcon,
  CuteHoneyIcon,
  CuteShareIcon,
  CuteSettingsIcon,
  CutePlusIcon,
  CuteHomeIcon,
  CuteCommunityIcon,
  CuteEventsIcon,
};