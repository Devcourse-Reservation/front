// 📌 src/pages/ReservationDetail.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, Typography, CircularProgress } from '@mui/material'

const API_URL = 'http://localhost:3000/tickets'

interface ReservationDetail {
  id: number
  reservationNumber: string
  flightNumber: string
  airline: string
  departure: string
  arrival: string
  departureTime: string
  arrivalTime: string
  seatClass: string
  seatNumber: string
  status: string
  createdAt: string
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
        setReservation(data)
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
              항공사: {reservation.airline} ({reservation.flightNumber})
            </Typography>
            <Typography variant="h6">
              출발: {reservation.departure} -{' '}
              {new Date(reservation.departureTime).toLocaleString()}
            </Typography>
            <Typography variant="h6">
              도착: {reservation.arrival} -{' '}
              {new Date(reservation.arrivalTime).toLocaleString()}
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
            <Typography variant="body1" sx={{ mt: 2, color: 'gray' }}>
              예약 일시: {new Date(reservation.createdAt).toLocaleString()}
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
