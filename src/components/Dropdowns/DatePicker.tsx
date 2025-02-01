import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

interface SelectDateProps {
  departureDate: string | null
  returnDate: string | null
  setDepartureDate: (date: string | null) => void
  setReturnDate: (date: string | null) => void
}

export default function SelectDate({
  departureDate,
  returnDate,
  setDepartureDate,
  setReturnDate,
}: SelectDateProps) {
  const handleDepartureDateChange = (newValue: Dayjs | null) => {
    setDepartureDate(newValue ? newValue.format('YYYY-MM-DD') : null)
    if (returnDate && newValue && newValue.isAfter(dayjs(returnDate))) {
      setReturnDate(null)
    }
  }

  const handleReturnChange = (newValue: Dayjs | null) => {
    setReturnDate(newValue ? newValue.format('YYYY-MM-DD') : null)
  }

  const resetDates = () => {
    setDepartureDate(null)
    setReturnDate(null)
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    width: '100%',
    maxWidth: 200,
    alignContent: 'center',
  }

  const textFieldStyle = {
    height: '55px',
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Box sx={containerStyle}>
        <Typography align="center" color="#5E5E5E">
          날짜 선택
        </Typography>

        <DatePicker
          label="출발 날짜"
          value={departureDate ? dayjs(departureDate) : null}
          onChange={handleDepartureDateChange}
          format="YYYY / MM / DD"
          slotProps={{
            textField: {
              fullWidth: true,
              error: !departureDate,
              helperText: !departureDate ? '날짜를 선택해주세요.' : '',
              sx: textFieldStyle,
            },
          }}
        />

        <DatePicker
          label="도착 날짜"
          value={returnDate ? dayjs(returnDate) : null}
          onChange={handleReturnChange}
          minDate={departureDate ? dayjs(departureDate) : undefined}
          format="YYYY / MM / DD"
          slotProps={{
            textField: {
              fullWidth: true,
              error: !returnDate && !!departureDate,
              helperText:
                !returnDate && !!departureDate
                  ? '도착 날짜를 선택해주세요.'
                  : '',
              sx: textFieldStyle,
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  )
}
