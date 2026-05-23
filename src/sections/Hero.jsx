import { Suspense } from "react";
import { HackerRoom } from "../components/HackerRoom";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants";
import Target from "../components/Target";
import ReactLogo from "../components/ReactLogo";
import DockerLogo from "../components/DockerLogo";
import WebDevModel from "../components/webdev";
import HeroCamera from "../components/HeroCamera";
import Button from "../components/Button";

function Hero() {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section
      className="min-h-screen w-full flex flex-col relative"
      id="home"
      style={{
        background:
          "radial-gradient(ellipse at 70% 20%, rgba(254,42,162,0.08) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(25,189,189,0.06) 0%, transparent 50%)",
      }}
    >
      {/* TEXT */}
      <div className="w-full mx-auto flex flex-col sm:mt-30 mt-20 c-space gap-3">
        <p
          className="sm:text-3xl text-xl font-medium text-center font-generalsans"
          style={{ color: "rgba(255,178,215,0.9)" }}
        >
          Hi, I am chahd <span className="waving-hand">👋</span>
        </p>

        <p
          className="hero_tag"
          style={{
            background: "linear-gradient(135deg, #fe2aa2 0%, #f3b6ff 50%, #19bdbd 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
Full-Stack Web Developer    
    </p>
      </div>

      {/* 3D CANVAS */}
      <div className="w-full h-full absolute inset-0">
        <Canvas className="w-full h-full">
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 20]} />

            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                position={sizes.deskPosition}
                scale={sizes.deskScale}
                rotation={[0, -Math.PI, 0]}
              />
            </HeroCamera>

            {/* LIGHTS — tinted to match palette */}
            <ambientLight intensity={1} color="#f3b6ff" />
            <directionalLight position={[10, 10, 10]} intensity={1} color="#ffb2d7" />
            <pointLight position={[-10, 5, 5]} intensity={0.6} color="#19bdbd" />

            <group>
              {/* LEFT */}
              <DockerLogo
                position={[-12, 5, 0]}
                scale={0.6}
                rotation={[0, -25, 0]}
              />

              {/* RIGHT */}
              <ReactLogo position={[10, 3, 0]} scale={0.3} />

              <WebDevModel position={[-5, -6, 0]} scale={0.3} />
            </group>
          </Suspense>
        </Canvas>

     {/* CTA BUTTON */}
<div className="absolute bottom-[-10] left-1/2 -translate-x-1/2 z-10 c-space">
  <a href="#about" className="w-fit">
    <Button
      name="Let's work together"
      isBeam
      containerClass="sm:w-fit w-full sm:min-w-96"
    />
  </a>
</div>
      </div>
    </section>
  );
}

export default Hero;