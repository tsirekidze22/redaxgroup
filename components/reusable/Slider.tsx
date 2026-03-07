// components/Slider.tsx
"use client";

import { ReactNode } from "react";
import { useSlider } from "@/hooks/useSlider";

interface SliderProps {
  slides: ReactNode[];
  autoPlayInterval?: number;
  swipeThreshold?: number;
  showDots?: boolean;
  className?: string;
  slideClassName?: string;
  dotsClassName?: string;
}

export default function Slider({
  slides,
  autoPlayInterval = 5500,
  swipeThreshold = 75,
  showDots = true,
  className = "",
  slideClassName = "",
  dotsClassName = "",
}: SliderProps) {
  const { currentSlide, isDragging, goToSlide, handlers } = useSlider({
    slideCount: slides.length,
    autoPlayInterval,
    swipeThreshold,
  });

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      {...handlers}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {/* Slides Container */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${slideClassName}`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      {showDots && (
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20 pointer-events-auto ${dotsClassName}`}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              className="transition-all duration-300 rounded-sm"
              style={{
                width: currentSlide === index ? "40px" : "24px",
                height: "6px",
                backgroundColor:
                  currentSlide === index ? "white" : "rgba(255, 255, 255, 0.5)",
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
