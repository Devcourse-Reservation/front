import { useState } from 'react'
import { Container, Button, Typography, Box } from '@mui/material'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

export default function Login() {
  const [error, setError] = useState<string | null>(null)

  // ✅ GET 요청을 보내고 OAuth 페이지로 이동
  const handleSocialLogin = (provider: 'google' | 'kakao' | 'naver') => {
    try {
      setError(null)
      // ✅ 해당 소셜 로그인 페이지로 이동
      window.location.href = `${API_BASE_URL}/auth/${provider}`
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인 중 오류 발생')
    }
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#002597' }}>
          로그인
        </Typography>
        {error && <Typography color="error">{error}</Typography>}

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, backgroundColor: '#1871FF' }}
          onClick={() => handleSocialLogin('google')} // ✅ 경로 자동 변경
        >
          Google 로그인
        </Button>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#FEE500', color: '#000' }}
          onClick={() => handleSocialLogin('kakao')} // ✅ 경로 자동 변경
        >
          Kakao 로그인
        </Button>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#1EC800', color: '#fff' }}
          onClick={() => handleSocialLogin('naver')} // ✅ 경로 자동 변경
        >
          Naver 로그인
        </Button>
      </Box>
    </Container>
  )
}
