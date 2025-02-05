// 📌 src/pages/ReservationSuccess.tsx
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Container, Paper, Typography, Button } from '@mui/material'

export default function ReservationSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const reservationNumber = location.state?.reservationNumber || '없음'

  return (
    <Container>
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#002597' }}>
          예약이 완료되었습니다! 🎉
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h5">예약 번호</Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', color: '#1871FF' }}
          >
            {reservationNumber}
          </Typography>
        </Paper>
        <Button
          sx={{ mt: 3 }}
          variant="contained"
          color="primary"
          onClick={() => navigate('/reservations')}
        >
          예약 목록 보기
        </Button>
      </Box>
    </Container>
  )
}
