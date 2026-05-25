import React, { useState, useRef, useEffect } from "react";
import { myProjects } from "../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const videoRef = useRef(null);
  const projectCount = myProjects.length;

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useGSAP(() => {
    gsap.fromTo(
      `.animatedText`,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" }
    );
  }, [selectedProjectIndex]);

  // Fade + reload video on project change
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    gsap.to(video, {
      opacity: 0,
      duration: 0.25,
      onComplete: () => {
        video.load();
        video.play().catch(() => {});
        gsap.to(video, { opacity: 1, duration: 0.4 });
      },
    });
  }, [selectedProjectIndex]);

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <section className="c-space my-20">
      <p className="head-text">My Selected Work</p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        {/* ── Left: project info ── */}
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          {/* Logo badge */}
          <div
            className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
            style={currentProject.logoStyle}
          >
            <img
              className="w-10 h-10 shadow-sm"
              src={currentProject.logo}
              alt="logo"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold animatedText">
              {currentProject.title}
            </p>
            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText">{currentProject.subdesc}</p>
          </div>

          {/* Tech tags */}
          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-between items-center mt-7">
            <button
              className="arrow-btn"
              onClick={() => handleNavigation("previous")}
            >
              <img src="/assets/left-arrow.png" alt="left arrow" />
            </button>
            <button
              className="arrow-btn"
              onClick={() => handleNavigation("next")}
            >
              <img
                src="/assets/right-arrow.png"
                alt="right arrow"
                className="w-4 h-4"
              />
            </button>
          </div>
        </div>

        {/* ── Right: video display ── */}
        <div className="relative border border-black-300 bg-black-200 rounded-2xl h-96 md:h-full overflow-hidden group">
          {/* Ambient glow that picks up the project accent */}
          <div
            className="absolute inset-0 opacity-20 blur-3xl pointer-events-none transition-all duration-700"
            style={{
              background: `radial-gradient(ellipse at 60% 40%, ${
                currentProject.logoStyle?.backgroundColor ?? "#334155"
              } 0%, transparent 70%)`,
            }}
          />

          {/* Screen bezel wrapper */}
          <div className="absolute inset-4 rounded-xl overflow-hidden shadow-[inset_0_2px_12px_rgba(0,0,0,0.6)] border border-white/5">
            {/* Scanline overlay for depth */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)",
              }}
            />

            {/* Subtle top glare */}
            <div className="absolute top-0 left-0 right-0 h-1/3 z-10 pointer-events-none bg-gradient-to-b from-white/5 to-transparent" />

            {/* The actual video */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={currentProject.texture}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          {/* Project index indicator dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {myProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedProjectIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === selectedProjectIndex
                    ? "w-4 bg-white"
                    : "bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;