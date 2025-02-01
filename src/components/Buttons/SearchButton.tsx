import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useNavigate } from 'react-router-dom'

interface SearchButtonProps {
  onSearch: () => Promise<void>
}

export default function SearchButton({ onSearch }: SearchButtonProps) {
  const navigate = useNavigate()

  const handleSearch = async () => {
    await onSearch()
    navigate('/departure-list')
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
        항공편 검색
      </Button>
    </Stack>
  )
}
