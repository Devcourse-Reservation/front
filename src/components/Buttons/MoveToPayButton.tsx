import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useNavigate } from 'react-router-dom'

export default function MoveToPayButton() {
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate('/arrival-list')
  }

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        size="large"
        onClick={handleSearch}
        sx={{
          fontSize: 20,
          borderRadius: '15px',
          backgroundColor: '#1E2A3C',
        }}
      >
        다음
      </Button>
    </Stack>
  )
}
