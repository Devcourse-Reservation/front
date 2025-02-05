/**ReservationPart.tsx */
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Container, FormHelperText } from '@mui/material'
import LocationSelect from './Dropdowns/Location'
import SelectDate from './Dropdowns/DatePicker'
import Passenger from './Dropdowns/Passenger'
import SeatClass from './Dropdowns/Seatclass'
import SearchButton from './Buttons/SearchButton'
import SwitchButton from './Buttons/SwitchButton'
import BackgroundBox from './images/Background'
import Layout from './layouts/Layout'
import { useNavigate } from 'react-router-dom'
import { searchFlights } from '../utils/searchFlights'
//import { Flight } from '../types'

const TicketTypeButtons = () => {
  const buttonStyle = {
    height: '7vh',
    padding: 2,
    backgroundColor: '#1E2A3C',
    color: '#ffffff',
    borderTopLeftRadius: '25px',
    borderTopRightRadius: '25px',
  }

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <Button
        variant="contained"
        sx={{ ...buttonStyle, flex: 1, maxWidth: '313px' }}
      >
        <Typography variant="h6">항공권 예매</Typography>
      </Button>
      <Button
        variant="contained"
        sx={{ ...buttonStyle, flex: 2, maxWidth: '893px' }}
      >
        <Typography variant="h6">마일리지 예매</Typography>
      </Button>
    </Box>
  )
}

type LeftCardProps = {
  origin: string
  setOrigin: (value: string) => void
  destination: string
  setDestination: (value: string) => void
}

const LeftCard: React.FC<LeftCardProps> = ({
  origin,
  setOrigin,
  destination,
  setDestination,
}) => (
  <Paper
    elevation={3}
    sx={{
      flex: 1,
      padding: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      borderBottomLeftRadius: '25px',
      maxWidth: '280px',
      height: '25vh',
    }}
  >
    <SwitchButton />
    <LocationSelect
      from={origin}
      to={destination}
      setFrom={setOrigin}
      setTo={setDestination}
    />
  </Paper>
)

type RightCardProps = {
  departureDate: string | null
  setDepartureDate: (value: string | null) => void
  returnDate: string | null
  setReturnDate: (value: string | null) => void
  passengers: { adults: number; children: number }
  setPassengers: (value: { adults: number; children: number }) => void
  seatClass: string
  setSeatClass: (value: string) => void
  handleSearch: () => Promise<void>
}

const RightCard: React.FC<RightCardProps> = ({
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  passengers,
  setPassengers,
  seatClass,
  setSeatClass,
  handleSearch,
}) => (
  <Paper
    elevation={3}
    sx={{
      flex: 2,
      padding: 2,
      display: 'inline-flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderBottomRightRadius: '25px',
      maxWidth: '860px',
      height: '25vh',
      alignItems: 'center',
    }}
  >
    <Box>
      <SelectDate
        departureDate={departureDate}
        setDepartureDate={(date) => setDepartureDate(date)}
        returnDate={returnDate}
        setReturnDate={(date) => setReturnDate(date)}
      />
    </Box>
    <Box
      className="passenger-seatclass-container"
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        gap: 4,
      }}
    >
      <Box
        className="passenger-text-container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        <Passenger value={passengers} onChange={setPassengers} />
        <FormHelperText>최대 9인까지 예매 가능합니다.</FormHelperText>
      </Box>
      <Box>
        <SeatClass value={seatClass} onChange={setSeatClass} />
      </Box>
    </Box>
    <Box>
      <SearchButton onSearch={handleSearch} />
    </Box>
  </Paper>
)

export default function ReservationPart() {
  const [origin, setOrigin] = useState<string>('ICN')
  const [destination, setDestination] = useState<string>('PUS')
  const [departureDate, setDepartureDate] = useState<string | null>(
    '2025-01-21'
  )
  const [returnDate, setReturnDate] = useState<string | null>('2025-01-26')
  const [passengers, setPassengers] = useState<{
    adults: number
    children: number
  }>({ adults: 1, children: 0 })
  const [seatClass, setSeatClass] = useState<string>('일반석')

  const navigate = useNavigate()

  const handleSearch = async () => {
    try {
      const data = await searchFlights({
        origin,
        destination,
        departureDate,
        returnDate,
        passengers: passengers.adults + passengers.children,
        seatClass,
      })

      console.log('검색된 항공권 데이터: ', data)

      const flightData = {
        flights: data.departureFlights,
        returnFlights: data.returnFlights,
        origin,
        destination,
        departureDate,
        returnDate,
        passengers,
        seatClass,
      }

      // localStorage에도 저장해서 새로고침해도 유지
      localStorage.setItem('flightData', JSON.stringify(flightData))

      // 검색 결과와 사용자 입력 데이터를 departure-list와 arrivalist에 전달
      navigate('/departure-list', {
        replace: true, // 뒤로가기 시 state를 유지하도록 설정
        state: {
          state: flightData,
        },
      })
    } catch (err) {
      console.error('항공편 검색 중 오류 발생:', err)
    }
  }

  return (
    <Layout>
      <BackgroundBox>
        <Container
          className="ticket-container"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: '15px',
            justifyContent: 'center',
            width: '100%',
            height: '70vh',
          }}
        >
          <TicketTypeButtons />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              height: '24vh',
              alignItems: 'stretch',
              justifyContent: 'center',
            }}
          >
            {/* 출발지 & 도착지 */}
            <LeftCard
              origin={origin}
              setOrigin={setOrigin}
              destination={destination}
              setDestination={setDestination}
            />

            {/* 날짜, 탑승 인원, 좌석 등급 */}
            <RightCard
              departureDate={departureDate}
              setDepartureDate={setDepartureDate}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              passengers={passengers}
              setPassengers={setPassengers}
              seatClass={seatClass}
              setSeatClass={setSeatClass}
              handleSearch={handleSearch}
            />
          </Box>
        </Container>
      </BackgroundBox>
    </Layout>
  )
}
