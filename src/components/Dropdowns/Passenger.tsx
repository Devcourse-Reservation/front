import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormHelperText, Box, Typography } from '@mui/material';

export default function Passenger() {
  const [adults, setAdults] = React.useState<number>(1); // 성인 수 상태
  const [children, setChildren] = React.useState<number>(0); // 아동 수 상태
  const maxPassengers = 9; // 최대 인원 제한

  // 성인 수 변경 핸들러
  const handleAdultsChange = (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    if (value + children <= maxPassengers) {
      setAdults(value);
    }
  };

  // 아동 수 변경 핸들러
  const handleChildrenChange = (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    if (adults + value <= maxPassengers) {
      setChildren(value);
    }
  };

  return (
    <Box
      className="passengers-text-container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
      <Box
        className="passenger-text-container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography align="center" color='#5E5E5E'>
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
              value={adults}
              onChange={handleAdultsChange}
              label="성인"
            >
              {Array.from({ length: maxPassengers }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}명
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* 아동 수 선택 */}
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel id="grouped-children-label">아동</InputLabel>
            <Select
              labelId="grouped-children-label"
              value={children}
              onChange={handleChildrenChange}
              label="아동"
            >
              {Array.from({ length: maxPassengers + 1 }, (_, i) => (
                <MenuItem key={i} value={i}>
                  {i}명
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      {/* 유효성 검사 및 경고 메시지 */}
    </Box >
  );
}
