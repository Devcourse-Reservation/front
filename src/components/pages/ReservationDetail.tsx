import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../layouts/Layout'
import { Box, Container, Typography } from '@mui/material'
import { getTicketById } from '../../api/tickets'

interface TicketDetail {
  id: number
  reservationNumber: string
  ticketType: string
  status: string
  reservedAt: string | null
  cancelledAt: string | null
  createdAt: string
  seat: { class: string; status: string }
  flight: {
    airline: string
    departureTime: string
    arrivalTime: string
    departureAirport: { name: string; code: string }
    arrivalAirport: { name: string; code: string }
  }
  passengerCount: number
}

export default function ReservationDetail() {
  const { ticketId } = useParams() // URL에서 ticketId 가져오기
  const [ticket, setTicket] = useState<TicketDetail | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const token = localStorage.getItem('token') // 토큰 저장 위치에 맞게 수정
        if (!token) throw new Error('인증 토큰이 없습니다.')

        const data = await getTicketById(Number(ticketId), token)
        setTicket(data)
      } catch (err) {
        setError('티켓 정보를 불러오지 못했습니다.')
      }
    }

    fetchTicketDetails()
  }, [ticketId])

  if (error) return <Typography color="error">{error}</Typography>

  return (
    <Layout>
      <Container fixed>
        <Box sx={{ height: '100vh', borderRadius: 20 }}>
          <Box sx={{ padding: '5vw', textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', color: '#002597' }}
            >
              예약 상세 페이지
            </Typography>
          </Box>
          {ticket ? (
            <Box sx={{ padding: '3vw', textAlign: 'left' }}>
              <Typography variant="h5">
                예약 번호: {ticket.reservationNumber}
              </Typography>
              <Typography>항공사: {ticket.flight.airline}</Typography>
              <Typography>
                출발: {ticket.flight.departureAirport.name} (
                {ticket.flight.departureAirport.code}) -{' '}
                {ticket.flight.departureTime}
              </Typography>
              <Typography>
                도착: {ticket.flight.arrivalAirport.name} (
                {ticket.flight.arrivalAirport.code}) -{' '}
                {ticket.flight.arrivalTime}
              </Typography>
              <Typography>좌석 등급: {ticket.seat.class}</Typography>
              <Typography>좌석 상태: {ticket.seat.status}</Typography>
              <Typography>승객 수: {ticket.passengerCount}명</Typography>
              <Typography>상태: {ticket.status}</Typography>
            </Box>
          ) : (
            <Typography>예약 정보를 불러오는 중입니다...</Typography>
          )}
        </Box>
      </Container>
    </Layout>
  )
}
