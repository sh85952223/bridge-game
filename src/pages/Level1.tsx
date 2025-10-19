import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Level1() {
  const nav = useNavigate();
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => {
    console.log("[Level1] 더미 페이지 로드");
  }, []);

  return (
    <main className="min-h-dvh p-6">
      <h2 className="text-xl font-semibold mb-2">LEVEL 1</h2>
      <p className="mb-4">이 그림은 어떤 유형의 교량일까요?</p>

      {/* 임시 보기 4개 */}
      <div className="grid grid-cols-2 gap-3">
        {["단순교", "사장교", "현수교", "아치교"].map((opt, idx) => (
          <button
            key={idx}
            className={`rounded-2xl border px-3 py-3 text-left ${
              picked === idx ? "border-primary" : "border-white/10"
            }`}
            onClick={() => setPicked(idx)}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="h-10 mt-4 text-sm text-muted">
        {picked !== null ? `선택: ${picked + 1}번` : ""}
      </div>

      <div className="fixed bottom-6 left-6 right-6">
        <button
          className="w-full rounded-full px-6 py-3 bg-primary text-white shadow-lg"
          onClick={() => nav("/intro")}
        >
          인트로로 돌아가기
        </button>
      </div>
    </main>
  );
}
