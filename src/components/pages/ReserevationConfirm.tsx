import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material'

const API_URL = 'http://localhost:3000/tickets' // ✅ API URL 수정

export default function ReservationConfirm() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const flightData = location.state // ✅ 예약할 항공편 정보 가져오기
  console.log('📌 예약할 항공편 데이터:', flightData) // 🔥 콘솔에서 확인

  const handleReservation = async () => {
    try {
      setLoading(true)
      setError(null)
      const flightId = flightData.selectedDepartureFlight.id
      const Seats = await fetch(`${API_URL}/${flightId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      console.log(Seats);

      // ✅ POST 요청에 맞는 데이터 구조로 변환
      const requestBody = {
        flightId: flightId, // ✅ 선택한 항공편 ID
        seatIds: [2], // ⚠️ 현재 좌석 ID는 하드코딩, 실제로는 선택해야 함
        ticketType: 'round-trip', // ⚠️ 현재 편도 기준, 왕복이면 "round-trip"
      }

      console.log('📌 예약 요청 데이터:', requestBody) // 🔥 콘솔에서 확인

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`예약 생성 실패 (HTTP ${response.status}) ${errorText}`)
      }

      const data = await response.json()
      console.log('📌 예약 완료:', data) // ✅ 성공한 예약 데이터 확인

      alert('예약이 성공적으로 완료되었습니다!')
      navigate('/reservation-list') // ✅ 예약 목록 페이지로 이동
    } catch (err) {
      setError(err instanceof Error ? err.message : '예약 중 오류 발생')
      alert(
        `예약 생성 중 오류 발생: ${err instanceof Error ? err.message : ''}`
      )
    } finally {
      setLoading(false)
    }
  }

  if (!flightData)
    return (
      <Typography sx={{ textAlign: 'center', mt: 5 }}>
        예약할 항공편 정보가 없습니다.
      </Typography>
    )

  return (
    <Container>
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#002597' }}>
          예약 확정 ✈️
        </Typography>
        <Typography variant="h5" sx={{ mt: 3 }}>
          {flightData.selectedDepartureFlight.airline} -{' '}
          {flightData.selectedDepartureFlight.flightName}
        </Typography>
        <Typography variant="h6">
          출발: {flightData.selectedDepartureFlight.departureTime}
        </Typography>
        <Typography variant="h6">
          도착: {flightData.selectedDepartureFlight.arrivalTime}
        </Typography>

        {loading ? (
          <CircularProgress sx={{ mt: 3 }} />
        ) : (
          <Button
            variant="contained"
            sx={{ mt: 3, backgroundColor: '#1871FF' }}
            onClick={handleReservation}
          >
            예약 확정하기
          </Button>
        )}

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  )
}
