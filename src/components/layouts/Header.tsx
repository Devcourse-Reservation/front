import { Box, Typography, Button } from '@mui/material'
import InfoButton from '../Buttons/InfoButton'
import ListButton from '../Buttons/ListButton'
import PrepareButton from '../Buttons/PrepareButton'
import BackgroundLetterAvatars from '../Buttons/avatar'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Header = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      setIsLoggedIn(true)
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
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUserEmail(null)
    navigate('/login')
  }

  const handleClick = () => {
    navigate('/')
  }

  return (
    <div
      className="header-container"
      style={{
        margin: '7vh 20vh 3vh 20vh',
      }}
    >
      <header>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center', // 요소 정렬 추가
          }}
        >
          {/* 로고 */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: 45,
                fontWeight: 'bold',
                color: '#1E2A3C',
                textShadow: '0px 3px 3px gray',
                cursor: 'pointer',
              }}
              onClick={handleClick}
            >
              ProAliance
            </Typography>
          </Box>

          {/* 네비게이션 버튼 */}
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
            <InfoButton />
            <ListButton />
            <PrepareButton />
          </Box>
          {/* 관리자 인증 버튼 */}
          <Button variant="contained" color="primary" onClick={() => navigate('/admin-verification')}>
            관리자 인증하기
          </Button>

          {/* 로그인 상태 & 로그아웃 버튼 */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {isLoggedIn ? (
              <>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 'bold', color: '#1871FF' }}
                >
                  {userEmail}
                </Typography>
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  sx={{ backgroundColor: '#FF3B3B' }}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/login')} variant="contained">
                로그인
              </Button>
            )}

            {/* 기존 아바타 버튼 */}
            <BackgroundLetterAvatars />
          </Box>
        </Box>
      </header>
    </div>
  )
}

export default Header
