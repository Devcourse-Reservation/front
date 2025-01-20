import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function SelectDate() {
    const [departureDate, setDepartureDate] = React.useState<Dayjs | null>(null); // 출발 날짜
    const [arrivalDate, setArrivalDate] = React.useState<Dayjs | null>(null);     // 도착 날짜

    const handleDepartureDateChange = (newValue: Dayjs | null) => {
        setDepartureDate(newValue);
        // 출발 날짜가 도착 날짜보다 이후라면 도착 날짜를 초기화
        if (arrivalDate && newValue && newValue.isAfter(arrivalDate)) {
            setArrivalDate(null);
        }
    };

    const handleArrivalDateChange = (newValue: Dayjs | null) => {
        setArrivalDate(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                    maxWidth: 200,
                    alignContent: 'center'
                }}
            >
                <Typography align="center" color='#5E5E5E'>
                    날짜 선택
                </Typography>

                {/* 출발 날짜 선택 */}
                <DatePicker
                    label="출발 날짜"
                    showDaysOutsideCurrentMonth
                    format="YYYY / MM / DD"
                    value={departureDate}
                    onChange={handleDepartureDateChange}
                    localeText={{
                        cancelButtonLabel: '취소',
                        clearButtonLabel: '지우기',
                        todayButtonLabel: '오늘',
                        okButtonLabel: '확인',
                        previousMonth: '이전 달',
                        nextMonth: '다음 달',
                        start: '시작',
                        end: '종료',
                    }}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            sx: {
                                height: '55px',
                            }
                        },
                    }}
                />

                {/* 도착 날짜 선택 */}
                <DatePicker
                    label="도착 날짜"
                    showDaysOutsideCurrentMonth
                    format="YYYY / MM / DD"
                    value={arrivalDate}
                    onChange={handleArrivalDateChange}
                    minDate={departureDate || undefined} // 출발 날짜 이후로만 선택 가능
                    localeText={{
                        cancelButtonLabel: '취소',
                        clearButtonLabel: '지우기',
                        todayButtonLabel: '오늘',
                        okButtonLabel: '확인',
                        previousMonth: '이전 달',
                        nextMonth: '다음 달',
                        start: '시작',
                        end: '종료',
                    }}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                        },
                    }}
                />
            </Box>
        </LocalizationProvider>
    );
}

export default SelectDate;
