import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Select,
  MenuItem,
} from '@mui/material'
import Layout from '../layouts/Layout'

const API_BASE_URL = 'http://localhost:3000' // 백엔드 API 주소

interface Flight {
  id: number
  flightName: string
  airline: string
  status: string
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
}

export default function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  const flightData = location.state

  const [paymentMethod, setPaymentMethod] = useState<string>('CreditCard')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!flightData) {
      console.warn('🚨 결제 페이지: 항공편 정보 없음! 메인 페이지로 이동')
      navigate('/')
    }
  }, [flightData, navigate])

  const handlePayment = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('인증 토큰이 없습니다.')

      const response = await fetch(`${API_BASE_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          flightId: flightData.selectedDepartureFlight.id,
          returnFlightId: flightData.selectedArrivalFlight?.id || null,
          paymentMethod,
          amount: 100000, // 테스트용 결제 금액 (추후 동적 변경 가능)
        }),
      })

      if (!response.ok) throw new Error('결제 요청 실패')

      const result = await response.json()
      console.log('💳 결제 성공: ', result)

      // 결제 성공 시 예약 완료 페이지로 이동
      navigate('/reservation-success', { state: result })
    } catch (error) {
      console.error('❌ 결제 실패: ', error)
    } finally {
      setLoading(false)
    }
  }

  if (!flightData) return null

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            결제 페이지
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            선택한 항공편
          </Typography>

          <Typography variant="subtitle1">
            ✈ {flightData.selectedDepartureFlight.airline} -{' '}
            {flightData.selectedDepartureFlight.flightName}
          </Typography>
          <Typography variant="body1">
            {flightData.selectedDepartureFlight.origin} →{' '}
            {flightData.selectedDepartureFlight.destination}
          </Typography>
          <Typography variant="body2">
            출발: {flightData.selectedDepartureFlight.departureTime} | 도착:{' '}
            {flightData.selectedDepartureFlight.arrivalTime}
          </Typography>

          {flightData.selectedArrivalFlight && (
            <>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                ✈ {flightData.selectedArrivalFlight.airline} -{' '}
                {flightData.selectedArrivalFlight.flightName}
              </Typography>
              <Typography variant="body1">
                {flightData.selectedArrivalFlight.origin} →{' '}
                {flightData.selectedArrivalFlight.destination}
              </Typography>
              <Typography variant="body2">
                출발: {flightData.selectedArrivalFlight.departureTime} | 도착:{' '}
                {flightData.selectedArrivalFlight.arrivalTime}
              </Typography>
            </>
          )}

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">💳 결제 방법 선택</Typography>
            <Select
              fullWidth
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value="CreditCard">신용카드</MenuItem>
              <MenuItem value="BankTransfer">계좌이체</MenuItem>
              <MenuItem value="EasyPay">간편결제</MenuItem>
            </Select>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePayment}
              disabled={loading}
              sx={{ width: '100%', py: 1.5 }}
            >
              {loading ? '결제 처리 중...' : '결제하기'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Layout>
  )
}
