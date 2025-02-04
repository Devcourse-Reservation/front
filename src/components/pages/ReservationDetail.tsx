import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, Typography, CircularProgress } from '@mui/material'

const API_URL = 'http://localhost:3000/tickets'

interface ReservationDetail {
  id: number
  reservationNumber: string
  flightName: string
  airline: string
  departureAirport: string
  departureCode: string
  arrivalAirport: string
  arrivalCode: string
  departureTime: string
  arrivalTime: string
  seatClass: string
  seatNumber: string
  status: string
  paymentStatus: string
}

export default function ReservationDetail() {
  const { id } = useParams()
  const [reservation, setReservation] = useState<ReservationDetail | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReservationDetail = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('인증 토큰이 없습니다.')

        const response = await fetch(`${API_URL}/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error('예약 정보를 불러올 수 없습니다.')

        const data = await response.json()
        console.log('📌 받은 예약 상세 데이터:', data) // ✅ 확인용 로그

        // API 응답을 사용자가 보기 편한 형식으로 변환
        const ticket = data.ticket
        setReservation({
          id: ticket.id,
          reservationNumber: ticket.reservationNumber,
          flightName: ticket.Flight?.flight_name || '정보 없음',
          airline: ticket.Flight?.airline || '정보 없음',
          departureAirport:
            ticket.Flight?.departureAirport?.name || '정보 없음',
          departureCode: ticket.Flight?.departureAirport?.code || '정보 없음',
          arrivalAirport: ticket.Flight?.arrivalAirport?.name || '정보 없음',
          arrivalCode: ticket.Flight?.arrivalAirport?.code || '정보 없음',
          departureTime: ticket.Flight?.departureTime
            ? new Date(ticket.Flight.departureTime).toLocaleString()
            : '정보 없음',
          arrivalTime: ticket.Flight?.arrivalTime
            ? new Date(ticket.Flight.arrivalTime).toLocaleString()
            : '정보 없음',
          seatClass: ticket.Seat?.class || '정보 없음',
          seatNumber: ticket.Seat?.seatNumber || '정보 없음',
          status: ticket.status,
          paymentStatus: ticket.Payment?.status || '결제 정보 없음',
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류 발생')
      } finally {
        setLoading(false)
      }
    }

    fetchReservationDetail()
  }, [id])

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
          예약 상세 정보 ✈️
        </Typography>
        {reservation ? (
          <Box
            sx={{
              mt: 4,
              textAlign: 'left',
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h5">
              예약 번호: <strong>{reservation.reservationNumber}</strong>
            </Typography>
            <Typography variant="h6">
              항공사: {reservation.airline} ({reservation.flightName})
            </Typography>
            <Typography variant="h6">
              출발: {reservation.departureAirport} ({reservation.departureCode})
              - {reservation.departureTime}
            </Typography>
            <Typography variant="h6">
              도착: {reservation.arrivalAirport} ({reservation.arrivalCode}) -{' '}
              {reservation.arrivalTime}
            </Typography>
            <Typography variant="h6">
              좌석 등급: {reservation.seatClass} (좌석번호:{' '}
              {reservation.seatNumber})
            </Typography>
            <Typography
              variant="h6"
              color={reservation.status === 'Confirmed' ? 'green' : 'red'}
            >
              예약 상태: {reservation.status}
            </Typography>
            <Typography
              variant="h6"
              color={reservation.paymentStatus === 'Paid' ? 'green' : 'red'}
            >
              결제 상태: {reservation.paymentStatus}
            </Typography>
          </Box>
        ) : (
          <Typography sx={{ mt: 5 }}>
            예약 정보를 불러올 수 없습니다.
          </Typography>
        )}
      </Box>
    </Container>
  )
}
