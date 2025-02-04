import { logout } from "./auth";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  let response = await fetch(url, {
    ...options,
    credentials: "include", // ✅ 쿠키 포함
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    console.log("🔄 AccessToken 만료! 새로 발급 중...");

    const refreshResponse = await fetch("http://localhost:3000/auth/refresh", {
      method: "POST",
      credentials: "include", // ✅ 쿠키 포함 (Refresh Token 사용)
    });

    if (refreshResponse.ok) {
      response = await fetch(url, {
        ...options,
        credentials: "include",
      });
    } else {
      logout(); // 리프레시 토큰도 만료되면 로그아웃
    }
  }

  return response.json();
};
