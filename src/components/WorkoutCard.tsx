import { useNavigate } from "react-router-dom";
import { Workout } from "../types/workout";

const difficultyColor: Record<string, string> = {
  Beginner: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Intermediate: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Advanced: "text-red-400 bg-red-400/10 border-red-400/20",
};

interface Props {
  workout: Workout;
}

export default function WorkoutCard({ workout }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/workout/${workout.id}`)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-gray-900 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-black/40"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((mg) => (
            <span
              key={mg}
              className="rounded-full border border-white/20 bg-black/50 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm"
            >
              {mg}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg,#28BDB4,#6388D2,#9B3DDA)", WebkitBackgroundClip: "text" }}>
            {workout.name}
          </h3>
          <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold ${difficultyColor[workout.difficulty]}`}>
            {workout.difficulty}
          </span>
        </div>

        <p className="mb-3 text-xs text-gray-400 line-clamp-2">{workout.description}</p>

        <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span>⏱</span>
            <span>{workout.duration} min</span>
          </span>
          <span className="flex items-center gap-1">
            <span>🔥</span>
            <span>{workout.caloriesBurned} kcal</span>
          </span>
          <span className="flex items-center gap-1">
            <span>⭐</span>
            <span>{workout.rating}</span>
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
          <span>🏋️</span>
          <span>{workout.equipment}</span>
        </div>
      </div>
    </div>
  );
}
