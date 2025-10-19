import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useGameStore } from "../store/useGameStore";

export default function Register() {
  const nav = useNavigate();
  const resetScore = useGameStore((s) => s.resetScore);

  const [myId, setMyId] = useState("");
  const [myName, setMyName] = useState("");
  const [friendId, setFriendId] = useState("");
  const [friendName, setFriendName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!myId.trim() || !myName.trim()) {
      alert("본인의 학번과 이름을 입력해주세요!");
      return;
    }

    setLoading(true);
    try {
      const data = {
        id: myId.trim(),
        name: myName.trim(),
        friendId: friendId.trim(),
        friendName: friendName.trim(),
        createdAt: serverTimestamp(),
      };

      // 학생 정보
      const studentDocId = `${data.id}_${data.name}`;
      const ref = doc(collection(db, "bridge_students"), studentDocId);
      await setDoc(ref, data);

      // 로컬 캐시
      localStorage.setItem(
        "bridge_student",
        JSON.stringify({ my: { id: data.id, name: data.name }, friend: { id: data.friendId, name: data.friendName } })
      );

      // ✅ 점수 초기화 + stage-1 진행 문서도 초기화
      resetScore();
      const stageRef = doc(collection(db, "bridge_scores"), studentDocId, "stages", "stage-1");
      await setDoc(
        stageRef,
        { score: 0, filled: { 교: false, 량: false }, updatedAt: serverTimestamp() },
        { merge: true }
      );

      nav("/stage-1");
    } catch (e) {
      console.error(e);
      alert("저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-dvh flex items-center justify-center px-4 py-10">
      <div className="container">
        <div className="text-center mb-6">
          <h1 className="text-[22px] font-extrabold text-[color:var(--color-primary)]">정보 입력</h1>
          <p className="text-muted text-sm mt-1">학번/이름은 점수 연동 및 결과 전송에 사용돼요.</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="form-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold">내 정보</span>
            <span className="chip">필수</span>
          </div>

          <div className="field mb-3">
            <input className="field-input" placeholder=" " type="text" inputMode="numeric" autoComplete="off"
              value={myId} onChange={(e) => setMyId(e.target.value)} />
            <label className="field-label">나의 학번</label>
          </div>

          <div className="field mb-6">
            <input className="field-input" placeholder=" " type="text" autoComplete="off"
              value={myName} onChange={(e) => setMyName(e.target.value)} />
            <label className="field-label">나의 이름</label>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold">친구 정보</span>
            <span className="chip">선택</span>
          </div>

          <div className="field mb-3">
            <input className="field-input" placeholder=" " type="text" inputMode="numeric" autoComplete="off"
              value={friendId} onChange={(e) => setFriendId(e.target.value)} />
            <label className="field-label">친구의 학번 (선택)</label>
          </div>

          <div className="field">
            <input className="field-input" placeholder=" " type="text" autoComplete="off"
              value={friendName} onChange={(e) => setFriendName(e.target.value)} />
            <label className="field-label">친구의 이름 (선택)</label>
          </div>
        </form>

        <div className="safe-bottom mt-6 flex flex-col gap-3">
          <button type="button" className="btn btn-primary btn-cta w-full" disabled={loading} onClick={handleSubmit}>
            {loading ? "저장 중..." : "시작하기 🚀"}
          </button>

          <div className="flex gap-3">
            <button type="button" className="btn btn-secondary flex-1" onClick={() => nav(-1)}>돌아가기</button>
            <button type="button" className="btn btn-secondary flex-1" onClick={() => { setMyId(""); setMyName(""); setFriendId(""); setFriendName(""); }}>
              초기화
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
