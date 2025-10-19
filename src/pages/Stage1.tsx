import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ScoreHUD from "../components/ScoreHUD";
import BubbleInput from "../components/BubbleInput";
import { useGameStore } from "../store/useGameStore";
import { useScoreRuleStore } from "../store/useScoreRuleStore";
import { db } from "../firebaseConfig";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getStudentIdFromLocal } from "../utils/student";

type TargetKey = "교" | "량";

export default function Stage1() {
  const subscribe = useScoreRuleStore((s) => s.subscribe);
  const unsubscribe = useScoreRuleStore((s) => s.unsubscribe);
  useEffect(() => { subscribe("stage-1"); return () => unsubscribe(); }, []);

  const addScoreByType = useGameStore((s) => s.addScoreByType);

  const [filled, setFilled] = useState<Record<TargetKey, boolean>>({ 교: false, 량: false });
  const [hintOpen, setHintOpen] = useState<Record<TargetKey, boolean>>({ 교: false, 량: false });

  const circleRefs = { 교: useRef<HTMLButtonElement>(null), 량: useRef<HTMLButtonElement>(null) };
  const [openKey, setOpenKey] = useState<TargetKey | null>(null);
  const anchorRect = openKey ? circleRefs[openKey].current?.getBoundingClientRect() ?? null : null;

  async function saveProgress(nextFilled: Record<TargetKey, boolean>) {
    const studentId = getStudentIdFromLocal();
    if (!studentId) return;
    const ref = doc(collection(db, "bridge_scores"), studentId, "stages", "stage-1");
    const currentScore = useGameStore.getState().score;
    await setDoc(ref, { score: currentScore, filled: nextFilled, updatedAt: serverTimestamp() }, { merge: true });
  }

  const onHint = (key: TargetKey) => {
    if (hintOpen[key]) return;
    addScoreByType("hint");
    setHintOpen((p) => ({ ...p, [key]: true }));
  };

  const checkAnswer = async (key: TargetKey, value: string) => {
    const v = value.trim().toLowerCase();
    const ok =
      (key === "교" && (v === "교" || v === "다리")) ||
      (key === "량" && (v === "량" || v === "들보" || v === "대들보"));

    if (filled[key]) { setOpenKey(null); return; }

    if (ok) {
      const next = { ...filled, [key]: true };
      setFilled(next);
      queueMicrotask(() => addScoreByType("correct"));
      saveProgress(next);
    } else {
      const el = circleRefs[key].current;
      el?.animate(
        [{ transform: "translateX(0)" },{ transform: "translateX(-4px)" },{ transform: "translateX(4px)" },{ transform: "translateX(0)" }],
        { duration: 180, easing: "ease-in-out" }
      );
    }
    setOpenKey(null);
  };

  const allDone = filled.교 && filled.량;

  const Circle = ({ k }: { k: TargetKey }) => (
    <motion.button
      ref={circleRefs[k]}
      className={`w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-[18px] ${
        filled[k]
          ? "circle-correct"
          : "bg-[rgba(227,245,13,.2)] text-[color:var(--color-primary)] border border-[color:var(--color-primary)]"
      }`}
      whileTap={{ scale: 0.94 }}
      aria-label={`${k} 입력`}
      onClick={() => setOpenKey(k)}
    >
      {filled[k] ? k : "?"}
    </motion.button>
  );

  return (
    <main className="min-h-dvh px-5 py-8 relative">
      <ScoreHUD />
      <div className="text-center mb-3">
        <div className="text-muted text-sm font-semibold">처음 보는 한자죠?</div>
        <h1 className="text-[48px] font-extrabold leading-tight">橋梁</h1>
      </div>

      <div className="max-w-[460px] mx-auto grid gap-10">
        {/* 橋 행 */}
        <div className="grid grid-cols-[auto,1fr] items-center gap-4 pb-6 border-b border-[rgba(255,255,255,.08)]">
          <div className="text-[96px] font-extrabold leading-none">橋</div>
          <div className="flex flex-col items-end gap-3">
            <div className="w-full flex items-center justify-end gap-3">
              <span className="text-lg font-extrabold">다리</span>
              <Circle k="교" />
              <button className="hint-pill" onClick={() => onHint("교")}>
                <span>?</span><span>힌트</span>
              </button>
            </div>
            {hintOpen.교 && (
              <div className="text-[12px] text-muted pr-1">초성: <b>ㄱ</b> / 뜻: 다리</div>
            )}
          </div>
        </div>

        {/* 梁 행 */}
        <div className="grid grid-cols-[auto,1fr] items-center gap-4">
          <div className="text-[96px] font-extrabold leading-none">梁</div>
          <div className="flex flex-col items-end gap-3">
            <div className="w-full flex items-center justify-end gap-3">
              <span className="text-lg font-extrabold">(대)들보</span>
              <Circle k="량" />
              <button className="hint-pill" onClick={() => onHint("량")}>
                <span>?</span><span>힌트</span>
              </button>
            </div>
            {hintOpen.량 && (
              <div className="text-[12px] text-muted pr-1">초성: <b>ㄹ</b> / 뜻: (대)들보</div>
            )}
          </div>
        </div>
      </div>

      {/* 입력 버블 */}
      <BubbleInput
        open={!!openKey}
        anchorRect={anchorRect}
        label={openKey === "교" ? "소리" : "소리/뜻"}
        onClose={() => setOpenKey(null)}
        onSubmit={(v) => openKey && checkAnswer(openKey, v)}
      />

      {/* 하단 CTA */}
      <div className="safe-bottom fixed left-0 right-0 bottom-0 px-5 pb-4">
        <button
          disabled={!allDone}
          className="btn btn-primary w-full disabled:opacity-50"
          onClick={() => (window.location.href = "/level-1")}
          aria-disabled={!allDone}
        >
          {allDone ? "다음으로 ▶" : "두 개를 모두 채우면 다음으로"}
        </button>
      </div>
    </main>
  );
}
