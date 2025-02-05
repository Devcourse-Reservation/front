// 📌 src/pages/SearchFlights.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

export default function SearchFlights() {
  const navigate = useNavigate()
  const [origin, setOrigin] = useState('ICN') // 출발지 (기본값: 인천)
  const [destination, setDestination] = useState('JFK') // 도착지 (기본값: 뉴욕 JFK)
  const [departureDate, setDepartureDate] = useState('2025-01-21') // 출발 날짜
  const [returnDate, setReturnDate] = useState('') // 왕복 날짜 (옵션)
  const [passengers, setPassengers] = useState(1) // 승객 수
  const [seatClass, setSeatClass] = useState('Economy') // 좌석 등급
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    try {
      setError(null)

      const response = await fetch(`${API_BASE_URL}/flights/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin,
          destination,
          departureDate,
          returnDate,
          passengers,
          seatClass,
        }),
      })

      if (!response.ok) {
        throw new Error('항공편 검색 실패')
      }

      const data = await response.json()

      const flightData = {
        flights: data.departureFlights, // ✅ `departureFlights` → `flights`
        returnFlights: data.returnFlights,
        origin,
        destination,
        departureDate,
        returnDate,
        passengers,
        seatClass,
      }

      // ✅ `flights` 키를 사용하여 저장
      localStorage.setItem('flightData', JSON.stringify(flightData))

      navigate('/departure-list', { state: flightData })
    } catch (err) {
      setError(err instanceof Error ? err.message : '검색 중 오류 발생')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#002597' }}>
          항공권 검색
        </Typography>
        {error && <Typography color="error">{error}</Typography>}

        <TextField
          fullWidth
          select
          label="출발지"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          sx={{ mt: 3 }}
        >
          <MenuItem value="ICN">인천 (ICN)</MenuItem>
          <MenuItem value="GMP">김포 (GMP)</MenuItem>
          <MenuItem value="JFK">뉴욕 JFK (JFK)</MenuItem>
        </TextField>

        <TextField
          fullWidth
          select
          label="도착지"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          sx={{ mt: 2 }}
        >
          <MenuItem value="ICN">인천 (ICN)</MenuItem>
          <MenuItem value="GMP">김포 (GMP)</MenuItem>
          <MenuItem value="JFK">뉴욕 JFK (JFK)</MenuItem>
        </TextField>

        <TextField
          fullWidth
          type="date"
          label="출발 날짜"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          type="date"
          label="왕복 날짜 (선택)"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          type="number"
          label="승객 수"
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          select
          label="좌석 등급"
          value={seatClass}
          onChange={(e) => setSeatClass(e.target.value)}
          sx={{ mt: 2 }}
        >
          <MenuItem value="Economy">이코노미</MenuItem>
          <MenuItem value="Business">비즈니스</MenuItem>
        </TextField>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, backgroundColor: '#1871FF' }}
          onClick={handleSearch}
        >
          검색
        </Button>
      </Box>
    </Container>
  )
}
