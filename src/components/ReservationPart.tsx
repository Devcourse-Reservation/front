import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { FormHelperText } from '@mui/material'
import LocationSelect from './Dropdowns/Location'
import SelectDate from './Dropdowns/DatePicker'
import Passenger from './Dropdowns/Passenger'
import SeatClass from './Dropdowns/Seatclass'
import SearchButton from './Buttons/SearchButton'
import SwitchButton from './Buttons/SwitchButton'

const TicketTypeButtons = () => {
  const buttonStyle = {
    height: '5vh',
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
        sx={{ ...buttonStyle, flex: 1, maxWidth: '393px' }}
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
      maxWidth: '360px',
      height: '30vh',
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
      height: '30vh',
      alignItems: 'center',
    }}
  >
    <Box>
      <SelectDate
        departureDate={departureDate}
        setDepartureDate={setDepartureDate}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
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
          marginTop: 10,
          gap: 0,
        }}
      >
        <Passenger value={passengers} onChange={setPassengers} />
        <FormHelperText>최대 9인까지 예매 가능합니다.</FormHelperText>
      </Box>
      <Box sx={{ marginTop: 10 }}>
        <SeatClass value={seatClass} onChange={setSeatClass} />
      </Box>
    </Box>
    <Box sx={{ marginTop: 15 }}>
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
  }>({
    adults: 1,
    children: 0,
  })
  const [seatClass, setSeatClass] = useState<string>('1')

  const [flights, setFlights] = useState<
    { flightNumber: string; price: number }[] | null
  >(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    try {
      const response = await fetch('url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: origin.split(' ')[0],
          destination: destination.split(' ')[0],
          departureDate,
          returnDate,
          passengers: passengers.adults + passengers.children,
          seatClass,
        }),
      })

      if (!response.ok) {
        throw new Error('검색 요청 실패')
      }

      const data = await response.json()
      console.log('검색결과: ', data)

      setFlights(data)
    } catch (err) {
      setError('항공편 검색 중 오류가 발생했습니다.')
    }
  }

  return (
    <Box
      className="ticket-container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: '15px',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
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
        <LeftCard
          origin={origin}
          setOrigin={setOrigin}
          destination={destination}
          setDestination={setDestination}
        />
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
    </Box>
  )
}
