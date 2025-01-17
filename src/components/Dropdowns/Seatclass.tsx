import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Typography } from '@mui/material';

export default function SeatClass() {
    const [seatClass, setSeatClass] = React.useState<string>('1'); // 초기값: 일반석

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSeatClass(event.target.value);
    };

    // 좌석 등급 데이터 (동적 생성 가능)
    const seatOptions = [
        { value: '1', label: '일반석' },
        { value: '2', label: '프로라이언스석' },
    ];

    return (

        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
            <Typography variant="h6" align="center" color='#2D2736'>
                좌석등급
            </Typography>
            <FormControl sx={{ m: 1, width: 100, height: 75 }}>
                <InputLabel id="seatclass-select-label">좌석등급</InputLabel>
                <Select
                    labelId="seatclass-select-label"
                    id="seatclass-select"
                    value={seatClass}
                    onChange={handleChange}
                    label="좌석등급"
                >
                    {seatOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
