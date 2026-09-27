import { useState, useMemo } from "react";
import { useWorkouts } from "../hooks/useWorkouts";
import WorkoutCard from "../components/WorkoutCard";
import bannerImage from "../assets/banner.png";

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];
const SORT_OPTIONS = [
  { label: "Duration", value: "duration" },
  { label: "Calories", value: "calories" },
  { label: "Rating", value: "rating" },
];

export default function Home() {
  const { workouts, loading, error } = useWorkouts();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    let list = [...workouts];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.muscleGroups.some((mg) => mg.toLowerCase().includes(q)) ||
          w.equipment.toLowerCase().includes(q)
      );
    }

    if (difficulty !== "All") {
      list = list.filter((w) => w.difficulty === difficulty);
    }

    list.sort((a, b) => {
      let va = 0;
      let vb = 0;
      if (sortBy === "duration") { va = a.duration; vb = b.duration; }
      if (sortBy === "calories") { va = a.caloriesBurned; vb = b.caloriesBurned; }
      if (sortBy === "rating") { va = a.rating; vb = b.rating; }
      return sortDir === "desc" ? vb - va : va - vb;
    });

    return list;
  }, [workouts, search, difficulty, sortBy, sortDir]);

  const toggleSort = (val: string) => {
    if (sortBy === val) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortBy(val);
      setSortDir("desc");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gray-950 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle,#28BDB4,#6388D2,#9B3DDA)" }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

            {/* ─ LEFT COLUMN — text content ─ */}
            <div className="text-center lg:text-left">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
                WORKOUT LIBRARY
              </p>
              <h1
                className="mb-4 text-4xl font-black uppercase leading-tight sm:text-6xl"
                style={{
                  background: "linear-gradient(90deg,#28BDB4,#6388D2,#9B3DDA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                TRAIN WITH PURPOSE
              </h1>
              <p className="mx-auto mb-8 max-w-xl text-base text-gray-400 sm:text-lg lg:mx-0">
                A no-nonsense gym companion. Pick a lift, build your daily plan,
                and watch the week's progress add up.
              </p>
              <a
                href="#library"
                className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:opacity-90 hover:scale-105"
                style={{ background: "linear-gradient(90deg,#28BDB4,#6388D2,#9B3DDA)" }}
              >
                <span>💪</span>
                BROWSE WORKOUTS
              </a>
            </div>

            {/* ── RIGHT COLUMN — banner image ── */}
            <div className="flex items-center justify-center lg:justify-end">
              <img
                src={bannerImage}
                alt="Workout banner"
                className="w-full max-w-sm rounded-2xl object-cover drop-shadow-2xl lg:max-w-md"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── LIBRARY SECTION ── */}
      <section id="library" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <h2 className="mb-1 text-2xl font-bold text-white">THE LIBRARY</h2>
          <p className="text-sm text-gray-400">Twelve lifts covering every major muscle group.</p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workouts, muscles, equipment..."
            className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 sm:max-w-sm"
          />

          <div className="flex flex-wrap items-center gap-2">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${difficulty === d ? "text-white shadow-md" : "border border-white/10 bg-gray-900 text-gray-400 hover:text-white"}`}
                style={difficulty === d ? { background: "linear-gradient(90deg,#28BDB4,#6388D2,#9B3DDA)" } : {}}
              >
                {d}
              </button>
            ))}

            <div className="ml-2 flex items-center gap-1 rounded-lg border border-white/10 bg-gray-900 p-1">
              {SORT_OPTIONS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => toggleSort(s.value)}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${sortBy === s.value ? "text-white" : "text-gray-500 hover:text-white"}`}
                  style={sortBy === s.value ? { background: "linear-gradient(90deg,#28BDB4,#6388D2)" } : {}}
                >
                  {s.label}
                  {sortBy === s.value && (
                    <span className="text-xs">{sortDir === "desc" ? "↓" : "↑"}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex min-h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-teal-400" />
              <p className="text-sm text-gray-400">Loading workouts...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex min-h-64 items-center justify-center">
            <p className="text-red-400">Error: {error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="flex min-h-64 flex-col items-center justify-center gap-2">
            <p className="text-4xl">🔍</p>
            <p className="text-gray-400">No workouts found. Try a different search.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}