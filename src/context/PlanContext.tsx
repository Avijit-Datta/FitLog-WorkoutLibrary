import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { PlanEntry, SavedEntry } from "../types/workout";

interface PlanContextType {
  plan: PlanEntry[];
  saved: SavedEntry[];
  addToPlan: (workoutId: number) => void;
  removeFromPlan: (workoutId: number) => void;
  markDone: (workoutId: number) => void;
  addToSaved: (workoutId: number) => void;
  removeFromSaved: (workoutId: number) => void;
  isInPlan: (workoutId: number) => boolean;
  isInSaved: (workoutId: number) => boolean;
  isDone: (workoutId: number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanEntry[]>(() => {
    try {
      const stored = localStorage.getItem("fitlog_plan");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [saved, setSaved] = useState<SavedEntry[]>(() => {
    try {
      const stored = localStorage.getItem("fitlog_saved");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workoutId: number) => {
    setPlan((prev) => {
      if (prev.find((e) => e.workoutId === workoutId)) return prev;
      return [...prev, { workoutId, addedAt: new Date().toISOString(), done: false }];
    });
  };

  const removeFromPlan = (workoutId: number) => {
    setPlan((prev) => prev.filter((e) => e.workoutId !== workoutId));
  };

  const markDone = (workoutId: number) => {
    setPlan((prev) =>
      prev.map((e) => (e.workoutId === workoutId ? { ...e, done: !e.done } : e))
    );
  };

  const addToSaved = (workoutId: number) => {
    setSaved((prev) => {
      if (prev.find((e) => e.workoutId === workoutId)) return prev;
      return [...prev, { workoutId, savedAt: new Date().toISOString() }];
    });
  };

  const removeFromSaved = (workoutId: number) => {
    setSaved((prev) => prev.filter((e) => e.workoutId !== workoutId));
  };

  const isInPlan = (workoutId: number) => plan.some((e) => e.workoutId === workoutId);
  const isInSaved = (workoutId: number) => saved.some((e) => e.workoutId === workoutId);
  const isDone = (workoutId: number) =>
    plan.find((e) => e.workoutId === workoutId)?.done ?? false;

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        markDone,
        addToSaved,
        removeFromSaved,
        isInPlan,
        isInSaved,
        isDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}
