import { useState, useEffect } from "react";
import { Workout } from "../types/workout";

const BASE = "https://api.api-store.workers.dev/api/fitlog";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(BASE)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch workouts");
        return res.json();
      })
      .then((data: Workout[]) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { workouts, loading, error };
}

export function useWorkout(id: number) {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${BASE}/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Workout not found");
        return res.json();
      })
      .then((data: Workout) => {
        setWorkout(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return { workout, loading, error };
}
