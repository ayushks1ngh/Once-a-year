import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type DayTheme = {
  tint1: string;
  tint2: string;
  tint3: string;
  floatA: string;
  floatB: string;
  floatMode: "petals" | "hearts";
};

type Day = {
  index: number;
  date: { month: number; day: number };
  title: string;
  emoji: string;
  messages: string[][];
  theme: DayTheme;
  visual: {
    label: string;
    kind: "rose" | "ring" | "chocolate" | "teddy" | "promise" | "hug" | "valentine";
  };
};

const DAYS: Day[] = [
  {
    index: 1,
    date: { month: 2, day: 7 },
    title: "Rose Day",
    emoji: "🌹",
    messages: [
      [
        "A rose doesn’t ask to be perfect,",
        "it just opens—soft and honest.",
        "Today I’m sending you something simple:",
        "a quiet hello, and a little warmth.",
      ],
      [
        "Like a rose blooming in the frost,",
        "some things are beautiful because they last.",
        "Just a small reminder today:",
        "you are deeply appreciated.",
      ],
      [
        "Fragrance stays on the hand that gives roses.",
        "Today, I'm just sending the petals your way.",
        "No reason needed.",
        "Just a soft thought for you.",
      ]
    ],
    theme: {
      tint1: "hsl(332 92% 84% / 0.85)",
      tint2: "hsl(6 90% 86% / 0.65)",
      tint3: "hsl(278 92% 90% / 0.55)",
      floatA: "hsl(338 88% 70%)",
      floatB: "hsl(18 92% 72%)",
      floatMode: "petals",
    },
    visual: { label: "A tiny rose bloom", kind: "rose" },
  },
  {
    index: 2,
    date: { month: 2, day: 8 },
    title: "Propose Day",
    emoji: "💍",
    messages: [
      [
        "Not a big question.",
        "Just a gentle one:",
        "can I keep choosing you—",
        "in small ways, every day?",
      ],
      [
        "I'm not asking for forever yet.",
        "I'm just asking for right now.",
        "To let me be the one who listens,",
        "and the one who stays.",
      ],
      [
        "Life is full of noise.",
        "In the middle of it all,",
        "I'm proposing a little silence with you.",
        "Just us, being exactly who we are.",
      ]
    ],
    theme: {
      tint1: "hsl(332 95% 88% / 0.75)",
      tint2: "hsl(210 95% 88% / 0.55)",
      tint3: "hsl(280 92% 92% / 0.55)",
      floatA: "hsl(330 92% 72%)",
      floatB: "hsl(276 90% 78%)",
      floatMode: "hearts",
    },
    visual: { label: "A soft ring sparkle", kind: "ring" },
  },
  {
    index: 3,
    date: { month: 2, day: 9 },
    title: "Chocolate Day",
    emoji: "🍫",
    messages: [
      [
        "Some sweetness belongs to moments,",
        "not just chocolate.",
        "If today feels heavy,",
        "I hope this brings a light little smile.",
      ],
      [
        "A little bit of sweetness,",
        "to balance out the day.",
        "Think of this as a virtual treat,",
        "made specifically to make you grin.",
      ],
      [
        "Life is like a box of chocolates,",
        "but I already know which one is my favorite.",
        "It's the one that matches your smile.",
        "Stay sweet today.",
      ]
    ],
    theme: {
      tint1: "hsl(28 92% 86% / 0.75)",
      tint2: "hsl(332 92% 88% / 0.55)",
      tint3: "hsl(190 92% 88% / 0.45)",
      floatA: "hsl(22 84% 70%)",
      floatB: "hsl(330 84% 72%)",
      floatMode: "hearts",
    },
    visual: { label: "A cocoa swirl", kind: "chocolate" },
  },
  {
    index: 4,
    date: { month: 2, day: 10 },
    title: "Teddy Day",
    emoji: "🧸",
    messages: [
      [
        "If you could use a softer day,",
        "pretend this is a warm, friendly hug.",
        "No pressure.",
        "Just comfort, from me to you.",
      ],
      [
        "Something soft to hold onto,",
        "even if it's just a thought.",
        "May your day be as fuzzy",
        "and kind as a teddy's heart.",
      ],
      [
        "A teddy bear doesn't need words,",
        "it just needs to be there.",
        "I'm right here in the background,",
        "cheering for you silently.",
      ]
    ],
    theme: {
      tint1: "hsl(35 85% 88% / 0.78)",
      tint2: "hsl(332 92% 90% / 0.52)",
      tint3: "hsl(265 92% 92% / 0.48)",
      floatA: "hsl(34 80% 72%)",
      floatB: "hsl(290 82% 78%)",
      floatMode: "petals",
    },
    visual: { label: "A teddy heart", kind: "teddy" },
  },
  {
    index: 5,
    date: { month: 2, day: 11 },
    title: "Promise Day",
    emoji: "🤞",
    messages: [
      [
        "I can’t promise perfect.",
        "But I can promise honest.",
        "I’ll be kind with your heart,",
        "and careful with your name.",
      ],
      [
        "A promise isn't a weight,",
        "it's a foundation.",
        "I promise to keep showing up,",
        "exactly as I am, for exactly who you are.",
      ],
      [
        "Small promises matter most.",
        "I promise to listen when you're quiet,",
        "and to celebrate when you're loud.",
        "You can count on that.",
      ]
    ],
    theme: {
      tint1: "hsl(266 95% 90% / 0.78)",
      tint2: "hsl(200 92% 90% / 0.50)",
      tint3: "hsl(332 92% 90% / 0.44)",
      floatA: "hsl(270 86% 76%)",
      floatB: "hsl(210 86% 76%)",
      floatMode: "hearts",
    },
    visual: { label: "A promise ribbon", kind: "promise" },
  },
  {
    index: 6,
    date: { month: 2, day: 12 },
    title: "Hug Day",
    emoji: "🤍",
    messages: [
      [
        "Some feelings grow quietly,",
        "like this one.",
        "No rush.",
        "Just something I wanted you to feel today.",
      ],
      [
        "A hug is a handshake from the heart.",
        "Sending you a warm one across the screen.",
        "May it make your shoulders drop,",
        "and your heart feel light.",
      ],
      [
        "Sometimes words are too much.",
        "A quiet hug says everything needed.",
        "I'm sending you that peace today.",
        "Take a deep breath. You're doing great.",
      ]
    ],
    theme: {
      tint1: "hsl(20 92% 88% / 0.78)",
      tint2: "hsl(332 92% 90% / 0.52)",
      tint3: "hsl(48 92% 90% / 0.44)",
      floatA: "hsl(18 88% 72%)",
      floatB: "hsl(332 88% 72%)",
      floatMode: "petals",
    },
    visual: { label: "A warm embrace", kind: "hug" },
  },
  {
    index: 7,
    date: { month: 2, day: 14 },
    title: "Valentine’s Day",
    emoji: "❤️",
    messages: [
      [
        "If you made it here, thank you.",
        "I don’t want to rush you, ever.",
        "I just wanted you to know—",
        "you’re genuinely special to me.",
        "No expectations. Just honesty.",
      ],
      [
        "Love is a journey, not a destination.",
        "I'm glad our paths crossed this week.",
        "Whatever happens next,",
        "I'm grateful for these seven days.",
      ],
      [
        "Happy Valentine's Day.",
        "You deserve all the beauty in the world.",
        "I hope this week made you feel seen,",
        "and loved, just as you are.",
      ]
    ],
    theme: {
      tint1: "hsl(332 96% 84% / 0.75)",
      tint2: "hsl(276 96% 86% / 0.60)",
      tint3: "hsl(210 96% 86% / 0.50)",
      floatA: "hsl(332 92% 66%)",
      floatB: "hsl(276 88% 70%)",
      floatMode: "hearts",
    },
    visual: { label: "A final heart", kind: "valentine" },
  },
];

