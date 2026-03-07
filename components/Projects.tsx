"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryProject {
  id: number;
  type: "gallery";
  title: string;
  location: string;
  coverImage: string;
  images: string[];
  duration?: string;
  size?: string;
}

interface BeforeAfterProject {
  id: number;
  type: "before-after";
  title: string;
  location: string;
  before: string;
  after: string;
  size?: string;
  duration?: string;
}

type Project = GalleryProject | BeforeAfterProject;

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(
    null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [beforeAfterSliders, setBeforeAfterSliders] = useState<
    Record<number, number>
  >({});

  const projects: Project[] = [
    // Before/After Card
    {
      id: 1,
      type: "before-after",
      title: "კერძო სახლის რემონტი",
      location: "ვაკე, თბილისი",
      before: "/assets/images/before-1.jpg",
      after: "/assets/images/after-1.jpg",
      size: "120 მ²",
      duration: "3 თვე",
    },
    {
      id: 4,
      type: "gallery",
      title: "სამზარეულო",
      location: "ვაკე, თბილისი",
      coverImage: "/assets/images/house-cover.jpg",
      images: [
        "/assets/images/house-cover.jpg",
        "/assets/images/house-1.jpg",
        "/assets/images/house-2.jpg",
      ],
      size: "20 მ²",
      duration: "30 დღე",
    },
    {
      id: 2,
      type: "gallery",
      title: "კერძო სახლი",
      location: "საბურთალო, თბილისი",
      coverImage: "/assets/images/private-cover.jpeg",
      images: [
        "/assets/images/private-cover.jpeg",
        "/assets/images/private-1.jpeg",
        "/assets/images/private-2.jpeg",
      ],
      size: "90 მ²",
      duration: "2 თვე",
    },
    {
      id: 3,
      type: "before-after",
      title: "ბინის რემონტი",
      location: "დიღომი, თბილისი",
      before: "/assets/images/before-4.jpg",
      after: "/assets/images/after-4.jpg",
      size: "65 მ²",
      duration: "45 დღე",
    },
  ];

  useEffect(() => {
    setBeforeAfterSliders((prev) => {
      // If we already have sliders initialized, don't reset them
      if (Object.keys(prev).length > 0) return prev;

      const initialSliders: Record<number, number> = {};
      projects.forEach((project) => {
        if (project.type === "before-after") {
          initialSliders[project.id] = 50;
        }
      });
      return initialSliders;
    });
  }, []);

  const handleSliderChange = (id: number, value: number) => {
    setBeforeAfterSliders((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const openModal = (project: GalleryProject) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      <section
        id="projects"
        className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white"
      >
        <div className="max-w-7xl mx-auto mt-3">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#28292c] mb-12 md:mb-16 text-center">
            პროექტები
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project) =>
              project.type === "gallery" ? (
                <GalleryCard
                  key={project.id}
                  project={project}
                  onClick={() => openModal(project)}
                />
              ) : (
                <BeforeAfterCard
                  key={project.id}
                  project={project}
                  sliderValue={beforeAfterSliders[project.id] ?? 50}
                  onSliderChange={(value) =>
                    handleSliderChange(project.id, value)
                  }
                />
              )
            )}
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          currentImageIndex={currentImageIndex}
          onClose={closeModal}
          onNext={nextImage}
          onPrev={prevImage}
          onSelectImage={setCurrentImageIndex}
        />
      )}
    </>
  );
}

