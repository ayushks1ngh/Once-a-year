import { useEffect, useRef, useState } from "react";

export default function ProposeDayHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowIntensity, setGlowIntensity] = useState(1);
  const animationFrameRef = useRef<number | null>(null);

  // Handle mouse movement for tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation based on cursor position (max 5 degrees)
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * -5;

    setTilt({ x: rotateX, y: rotateY });

    // Increase glow intensity slightly on mouse movement
    setGlowIntensity(1.2);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlowIntensity(1);
  };

  // Handle touch movement for mobile
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || e.touches.length === 0) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;

    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * -5;

    setTilt({ x: rotateX, y: rotateY });
    setGlowIntensity(1.2);
  };

  const handleTouchEnd = () => {
    setTilt({ x: 0, y: 0 });
    setGlowIntensity(1);
  };

  // Smooth animation for tilt reset
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Generate floating dust particles
  const dustParticles = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 20 + Math.random() * 10,
  }));

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-2xl"
      style={{
        background: "linear-gradient(145deg, #1a1a24, #2c1f32)",
        perspective: "1000px",
        cursor: "pointer",
        minHeight: "420px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Radial Glow Layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            circle 280px at 50% 55%,
            rgba(255, 60, 111, ${0.25 * glowIntensity}) 0%,
            rgba(255, 60, 111, ${0.12 * glowIntensity}) 30%,
            transparent 70%
          )`,
          filter: "blur(60px)",
        }}
      />

      {/* Floating Dust Particles */}
      {dustParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "4px",
            height: "4px",
            left: `${particle.left}%`,
            bottom: "-20px",
            background: "rgba(255, 255, 255, 0.15)",
            animation: `proposeDustFloat ${particle.duration}s ease-in infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Heart Container */}
      <div
        className="absolute inset-0 flex items-end justify-center pb-12"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          willChange: "transform",
          transition:
            tilt.x === 0 && tilt.y === 0
              ? "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
              : "none",
        }}
      >
        {/* Heart Shape */}
        <div
          ref={heartRef}
          className="relative"
          style={{
            width: "240px",
            height: "220px",
            animation: "proposeHeartbeat 4s ease-in-out infinite",
          }}
        >
          {/* Heart SVG */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 240 220"
            preserveAspectRatio="xMidYMid meet"
            style={{
              filter: `drop-shadow(0 0 20px rgba(255, 60, 111, ${0.6 * glowIntensity}))
                        drop-shadow(0 0 40px rgba(255, 60, 111, ${0.3 * glowIntensity}))`,
            }}
          >
            {/* Heart path */}
            <path
              d="M120,210 C30,150 10,100 10,70 C10,40 35,20 65,20 C85,20 105,30 120,45 C135,30 155,20 175,20 C205,20 230,40 230,70 C230,100 210,150 120,210 Z"
              fill="#ff3c6f"
              style={{
                filter: "drop-shadow(0 2px 8px rgba(255, 60, 111, 0.4))",
              }}
            />
          </svg>
        </div>
      </div>

      {/* Bloom Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.01) 50%,
            rgba(0, 0, 0, 0.08) 100%
          )`,
        }}
      />
    </div>
  );
}
