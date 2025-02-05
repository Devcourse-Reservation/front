// 📌 src/pages/Register.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from '@mui/material'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleRegister = async () => {
    try {
      setError(null)

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      if (!response.ok) {
        throw new Error('회원가입 실패: 이메일이 이미 존재하거나 오류 발생')
      }

      navigate('/login') // 회원가입 성공 후 로그인 페이지로 이동
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입 중 오류 발생')
    }
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#002597' }}>
          회원가입
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          fullWidth
          label="이름"
          variant="outlined"
          sx={{ mt: 3 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="이메일"
          variant="outlined"
          sx={{ mt: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="비밀번호"
          variant="outlined"
          type="password"
          sx={{ mt: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, backgroundColor: '#1871FF' }}
          onClick={handleRegister}
        >
          회원가입
        </Button>
        <Button sx={{ mt: 2 }} onClick={() => navigate('/login')}>
          로그인
        </Button>
      </Box>
    </Container>
  )
}
