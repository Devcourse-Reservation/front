
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import kakaoLogo from "../assets/kakao_logo.png";
import googleLogo from "../assets/google_logo.png";
import naverLogo from "../assets/naver_logo.png";

function Login() {
  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

  const handleKakaoLogin = () => {
    window.location.href = `${backendURL}/auth/kakao`;
  };

  const handleGoogleLogin = () => {
    window.location.href = `${backendURL}/auth/google`;
  };

  const handleNaverLogin = () => {
    window.location.href = `${backendURL}/auth/naver`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 8,
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        소셜 로그인
      </Typography>

      {/* 카카오 로그인 */}
      <Button
        variant="outlined"
        onClick={handleKakaoLogin}
        sx={{
          mb: 2,
          width: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={kakaoLogo}
          alt="카카오 로그인"
          style={{ width: 24, height: 24, marginRight: 8 }}
        />
        카카오로 로그인
      </Button>

      {/* 구글 로그인 */}
      <Button
        variant="outlined"
        onClick={handleGoogleLogin}
        sx={{
          mb: 2,
          width: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={googleLogo}
          alt="구글 로그인"
          style={{ width: 24, height: 24, marginRight: 8 }}
        />
        구글로 로그인
      </Button>

      {/* 네이버 로그인 */}
      <Button
        variant="outlined"
        onClick={handleNaverLogin}
        sx={{
          width: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={naverLogo}
          alt="네이버 로그인"
          style={{ width: 24, height: 24, marginRight: 8 }}
        />
        네이버로 로그인
      </Button>
    </Box>
  );
}

export default Login;
