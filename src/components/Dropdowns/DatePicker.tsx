import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function SelectDate() {
    const [departureDate, setDepartureDate] = React.useState<Dayjs | null>(null);
    const [arrivalDate, setArrivalDate] = React.useState<Dayjs | null>(null);

    // 출발 날짜 변경 핸들러
    const handleDepartureDateChange = (newValue: Dayjs | null) => {
        setDepartureDate(newValue);
        if (arrivalDate && newValue && newValue.isAfter(arrivalDate)) {
            setArrivalDate(null);
        }
    };

    // 도착 날짜 변경 핸들러
    const handleArrivalDateChange = (newValue: Dayjs | null) => {
        setArrivalDate(newValue);
    };

    const resetDates = () => {
        setDepartureDate(null);
        setArrivalDate(null);
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 200,
        alignContent: 'center',
    };

    const textFieldStyle = {
        height: '55px',
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <Box sx={containerStyle}>
                <Typography align="center" color="#5E5E5E">
                    날짜 선택
                </Typography>

                <DatePicker
                    label="출발 날짜"
                    value={departureDate}
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
                    value={arrivalDate}
                    onChange={handleArrivalDateChange}
                    minDate={departureDate || undefined}
                    format="YYYY / MM / DD"
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            error: !arrivalDate && !!departureDate,
                            helperText: !arrivalDate && !!departureDate ? '도착 날짜를 선택해주세요.' : '',
                            sx: textFieldStyle,
                        },
                    }}
                />
            </Box>
        </LocalizationProvider>
    );
}

export default SelectDate;
