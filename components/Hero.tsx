"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface SlideData {
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasLoopedOnce, setHasLoopedOnce] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  const slidesData: SlideData[] = [
    {
      title: "ინტერიერის დიზაინი",
      description:
        "ფუნქციური და ესთეტიკური ინტერიერის დიზაინი, რომელიც მორგებულია თქვენს ცხოვრებას და ასახავს თქვენს გემოვნებას",
      image: "/assets/images/interior-design.jpg",
      ctaText: "იხილეთ დიზაინის პროექტები",
      ctaLink: "#interior-projects",
    },
    {
      title: "სარემონტო მომსახურება",
      description:
        "სრული რემონტი ხელშეკრულებით და გარანტიით - ფიქსირებული ფასი, ზუსტი ვადები, პროფესიონალური შესრულება",
      image: "/assets/images/renovation-service.jpg",

      ctaText: "იხილეთ რემონტის პროექტები",
      ctaLink: "#renovation-projects",
    },
    {
      title: "ავეჯის დამზადება",
      description:
        "ინდივიდუალური ავეჯი, რომელიც შექმნილია სპეციალურად თქვენი სივრცისთვის - იდეალური ზომები და ხარისხი",
      image: "/assets/images/furniture.jpg",
      ctaText: "იხილეთ ავეჯის ნამუშევრები",
      ctaLink: "#furniture-projects",
    },
  ];

  const slideCount = slidesData.length;
  const autoPlayInterval = 5500;
  const swipeThreshold = 75;

  // Auto-play with stop after first loop
  useEffect(() => {
    if (hasLoopedOnce || isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % slideCount;
        // If we're going back to first slide, mark as looped
        if (nextSlide === 0) {
          setHasLoopedOnce(true);
        }
        return nextSlide;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPaused, slideCount, autoPlayInterval, hasLoopedOnce]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const diff = touchStart - touchEnd;
    if (diff > swipeThreshold) {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }
    if (diff < -swipeThreshold) {
      setCurrentSlide((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
    }
    setIsPaused(false);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setIsPaused(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const dragEnd = e.clientX;
    const diff = dragStart - dragEnd;

    if (diff > swipeThreshold) {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }
    if (diff < -swipeThreshold) {
      setCurrentSlide((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
    }
    setIsPaused(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setIsPaused(false);
    }
  };

  return (
    <section className="relative w-full h-[calc(100vh-110px)] md:h-[calc(100vh-122px)]">
      <div
        className="relative w-full h-full overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          handleMouseLeave();
        }}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {/* Slides Container */}
        <div className="relative h-full w-full">
          {slidesData.map((slide, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(${(index - currentSlide) * 100}%)`,
              }}
            >
              {/* Background Image with Gradient Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${slide.image})`,
                }}
              />

              {/* Content - Left Aligned */}
              <div className="relative mx-auto h-full flex flex-col justify-start items-center md:items-start text-center md:text-left text-white px-6 md:px-4 max-w-7xl pointer-events-none pt-32 md:pt-30">
                {/* Eyebrow Text - Unifying Promise */}
                <p className="hidden md:block text-sm md:text-base uppercase tracking-wider text-white/90 mb-4 font-semibold">
                  სრული სერვისი - დიზაინიდან ჩაბარებამდე
                </p>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-snug md:leading-tight lg:leading-[1.3]">
                  {slide.title}
                </h1>

                {/* Decorative Line */}
                <div className="w-24 h-[2px] bg-white mb-6"></div>

                {/* Description */}
                <p className="text-base md:text-lg lg:text-xl mb-6 max-w-xl leading-relaxed">
                  {slide.description}
                </p>

                {/* Trust Signals */}
                <div className="hidden md:flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-white/90 mb-8 md:mb-10">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">ხელშეკრულება</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">ფიქსირებული ფასი</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">ვადების დაცვა</span>
                  </div>
                </div>

                {/* CTA Button - Slide-specific text */}
                <Link
                  href={"#projects"}
                  className="pointer-events-auto bg-white text-[#28292c] px-8 py-3 md:px-10 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-101 inline-block"
                >
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20 pointer-events-auto">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(index);
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
      </div>

      {/* Scroll Indicator */}
      <Link
        href="#projects"
        className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white flex z-20 pointer-events-auto"
        aria-label="Scroll to projects"
      >
        <div
          className="flex flex-col items-center gap-2 hover:text-gray-300 transition-colors"
          style={{ animation: "bounce-slow 3s infinite" }}
        >
          <span className="text-sm font-medium">იხილეთ ნამუშევრები</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </Link>
    </section>
  );
}
