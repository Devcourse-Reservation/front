// 📌 src/pages/ReservationList.tsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography, Container, Stack, Paper } from '@mui/material'

const API_URL = 'http://localhost:3000/tickets'

interface Reservation {
  id: number
  reservationNumber: string
  departure: string
  arrival: string
  date: string
}

export default function ReservationList() {
  const navigate = useNavigate()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        //const token = localStorage.getItem('token')
        //if (!token) throw new Error('인증 토큰이 없습니다.')

        //console.log('📌 보낼 Access Token:', token) // 🔥 콘솔에 토큰 확인

        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(
            `예약 정보를 불러올 수 없습니다. (HTTP ${response.status}) ${errorText}`
          )
        }
        const data = await response.json()
        console.log('📌 받은 예약 데이터:', data) // ✅ 응답 데이터 확인
        setReservations(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류 발생')
      }
    }

    fetchReservations()
  }, [])

  if (error) return <Typography color="error">{error}</Typography>

  return (
    <Container>
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#002597' }}>
          예약 목록 ✈️
        </Typography>
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <Stack
              key={reservation.id}
              direction="row"
              spacing={2}
              sx={{ my: 3 }}
            >
              <Paper
                elevation={3}
                sx={{
                  width: '100%',
                  padding: 3,
                  borderRadius: 5,
                  textAlign: 'left',
                }}
              >
                <Typography variant="h6">
                  예약 번호: <strong>{reservation.reservationNumber}</strong>
                </Typography>
                <Typography variant="h5">
                  {reservation.departure} → {reservation.arrival}
                </Typography>
                <Typography variant="h6" color="gray">
                  {new Date(reservation.date).toLocaleString()}
                </Typography>
                <Box sx={{ textAlign: 'right', mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      navigate(`/reservation-detail/${reservation.id}`)
                    }
                  >
                    예약 상세
                  </Button>
                </Box>
              </Paper>
            </Stack>
          ))
        ) : (
          <Typography sx={{ mt: 5 }}>예약된 항공편이 없습니다.</Typography>
        )}
      </Box>
    </Container>
  )
}
