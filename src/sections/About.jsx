import React, { useState } from "react";
import Globe from "react-globe.gl";
import Button from "../components/Button";

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
          <div
            className="grid-container"
            style={{
              background: "linear-gradient(135deg, #1a0a14 0%, #130d1f 100%)",
              border: "1px solid rgba(254,42,162,0.18)",
              borderRadius: "20px",
            }}
          >
            <img
              src="assets/me3.png"
              alt="about"
              className="w-full sm:h-[276px] h-fit object-contain"
              style={{ filter: "drop-shadow(0 0 24px rgba(254,42,162,0.25))" }}
            />
            <div className="mt-4">
              <p
                className="grid-headtext text-lg sm:text-xl"
                style={{
                  background: "linear-gradient(90deg, #fe2aa2, #f3b6ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                }}
              >
                Hi, I'm Chahd
              </p>
              <p
                className="grid-subtext text-sm leading-relaxed line-clamp-3"
                style={{ color: "rgba(255,178,215,0.7)" }}
              >
                Computer Science student with a strong interest in web
                development, with a growing focus on DevOps practices and
                software testing. I build modern and responsive web applications
                using technologies such as React, Node.js, and Express, while
                ensuring software quality through functional and automated
                testing..
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 - Tech Stack */}
        <div className="col-span-1 xl:row-span-3">
          <div
            className="grid-container"
            style={{
              background: "linear-gradient(135deg, #0a1a1a 0%, #0d1320 100%)",
              border: "1px solid rgba(25,189,189,0.18)",
              borderRadius: "20px",
            }}
          >
            <img
              src="assets/techstack.png"
              alt="grid-2"
              className="w-full sm:h-[276px] h-fit object-contain"
              style={{ filter: "drop-shadow(0 0 20px rgba(25,189,189,0.2))" }}
            />
            <div>
              <p
                className="grid-headtext"
                style={{
                  background: "linear-gradient(90deg, #19bdbd, #f3b6ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                }}
              >
                Tech Stack
              </p>
              <p
                className="grid-subtext"
                style={{ color: "rgba(25,189,189,0.65)" }}
              >
                I specialize in a variety of languages, frameworks, and tools
                that allow me to build robust and scalable applications
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 - Globe */}
        <div className="col-span-1 xl:row-span-4">
          <div
            className="grid-container"
            style={{
              background: "linear-gradient(160deg, #0d0d1a 0%, #150d1e 100%)",
              border: "1px solid rgba(243,182,255,0.15)",
              borderRadius: "20px",
            }}
          >
            <div
              className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(254,42,162,0.07) 0%, rgba(25,189,189,0.05) 60%, transparent 100%)",
              }}
            >
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
            <div>
              <p
                className="grid-headtext"
                style={{
                  background: "linear-gradient(90deg, #f3b6ff, #fe2aa2)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                }}
              >
                I'm very flexible with time zone communications & locations
              </p>
              <p
                className="grid-subtext"
                style={{ color: "rgba(255,178,215,0.6)" }}
              >
                I&apos;m based in Tunisia,  and open to remote work
                worldwide.
              </p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        {/* Card 4 - Passion */}
        <div className="xl:col-span-2 xl:row-span-3">
          <div
            className="grid-container"
            style={{
              background: "linear-gradient(135deg, #110a1a 0%, #0a1510 100%)",
              border: "1px solid rgba(243,182,255,0.15)",
              borderRadius: "20px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(243,182,255,0.07) 0%, transparent 70%)",
                top: "-80px",
                right: "-60px",
                pointerEvents: "none",
              }}
            />
            <img
              src="assets/grid3.png"
              alt="grid-3"
              className="w-full sm:h-[266px] h-fit object-contain"
              style={{ filter: "drop-shadow(0 0 16px rgba(243,182,255,0.15))" }}
            />
            <div>
              <p
                className="grid-headtext"
                style={{
                  background: "linear-gradient(90deg, #f3b6ff, #19bdbd)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                }}
              >
                My Passion for Coding
              </p>
              <p
                className="grid-subtext"
                style={{ color: "rgba(243,182,255,0.6)" }}
              >
                I love solving problems and building things through code.
                Programming isn&apos;t just my profession—it&apos;s my passion.
                I enjoy exploring new technologies, and enhancing my skills.
              </p>
            </div>
          </div>
        </div>

       {/* Card 5 - Contact Email */}
<div className="xl:col-span-1 xl:row-span-2">
  <div
    className="grid-container"
    style={{
      background: "linear-gradient(135deg, #1a0a14 0%, #0d0d1a 100%)",
      border: "1px solid rgba(254,42,162,0.2)",
      borderRadius: "20px",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse at 50% 110%, rgba(254,42,162,0.12) 0%, transparent 60%)",
        pointerEvents: "none",
      }}
    />
    <img
      src="assets/grid4.png"
      alt="grid-4"
      className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
      style={{
        filter: "drop-shadow(0 0 12px rgba(254,42,162,0.2))",
        borderRadius: "12px",
      }}
    />
    <div className="space-y-2">
      <p
        className="grid-subtext text-center"
        style={{
          color: "rgba(255,178,215,0.55)",
          fontSize: "0.8rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Contact me
      </p>
      
      {/* ⭐ VERSION SIMPLIFIÉE COMME TON COLLÈGUE - PLUS DE FOND DYNAMIQUE */}
      <div 
        className="copy-container" 
        onClick={handleCopy}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderRadius: "12px",
          padding: "10px 16px",
          cursor: "pointer",
          // ⭐ FOND FIXE - NE CHANGE JAMAIS
          background: "rgba(254,42,162,0.08)",
          border: "1px solid rgba(254,42,162,0.25)",
        }}
      >
        <img
          src={hasCopied ? "assets/tick.svg" : "assets/copy.svg"}
          alt="copy"
          style={{
            filter: hasCopied
              ? "invert(1) sepia(1) saturate(3) hue-rotate(140deg)"
              : "invert(1) sepia(1) saturate(5) hue-rotate(290deg)",
            width: "18px",
            height: "18px",
          }}
        />
        <p
          className="lg:text-xl md:text-xl font-small"
          style={{
            background: "linear-gradient(90deg, #fe2aa2, #f3b6ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
            wordBreak: "break-all",
            overflowWrap: "anywhere",
            maxWidth: "100%",
          }}
        >
          chahdfadhlaoui87@gmail.com
        </p>
      </div>
    </div>
  </div>
</div>
      </div>
    </section>
  );
};

export default About;
