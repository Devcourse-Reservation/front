const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

// ✅ 로그인 요청 시 쿠키 자동 저장

// ✅ 로그아웃 요청 (쿠키 삭제)
export const logout = async () => {
  await fetch(`${BACKEND_URL}/auth/logout`, {
    method: "POST",
    credentials: "include", // ✅ 쿠키 포함
  });

  window.location.href = "/"; // 홈으로 이동
};
