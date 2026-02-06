import EnhancedRose from "./EnhancedRose";

/**
 * Cinematic Rose Day Hero Section
 *
 * Layered depth composition:
 * - Layer A: Pink radial glow
 * - Layer B: Animated drifting fog
 * - Layer C: Enhanced rose visual
 * - Layer D: Light bloom overlay
 */
function RoseDayHero() {
  return (
    <div className="relative w-full h-[450px] rose-hero-container">
      {/* Layer A: Radial Pink Glow */}
      <div className="rose-glow-layer" />

      {/* Layer B: Animated Fog (Inner) */}
      <div className="rose-fog-layer rose-fog-inner" />

      {/* Layer B: Animated Fog (Outer) */}
      <div className="rose-fog-layer rose-fog-outer" />

      {/* Layer C: Rose Visual */}
      <div className="rose-visual-layer">
        <EnhancedRose />
      </div>

      {/* Layer D: Bloom Overlay */}
      <div className="rose-bloom-layer" />
    </div>
  );
}

export default RoseDayHero;
