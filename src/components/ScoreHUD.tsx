import { useGameStore } from "../store/useGameStore";

export default function ScoreHUD() {
  const score = useGameStore((s) => s.score);

  return (
    <div
      className="fixed top-3 right-3 z-40 px-3 py-2 rounded-xl text-sm font-bold"
      style={{
        background: "rgba(255,255,255,.08)",
        border: "1px solid rgba(255,255,255,.15)",
        backdropFilter: "blur(6px)",
      }}
      aria-live="polite"
    >
      점수 <span className="ml-1 text-[color:var(--color-primary)]">{score}</span>
    </div>
  );
}
