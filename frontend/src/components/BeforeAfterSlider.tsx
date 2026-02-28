"use client";

import { useState, useRef } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  };

  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <div 
      ref={containerRef}
      className="before-after-container shadow-2xl cursor-ew-resize select-none"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* Dynamic backgroundImage via inline style: acceptable exception per PROJECT_RULES
          (prop-driven value, cannot be a Tailwind class) */}
      <div
        className="before-image grayscale-[40%] contrast-[90%]"
        style={{ backgroundImage: `url(${beforeImage})` }}
      >
        <div className="absolute top-4 left-4 bg-black/60 text-white px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm z-20">
          ANTES
        </div>
      </div>
      {/* Dynamic backgroundImage, clipPath, left via inline style: acceptable exception
          per PROJECT_RULES (useState-driven animation values) */}
      <div
        className="after-image transition-none"
        style={{
          backgroundImage: `url(${afterImage})`,
          clipPath: `inset(0 0 0 ${position}%)`,
        }}
      >
        <div className="absolute top-4 right-4 bg-secondary text-white px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm z-20 shadow-lg">
          DESPUÉS
        </div>
      </div>
      <div 
        className="slider-handle" 
        style={{ left: `${position}%` }}
      >
        <div className="slider-button">
          <span className="material-symbols-outlined select-none">unfold_more</span>
        </div>
      </div>
    </div>
  );
}
