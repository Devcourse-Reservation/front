import React from "react";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include", // ✅ 쿠키 포함
      });

      // ✅ 로그인 페이지로 이동
      window.location.href = "/";
    } catch (error) {
      console.error("🚨 로그아웃 실패:", error);
    }
  };

  return (
    <Button
      variant="text"
      size="large"
      sx={{ fontSize: 22, color: "#1E2A3C" }}
      onClick={handleLogout}
    >
      로그아웃
    </Button>
  );
};

export default LogoutButton;
