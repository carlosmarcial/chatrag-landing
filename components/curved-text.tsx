'use client';

import React from 'react';
import { DM_Serif_Display } from 'next/font/google';

const dmSerif = DM_Serif_Display({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface CurvedTextProps {
  text?: string;
  radius?: number;
  color?: string;
  fontSize?: number;
  animate?: boolean;
}

export function CurvedText({
  text = 'Try me!',
  radius = 70,
  color = '#FF6417',
  fontSize = 24,
  animate = true,
}: CurvedTextProps) {
  // Calculate the path for the text to follow
  // We'll create an arc that goes around the top of the circle
  const centerX = radius + 10;
  const centerY = radius + 10;
  
  // Create a circular path - we'll use the top arc
  // The arc starts at -120 degrees and ends at -60 degrees (a 60-degree arc centered at the top)
  const startAngle = -135; // degrees
  const endAngle = -45; // degrees
  
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  
  const startX = centerX + radius * Math.cos(startRad);
  const startY = centerY + radius * Math.sin(startRad);
  const endX = centerX + radius * Math.cos(endRad);
  const endY = centerY + radius * Math.sin(endRad);
  
  // SVG path for the arc (going clockwise around the top)
  const pathD = `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;
  
  const viewBoxSize = (radius + 10) * 2;

  return (
    <div 
      className="pointer-events-none absolute" 
      style={{
        top: '-85px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1,
      }}
    >
      <svg
        width={viewBoxSize}
        height={viewBoxSize}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        style={{
          overflow: 'visible',
        }}
      >
        <defs>
          <path
            id="textPath"
            d={pathD}
            fill="none"
          />
        </defs>
        {/* Main text layer - foreground */}
        <text
          className={`${dmSerif.className} ${animate ? 'animate-pulse-subtle' : ''}`}
          style={{
            fill: '#ffffff',
            fontSize: `${fontSize}px`,
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}
        >
          <textPath
            href="#textPath"
            startOffset="50%"
            textAnchor="middle"
          >
            {text}
          </textPath>
        </text>
      </svg>
      
      <style jsx>{`
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.03);
          }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
}