function getUnlockedCount(today = new Date()) {
  if (typeof window !== "undefined" && window.location.search.includes("unlock=true")) {
    return 7;
  }
  const y = today.getFullYear();
  const start = new Date(y, 1, 7);
  const end = new Date(y, 1, 14);

  const t = new Date(y, today.getMonth(), today.getDate());

  if (t < start) return 0;
  if (t >= end) return 7;

  // Feb 7 => 1
  return Math.min(7, Math.max(0, t.getDate() - 6));
}

function DayVisual({ kind }: { kind: Day["visual"]["kind"] }) {
  if (!kind) return null;
  switch (kind) {
    case "rose":
      return (
        <div
          data-testid="visual-rose"
          className="relative mx-auto mt-5 h-24 w-24"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.85),rgba(255,255,255,0)_45%),linear-gradient(135deg,hsl(332_92%_62%),hsl(18_92%_70%))] blur-[0.2px]" />
          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9),rgba(255,255,255,0)_45%),linear-gradient(135deg,hsl(332_95%_70%),hsl(280_90%_72%))]" />
          <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.92),rgba(255,255,255,0)_55%),linear-gradient(135deg,hsl(332_96%_78%),hsl(6_90%_78%))]" />
          <div className="absolute -bottom-2 left-1/2 h-10 w-1 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,hsl(145_70%_48%),hsl(145_70%_34%))] opacity-80" />
        </div>
      );
    case "ring":
      return (
        <div data-testid="visual-ring" className="relative mx-auto mt-5 h-24 w-24">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.85),rgba(255,255,255,0)_45%),linear-gradient(135deg,hsl(210_92%_74%),hsl(276_90%_78%))] blur-[0.5px]" />
          <div className="absolute inset-3 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.8),rgba(255,255,255,0)_55%),linear-gradient(135deg,hsl(50_92%_70%),hsl(332_90%_70%))] shadow-[0_18px_60px_rgba(255,105,180,0.15)]" />
          <div className="absolute left-1/2 top-2 h-5 w-5 -translate-x-1/2 rotate-12 rounded-md bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.08)]" />
          <Sparkles className="absolute -right-1 top-3 h-5 w-5 text-white/80" />
        </div>
      );
    case "chocolate":
      return (
        <div
          data-testid="visual-chocolate"
          className="relative mx-auto mt-5 h-24 w-24"
        >
          <div className="absolute inset-0 rounded-[28px] bg-[linear-gradient(135deg,hsl(24_70%_50%),hsl(332_80%_64%))] shadow-[0_20px_60px_rgba(255,105,180,0.14)]" />
          <div className="absolute inset-[10px] rounded-[20px] bg-[linear-gradient(135deg,hsl(24_65%_40%),hsl(18_70%_48%))]" />
          <div className="absolute left-3 top-3 h-3 w-8 rounded-full bg-white/20" />
          <div className="absolute right-4 bottom-4 h-3 w-10 rounded-full bg-white/15" />
        </div>
      );
    case "teddy":
      return (
        <div data-testid="visual-teddy" className="relative mx-auto mt-5 h-24 w-24">
          <div className="absolute left-4 top-4 h-16 w-16 rounded-full bg-[linear-gradient(135deg,hsl(35_65%_74%),hsl(26_60%_68%))]" />
          <div className="absolute left-2 top-4 h-8 w-8 rounded-full bg-[linear-gradient(135deg,hsl(35_70%_78%),hsl(26_60%_72%))]" />
          <div className="absolute right-2 top-4 h-8 w-8 rounded-full bg-[linear-gradient(135deg,hsl(35_70%_78%),hsl(26_60%_72%))]" />
          <div className="absolute left-8 top-10 h-2 w-2 rounded-full bg-black/45" />
          <div className="absolute left-[52px] top-10 h-2 w-2 rounded-full bg-black/45" />
          <div className="absolute left-10 top-[48px] h-3 w-4 rounded-full bg-[linear-gradient(135deg,hsl(332_85%_70%),hsl(18_85%_70%))]" />
          <div className="absolute -bottom-1 left-1/2 h-6 w-10 -translate-x-1/2 rounded-[999px] bg-[linear-gradient(135deg,hsl(332_80%_72%),hsl(276_80%_76%))] shadow-[0_18px_50px_rgba(255,105,180,0.18)]" />
        </div>
      );
    case "promise":
      return (
        <div data-testid="visual-promise" className="relative mx-auto mt-5 h-24 w-24">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.85),rgba(255,255,255,0)_50%),linear-gradient(135deg,hsl(270_90%_78%),hsl(210_90%_78%))]" />
          <div className="absolute inset-4 rounded-full bg-white/55" />
          <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-[18px] bg-[linear-gradient(135deg,hsl(332_85%_70%),hsl(18_88%_72%))] opacity-90" />
        </div>
      );
    case "hug":
      return (
        <div data-testid="visual-hug" className="relative mx-auto mt-5 h-24 w-24">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.85),rgba(255,255,255,0)_50%),linear-gradient(135deg,hsl(18_92%_78%),hsl(332_88%_78%))]" />
          <div className="absolute inset-4 rounded-full bg-white/55" />
          <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50" />
        </div>
      );
    case "valentine":
      return (
        <div data-testid="visual-valentine" className="relative mx-auto mt-5 h-24 w-24">
          <div className="hero-heart absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9),rgba(255,255,255,0)_45%),linear-gradient(135deg,hsl(332_92%_62%),hsl(276_92%_66%))]" />
          <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.2))]" style={{ clipPath: "path('M12 21 C10 19,4 14,4 9 C4 6,6 4,8.8 4 C10.3 4,11.5 4.7,12 5.4 C12.5 4.7,13.7 4,15.2 4 C18 4,20 6,20 9 C20 14,14 19,12 21 Z')" }} />
        </div>
      );
  }
}

