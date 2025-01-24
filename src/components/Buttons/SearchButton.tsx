import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

export default function SearchButton() {
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate("/departure-list")
  }

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        size='large'
        onClick={handleSearch}
        sx={{
          fontSize: 20,
          borderRadius: '15px',
          backgroundColor: '#1E2A3C',
        }}>항공편 검색</Button>
    </Stack>
  );
}