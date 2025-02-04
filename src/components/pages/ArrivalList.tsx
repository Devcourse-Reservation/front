import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Container, Paper, Typography, Button } from '@mui/material'
import { useState } from 'react'

interface FlightData {
  id: number
  flightName: string
  airline: string
  status: string
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
}

export default function ArrivalList() {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedFlight, setSelectedFlight] = useState<FlightData | null>(null)
  const flightData =
    location.state || JSON.parse(localStorage.getItem('flightData') || '{}')

  if (!flightData || !flightData.returnFlights?.length) {
    return <Typography textAlign="center">검색된 도착편이 없습니다.</Typography>
  }

  const handleSelectFlight = (flight: FlightData) => {
    setSelectedFlight(flight)

    console.log('📌 선택한 출발편 ID:', flightData.selectedDepartureFlight.id)
    console.log('📌 선택한 도착편 ID:', flight.id)

    // ✅ 선택한 출발편 및 도착편 정보를 가지고 좌석 선택 페이지로 이동
    navigate('/select-seat', {
      state: {
        ...flightData,
        selectedArrivalFlight: flight, // 선택한 도착편 추가
      },
    })
  }

  return (
    <Container>
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#002597' }}>
          도착편 선택
        </Typography>
        {flightData.returnFlights.map((flight: FlightData) => (
          <Paper
            key={flight.id}
            elevation={3}
            sx={{
              p: 3,
              mt: 3,
              cursor: 'pointer',
              backgroundColor:
                selectedFlight?.id === flight.id ? '#ddd' : 'white',
            }}
            onClick={() => handleSelectFlight(flight)}
          >
            <Typography variant="h5">
              {flight.airline} - {flight.flightName}
            </Typography>
            <Typography>
              {flight.origin} → {flight.destination}
            </Typography>
            <Typography>출발: {flight.departureTime}</Typography>
            <Typography>도착: {flight.arrivalTime}</Typography>
            <Typography>상태: {flight.status}</Typography>
          </Paper>
        ))}
        <Button sx={{ mt: 3 }} onClick={() => navigate('/departure-list')}>
          뒤로가기
        </Button>
      </Box>
    </Container>
  )
}
