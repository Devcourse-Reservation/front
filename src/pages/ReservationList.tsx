import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Layout from '../components/layouts/Layout';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ReservationList() {
    const navigate = useNavigate()
    return (
        <Layout>
            <Box
                sx={{
                    marginLeft: '25vw',
                    marginRight: '25vw',
                    marginTop: '7vh',

                }}>
                <Box
                    sx={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: '#002597',
                        marginBottom: '3vh',
                    }}>
                    예약 목록
                </Box>
                <Stack direction="row" spacing={2} sx={{ marginBottom: 7 }}>
                    <Paper
                        variant="elevation"
                        elevation={3}
                        sx={{
                            height: '150px',
                            width: '100%',
                            padding: 5,
                            color: 'GrayText',
                            borderRadius: 5
                        }}>구매완료
                        <Typography
                            variant='h4'
                            sx={{
                                margin: '1vw',
                                display: 'flex',
                                direction: 'row',
                                justifyContent: 'space-around',
                                color: '#1E2A3C',
                                fontFamily: 'Raleway'
                            }}>CJJ 제주 --------------- GMP 김포
                        </Typography>
                        <Box
                            className="date-button-container"
                            sx={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    alignContent: 'end'
                                }}>
                                <Typography
                                    variant='h5'
                                    sx={{
                                        color: 'gray',
                                        textAlign: 'right',
                                        fontFamily: 'Raleway'
                                    }}>2025년 1월 22일 (화) 16:25
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: '60%',
                                    textAlign: 'right'
                                }}>
                                <Button variant='contained'
                                    sx={{
                                        fontSize: 20,
                                        backgroundColor: '#1871FF',
                                        borderRadius: 3
                                    }}
                                    onClick={() => navigate('/reservation-detail')}
                                >
                                    예약 상세</Button>
                            </Box>
                        </Box>

                    </Paper>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ marginBottom: 7 }}>
                    <Paper
                        variant="elevation"
                        elevation={3}
                        sx={{
                            height: '150px',
                            width: '100%',
                            padding: 5,
                            color: 'GrayText',
                            borderRadius: 5
                        }}>구매완료
                        <Typography
                            variant='h4'
                            sx={{
                                margin: '1vw',
                                display: 'flex',
                                direction: 'row',
                                justifyContent: 'space-around',
                                color: '#1E2A3C',
                                fontFamily: 'Raleway'
                            }}>CJJ 제주 --------------- GMP 김포
                        </Typography>
                        <Box
                            className="date-button-container"
                            sx={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    alignContent: 'end'
                                }}>
                                <Typography
                                    variant='h5'
                                    sx={{
                                        color: 'gray',
                                        textAlign: 'right',
                                    }}>2025년 1월 22일 (화) 16:25
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: '60%',
                                    textAlign: 'right'
                                }}>
                                <Button variant='contained'
                                    sx={{
                                        fontSize: 20,
                                        backgroundColor: '#1871FF',
                                        borderRadius: 3
                                    }}>예약 상세</Button>
                            </Box>
                        </Box>

                    </Paper>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ marginBottom: 7 }}>
                    <Paper
                        variant="elevation"
                        elevation={3}
                        sx={{
                            height: '150px',
                            width: '100%',
                            padding: 5,
                            color: 'GrayText',
                            borderRadius: 5
                        }}>구매완료
                        <Typography
                            variant='h4'
                            sx={{
                                margin: '1vw',
                                display: 'flex',
                                direction: 'row',
                                justifyContent: 'space-around',
                                color: '#1E2A3C',
                                fontFamily: 'Raleway'
                            }}>CJJ 제주 --------------- GMP 김포
                        </Typography>
                        <Box
                            className="date-button-container"
                            sx={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    alignContent: 'end'
                                }}>
                                <Typography
                                    variant='h5'
                                    sx={{
                                        color: 'gray',
                                        textAlign: 'right',
                                    }}>2025년 1월 22일 (화) 16:25
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: '60%',
                                    textAlign: 'right'
                                }}>
                                <Button variant='contained'
                                    sx={{
                                        fontSize: 20,
                                        backgroundColor: '#1871FF',
                                        borderRadius: 3
                                    }}>예약 상세</Button>
                            </Box>
                        </Box>

                    </Paper>
                </Stack>
            </Box>
        </Layout>
    );
}
