import React, { useState } from "react";
import Globe from "react-globe.gl";
import Button from "../components/Button";

/**
 * About — same cards, same content, same layout.
 * Redesign: each card's artwork sits in a framed "well", text blocks have
 * a consistent rhythm, the bio is no longer truncated, and every card gets
 * a thin tone-coloured top edge. All colours come from theme variables.
 */
const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("chahdfadhlaoui87@gmail.com");
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        {/* Card 1 - Bio */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container" data-tone="pink">
            <div className="about-media">
              <img
                src="assets/me3.png"
                alt="about"
                className="card-img w-full sm:h-[276px] h-fit object-contain"
              />
            </div>
            <div className="about-body">
              <p className="grid-headtext text-grad text-lg sm:text-xl">
                Hi, I'm Chahd
              </p>
              <p className="grid-subtext text-sm leading-relaxed">
                Computer Science student with a strong interest in web
                development, with a growing focus on DevOps practices and
                software testing. I build modern and responsive web applications
                using technologies such as React, Node.js, and Express, while
                ensuring software quality through functional and automated
                testing.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 - Tech Stack */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container" data-tone="teal">
            <div className="about-media">
              <img
                src="assets/techstack.png"
                alt="grid-2"
                className="card-img w-full sm:h-[276px] h-fit object-contain"
              />
            </div>
            <div className="about-body">
              <p className="grid-headtext text-grad">Tech Stack</p>
              <p className="grid-subtext">
                I specialize in a variety of languages, frameworks, and tools
                that allow me to build robust and scalable applications
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 - Globe */}
        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container" data-tone="lilac">
            <div className="globe-well about-media rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0,0,0,0)"
                showAtmosphere
                atmosphereColor="#fe2aa2"
                atmosphereAltitude={0.18}
                showGraticules="true"
                globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
              />
            </div>
            <div className="about-body">
              <p className="grid-headtext text-grad">
                I'm very flexible with time zone communications & locations
              </p>
              <p className="grid-subtext">
                I&apos;m based in Tunisia, and open to remote work worldwide.
              </p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        {/* Card 4 - Passion */}
        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container" data-tone="lilac">
            <div className="card-orb" aria-hidden="true" />
            <div className="about-media">
              <img
                src="assets/grid3.png"
                alt="grid-3"
                className="card-img w-full sm:h-[266px] h-fit object-contain"
              />
            </div>
            <div className="about-body">
              <p className="grid-headtext text-grad">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving problems and building things through code.
                Programming isn&apos;t just my profession—it&apos;s my passion.
                I enjoy exploring new technologies, and enhancing my skills.
              </p>
            </div>
          </div>
        </div>

        {/* Card 5 - Contact Email */}
        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container" data-tone="pink">
            <div className="card-halo" aria-hidden="true" />
            <div className="about-media about-media--flush">
              <img
                src="assets/grid4.png"
                alt="grid-4"
                className="card-img w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
              />
            </div>
            <div className="space-y-2">
              <p className="copy-label">Contact me</p>

              <button
                type="button"
                className={`copy-container w-full ${hasCopied ? "is-done" : ""}`}
                onClick={handleCopy}
                aria-label="Copy email address"
              >
                <img
                  src={hasCopied ? "assets/tick.svg" : "assets/copy.svg"}
                  alt=""
                  className={`copy-icon ${hasCopied ? "is-done" : ""}`}
                />
                <span className="copy-text text-grad lg:text-xl md:text-xl text-base">
                  chahdfadhlaoui87@gmail.com
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;