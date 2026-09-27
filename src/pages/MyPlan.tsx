import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePlan } from "../context/PlanContext";
import { useWorkouts } from "../hooks/useWorkouts";
import { Workout } from "../types/workout";
import { toast } from "react-toastify";

type Tab = "today" | "saved";

export default function MyPlan() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tabParam = searchParams.get("tab") as Tab | null;
  const [activeTab, setActiveTab] = useState<Tab>(tabParam === "saved" ? "saved" : "today");

  useEffect(() => {
    if (tabParam === "saved") setActiveTab("saved");
    else if (tabParam === "today") setActiveTab("today");
  }, [tabParam]);

  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    navigate(`/my-plan?tab=${tab}`, { replace: true });
  };

  const { plan, saved, removeFromPlan, markDone, removeFromSaved, addToPlan, isDone } = usePlan();
  const { workouts, loading } = useWorkouts();

  const getWorkout = (id: number): Workout | undefined =>
    workouts.find((w) => w.id === id);

  const planWorkouts = useMemo(
    () => plan.map((e) => ({ entry: e, workout: getWorkout(e.workoutId) })).filter((x) => x.workout),
    [plan, workouts]
  );

  const savedWorkouts = useMemo(
    () => saved.map((e) => ({ entry: e, workout: getWorkout(e.workoutId) })).filter((x) => x.workout),
    [saved, workouts]
  );

  const planStats = useMemo(() => {
    const totalMinutes = planWorkouts.reduce((acc, x) => acc + (x.workout?.duration ?? 0), 0);
    const totalCalories = planWorkouts.reduce((acc, x) => acc + (x.workout?.caloriesBurned ?? 0), 0);
    return { totalMinutes, totalCalories };
  }, [planWorkouts]);

  const savedStats = useMemo(() => {
    const totalMinutes = savedWorkouts.reduce((acc, x) => acc + (x.workout?.duration ?? 0), 0);
    const totalCalories = savedWorkouts.reduce((acc, x) => acc + (x.workout?.caloriesBurned ?? 0), 0);
    return { totalMinutes, totalCalories };
  }, [savedWorkouts]);

  const currentStats = activeTab === "today" ? planStats : savedStats;

  const handleRemovePlan = (workoutId: number, name: string) => {
    removeFromPlan(workoutId);
    toast.info(`"${name}" removed from your plan.`);
  };

  const handleMarkDone = (workoutId: number, name: string) => {
    markDone(workoutId);
    const alreadyDone = isDone(workoutId);
    if (!alreadyDone) {
      toast.success(`"${name}" marked as done! 💪`);
    } else {
      toast.info(`"${name}" marked as not done.`);
    }
  };

  const handleRemoveSaved = (workoutId: number, name: string) => {
    removeFromSaved(workoutId);
    toast.info(`"${name}" removed from saved.`);
  };

  const handleAddSavedToPlan = (workoutId: number, name: string) => {
    addToPlan(workoutId);
    toast.success(`"${name}" added to today's plan!`);
  };

  const difficultyColor: Record<string, string> = {
    Beginner: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    Intermediate: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    Advanced: "text-red-400 bg-red-400/10 border-red-400/20",
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="mb-1 text-3xl font-black uppercase text-white sm:text-4xl">My Plan</h1>
          <p className="text-gray-400 text-sm">Cap of five lifts for today. Finish them, then load more.</p>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-4">
          {[
            {
              icon: activeTab === "today" ? "📅" : "🔖",
              label: activeTab === "today" ? "Exercises" : "Saved",
              value: activeTab === "today" ? plan.length : saved.length,
            },
            {
              icon: "⏱",
              label: "Minutes",
              value: currentStats.totalMinutes,
            },
            {
              icon: "🔥",
              label: "Calories",
              value: currentStats.totalCalories,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-gray-900 p-4 text-center transition-all"
            >
              <div className="text-2xl">{stat.icon}</div>
              <div className="mt-1 text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-8 flex gap-2 rounded-2xl border border-white/10 bg-gray-900 p-1.5">
          <button
            onClick={() => switchTab("today")}
            className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === "today" ? "text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
            style={activeTab === "today" ? { background: "linear-gradient(90deg,#28BDB4,#6388D2,#9B3DDA)" } : {}}
          >
            <span>📅</span>
            <span>Today's Plan</span>
            {plan.length > 0 && (
              <span className={`ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-xs font-bold ${activeTab === "today" ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"}`}>
                {plan.length}
              </span>
            )}
          </button>

          <button
            onClick={() => switchTab("saved")}
            className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === "saved" ? "text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
            style={activeTab === "saved" ? { background: "linear-gradient(90deg,#28BDB4,#6388D2,#9B3DDA)" } : {}}
          >
            <span>🔖</span>
            <span>Saved</span>
            {saved.length > 0 && (
              <span className={`ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-xs font-bold ${activeTab === "saved" ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"}`}>
                {saved.length}
              </span>
            )}
          </button>
        </div>

        {loading && (
          <div className="flex min-h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-teal-400" />
          </div>
        )}

        {!loading && activeTab === "today" && (
          <div>
            {planWorkouts.length === 0 ? (
              <div className="flex min-h-48 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/10 bg-gray-900/50 p-8 text-center">
                <p className="text-4xl">📋</p>
                <p className="text-lg font-bold text-white">NOTHING HERE YET</p>
                <p className="text-sm text-gray-400">Get moving — add a workout to your plan and get today moving.</p>
                <button
                  onClick={() => navigate("/")}
                  className="rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(90deg,#28BDB4,#6388D2,#9B3DDA)" }}
                >
                  Go to Workouts
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {planWorkouts.map(({ workout }) => {
                  const w = workout!;
                  const done = isDone(w.id);
                  return (
                    <div
                      key={w.id}
                      className={`flex items-center gap-4 rounded-2xl border p-4 transition-all ${done ? "border-teal-500/20 bg-teal-500/5 opacity-70" : "border-white/10 bg-gray-900"}`}
                    >
                      <img
                        src={w.image}
                        alt={w.name}
                        onClick={() => navigate(`/workout/${w.id}`)}
                        className="h-16 w-16 shrink-0 cursor-pointer rounded-xl object-cover"
                      />
                      <div className="flex flex-1 flex-col gap-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3
                            onClick={() => navigate(`/workout/${w.id}`)}
                            className={`cursor-pointer text-sm font-bold leading-tight ${done ? "text-gray-500 line-through" : "text-white hover:text-teal-400"} transition-colors`}
                          >
                            {w.name}
                          </h3>
                          <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold ${difficultyColor[w.difficulty]}`}>
                            {w.difficulty}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                          <span>⏱ {w.duration} min</span>
                          <span>🔥 {w.caloriesBurned} kcal</span>
                          <span>📋 {w.sets} sets × {w.reps}</span>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <button
                          onClick={() => handleMarkDone(w.id, w.name)}
                          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${done ? "border-teal-500/40 bg-teal-500/10 text-teal-400" : "border-white/10 bg-gray-800 text-gray-300 hover:border-teal-500/40 hover:text-teal-400"}`}
                        >
                          <span>{done ? "✓" : "○"}</span>
                          <span className="hidden sm:inline">{done ? "Done" : "Mark Done"}</span>
                        </button>
                        <button
                          onClick={() => handleRemovePlan(w.id, w.name)}
                          className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-xs font-semibold text-red-400 transition-all hover:border-red-500/40 hover:bg-red-500/10"
                        >
                          <span>✕</span>
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {!loading && activeTab === "saved" && (
          <div>
            {savedWorkouts.length === 0 ? (
              <div className="flex min-h-48 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/10 bg-gray-900/50 p-8 text-center">
                <p className="text-4xl">🔖</p>
                <p className="text-lg font-bold text-white">No saved workouts yet</p>
                <p className="text-sm text-gray-400">Save workouts from the library to find them here later.</p>
                <button
                  onClick={() => navigate("/")}
                  className="rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(90deg,#28BDB4,#6388D2,#9B3DDA)" }}
                >
                  Go to Workouts
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {savedWorkouts.map(({ workout }) => {
                  const w = workout!;
                  const alreadyInPlan = plan.some((p) => p.workoutId === w.id);
                  return (
                    <div
                      key={w.id}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-gray-900 p-4 transition-all hover:border-white/20"
                    >
                      <img
                        src={w.image}
                        alt={w.name}
                        onClick={() => navigate(`/workout/${w.id}`)}
                        className="h-16 w-16 shrink-0 cursor-pointer rounded-xl object-cover"
                      />
                      <div className="flex flex-1 flex-col gap-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3
                            onClick={() => navigate(`/workout/${w.id}`)}
                            className="cursor-pointer text-sm font-bold text-white hover:text-teal-400 transition-colors"
                          >
                            {w.name}
                          </h3>
                          <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold ${difficultyColor[w.difficulty]}`}>
                            {w.difficulty}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                          <span>⏱ {w.duration} min</span>
                          <span>🔥 {w.caloriesBurned} kcal</span>
                          <span>⭐ {w.rating}</span>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <button
                          onClick={() => handleAddSavedToPlan(w.id, w.name)}
                          disabled={alreadyInPlan}
                          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${alreadyInPlan ? "cursor-not-allowed opacity-50 border border-white/10 text-gray-500" : "text-white hover:opacity-90"}`}
                          style={!alreadyInPlan ? { background: "linear-gradient(90deg,#28BDB4,#6388D2)" } : {}}
                        >
                          <span>📅</span>
                          <span className="hidden sm:inline">{alreadyInPlan ? "In Plan" : "Add to Plan"}</span>
                        </button>
                        <button
                          onClick={() => handleRemoveSaved(w.id, w.name)}
                          className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-xs font-semibold text-red-400 transition-all hover:border-red-500/40 hover:bg-red-500/10"
                        >
                          <span>✕</span>
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
