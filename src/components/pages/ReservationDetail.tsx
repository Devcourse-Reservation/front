import React from 'react';
import Layout from '../layouts/Layout';
import { Box, Container, Grid2, Typography } from '@mui/material';

interface ReservationDetailData {
    reservationNumber: string;
    route: string;
    flightInfo: {
        departureDate: string;
        returnDate: string;
    };
    seatInfo: string;
    passengers: {
        name: string;
        contact: string;
    }[];
    totalPrice: string;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Box>
        <Typography variant="h5" fontWeight="bold" letterSpacing={2} sx={{ color: '#1E2A3C', marginBottom: 2 }}>
            {title}
        </Typography>
        <Box padding={3} sx={{ border: 2, borderRadius: 3, borderColor: '#929292' }}>
            {children}
        </Box>
    </Box>
);

export default function ReservationDetail() {
    const reservationData: ReservationDetailData = {
        reservationNumber: 'ABCDEFGHIJKLMN / 예약확정',
        route: 'CJJ 제주 -------------- GMP 김포 대한항공(KE862편) / 왕복',
        flightInfo: {
            departureDate: '2025-1-22 16:25',
            returnDate: '2025-1-26 16:25',
        },
        seatInfo: '15A (일반석)',
        passengers: [
            { name: '장서희', contact: '010-1234-1234' },
        ],
        totalPrice: '123,456원',
    };

    const sections = [
        {
            title: '예약번호',
            content: <Typography>{reservationData.reservationNumber}</Typography>,
        },
        {
            title: '구간',
            content: (
                <>
                    <Typography>{reservationData.route}</Typography>
                    <Typography>가는날: {reservationData.flightInfo.departureDate}</Typography>
                    <Typography>오는날: {reservationData.flightInfo.returnDate}</Typography>
                </>
            ),
        },
        {
            title: '좌석정보',
            content: <Typography>{reservationData.seatInfo}</Typography>,
        },
        {
            title: '탑승객 정보',
            content: reservationData.passengers.map((passenger, index) => (
                <Typography key={index}>
                    {`탑승자${index + 1}: ${passenger.name}, 연락처: ${passenger.contact}`}
                </Typography>
            )),
        },
        {
            title: '결제 내역',
            content: <Typography>총액: {reservationData.totalPrice}</Typography>,
        },
    ];

    return (
        <Layout>
            <Container fixed>
                <Box sx={{ height: '100vh', borderRadius: 20 }}>
                    <Box sx={{ padding: '5vw', textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#002597' }}>
                            예약 상세 페이지
                        </Typography>
                    </Box>
                    <Container>
                        <Grid2 container spacing={2} sx={{ flexDirection: 'column', gap: 7 }}>
                            {sections.map((section, index) => (
                                <Section key={index} title={section.title}>
                                    {section.content}
                                </Section>
                            ))}
                        </Grid2>
                    </Container>
                </Box>
            </Container>
        </Layout>
    );
}
