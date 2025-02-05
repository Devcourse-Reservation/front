// 📌 src/pages/DepartureList.tsx
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Container, Paper, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'

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

export default function DepartureList() {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedFlight, setSelectedFlight] = useState<FlightData | null>(null)
  const flightData =
    location.state || JSON.parse(localStorage.getItem('flightData') || '{}')

  const flights = flightData?.flights || [] // ✅ `departureFlights` → `flights`

  useEffect(() => {
    console.log('📌 flightData 확인:', flightData)
    console.log('📌 departureFlights:', flights)
  }, [flights])

  if (!flights.length) {
    return <Typography textAlign="center">검색된 출발편이 없습니다.</Typography>
  }

  const handleSelectFlight = (flight: FlightData) => {
    setSelectedFlight(flight)
    navigate('/arrival-list', {
      state: { selectedDepartureFlight: flight, ...flightData },
    })
  }

  return (
    <Container>
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#002597' }}>
          출발편 선택
        </Typography>
        {flights.map(
          (
            flight: FlightData // ✅ `departureFlights` → `flights`
          ) => (
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
          )
        )}
        <Button sx={{ mt: 3 }} onClick={() => navigate('/')}>
          뒤로가기
        </Button>
      </Box>
    </Container>
  )
}
