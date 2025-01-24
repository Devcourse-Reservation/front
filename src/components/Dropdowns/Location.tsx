import React from 'react';
import Box from '@mui/material/Box';
import TicketIcon from '../images/TicketIcon';
import ArrivalButton from '../Buttons/ArrivalButton';
import DepartureButton from '../Buttons/DepartButton';

export default function LocationSelect() {
    const [from, setFrom] = React.useState<string>('서울');
    const [to, setTo] = React.useState<string>('부산');

    const handleFromChange = (newFrom: string) => {
        if (newFrom === to) {
            alert("출발지와 도착지는 같을 수 없습니다.");
            return; // 같은 값을 선택하지 않도록 막음
        }
        setFrom(newFrom);
    }

    const handleToChange = (newTo: string) => {
        if (newTo === from) {
            alert("도착지와 출발지는 같을 수 없습니다.");
            return; // 같은 값을 선택하지 않도록 막음
        }
        setTo(newTo);
    };

    const swapLocations = () => {
        if (from !== to) {
            setFrom(to);
            setTo(from);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
            }}
        >
            {/* 출발지 선택 */}
            <Box>
                <DepartureButton
                    value={from}
                    onChange={handleFromChange}
                />
            </Box>

            <TicketIcon
                onClick={swapLocations}
                style={{ cursor: 'pointer' }}
            />
            {/* 도착지 선택 */}
            <Box
                sx={{
                    margin: 0,
                    justifyItems: 'center'
                }}>
                <ArrivalButton
                    value={to}
                    onChange={handleToChange}
                />
            </Box>
        </Box>
    );
}
