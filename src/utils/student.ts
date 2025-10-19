export function getStudentIdFromLocal(): string | null {
  try {
    const raw = localStorage.getItem("bridge_student");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // 문서 id: "학번_이름" 형태 (Register에서 저장했던 값 사용)
    if (parsed?.my?.id && parsed?.my?.name) {
      return `${parsed.my.id}_${parsed.my.name}`;
    }
    return null;
  } catch {
    return null;
  }
}
