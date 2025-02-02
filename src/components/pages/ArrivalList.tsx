import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Typography,
} from '@mui/material'
import TicketIcon from '../images/TicketIcon'
import Layout from '../layouts/Layout'
import React, { useEffect, useState } from 'react'
import LocationSelect from '../Dropdowns/Location'
import MoveToPayButton from '../Buttons/MoveToPayButton'
import { searchFlights } from '../../utils/searchFlights'
import { useLocation } from 'react-router-dom'

const seatImage = '/seatclass.png'

interface Flight {
  flightNumber: string
  departure: string
  arrival: string
  time: string
  price: number
}

export default function ArrivalList() {
  const location = useLocation()

  // 상태 변수 초기화
  const [from, setFrom] = useState<string>('GMP')
  const [to, setTo] = useState<string>('CJJ')
  const [departureDate, setDepartureDate] = useState<string>('2025-01-23')
  const [returnDate, setReturnDate] = useState<string>('2025-02-06')
  const [passengers, setPassengers] = useState<number>(1)
  const [seatClass, setSeatClass] = useState<string>('일반석')
  const [flights, setFlights] = useState<Flight[] | null>(null)
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  // location.state 값이 존재하면 상태 업데이트
  useEffect(() => {
    if (location.state) {
      const {
        origin,
        destination,
        departureDate,
        returnDate,
        passengers,
        seatClass,
        flights,
      } = location.state

      setFrom(origin || 'GMP')
      setTo(destination || 'CJJ')
      setDepartureDate(departureDate || '2025-01-23')
      setReturnDate(returnDate || '2025-02-06')
      setPassengers(passengers || 1)
      setSeatClass(seatClass || '일반석')
      setFlights(flights || null)
    }
  }, [location.state])

  // 모달 핸들러
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // 항공편 선택 핸들러
  const handleFlightClick = (flight: Flight) => {
    setSelectedFlight(flight)
  }

  // 검색 요청
  const handleSearch = async (): Promise<void> => {
    try {
      const data = await searchFlights({
        origin: from,
        destination: to,
        departureDate,
        returnDate,
        passengers,
        seatClass,
      })

      setFlights(data)
    } catch (err) {
      console.error('❌ 검색 중 오류 발생:', err)
      setError('항공편 검색 중 오류가 발생했습니다.')
    }
  }

  return (
    <Layout>
      <Container
        sx={{
          marginX: '20vw',
          padding: '5vw',
          textAlign: 'center',
        }}
      >
        {/* 검색 필터 UI */}
        <Paper
          className="select-information-container"
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '1rem',
            borderRadius: 3,
          }}
        >
          {/* 출발지 & 도착지 */}
          <Box sx={{ cursor: 'pointer' }}>
            <LocationSelect
              from={from}
              to={to}
              setFrom={setFrom}
              setTo={setTo}
            />
          </Box>
          <Divider orientation="vertical" flexItem sx={{ color: '#cacaca' }} />

          {/* 날짜 선택 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src="/cal.png" alt="calender" width={20} height={20} />
            <Typography variant="subtitle1">
              {departureDate} ~ {returnDate}
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ color: '#cacaca' }} />

          {/* 승객 수 선택 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
            }}
            onClick={handleOpen}
          >
            <img src="/Person.png" alt="person" width={25} height={25} />
            <Typography variant="subtitle1">성인 {passengers}명</Typography>
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>승객 수 선택</DialogTitle>
            <DialogContent>
              <Button
                onClick={() => setPassengers((prev) => Math.max(prev - 1, 1))}
              >
                제거
              </Button>
              <Button onClick={() => setPassengers((prev) => prev + 1)}>
                추가
              </Button>
              <Button onClick={handleClose}>확인</Button>
            </DialogContent>
          </Dialog>
          <Divider orientation="vertical" flexItem sx={{ color: '#cacaca' }} />

          {/* 좌석 선택 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src={seatImage} alt="seat" width={25} height={25} />
            <Typography variant="subtitle1">{seatClass}</Typography>
          </Box>
        </Paper>

        {/* 항공편 목록 */}
        {flights ? (
          flights.map((flight) => (
            <Paper
              key={flight.flightNumber}
              elevation={3}
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                margin: '2vw',
                padding: 2,
                borderRadius: 5,
                backgroundColor:
                  selectedFlight?.flightNumber === flight.flightNumber
                    ? '#e0f7fa'
                    : 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => handleFlightClick(flight)}
            >
              <Typography>{flight.flightNumber}</Typography>
              <Typography>{flight.time}</Typography>
              <Typography>
                {flight.departure} → {flight.arrival}
              </Typography>
              <Typography>{flight.price.toLocaleString()}원</Typography>
            </Paper>
          ))
        ) : (
          <Typography sx={{ textAlign: 'center', marginTop: 2 }} color="gray">
            검색된 항공편이 없습니다.
          </Typography>
        )}

        {/* 결제 이동 버튼 */}
        <Box sx={{ textAlign: 'right', marginTop: 3 }}>
          <MoveToPayButton />
        </Box>
      </Container>
    </Layout>
  )
}
