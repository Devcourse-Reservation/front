// src/Buttons/LoginButton.tsx
import * as React from "react";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가

export default function LoginButton() {
  const navigate = useNavigate(); // React Router 훅 사용

  const handleLoginClick = () => {
    navigate("/login"); // 로그인 버튼 클릭 시 /login 페이지로 이동
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="text"
        size="large"
        sx={{
          fontSize: 22,
          color: "#1E2A3C",
        }}
        onClick={handleLoginClick} // 클릭 이벤트 추가
      >
        로그인
      </Button>
    </Stack>
  );
}
