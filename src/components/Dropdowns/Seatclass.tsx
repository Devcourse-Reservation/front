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

    const seatOptions = [
        { value: '1', label: '일반석', image: '/seatclass.png' },
        { value: '2', label: '비즈니스석', image: '/seatclass.png' },
    ];
    const selectedOption = seatOptions.find(option => option.value === seatClass);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                marginLeft: 'auto',
                marginRight: 'auto'
            }}
        >
            <Typography align="center" color='#5E5E5E'>
                좌석등급
            </Typography>

            <FormControl sx={{ m: 1, width: 150, height: 75 }}>
                <Select
                    labelId="seatclass-select-label"
                    id="seatclass-select"
                    value={seatClass}
                    onChange={handleChange}
                    renderValue={() => (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <img
                                src={selectedOption?.image}
                                alt={selectedOption?.label}
                                style={{ width: 24, height: 24 }}
                            />
                            {selectedOption?.label}
                        </Box>
                    )}
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
