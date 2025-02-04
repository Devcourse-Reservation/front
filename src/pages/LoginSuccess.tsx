import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/me", {
          method: "GET",
          credentials: "include", // ✅ httpOnly 쿠키 포함
        });
        if (response.ok) {
          console.log("✅ 로그인 성공! 홈으로 이동");
          alert("로그인 성공")
          navigate("/"); // 홈으로 이동
        } else {
          console.log("⚠️ 인증 실패, 로그인 페이지로 이동");
          navigate("/login"); // 로그인 실패 시 로그인 페이지로 이동
        }
      } catch (error) {
        console.error("🚨 인증 확인 중 오류 발생:", error);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  return <div>로그인 확인 중...</div>;
};

export default LoginSuccess;
