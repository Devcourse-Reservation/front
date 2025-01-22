import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SelectDate from "./Dropdowns/DatePicker";
import LocationSelect from "./Dropdowns/Location";
import Passenger from "./Dropdowns/Passenger";
import SeatClass from "./Dropdowns/Seatclass";

export default function ReservationPart() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                margin: "0 20vw",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "stretch",
                }}
            >
                {/* 항공권 예매 */}
                <Paper
                    elevation={3}
                    sx={{
                        flex: 1, // 비율 1
                        padding: 2,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box sx={{ marginTop: 2 }}>
                        <LocationSelect />
                    </Box>
                </Paper>

                {/* 마일리지 예매 */}
                <Paper
                    elevation={3}
                    sx={{
                        flex: 2, // 비율 2 (더 넓게 설정)
                        padding: 2,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            marginTop: 2,
                        }}
                    >
                        <SelectDate />
                        <Passenger />
                        <SeatClass />
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}
