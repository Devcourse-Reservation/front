import { Box, Container, Divider, Paper, Typography } from '@mui/material'
import TicketIcon from '../images/TicketIcon'
import Layout from '../layouts/Layout'
import BackgroundBox from '../images/Background'
import { useEffect, useState } from 'react'
import LocationSelect from '../Dropdowns/Location'
import NextButton from '../Buttons/NextButton'

interface FlightData {
  airline: string
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  status: string
}

const seatimage = '/seatclass.png'
export default function DepartureList() {
  const [from, setFrom] = useState<string>('GMP')
  const [to, setTo] = useState<string>('CJJ')
  const [flightdata, setFlightData] = useState<FlightData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  //   const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    //   const fetchFlightData = async () => {
    //       try {
    //           const response = await fetch("https://20c4bbc8-99fb-4c9d-8be6-4fb793db176e.mock.pstmn.io")
    //           if (!response.ok) {
    //               throw new Error("서버 응답이 실패했습니다.")
    //           }
    //       }
    //       const data = await response.json()
    //           setFlightData(data)

    //   }
    setTimeout(() => {
      const mockData: FlightData = {
        airline: 'Delta Airlines',
        origin: 'JFK',
        destination: 'SFO',
        departureTime: '2025-01-21T00:00:00.000Z',
        arrivalTime: '2025-01-21T03:30:00.000Z',
        status: 'Scheduled',
      }
      setFlightData(mockData)
      setLoading(false)
    }, 1000)
  }, [])

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
          {flightdata && (
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
                  <Box className="date-container">
                    <LocationSelect
                      from={from}
                      to={to}
                      setFrom={setFrom}
                      setTo={setTo}
                    />{' '}
                  </Box>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ color: '#cacaca' }}
                  />

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
                        2025년 1월 23일 ~ 2025년 2월 6일
                      </Typography>
                    </Box>
                  </Box>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ color: '#cacaca' }}
                  />

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
                      {' '}
                      성인 1명
                    </Typography>
                  </Box>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ color: '#cacaca' }}
                  />

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
                      일반석
                    </Typography>
                  </Box>
                </Paper>
              </Container>
            </Container>
          )}
          <Container sx={{ width: '100%', height: '10px' }} />
          <Container
            className="text-date-list-container"
            sx={{ width: '100%', height: '100%' }}
          >
            <Container
              className="text-container"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left',
                margin: '2vw 2vw 0 2vw',
              }}
            >
              <Typography variant="h6" color="gray">
                가는 편
              </Typography>
              <Typography variant="h5" color="#1E2A3C" fontWeight={'bold'}>
                김포(GMP) ------------ 제주 (CJJ)
              </Typography>
            </Container>
            <Container
              className="date-container"
              sx={{ margin: '1vw 2vw 0 2vw' }}
            >
              <Paper
                elevation={3}
                sx={{
                  display: 'inline-flex',
                  flexDirection: 'row',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-around',
                  textAlign: 'center',
                  borderRadius: 3,
                }}
              >
                <Box sx={{ margin: 2, paddingLeft: 4 }}>
                  <Typography>21일(화)</Typography>
                  <Typography>106,700원</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box margin={2}>
                  <Typography>22일(수)</Typography>
                  <Typography>106,700원</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />

                <Box margin={2}>
                  <Typography>23일(목)</Typography>
                  <Typography>106,700원</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />

                <Box margin={2}>
                  <Typography>24일(금)</Typography>
                  <Typography>106,700원</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />

                <Box margin={2}>
                  <Typography>25일(토)</Typography>
                  <Typography>106,700원</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />

                <Box margin={2} paddingRight={3}>
                  <Typography>26일(일)</Typography>
                  <Typography>106,700원</Typography>
                </Box>
              </Paper>
            </Container>
            <Container sx={{ width: '100%', height: '30px' }} />

            <Container className="list-container">
              <Paper
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
                }}
              >
                <Box
                  className="list1-container"
                  sx={{
                    display: 'inline-flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'flex-end',
                    width: '100%',
                    height: '100%',
                    padding: 2,
                  }}
                >
                  <Box
                    className="departure-time-container"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="subtitle1" color="#929292">
                      KE862
                    </Typography>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        flexDirection: 'row',
                        gap: 1,
                      }}
                    >
                      <TicketIcon style={{ width: 25, height: 25 }} />
                      <Typography
                        variant="h5"
                        fontWeight={'bold'}
                        color="#1E2A3C"
                      >
                        15:10
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" color="#929292">
                      GMP
                    </Typography>
                  </Box>
                  <Box
                    className="line-container"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h5">
                      -------------------------
                    </Typography>
                  </Box>
                  <Box
                    className="arrival-time-container"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight={'bold'}
                      color="#1E2A3C"
                    >
                      15:10
                    </Typography>
                    <Typography variant="subtitle1" color="#929292">
                      GMP
                    </Typography>
                  </Box>
                  <Box
                    className="economy-price-container"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h6" color="#1E2A3C" fontWeight={500}>
                      일반석
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight={'bold'}
                      color="#1E2A3C"
                    >
                      106,700원
                    </Typography>
                  </Box>
                  <Box
                    className="economy-price-container"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h6" color="#1E2A3C" fontWeight={500}>
                      비즈니스
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight={'bold'}
                      color="#1E2A3C"
                    >
                      106,700원
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Container>
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
        </Container>
      </BackgroundBox>
    </Layout>
  )
}
