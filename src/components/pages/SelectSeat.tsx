import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Container,
} from '@mui/material'

const API_URL = 'http://localhost:3000/seats' // ✅ 백엔드 API 경로

export default function SelectSeat() {
  const location = useLocation()
  const navigate = useNavigate()
  const [seats, setSeats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null)

  const flightData = location.state // 예약할 항공편 데이터

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setError(null)

        if (!flightData || !flightData.selectedDepartureFlight) {
          throw new Error('예약할 항공편 데이터가 없습니다.')
        }

        const flightId = flightData.selectedDepartureFlight.id
        const token = localStorage.getItem('token')
        if (!token) throw new Error('인증 토큰이 없습니다.')

        console.log('📌 좌석 조회 요청 flightId:', flightId) // ✅ flightId 확인

        const response = await fetch(`${API_URL}/${flightId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error(
            `좌석 정보를 불러올 수 없습니다. (HTTP ${response.status})`
          )
        }

        const data = await response.json()
        console.log('📌 조회된 좌석 데이터:', data) // ✅ 좌석 데이터 확인
        setSeats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류 발생')
      } finally {
        setLoading(false)
      }
    }

    fetchSeats()
  }, [flightData])

  const handleSeatSelect = (seatId: number) => {
    setSelectedSeat(seatId)

    // ✅ 선택한 `seatId`를 포함하여 예약 확정 페이지로 이동
    navigate('/reservation-confirm', {
      state: {
        ...flightData,
        selectedSeatId: seatId,
      },
    })
  }

  if (loading)
    return <CircularProgress sx={{ display: 'block', margin: '20vh auto' }} />
  if (error)
    return (
      <Typography color="error" sx={{ textAlign: 'center', mt: 5 }}>
        {error}
      </Typography>
    )

  return (
    <Container>
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#002597' }}>
          좌석 선택 ✈️
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
            mt: 4,
          }}
        >
          {seats.length > 0 ? (
            seats.map((seat) => (
              <Button
                key={seat.id}
                variant={selectedSeat === seat.id ? 'contained' : 'outlined'}
                onClick={() => handleSeatSelect(seat.id)}
                sx={{ minWidth: 100 }}
              >
                {seat.seatNumber} ({seat.class})
              </Button>
            ))
          ) : (
            <Typography>사용 가능한 좌석이 없습니다.</Typography>
          )}
        </Box>
      </Box>
    </Container>
  )
}
