import { Typography } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthCallback() {
  const navigate = useNavigate()
  const isExecuted = useRef(false) // ✅ useEffect 실행 여부 체크

  useEffect(() => {
    if (isExecuted.current) return // ✅ 두 번째 실행 방지
    isExecuted.current = true // ✅ 첫 번째 실행 후 true로 설정

    setTimeout(() => {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('token')

      console.log('🔍 받은 Access Token:', token) // ✅ 콘솔 확인

      if (token) {
        localStorage.setItem('token', token) // ✅ 토큰 저장
        navigate('/reservation-list') // ✅ 로그인 성공 시 예약 목록 페이지로 이동
      } else {
        console.error('❌ OAuth 로그인 실패: 토큰 없음')
        navigate('/login') // ✅ 로그인 실패 시 다시 로그인 페이지로
      }
    }, 500) // 0.5초 후 실행
  }, [navigate])

  return <Typography>로그인 중입니다...</Typography>
}
