import {
  Box,
  Container,
  Divider,
  Grid2,
  Paper,
  Typography,
} from '@mui/material'
import TicketIcon from '../images/TicketIcon'
import Layout from '../layouts/Layout'
import React, { useState } from 'react'
import LocationSelect from '../Dropdowns/Location'
import SearchButton from '../Buttons/SearchButton'

const seatimage = '/seatclass.png'
export default function ArrivalList() {
  const [from, setFrom] = useState<string>('GMP')
  const [to, setTo] = useState<string>('CJJ')
  const [flights, setFlights] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (): Promise<void> => {
    // try {
    //   console.log('검색 요청 시작 ...')

    //   const response = await fetch(url, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({}),
    //   })

    //   if (!response.ok) {
    //     throw new Error('검색 요청 실패')
    //   }

    //   const data = await response.json()
    //   console.log('검색 결과: ', data)
    //   setFlights(data)
    // } catch (err) {
    //   console.error('검색 중 오류 발생: ', err)
    //   setError('항공편 검색 중 오류가 발생했습니다.')
    // }

    try {
      console.log('🔍 검색 요청 시작...')

      // ✅ 임시 데이터를 사용하여 검색 결과를 생성
      const mockData = [
        {
          flightNumber: 'KE862',
          departure: 'GMP',
          arrival: 'CJJ',
          time: '15:10',
          price: 106700,
        },
        {
          flightNumber: 'KE863',
          departure: 'GMP',
          arrival: 'CJJ',
          time: '18:00',
          price: 112000,
        },
      ]

      // ✅ setTimeout을 사용하여 비동기 요청처럼 동작하도록 만듦
      await new Promise((resolve) => setTimeout(resolve, 1000)) // 1초 후 응답

      console.log('✅ 검색 완료:', mockData)
      setFlights(mockData) // 검색 결과 저장
    } catch (err) {
      console.error('❌ 검색 중 오류 발생:', err)
      setError('항공편 검색 중 오류가 발생했습니다.')
    }
  }

  return (
    <Layout>
      <Container
        className="contents-container"
        sx={{
          marginLeft: '20vw',
          marginRight: '20vw',
          padding: '5vw',
          textAlign: 'center',
        }}
      >
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
                />
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ color: '#cacaca' }}
              />

              <Box
                className="date-container"
                sx={{ display: 'inline-flex', flexDirection: 'row', gap: 1 }}
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
                sx={{ display: 'inline-flex', flexDirection: 'row', gap: 1 }}
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
                sx={{ display: 'inline-flex', flexDirection: 'row', gap: 1 }}
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
                  <Typography variant="h5" fontWeight={'bold'} color="#1E2A3C">
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
                  <Typography variant="h5" fontWeight={'bold'} color="#1E2A3C">
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
                  <Typography variant="h5" fontWeight={'bold'} color="#1E2A3C">
                    106,700원
                  </Typography>
                </Box>
              </Box>
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
                  <Typography variant="h5" fontWeight={'bold'} color="#1E2A3C">
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
                  <Typography variant="h5" fontWeight={'bold'} color="#1E2A3C">
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
                  <Typography variant="h5" fontWeight={'bold'} color="#1E2A3C">
                    106,700원
                  </Typography>
                </Box>
              </Box>
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
                  <Typography variant="h5" fontWeight={'bold'} color="#1E2A3C">
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
                  <Typography variant="h5" fontWeight={'bold'} color="#1E2A3C">
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
                  <Typography variant="h5" fontWeight={'bold'} color="#1E2A3C">
                    106,700원
                  </Typography>
                </Box>
              </Box>
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
                  <Typography variant="h5" fontWeight={'bold'} color="#1E2A3C">
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
                  <Typography variant="h5" fontWeight={'bold'} color="#1E2A3C">
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
                  <Typography variant="h5" fontWeight={'bold'} color="#1E2A3C">
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
            <SearchButton onSearch={handleSearch} />
          </Box>
        </Container>
      </Container>
    </Layout>
  )
}
