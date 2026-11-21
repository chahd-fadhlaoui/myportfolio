import React, { useState, useRef, useEffect } from "react";
import { myProjects } from "../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Projects — same behaviour (GSAP text reveal, video swap, prev/next, dots)
 * and same content. Redesigned as a video-first showcase: the video sits
 * in a clean device frame on the left, the details on the right, and a
 * row of project pickers (built from the existing logo + title) below.
 * This keeps it visually distinct from the Experience tab/card layout.
 */
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
      <div className="head-rule" />

      <div className="proj-showcase">
        {/* ── Video stage (left on desktop, first on mobile) ── */}
        <div className="proj-stage">
          <div className="proj-frame">
            <div className="proj-frame-bar" aria-hidden="true">
              <span /><span /><span />
            </div>
            <div className="proj-screen">
              <video
                ref={videoRef}
                className="proj-video"
                src={currentProject.texture}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>

          {/* Index dots + prev / next */}
          <div className="proj-controls">
            <button
              className="arrow-btn"
              onClick={() => handleNavigation("previous")}
              aria-label="Previous project"
            >
              <img src="/assets/left-arrow.png" alt="" />
            </button>

            <div className="flex items-center gap-1.5">
              {myProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedProjectIndex(i)}
                  aria-label={`Show project ${i + 1}`}
                  className={`proj-dot ${i === selectedProjectIndex ? "is-active" : ""}`}
                />
              ))}
            </div>

            <button
              className="arrow-btn"
              onClick={() => handleNavigation("next")}
              aria-label="Next project"
            >
              <img src="/assets/right-arrow.png" alt="" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Project info ── */}
        <div className="proj-panel proj-info">
          <div className="flex items-center gap-4">
            <div
              className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
              style={currentProject.logoStyle}
            >
              <img className="w-10 h-10 shadow-sm" src={currentProject.logo} alt="logo" />
            </div>
            <span className="proj-count">
              {String(selectedProjectIndex + 1).padStart(2, "0")} / {String(projectCount).padStart(2, "0")}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <p className="proj-title animatedText">{currentProject.title}</p>
            <p className="proj-text animatedText">{currentProject.desc}</p>
            <p className="proj-text animatedText">{currentProject.subdesc}</p>
          </div>

          <div className="proj-divider" />

          <div className="flex items-center gap-3 flex-wrap">
            {currentProject.tags.map((tag, index) => (
              <div key={index} className="tech-logo" title={tag.name}>
                <img src={tag.path} alt={tag.name} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Project picker cards (existing logo + title) ── */}
      <div className="proj-picker">
        {myProjects.map((p, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={i === selectedProjectIndex}
            onClick={() => setSelectedProjectIndex(i)}
            className="proj-pick"
          >
            <span className="proj-pick-logo" style={p.logoStyle}>
              <img src={p.logo} alt="" />
            </span>
            <span className="proj-pick-title">{p.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Projects;