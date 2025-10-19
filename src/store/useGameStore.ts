import { create } from "zustand";
import { useScoreRuleStore } from "./useScoreRuleStore";

interface GameState {
  score: number;
  addScoreByType: (type: "correct" | "wrong" | "hint" | "combo") => void;
  resetScore: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  addScoreByType: (type) => {
    const rule = useScoreRuleStore.getState().rule;
    const delta = rule?.[type] ?? 0; // 규칙 문서 없을 땐 0
    set((s) => ({ score: s.score + delta }));
  },
  resetScore: () => set({ score: 0 }),
}));
