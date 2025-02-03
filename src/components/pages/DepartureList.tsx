import { useLocation } from 'react-router-dom'
import { Box, Container, Divider, Paper, Typography } from '@mui/material'
import Layout from '../layouts/Layout'
import BackgroundBox from '../images/Background'
import NextButton from '../Buttons/NextButton'
import LocationSelect from '../Dropdowns/Location'
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

const seatimage = '/seatclass.png'

export default function DepartureList() {
  const location = useLocation()
  const {
    flights,
    origin: initialOrigin,
    destination: initialDestination,
    departureDate,
    returnDate,
    passengers,
    seatClass,
  } = location.state || {}

  const [origin, setOrigin] = useState<string>(initialOrigin || 'ICN')
  const [destination, setDestination] = useState<string>(
    initialDestination || 'PUS'
  )

  console.log('DepartureList에서 받은 데이터: ', location.state)

  useEffect(() => {
    if (!flights || flights.length === 0) {
      console.warn('항공편 정보를 불러오는 중입니다...')
    }
  }, [flights])

  console.log('DepartureList에서 받은 데이터: ', location.state)

  if (!flights || flights.length === 0) {
    return (
      <Typography textAlign="center">
        항공편 정보를 불러오는 중입니다...
      </Typography>
    )
  }

  return (
    <Layout>
      <BackgroundBox>
        <Container
          className="contents-container"
          sx={{
            marginLeft: '20vw',
            marginRight: '20vw',
            padding: '5vw',
            textAlign: 'center',
          }}
        >
          {/* 검색된 항공편이 있을 경우만 표시 */}
          {flights && (
            <>
              <Container
                className="reservation-container"
                sx={{ width: '100%', height: '100%', margin: '2vw' }}
              >
                <Container>
                  <Paper
                    elevation={3}
                    sx={{
                      display: 'inline-flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '1rm',
                      width: '100%',
                      height: '100%',
                      borderRadius: 3,
                    }}
                  >
                    {/* 출발지 & 도착지 */}
                    <Box className="date-container">
                      <LocationSelect
                        from={origin}
                        to={destination}
                        setFrom={() => {}}
                        setTo={() => {}}
                      />
                    </Box>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ color: '#cacaca' }}
                    />

                    {/* 날짜 */}
                    <Box
                      className="date-container"
                      sx={{
                        display: 'inline-flex',
                        flexDirection: 'row',
                        gap: 1,
                      }}
                    >
                      <Box>
                        <img
                          src={'/cal.png'}
                          alt="calender-image"
                          style={{ width: 20, height: 20 }}
                        />
                      </Box>
                      <Box paddingRight={8}>
                        <Typography variant="subtitle1">
                          {departureDate}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ color: '#cacaca' }}
                    />

                    {/* 인원수 */}
                    <Box
                      className="people-container"
                      sx={{
                        display: 'inline-flex',
                        flexDirection: 'row',
                        gap: 1,
                      }}
                    >
                      <Box>
                        <img
                          src="/Person.png"
                          alt="person-icon"
                          style={{ width: 25, height: 25 }}
                        />
                      </Box>
                      <Typography variant="subtitle1" paddingRight={8}>
                        성인 {passengers?.adults ?? 1}명, 어린이{' '}
                        {passengers?.children ?? 0}명
                      </Typography>
                    </Box>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ color: '#cacaca' }}
                    />

                    {/* 좌석 등급 */}
                    <Box
                      className="seatclass-container"
                      sx={{
                        display: 'inline-flex',
                        flexDirection: 'row',
                        gap: 1,
                      }}
                    >
                      <Box>
                        <img
                          src={seatimage}
                          alt="seat-class-image"
                          style={{ width: 25, height: 25 }}
                        />
                      </Box>
                      <Typography variant="subtitle1" paddingRight={3}>
                        {seatClass === '1' ? '일반석' : '비즈니스석'}
                      </Typography>
                    </Box>
                  </Paper>
                </Container>
              </Container>

              {/* 검색된 항공편 목록 표시 */}
              <Container className="list-container">
                {flights.length > 0 ? (
                  flights.map((flight: FlightData) => (
                    <Paper
                      key={flight.airline}
                      elevation={3}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'space-around',
                        borderRadius: 5,
                        textAlign: 'center',
                        margin: '2vw',
                        padding: '2vw',
                      }}
                    >
                      <Typography variant="h5">{flight.airline}</Typography>
                      <Typography>
                        {flight.origin} → {flight.destination}
                      </Typography>
                      <Typography>출발: {flight.departureTime}</Typography>
                      <Typography>도착: {flight.arrivalTime}</Typography>
                      <Typography variant="subtitle1" color="gray">
                        상태: {flight.status}
                      </Typography>
                    </Paper>
                  ))
                ) : (
                  <Typography textAlign="center" color="gray">
                    검색된 항공편이 없습니다.
                  </Typography>
                )}
              </Container>
            </>
          )}

          {/* 다음 버튼 */}
          <Box
            className="button-container"
            sx={{
              display: 'inline-flex',
              flexDirection: 'row',
              width: '100%',
              height: '100%',
              justifyContent: 'right',
            }}
          >
            <NextButton />
          </Box>
        </Container>
      </BackgroundBox>
    </Layout>
  )
}
