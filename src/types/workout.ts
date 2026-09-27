export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export type PlanEntry = {
  workoutId: number;
  addedAt: string;
  done: boolean;
};

export type SavedEntry = {
  workoutId: number;
  savedAt: string;
};
