import {
  Box,
  Container,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function ReadyPage() {
  const [position, setPosition] = useState<number | null>(null)
  const [progress, setProgress] = React.useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5001') // 백엔드 WebSocket 주소

    socket.onopen = () => {
      console.log('WebSocket 연결 성공👏')
      socket.send(JSON.stringify({ action: 'requestQueueStatus' }))
    }

    socket.onmessage = (event) => {
      try {
        if (!event.data) {
          socket.send(JSON.stringify({ action: 'requestQueueStatus' }))
          return
        }

        const data = JSON.parse(event.data)

        if ('position' in data) {
          setPosition(data.position)
        }
        if ('progress' in data) {
          setProgress(data.progress)
        }
      } catch (err) {
        setError('대기열 정보를 불러오는 중 오류가 발생했습니다.')
      }
    }

    socket.onerror = (error) => {
      console.error('WebSocket 오류: ', error)
      setError('WebSocket 연결 실패')
    }

    socket.onclose = () => {
      console.log('WebSocket 연결 종료')
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }
    return () => {
      socket.close()
    }
  }, [])

  return (
    <Container
      sx={{
        backgroundImage: `url('/readypage.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Container
        sx={{
          padding: '10vw',
          width: '100%',
          height: '100%',
          justifyItems: 'center',
        }}
      >
        <Paper
          sx={{
            width: '30vw',
            height: '30vw',
            justifyContent: 'center',
            padding: '2vw',
          }}
        >
          <Container
            sx={{
              width: '100%',
              height: '100%',
              justifyItems: 'center',
            }}
          >
            <Container sx={{ justifyItems: 'center', margin: '5vw' }}>
              <Box sx={{ margin: '2vw' }}>
                <Typography variant="h3" color="#929292" fontWeight={'bold'}>
                  나의 대기순서
                </Typography>
              </Box>
              <Box className="Waiting-Number">
                <Typography variant="h3" color="#1E2A3C" fontWeight={'bold'}>
                  {position !== null
                    ? position
                    : '대기 번호를 받고 있습니다...'}
                </Typography>
              </Box>
            </Container>
            <Container sx={{ marginBottom: '2vw' }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: '70px',
                  width: '100%',
                  borderRadius: '50px',
                  backgroundColor: 'lightgrey',
                }}
              />
            </Container>

            {error && (
              <Typography color="error" sx={{ marginBottom: '1vw' }}>
                {error}
              </Typography>
            )}

            <Container>
              <Typography color="grey">
                ! 새로고침을 하거나 재접속 하시면, 대기열이 초기화되어
                접속시간이 길어집니다.
              </Typography>
            </Container>
          </Container>
        </Paper>
      </Container>
    </Container>
  )
}
