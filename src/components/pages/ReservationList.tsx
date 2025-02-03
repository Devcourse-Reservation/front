import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Layout from '../layouts/Layout'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface Reservation {
  id: number
  departure: string
  arrival: string
  date: string
}

interface ReservationCardProps extends Reservation {
  onDetailClick: () => void
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  id,
  departure,
  arrival,
  date,
  onDetailClick,
}) => (
  <Paper
    variant="elevation"
    elevation={3}
    sx={{
      height: '150px',
      width: '100%',
      padding: 5,
      color: 'GrayText',
      borderRadius: 5,
    }}
  >
    구매완료
    <Typography
      variant="h4"
      sx={{
        margin: '1vw',
        display: 'flex',
        justifyContent: 'space-around',
        color: '#1E2A3C',
        fontFamily: 'Raleway',
      }}
    >
      {departure} --------------- {arrival}
    </Typography>
    <Box
      className="date-button-container"
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography
          variant="h5"
          sx={{
            color: 'gray',
            textAlign: 'right',
            fontFamily: 'Raleway',
          }}
        >
          {date}
        </Typography>
      </Box>
      <Box
        sx={{
          width: '60%',
          textAlign: 'right',
        }}
      >
        <Button
          variant="contained"
          sx={{
            fontSize: 20,
            backgroundColor: '#1871FF',
            borderRadius: 3,
          }}
          onClick={onDetailClick}
        >
          예약 상세
        </Button>
      </Box>
    </Box>
  </Paper>
)

export default function ReservationList() {
  const navigate = useNavigate()

  const reservations: Reservation[] = [
    {
      id: 10, // 예제 티켓 ID
      departure: 'CJJ 제주',
      arrival: 'GMP 김포',
      date: '2025년 1월 22일 (화) 16:25',
    },
    {
      id: 11,
      departure: 'CJJ 제주',
      arrival: 'GMP 김포',
      date: '2025년 1월 23일 (수) 17:00',
    },
    {
      id: 12,
      departure: 'CJJ 제주',
      arrival: 'GMP 김포',
      date: '2025년 1월 24일 (목) 18:15',
    },
  ]

  return (
    <Layout>
      <Box
        sx={{
          marginLeft: '20vw',
          marginRight: '20vw',
          marginTop: '7vh',
        }}
      >
        <Box
          sx={{
            fontSize: 30,
            fontWeight: '700',
            color: '#002597',
            marginBottom: '3vh',
          }}
        >
          예약 목록
        </Box>
        {reservations.map((reservation, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={2}
            sx={{ marginBottom: 7 }}
          >
            <ReservationCard
              id={reservation.id}
              departure={reservation.departure}
              arrival={reservation.arrival}
              date={reservation.date}
              onDetailClick={() =>
                navigate(`/reservation-detail/${reservation.id}`)
              }
            />
          </Stack>
        ))}
      </Box>
    </Layout>
  )
}
