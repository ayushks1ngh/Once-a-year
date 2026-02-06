import { useEffect, useState } from "react";

/**
 * Beautiful access gate screen for when outside Valentine Week
 * Displays when date is outside Feb 7-14 range
 */
function AccessGate() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
        {/* Floating orbs for soft animation */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-br from-rose-100 to-purple-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'220\' height=\'220\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'220\' height=\'220\' filter=\'url(%23n)\' opacity=\'.18\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Content container */}
      <div
        className={`relative z-10 h-full flex flex-col items-center justify-center px-6 transition-all duration-1000 ${
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Heart icon with float animation */}
        <div
          className="mb-8 text-8xl animate-bounce"
          style={{
            animation: "bounce 2s infinite",
            animationDelay: "0s",
          }}
        >
          💝
        </div>

        {/* Main message */}
        <div className="text-center max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent leading-tight">
            This story blooms once a year
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            Return on <span className="font-semibold text-rose-600">February 7</span> to unlock the magic of Valentine Week.
          </p>

          {/* Decorative separator */}
          <div className="flex items-center justify-center gap-3 my-8">
            <div className="w-8 h-8 border-2 border-rose-300 rounded-full" />
            <div className="w-1 h-1 bg-rose-300 rounded-full" />
            <div className="w-1 h-1 bg-rose-300 rounded-full" />
            <div className="w-8 h-8 border-2 border-rose-300 rounded-full" />
          </div>

          {/* Countdown or info */}
          <p className="text-sm md:text-base text-gray-500 italic">
            Available February 7–14 every year
          </p>
        </div>

        {/* Footer hint */}
        <div className="absolute bottom-8 text-center">
          <p className="text-xs text-gray-400">
            A Valentine's Day experience ✨
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccessGate;