// Gallery Card Component
function GalleryCard({
  project,
  onClick,
}: {
  project: GalleryProject;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative h-[300px] md:h-[450px] rounded-lg overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0">
        <Image
          src={project.coverImage}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          alt={project.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />
      </div>

      <div className="flex flex-wrap justify-between items-start absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-1">
            {project.title}
          </h3>
          <p className="text-sm md:text-base opacity-90">{project.location}</p>
        </div>
        <div className="mt-3 h-8 flex flex-wrap gap-2">
          {project.size && (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  strokeWidth="2"
                  rx="2"
                />
                <path strokeWidth="2" d="M3 9h18M9 21V9" />
              </svg>
              <span className="text-sm font-medium">{project.size}</span>
            </div>
          )}

          {project.duration && (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeWidth="2" d="M12 6v6l4 2" />
              </svg>
              <span className="text-sm font-medium">{project.duration}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Before/After Card Component
function BeforeAfterCard({
  project,
  sliderValue,
  onSliderChange,
}: {
  project: BeforeAfterProject;
  sliderValue: number;
  onSliderChange: (value: number) => void;
}) {
  return (
    <div className="group relative h-[300px] md:h-[450px] rounded-lg overflow-hidden bg-white border-2 border-gray-200 hover:border-[#28292c] transition-all duration-300">
      {/* Before/After Slider */}
      <div className="relative h-full overflow-hidden">
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <Image
            src={project.after}
            alt="შემდეგ"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold z-10 shadow-lg">
            შემდეგ
          </div>
        </div>

        {/* Before Image (Overlay with clip) */}
        <div
          className="absolute inset-0 z-[5]"
          style={{
            clipPath: `inset(0 ${Math.max(0, 100 - sliderValue)}% 0 0)`,
          }}
        >
          <Image
            src={project.before}
            alt="მანამდე"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Badge with conditional opacity to prevent flickering */}
          <div
            className="absolute top-4 left-4 bg-[#28292c] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg transition-opacity duration-150"
            style={{ opacity: sliderValue > 5 ? 1 : 0 }}
          >
            მანამდე
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-lg"
          style={{ left: `${sliderValue}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-gray-200">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-4 md:h-5 bg-[#28292c] rounded-full"></div>
              <div className="w-0.5 h-4 md:h-5 bg-[#28292c] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Invisible Slider Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => onSliderChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          aria-label={`შედარების სლაიდერი: ${project.title}`}
        />
      </div>

      {/* Project Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-1 flex-wrap justify-between items-start">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-1">
                {project.title}
              </h3>
              <p className="text-sm md:text-base opacity-90 mb-3">
                {project.location}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 h-8">
              {project.size && (
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      strokeWidth="2"
                      rx="2"
                    />
                    <path strokeWidth="2" d="M3 9h18M9 21V9" />
                  </svg>
                  <span className="text-sm font-medium">{project.size}</span>
                </div>
              )}

              {project.duration && (
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M12 6v6l4 2" />
                  </svg>
                  <span className="text-sm font-medium">
                    {project.duration}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="text-xs mt-3 opacity-75">
          გადაადგილეთ სლაიდერი სხვაობის სანახავად
        </p>
      </div>
    </div>
  );
}

// Gallery Modal Component
function ProjectModal({
  project,
  currentImageIndex,
  onClose,
  onNext,
  onPrev,
  onSelectImage,
}: {
  project: GalleryProject;
  currentImageIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectImage: (index: number) => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/97 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-6 md:p-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          <div className="text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-1">
              {project.title}
            </h3>
            <p className="text-sm md:text-base text-gray-300">
              {project.location}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="pointer-events-auto text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            aria-label="Close modal"
          >
            <X className="w-7 h-7 md:w-8 md:h-8" />
          </button>
        </div>
      </div>

      {/* Main Content - Slider */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full flex items-center justify-center px-4 md:px-16 lg:px-24">
          {/* Image Slider */}
          <div className="relative w-full max-w-6xl h-[60vh] md:h-[75vh] overflow-hidden">
            <div className="relative w-full h-full">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{
                    transform: `translateX(${
                      (index - currentImageIndex) * 100
                    }%)`,
                    opacity: index === currentImageIndex ? 1 : 0,
                  }}
                >
                  <Image
                    src={image}
                    fill
                    className="object-contain"
                    alt={`${project.title} - ${index + 1}`}
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-all p-3 hover:bg-white/10 rounded-full backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-all p-3 hover:bg-white/10 rounded-full backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Footer - Thumbnails & Counter */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8 pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-7xl mx-auto">
          {/* Image Counter */}
          <div className="text-center text-white/80 text-sm md:text-base mb-4">
            {currentImageIndex + 1} / {project.images.length}
          </div>

          {/* Thumbnail Navigation */}
          {project.images.length > 1 && (
            <div className="pt-2 flex justify-center gap-2 md:gap-3 overflow-x-auto pb-2 pointer-events-auto">
              {project.images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectImage(index);
                  }}
                  className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentImageIndex
                      ? "ring-2 ring-white scale-105 opacity-100"
                      : "opacity-50 hover:opacity-75"
                  }`}
                >
                  <Image
                    src={image}
                    fill
                    className="object-cover"
                    alt={`Thumbnail ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
