// 📌 src/components/AuthStatus.tsx
import { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function AuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      // 토큰이 있으면 로그인 상태로 간주
      setIsLoggedIn(true)

      // 📌 사용자 이메일 확인 (백엔드에서 토큰을 디코딩해야 가능)
      try {
        const payload = JSON.parse(atob(token.split('.')[1])) // JWT payload 디코딩
        setUserEmail(payload.email)
      } catch (error) {
        console.error('토큰 디코딩 실패:', error)
        setUserEmail(null)
      }
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token') // 토큰 삭제
    setIsLoggedIn(false)
    setUserEmail(null)
    navigate('/login') // 로그인 페이지로 이동
  }

  return (
    <Box sx={{ textAlign: 'right', p: 2 }}>
      {isLoggedIn ? (
        <>
          <Typography
            variant="body1"
            sx={{ fontWeight: 'bold', color: '#1871FF' }}
          >
            로그인 중: {userEmail || '사용자'}
          </Typography>
          <Button onClick={handleLogout} variant="contained" sx={{ mt: 1 }}>
            로그아웃
          </Button>
        </>
      ) : (
        <Button onClick={() => navigate('/login')} variant="contained">
          로그인
        </Button>
      )}
    </Box>
  )
}
