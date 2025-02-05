import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useNavigate } from 'react-router-dom'

export default function ListButton() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/departure-list')
  }
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="text"
        size="large"
        sx={{
          fontSize: 22,
          color: '#1E2A3C',
        }}
        onClick={handleClick}
      >
        항공편
      </Button>
    </Stack>
  )
}
