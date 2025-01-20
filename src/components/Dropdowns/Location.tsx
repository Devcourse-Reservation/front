import React from 'react';
import Box from '@mui/material/Box';
import TicketIcon from '../images/TicketIcon';
import ArrivalButton from '../Buttons/ArrivalButton';
import DepartureButton from '../Buttons/DepartButton';
import SwitchButton from '../Buttons/SwitchButton';

export default function LocationSelect() {
    const [from, setFrom] = React.useState<string>('서울');
    const [to, setTo] = React.useState<string>('부산');

    const handleFromChange = (newFrom: string) => {
        setFrom(newFrom);
    };

    const handleToChange = (newTo: string) => {
        setTo(newTo);
    };

    const swapLocations = () => {
        setFrom(to);
        setTo(from);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 4
            }}>
            <Box
                className="button-container"
                sx={{
                    justifyItems: 'right',
                }}>
                <SwitchButton />
            </Box>

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
                <Box
                // sx={{
                //     margin: 0,
                //     justifyItems: 'center'
                // }}
                >
                    <DepartureButton
                        value={from}
                        onChange={handleFromChange}
                    />
                </Box>

                <TicketIcon onClick={swapLocations} style={{ cursor: 'pointer' }} />

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
        </Box>
    );
}
