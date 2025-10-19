import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const nav = useNavigate();
  useEffect(() => { console.log("[Intro] UX-guided mobile UI"); }, []);

  return (
    <main className="min-h-dvh flex items-center justify-center px-4 py-8 text-center">
      <div className="container">
        {/* 로고 (반응형 크기) */}
        <div className="mb-4">
          <img src="/logo.png" alt="교량 로고" className="logo-img" />
        </div>

        {/* 타이틀/부제: 계층 강화 (크기/간격 조정) */}
        <h1 className="text-[28px] sm:text-3xl font-extrabold balance text-[color:var(--color-primary)] mb-6">
          교량 탐험을 시작합니다
        </h1>
        <p className="text-muted balance mb-14">
          문제를 풀며 점수를 모아보자!
        </p>

        {/* 안내 카드 (왼쪽 정렬 유지 + 중앙 배치) */}
        <section className="card text-left mb-16">
          <h2 className="text-[18px] font-bold mb-8 text-[color:var(--color-primary)]">플레이 방법</h2>
          <ul className="ul-bridge pretty">
            <li>교량 사진과 구조를 보고 문제를 풀어요.</li>
            <li>정답이면 점수가 오르고, 오답이면 감점될 수 있어요.</li>
            <li>힌트는 언제든 볼 수 있어요 (선택 시 감점 규칙 적용 가능).</li>
          </ul>
        </section>

        {/* 액션 그룹: CTA를 가장 먼저, 보조는 간격 12~16px 유지 */}
        <div className="flex flex-col gap-3 items-stretch safe-bottom">
          <button
            className="btn btn-primary btn-cta w-full"
            onClick={() => nav("/register")}   // ✅ "/stage-1"가 아니라 "/register"
          >
            🚀 시작하기
          </button>


          <div className="flex gap-3">
            <button className="btn btn-secondary flex-1" aria-label="학습지 안내 보기">학습지 안내</button>
            <button className="btn btn-secondary flex-1" aria-label="설정 열기">설정</button>
          </div>
        </div>
      </div>
    </main>
  );
}
