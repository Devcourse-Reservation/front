import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material'

const API_URL = 'http://localhost:3000/tickets' // ✅ 백엔드 API 경로

export default function ReservationConfirm() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const flightData = location.state // 예약할 항공편 정보 가져오기
  console.log('📌 예약할 항공편 데이터:', flightData)

  const handleReservation = async () => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem('token')
      if (!token) throw new Error('인증 토큰이 없습니다.')

      if (
        !flightData ||
        !flightData.selectedDepartureFlight ||
        !flightData.selectedSeatId
      ) {
        throw new Error('예약할 항공편 또는 좌석 데이터가 없습니다.')
      }

      console.log('📌 선택한 좌석 ID:', flightData.selectedSeatId)
      console.log('📌 선택한 항공편 ID:', flightData.selectedDepartureFlight.id)

      // ✅ API에 맞는 요청 데이터 구성
      const requestBody = {
        flightId: flightData.selectedDepartureFlight.id, // 출발 항공편 ID
        seatIds: [flightData.selectedSeatId], // ✅ 좌석 ID를 배열 형태로 전달
        ticketType: 'one-way', // ✅ 현재 편도로 설정
      }

      console.log('📌 최종 예약 요청 데이터:', requestBody) // ✅ 최종 예약 요청 데이터 확인

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`예약 생성 실패 (HTTP ${response.status}) ${errorText}`)
      }

      const data = await response.json()
      console.log('📌 예약 완료:', data)

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
          출발:{' '}
          {new Date(
            flightData.selectedDepartureFlight.departureTime
          ).toLocaleString()}
        </Typography>
        <Typography variant="h6">
          도착:{' '}
          {new Date(
            flightData.selectedDepartureFlight.arrivalTime
          ).toLocaleString()}
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
