import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { FormHelperText, Box, Typography } from '@mui/material'

interface PassengerProps {
  value: { adults: number; children: number }
  onChange: (value: { adults: number; children: number }) => void
}

export default function Passenger({ value, onChange }: PassengerProps) {
  // 성인 수 변경 핸들러
  const handleAdultsChange = (event: SelectChangeEvent<number>) => {
    onChange({ ...value, adults: Number(event.target.value) })
  }

  // 아동 수 변경 핸들러
  const handleChildrenChange = (event: SelectChangeEvent<number>) => {
    onChange({ ...value, children: Number(event.target.value) })
  }

  return (
    <Box
      className="passengers-text-container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Box
        className="passenger-text-container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography align="center" color="#5E5E5E">
          탑승 인원
        </Typography>
        <Box
          className="passenger-container"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            justifyContent: 'center',
          }}
        >
          {/* 성인 수 선택 */}
          <FormControl sx={{ minWidth: 100, height: 75 }}>
            <InputLabel id="grouped-adult-label">성인</InputLabel>
            <Select
              labelId="grouped-adult-label"
              value={value.adults}
              onChange={handleAdultsChange}
              label="성인"
            >
              {[...Array(9)].map((_, i) => (
                <MenuItem key={i} value={i + 1}>
                  성인 {i + 1}명
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* 아동 수 선택 */}
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel id="grouped-children-label">아동</InputLabel>
            <Select
              labelId="grouped-children-label"
              value={value.children}
              onChange={handleChildrenChange}
              label="아동"
            >
              {[...Array(9)].map((_, i) => (
                <MenuItem key={i} value={i}>
                  아동 {i}명
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      {/* 유효성 검사 및 경고 메시지 */}
    </Box>
  )
}
