import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SelectDate from "./Dropdowns/DatePicker";
import Passenger from "./Dropdowns/Passenger";
import SeatClass from "./Dropdowns/Seatclass";
import Button from "@mui/material/Button";
import { FormHelperText } from "@mui/material";
import LocationSelect from "./Dropdowns/Location";

export default function ReservationPart() {
    return (

        <Box
            className="ticket-container"
            sx={{
                display: "flex",
                flexDirection: "column",
                margin: '15vw',
                justifyContent: 'center',
                width: '100%',
                height: '100%'
            }}
        >
            <Box
                className="ticket-mile-container"
                sx={{
                    display: "inline-flex",
                    flexDirection: "row",
                    width: "100%"
                }}
            >
                <Button variant="contained"
                    sx={{
                        flex: 1,
                        height: "5vh",
                        padding: 2,
                        backgroundColor: "#1E2A3C",
                        color: "#ffffff",
                        borderTopLeftRadius: "25px",
                        borderTopRightRadius: '25px'
                    }}
                >
                    <Typography variant="h6">항공권 예매</Typography>
                </Button>

                <Button variant="contained"
                    sx={{
                        flex: 2,
                        height: "5vh",
                        padding: 2,
                        backgroundColor: "#1E2A3C",
                        color: "#ffffff",
                        borderTopLeftRadius: "25px",
                        borderTopRightRadius: '25px'
                    }}>
                    <Typography variant="h6">마일리지 예매</Typography>
                </Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: 'row',
                    height: '20vh',
                    alignItems: "stretch",
                }}
            >

                {/* 왼쪽 카드 */}
                <Paper
                    elevation={3}
                    sx={{
                        flex: 1,
                        padding: 2,
                        display: "flex",
                        flexDirection: "column",
                        borderBottomLeftRadius: "25px",
                    }}
                >
                    <Box sx={{ marginTop: 6 }}>
                        <LocationSelect />
                    </Box>
                </Paper>

                {/* 오른쪽 카드 */}
                <Paper
                    elevation={3}
                    sx={{
                        flex: 2,
                        padding: 2,
                        display: "inline-flex",
                        flexDirection: "row",
                        justifyContent: 'space-around',
                        borderBottomRightRadius: "25px",
                    }}
                >
                    <SelectDate />
                    <Box
                        className="passenger-seatclass-container"
                        sx={{
                            display: 'inline-flex',
                            flexDirection: 'row',
                            justifyContent: "space-evenly",
                            gap: 4
                        }}>
                        <Box
                            className='passenger-text-container'
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0
                            }}>
                            <Passenger />
                            <FormHelperText>
                                최대 9인까지 예매 가능합니다.
                            </FormHelperText>
                        </Box>
                        <SeatClass />
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}
