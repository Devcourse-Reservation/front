import { Typography } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthCallback() {
  const navigate = useNavigate()
  const isExecuted = useRef(false) // ✅ useEffect 실행 여부 체크

  useEffect(() => {
    
    const checkAuth = async () => {
      try {
        if (isExecuted.current) return // ✅ 두 번째 실행 방지
          isExecuted.current = true // ✅ 첫 번째 실행 후 true로 설정
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

  return <Typography>로그인 중입니다...</Typography>
}
