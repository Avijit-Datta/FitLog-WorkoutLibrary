import { useParams, useNavigate } from "react-router-dom";
import { useWorkout } from "../hooks/useWorkouts";
import { usePlan } from "../context/PlanContext";
import { toast } from "react-toastify";

const difficultyColor: Record<string, string> = {
  Beginner: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Intermediate: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Advanced: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function WorkoutDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { workout, loading, error } = useWorkout(Number(id));
  const { isInPlan, isInSaved, addToPlan, removeFromPlan, addToSaved, removeFromSaved } = usePlan();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-teal-400" />
          <p className="text-gray-400">Loading workout...</p>
        </div>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-950">
        <p className="text-5xl">🏋️</p>
        <p className="text-xl font-bold text-white">Workout not found</p>
        <button
          onClick={() => navigate("/")}
          className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white"
          style={{ background: "linear-gradient(90deg,#28BDB4,#6388D2,#9B3DDA)" }}
        >
          Back to Library
        </button>
      </div>
    );
  }

  const inPlan = isInPlan(workout.id);
  const inSaved = isInSaved(workout.id);

  const handlePlan = () => {
    if (inPlan) {
      removeFromPlan(workout.id);
      toast.info(`"${workout.name}" removed from your plan.`);
    } else {
      addToPlan(workout.id);
      toast.success(`"${workout.name}" added to today's plan!`);
    }
  };

  const handleSaved = () => {
    if (inSaved) {
      removeFromSaved(workout.id);
      toast.info(`"${workout.name}" removed from saved.`);
    } else {
      addToSaved(workout.id);
      toast.success(`"${workout.name}" saved for later!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <span>←</span>
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-72 w-full object-cover sm:h-96 lg:h-full lg:min-h-[500px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col">
            <div className="mb-2 flex flex-wrap gap-2">
              {workout.muscleGroups.map((mg) => (
                <span
                  key={mg}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300"
                >
                  {mg}
                </span>
              ))}
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${difficultyColor[workout.difficulty]}`}>
                {workout.difficulty}
              </span>
            </div>

            <h1 className="mb-3 text-3xl font-black uppercase text-white sm:text-4xl">
              {workout.name}
            </h1>

            <p className="mb-6 text-gray-400 leading-relaxed">{workout.description}</p>

            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: "⏱", label: "Duration", value: `${workout.duration} min` },
                { icon: "🔥", label: "Calories", value: `${workout.caloriesBurned} kcal` },
                { icon: "📋", label: "Sets", value: `${workout.sets} sets` },
                { icon: "🔁", label: "Reps", value: workout.reps },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-gray-900 p-3 text-center">
                  <div className="text-xl">{stat.icon}</div>
                  <div className="mt-1 text-sm font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mb-6 rounded-xl border border-white/10 bg-gray-900 p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-300">Key Specs</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Equipment</span>
                  <span className="font-medium text-white">{workout.equipment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Rating</span>
                  <span className="font-medium text-yellow-400">⭐ {workout.rating} / 5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Difficulty</span>
                  <span className={`font-semibold ${difficultyColor[workout.difficulty].split(" ")[0]}`}>
                    {workout.difficulty}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="mb-3 text-base font-bold uppercase tracking-wider text-gray-300">Instructions</h2>
              <ol className="space-y-2">
                {workout.instructions.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-400">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#28BDB4,#9B3DDA)" }}>
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-auto flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handlePlan}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                style={inPlan ? { background: "linear-gradient(90deg,#9B3DDA,#6388D2)" } : { background: "linear-gradient(90deg,#28BDB4,#6388D2,#9B3DDA)" }}
              >
                <span>{inPlan ? "✓" : "📅"}</span>
                {inPlan ? "Remove from Plan" : "Add to Today's Plan"}
              </button>

              <button
                onClick={handleSaved}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-bold transition-all hover:scale-[1.02] ${inSaved ? "border-violet-500/40 bg-violet-500/10 text-violet-400" : "border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:text-white"}`}
              >
                <span>{inSaved ? "🔖" : "🔖"}</span>
                {inSaved ? "Unsave" : "Save for Later"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
