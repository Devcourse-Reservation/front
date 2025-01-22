import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select'; // MUI의 SelectChangeEvent 타입

export default function LocationSelect() {
    const [from, setFrom] = React.useState<string>('서울');
    const [to, setTo] = React.useState<string>('부산');

    const handleFromChange = (event: SelectChangeEvent<string>) => {
        setFrom(event.target.value);
    };

    const handleToChange = (event: SelectChangeEvent<string>) => {
        setTo(event.target.value);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
            }}
        >
            {/* 출발지 선택 */}
            <Box>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    From
                </Typography>
                <Select
                    value={from}
                    onChange={handleFromChange}
                    displayEmpty
                    sx={{ width: 120 }}
                >
                    <MenuItem value="서울">서울</MenuItem>
                    <MenuItem value="부산">부산</MenuItem>
                    <MenuItem value="제주">제주</MenuItem>
                    <MenuItem value="대구">대구</MenuItem>
                </Select>
            </Box>

            <Typography variant="body1">=</Typography>

            {/* 도착지 선택 */}
            <Box>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    To
                </Typography>
                <Select
                    value={to}
                    onChange={handleToChange}
                    displayEmpty
                    sx={{ width: 120 }}
                >
                    <MenuItem value="서울">서울</MenuItem>
                    <MenuItem value="부산">부산</MenuItem>
                    <MenuItem value="제주">제주</MenuItem>
                    <MenuItem value="대구">대구</MenuItem>
                </Select>
            </Box>
        </Box>
    );
}
