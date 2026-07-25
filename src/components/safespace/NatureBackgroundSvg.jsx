import React from 'react';

export function NatureBackgroundSvg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* High-Resolution Photorealistic Golden Grassland Sunset Image with Slow Ambient Pan */}
      <img
        src="/golden_grassland_sunset.jpg"
        alt="Golden Grassland Sunset"
        className="w-full h-full object-cover scale-105 animate-pulse-slow transition-transform duration-[20000ms]"
        style={{ animationDuration: '25s' }}
      />

      {/* Warm Golden Hour Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/55 to-amber-950/30" />
      <div className="absolute inset-0 bg-[#0B0F19]/50 backdrop-blur-[2px]" />

      {/* Floating Golden Light Dust Particles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/15 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[150px] animate-breath-orb" />

      {/* Slow Moving Golden Sunset Cloud Silhouettes & Grass SVG */}
      <svg
        viewBox="0 0 1440 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full h-[35%] object-cover opacity-60 pointer-events-none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 220 Q 360 180, 720 220 T 1440 200 L 1440 300 L 0 300 Z"
          fill="url(#grassGrad)"
        />
        <defs>
          <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#78350f" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0B0F19" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>

    </div>
  );
}
