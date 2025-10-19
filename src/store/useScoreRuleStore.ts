import { create } from "zustand";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { ScoreRule } from "../types/score";

interface RuleState {
  stageId: string | null;
  rule: ScoreRule | null;
  loading: boolean;
  error: string | null;
  _unsub?: () => void;

  subscribe: (stageId: string) => void;
  unsubscribe: () => void;
}

export const useScoreRuleStore = create<RuleState>((set, get) => ({
  stageId: null,
  rule: null,
  loading: false,
  error: null,
  _unsub: undefined,

  subscribe: (stageId: string) => {
    get()._unsub?.();
    set({ stageId, loading: true, error: null });

    const ref = doc(db, "score_rules", stageId);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        set({ rule: (snap.data() as ScoreRule) ?? {}, loading: false });
      },
      (err) => set({ error: err.message, loading: false })
    );
    set({ _unsub: unsub });
  },

  unsubscribe: () => {
    get()._unsub?.();
    set({ _unsub: undefined, stageId: null, rule: null });
  },
}));