function FloatingThings({ mode }: { mode: "hearts" | "petals" }) {
  const items = useMemo(() => {
    const count = 12;
    return Array.from({ length: count }).map((_, i) => {
      const x = 6 + (i * 100) / count + (i % 2 ? 2.5 : -2.5);
      const size = 14 + ((i * 7) % 18);
      const dur = 10 + ((i * 11) % 8);
      const sway = 6 + ((i * 5) % 6);
      const o = 0.22 + ((i * 13) % 35) / 100;
      const delay = (i * 0.8) % 6;
      return { id: i, x, size, dur, sway, o, delay };
    });
  }, []);

  if (!mode) return null;

  return (
    <div className="float-layer" aria-hidden>
      {items.map((it) => (
        <div
          key={it.id}
          className={cn("float", mode === "hearts" ? "heart" : "petal")}
          style={
            {
              "--x": it.x,
              "--size": it.size,
              "--dur": it.dur,
              "--sway": it.sway,
              "--o": it.o,
              animationDelay: `${it.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function useThemeVars(theme: DayTheme | undefined) {
  useEffect(() => {
    if (!theme) return;
    const r = document.documentElement;
    r.style.setProperty("--tint-1", theme.tint1);
    r.style.setProperty("--tint-2", theme.tint2);
    r.style.setProperty("--tint-3", theme.tint3);
    r.style.setProperty("--float-a", theme.floatA);
    r.style.setProperty("--float-b", theme.floatB);
    return () => {
      r.style.removeProperty("--tint-1");
      r.style.removeProperty("--tint-2");
      r.style.removeProperty("--tint-3");
      r.style.removeProperty("--float-a");
      r.style.removeProperty("--float-b");
    };
  }, [theme]);
}

function RoseDayVisuals() {
  const petals = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 20}s`,
      duration: `${15 + Math.random() * 15}s`,
      size: `${15 + Math.random() * 25}px`,
      rotation: `${Math.random() * 360}deg`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-[#fff0f3] opacity-60" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ffc1cc] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[roseGlow_12s_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#f8bbd0] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[roseGlow_15s_infinite_reverse]" />
      {petals.map((p) => (
        <div
          key={p.id}
          className="rose-petal animate-[petalFall_linear_infinite]"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `rotate(${p.rotation})`,
          }}
        />
      ))}
    </div>
  );
}

export default function ValentineWeekPage() {
  const unlocked = useMemo(() => getUnlockedCount(new Date()), []);
  const [activeDay, setActiveDay] = useState<number | null>(null);

  const day = activeDay ? DAYS[activeDay - 1] : null;

  const randomMessage = useMemo(() => {
    if (!day) return null;
    return day.messages[Math.floor(Math.random() * day.messages.length)];
  }, [day, activeDay]);

  useThemeVars(day?.theme || DAYS[0].theme);

  const isBeforeWeek = unlocked === 0;

  return (
    <div className="relative min-h-[100svh]">
      {day?.index === 1 ? <RoseDayVisuals /> : <div className="bg-dream noise" />}
      <FloatingThings mode={day?.theme.floatMode || "petals"} />

      <div className="mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-4 py-10">
        <div className="w-full">
          <header className="mx-auto mb-5 flex max-w-2xl flex-col items-center text-center">
            <div
              data-testid="badge-private"
              className="badge-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-foreground/80"
            >
              <span className="inline-flex h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
              Private Valentine Week
            </div>

            <h1
              data-testid="text-title"
              className="text-display mt-4 text-4xl leading-[0.95] tracking-tight text-foreground sm:text-5xl"
            >
              Valentine Week
            </h1>
            <p
              data-testid="text-subtitle"
              className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/70"
            >
              Each day unlocks on its date. Past days stay visible. Future days stay softly
              locked.
            </p>
          </header>

          <AnimatePresence mode="wait">
            {!activeDay ? (
              <motion.section
                key="grid"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="day-card glass soft-border relative overflow-hidden p-6 sm:p-8"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div data-testid="text-nav-title" className="text-xs font-semibold text-foreground/60">
                      Collection
                    </div>
                    <div data-testid="text-nav-sub" className="text-xl font-semibold text-foreground/80">
                      Tap a day to reveal its story
                    </div>
                  </div>
                  <div data-testid="text-unlocked" className="text-xs font-semibold text-foreground/60">
                    Progress: {unlocked}/7
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {DAYS.map((d) => {
                    const isUnlocked = unlocked >= d.index;

                    return (
                      <button
                        key={d.index}
                        type="button"
                        data-testid={`button-day-${d.index}`}
                        onClick={() => {
                          if (!isUnlocked) return;
                          setActiveDay(d.index);
                        }}
                        className={cn(
                          "day-card relative aspect-square overflow-hidden rounded-3xl p-5 text-left transition",
                          "soft-border bg-white/50 hover:bg-white/70 active:scale-[0.98]",
                          !isUnlocked && "cursor-not-allowed",
                        )}
                        aria-disabled={!isUnlocked}
                      >
                        <div className={cn(!isUnlocked && "locked", "h-full flex flex-col justify-between")}
                          data-testid={`card-day-${d.index}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-xs font-semibold text-foreground/70">
                              Day {d.index}
                            </div>
                            <div className="text-xl">{d.emoji}</div>
                          </div>
                          <div>
                            <div className="text-base font-semibold text-foreground/85">
                              {d.title}
                            </div>
                            <div className="text-[11px] font-semibold text-foreground/60">Feb {d.date.day}</div>
                          </div>
                        </div>

                        {!isUnlocked ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-[2px]">
                            <div
                              data-testid={`status-locked-${d.index}`}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-sm soft-border"
                            >
                              <Lock className="h-5 w-5 text-foreground/50" />
                            </div>
                          </div>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </motion.section>
            ) : (
              <motion.section
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="day-card glass glow soft-border relative overflow-hidden p-6 sm:p-10"
              >
                <button
                  onClick={() => setActiveDay(null)}
                  className="mb-6 flex items-center gap-2 text-sm font-semibold text-foreground/60 transition hover:text-foreground"
                >
                  ← Back to collection
                </button>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div
                        data-testid={`text-day-title-${day!.index}`}
                        className="text-display text-4xl tracking-tight"
                      >
                        Day {day!.index} — {day!.title} {day!.emoji}
                      </div>
                    </div>
                    <div
                      data-testid={`text-day-date-${day!.index}`}
                      className="mt-1 text-xs font-semibold text-foreground/60"
                    >
                      Feb {day!.date.day}
                    </div>

                    <div className="mt-8 space-y-4 floating-quote-wrapper">
                      {randomMessage?.map((line, i) => (
                        <p
                          key={i}
                          data-testid={`text-day-line-${day!.index}-${i}`}
                          className={cn(
                            "text-lg leading-relaxed transition-all duration-1000",
                            day!.index === 1 ? "text-[#5d4037] opacity-60 font-serif italic" : "text-foreground/75"
                          )}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <DayVisual kind={day!.visual.kind} />
                  </div>
                </div>

                {day!.index === 7 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-10 rounded-3xl bg-white/55 p-6 soft-border"
                    data-testid="card-final"
                  >
                    <div className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">A final note</div>
                    <div className="mt-3 text-base leading-relaxed text-foreground/75">
                      If this made you feel even a little cared for, I’m happy. And if not,
                      that’s okay too. I just wanted to show up with something gentle.
                    </div>
                  </motion.div>
                )}
              </motion.section>
            )}
          </AnimatePresence>

          <div
            data-testid="text-footer"
            className="mt-8 text-center text-xs leading-relaxed text-foreground/50"
          >
            Past days stay visible. Future days stay softly locked.
          </div>
        </div>
      </div>
    </div>
  );
}
