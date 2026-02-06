import { useRef, useState, useEffect } from "react";

/**
 * Enhanced Rose with Parallax Tilt Effect
 * - Mouse parallax on desktop
 * - Touch support on mobile
 * - Subtle 3D rotation + scale
 * - Smooth animations
 * - Premium, romantic feel
 */
function EnhancedRose() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isHovering, setIsHovering] = useState(false);

  // Handle mouse movement - desktop parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate tilt angle (max 8 degrees)
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = ((centerY - y) / centerY) * -8;

    setTilt({ x: rotateX, y: rotateY });
    setScale(1.05);
  };

  // Handle touch movement - mobile parallax
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = ((centerY - y) / centerY) * -8;

    setTilt({ x: rotateX, y: rotateY });
    setScale(1.03);
  };

  // Reset on pointer leave
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setScale(1);
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto mt-5 h-32 w-32 perspective"
      style={{
        perspective: "1200px",
        cursor: "pointer",
      }}
    >
      {/* Glow background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-200/40 to-rose-200/20 blur-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 0.8 : 0.3,
        }}
      />

      {/* Rose container with 3D tilt */}
      <div
        style={{
          transform: `
            perspective(1200px)
            rotateX(${tilt.x}deg)
            rotateY(${tilt.y}deg)
            scale(${scale})
            translateZ(0)
          `,
          transition: isHovering ? "none" : "transform 0.4s cubic-bezier(0.23, 1, 0.320, 1)",
          willChange: "transform",
        }}
        className="h-full w-full"
      >
        {/* High-quality SVG Rose */}
        <svg
          viewBox="0 0 200 280"
          className="h-full w-full drop-shadow-lg"
          style={{
            filter: isHovering
              ? "drop-shadow(0 8px 20px rgba(236, 72, 153, 0.3))"
              : "drop-shadow(0 4px 12px rgba(236, 72, 153, 0.2))",
            transition: "filter 0.3s ease",
          }}
        >
          {/* Stem */}
          <path
            d="M 100 280 Q 95 240 90 200 Q 85 160 88 120"
            stroke="hsl(145 70% 40%)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* Leaves */}
          <ellipse
            cx="75"
            cy="180"
            rx="12"
            ry="20"
            fill="hsl(145 65% 50%)"
            opacity="0.8"
            transform="rotate(-35 75 180)"
          />
          <ellipse
            cx="115"
            cy="160"
            rx="10"
            ry="18"
            fill="hsl(145 70% 45%)"
            opacity="0.75"
            transform="rotate(30 115 160)"
          />

          {/* Rose petals - layered for depth */}
          {/* Outer petals (dark pink) */}
          <g>
            <ellipse cx="100" cy="40" rx="22" ry="28" fill="hsl(332 85% 52%)" opacity="0.9" />
            <ellipse cx="130" cy="60" rx="20" ry="25" fill="hsl(332 85% 54%)" opacity="0.85" />
            <ellipse cx="70" cy="60" rx="20" ry="25" fill="hsl(332 85% 54%)" opacity="0.85" />
          </g>

          {/* Middle petals (pink) */}
          <g>
            <ellipse cx="100" cy="60" rx="18" ry="24" fill="hsl(332 88% 62%)" opacity="0.92" />
            <ellipse cx="122" cy="75" rx="16" ry="20" fill="hsl(332 88% 62%)" opacity="0.87" />
            <ellipse cx="78" cy="75" rx="16" ry="20" fill="hsl(332 88% 62%)" opacity="0.87" />
          </g>

          {/* Inner petals (lighter pink) */}
          <g>
            <ellipse cx="100" cy="75" rx="14" ry="18" fill="hsl(332 90% 70%)" opacity="0.95" />
            <ellipse cx="110" cy="85" rx="12" ry="15" fill="hsl(332 90% 72%)" opacity="0.9" />
            <ellipse cx="90" cy="85" rx="12" ry="15" fill="hsl(332 90% 72%)" opacity="0.9" />
          </g>

          {/* Center bloom (light pink with highlights) */}
          <ellipse
            cx="100"
            cy="85"
            rx="10"
            ry="12"
            fill="hsl(332 92% 78%)"
            opacity="0.98"
          />

          {/* Highlight for luminosity */}
          <ellipse
            cx="98"
            cy="80"
            rx="4"
            ry="6"
            fill="white"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Floating idle animation (very subtle) */}
      <style>{`
        @keyframes floatIdle {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, 2px); }
        }
      `}</style>
    </div>
  );
}

export default EnhancedRose;
