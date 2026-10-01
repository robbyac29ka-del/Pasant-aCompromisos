import React from 'react';

interface AndeanArtworkProps {
  type: 'terrazas' | 'laguna' | 'semillas' | 'chacra' | 'cordillera' | 'textil' | 'inti' | 'ayllu';
  className?: string;
}

export const AndeanArtwork: React.FC<AndeanArtworkProps> = ({ type, className = "w-full h-full" }) => {
  switch (type) {
    case 'cordillera':
      return (
        <svg viewBox="0 0 600 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="60%" stopColor="#831843" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="mountFar" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="40%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <linearGradient id="mountNear" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>
          </defs>
          <rect width="600" height="300" fill="url(#skyGrad)" />
          {/* Inti / Sacred Sun */}
          <circle cx="300" cy="110" r="45" fill="#FDE047" opacity="0.9" />
          <circle cx="300" cy="110" r="60" stroke="#FBBF24" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
          {/* Far Snowcapped Apus */}
          <path d="M50 300L180 90L230 150L300 70L380 160L460 80L580 300Z" fill="url(#mountFar)" />
          {/* Snow peaks */}
          <polygon points="180,90 155,130 170,125 180,135 195,122 205,130" fill="#FFFFFF" opacity="0.95" />
          <polygon points="300,70 270,115 285,110 300,120 315,108 330,118" fill="#FFFFFF" opacity="0.95" />
          <polygon points="460,80 435,125 450,118 460,128 475,115 485,125" fill="#FFFFFF" opacity="0.95" />
          {/* Near Andean hills */}
          <path d="M-20 300L120 180L260 250L400 170L520 240L620 190L620 300Z" fill="url(#mountNear)" opacity="0.9" />
          <path d="M-10 300L80 230L200 280L340 220L480 270L610 230L610 300Z" fill="#14532D" opacity="0.8" />
        </svg>
      );

    case 'laguna':
      return (
        <svg viewBox="0 0 600 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="waterSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="50%" stopColor="#0369A1" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="50%" stopColor="#0369A1" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>
          </defs>
          <rect width="600" height="300" fill="url(#waterSky)" />
          {/* Distant mountains */}
          <path d="M0 160L120 100L220 135L350 85L480 130L600 95L600 200L0 200Z" fill="#047857" opacity="0.7" />
          {/* Water body / Cocha */}
          <ellipse cx="300" cy="220" rx="350" ry="100" fill="url(#waterGrad)" />
          {/* Water ripples */}
          <path d="M120 210 Q200 205 300 210 Q400 215 480 210" stroke="#BAE6FD" strokeWidth="2.5" opacity="0.7" fill="none" />
          <path d="M80 235 Q200 230 320 235 Q440 240 540 235" stroke="#E0F2FE" strokeWidth="2" opacity="0.6" fill="none" />
          <path d="M150 260 Q260 255 350 260 Q450 265 500 260" stroke="#BAE6FD" strokeWidth="2" opacity="0.5" fill="none" />
          {/* Native Queñua trees on shore */}
          <circle cx="90" cy="180" r="16" fill="#15803D" />
          <rect x="87" y="194" width="6" height="15" fill="#78350F" />
          <circle cx="120" cy="185" r="14" fill="#166534" />
          <rect x="118" y="197" width="5" height="12" fill="#78350F" />
          <circle cx="510" cy="185" r="18" fill="#15803D" />
          <rect x="507" y="198" width="6" height="14" fill="#78350F" />
        </svg>
      );

    case 'terrazas':
      return (
        <svg viewBox="0 0 600 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <rect width="600" height="300" fill="#064E3B" />
          {/* Stepped Agricultural Terraces (Andenes) */}
          <path d="M0 60 Q300 70 600 50 L600 300 L0 300 Z" fill="#047857" />
          <path d="M0 60 Q300 70 600 50" stroke="#78350F" strokeWidth="10" fill="none" />
          <path d="M0 110 Q280 125 600 100 L600 300 L0 300 Z" fill="#059669" />
          <path d="M0 110 Q280 125 600 100" stroke="#92400E" strokeWidth="12" fill="none" />
          <path d="M0 165 Q320 180 600 155 L600 300 L0 300 Z" fill="#10B981" />
          <path d="M0 165 Q320 180 600 155" stroke="#78350F" strokeWidth="14" fill="none" />
          <path d="M0 225 Q300 240 600 215 L600 300 L0 300 Z" fill="#34D399" />
          <path d="M0 225 Q300 240 600 215" stroke="#B45309" strokeWidth="14" fill="none" />
          {/* Small crop lines */}
          <circle cx="100" cy="140" r="3" fill="#FEF08A" />
          <circle cx="140" cy="142" r="3" fill="#FEF08A" />
          <circle cx="180" cy="144" r="3" fill="#FEF08A" />
          <circle cx="220" cy="145" r="3" fill="#FEF08A" />
          <circle cx="260" cy="145" r="3" fill="#FEF08A" />
          <circle cx="300" cy="144" r="3" fill="#FEF08A" />
        </svg>
      );

    case 'semillas':
      return (
        <svg viewBox="0 0 600 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <rect width="600" height="300" fill="#451A03" />
          <defs>
            <pattern id="seedWeave" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="#78350F" opacity="0.3" />
              <path d="M0 20 L20 0 L40 20 L20 40 Z" stroke="#B45309" strokeWidth="1.5" fill="none" />
            </pattern>
          </defs>
          <rect width="600" height="300" fill="url(#seedWeave)" />
          {/* Circular Manta / Woven Basket */}
          <circle cx="300" cy="150" r="110" fill="#92400E" stroke="#D97706" strokeWidth="4" />
          <circle cx="300" cy="150" r="95" fill="#78350F" />
          {/* Native potatoes & grains */}
          {/* Papa Wayro / Morada */}
          <ellipse cx="260" cy="130" rx="25" ry="18" fill="#581C87" transform="rotate(-15 260 130)" />
          <ellipse cx="285" cy="170" rx="28" ry="20" fill="#B91C1C" transform="rotate(25 285 170)" />
          <ellipse cx="330" cy="135" rx="24" ry="19" fill="#D97706" transform="rotate(-30 330 135)" />
          <ellipse cx="335" cy="175" rx="22" ry="17" fill="#EAB308" transform="rotate(10 335 175)" />
          {/* Golden Andean Corn ear */}
          <path d="M240 180 Q260 140 280 180 Z" fill="#FACC15" />
          <circle cx="300" cy="115" r="12" fill="#F87171" />
        </svg>
      );

    case 'textil':
      return (
        <svg viewBox="0 0 600 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <rect width="600" height="300" fill="#7F1D1D" />
          {/* Tokapu Inca Geometric Patterns */}
          <g opacity="0.85">
            {/* Stripe 1 */}
            <rect x="0" y="20" width="600" height="26" fill="#D97706" />
            <rect x="0" y="55" width="600" height="35" fill="#15803D" />
            {/* Chakana crosses row */}
            <path d="M30 140 H50 V120 H70 V140 H90 V160 H70 V180 H50 V160 H30 Z" fill="#F59E0B" />
            <path d="M120 140 H140 V120 H160 V140 H180 V160 H160 V180 H140 V160 H120 Z" fill="#F59E0B" />
            <path d="M210 140 H230 V120 H250 V140 H270 V160 H250 V180 H230 V160 H210 Z" fill="#F59E0B" />
            <path d="M300 140 H320 V120 H340 V140 H360 V160 H340 V180 H320 V160 H300 Z" fill="#F59E0B" />
            <path d="M390 140 H410 V120 H430 V140 H450 V160 H430 V180 H410 V160 H390 Z" fill="#F59E0B" />
            <path d="M480 140 H500 V120 H520 V140 H540 V160 H520 V180 H500 V160 H480 Z" fill="#F59E0B" />
            {/* Geometric diamond zigzags */}
            <rect x="0" y="210" width="600" height="35" fill="#0284C7" />
            <rect x="0" y="255" width="600" height="26" fill="#F59E0B" />
          </g>
        </svg>
      );

    case 'inti':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="22" fill="#F59E0B" />
          {/* 8 rays */}
          <path d="M50 10 L50 22 M50 78 L50 90 M10 50 L22 50 M78 50 L90 50 M22 22 L30 30 M70 70 L78 78 M78 22 L70 30 M22 78 L30 70" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
          <circle cx="43" cy="46" r="3" fill="#78350F" />
          <circle cx="57" cy="46" r="3" fill="#78350F" />
          <path d="M42 57 Q50 63 58 57" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'ayllu':
    default:
      return (
        <svg viewBox="0 0 600 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <rect width="600" height="300" fill="#1E293B" />
          <circle cx="300" cy="150" r="100" stroke="#F59E0B" strokeWidth="2" opacity="0.3" />
          <circle cx="300" cy="150" r="70" stroke="#38BDF8" strokeWidth="2" opacity="0.3" />
          {/* Andean mountains silhouette */}
          <path d="M0 300 L120 180 L220 240 L340 160 L460 250 L600 170 L600 300 Z" fill="#047857" opacity="0.9" />
          <path d="M0 300 L180 230 L320 280 L480 220 L600 270 L600 300 Z" fill="#065F46" />
        </svg>
      );
  }
};
