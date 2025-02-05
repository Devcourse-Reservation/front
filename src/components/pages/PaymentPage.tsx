import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import Layout from '../layouts/Layout';

// 1) PortOne 라이브러리 import (NPM 설치 방식)
import * as PortOne from "@portone/browser-sdk/v2";

const API_BASE_URL = 'http://localhost:3000'; // 백엔드 API 주소

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const flightData = location.state;

  const [paymentMethod, setPaymentMethod] = useState('CreditCard');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!flightData) {
      console.warn('🚨 결제 페이지: 항공편 정보 없음! 메인 페이지로 이동');
      navigate('/');
    }
  }, [flightData, navigate]);

  // 2) PortOne 결제 요청 함수
  const handlePortOnePay = async () => {
    try {
      setLoading(true);

      // 임의로 유니크한 paymentId 생성
      const paymentId = `payment-${crypto.randomUUID()}`;
      console.log('✅ 결제 요청 시작, paymentId:', paymentId);

      // 2-1) PortOne 결제창 띄우기
      const response = await PortOne.requestPayment({
        storeId: 'store-c7aec711-c95a-4a18-ade8-ec01e53639ce', // 예시 storeId
        paymentId: paymentId,
        orderName: '테스트 결제 상품',
        totalAmount: 100,
        currency: 'CURRENCY_KRW',
        channelKey: 'channel-key-ee0d1ad2-5d7b-49ea-8c77-5c700380f98f', // 예시 채널 키
        payMethod: 'EASY_PAY', // 예시로 간편결제
        bypass: {
          kakaopay: {
            custom_message: '여기가 안내 문구영역입니다.'
          }
        }
      });

      if (response == undefined) {
        // PortOne 결제창에서 에러가 난 경우
        alert("포트원 문제발생"+ response);
        return;
      }

      // 2-2) 결제 완료 후 서버에 검증 요청
      const notified = await fetch(`${API_BASE_URL}/payments/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId, // 결제와 동일한 paymentId
          order: 2, // 예시: 서버에서 결제 검증할 Ticket ID 또는 주문 ID
        }),
      });

      if (!notified.ok) {
        throw new Error('서버에서 결제 검증 실패');
      }

      // 2-3) 결제 성공 시 처리
      const result = await notified.json();
      console.log('✅ 결제 검증 완료:', result);

      alert('결제 완료!');
      navigate('/reservation-success', { state: result });
    } catch (error) {
      console.error('결제 오류:', error);
      alert('❌ 결제 오류 발생: ' + error);
    } finally {
      setLoading(false);
    }
  };

  // 3) 환불 요청 함수
  const handlePortOneRefund = async () => {
    try {
      setLoading(true);

      const paymentId = 'payment-1df187c0-0e46-4ca9-b139-8c84c37ae2c9'; // 예시
      console.log('✅ 환불 요청 시작, paymentId:', paymentId);

      const notified = await fetch(`${API_BASE_URL}/payments/refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId, // 환불할 paymentId
          reason: '단순 변심',
        }),
      });

      if (!notified.ok) {
        throw new Error('서버에서 환불 검증 실패');
      }

      // 환불 성공 시 처리
      const result = await notified.json();
      console.log('✅ 환불 성공:', result);

      alert('환불 완료!');
    } catch (error) {
      console.error('환불 오류:', error);
      alert('❌ 환불 오류 발생: '+ error);
    } finally {
      setLoading(false);
    }
  };

  // 4) 기존 `handlePayment` 함수 (신용카드 직접 결제 API 등)와는 별개로
  // PortOne 결제를 사용하려면 위 2개 함수를 호출

  // flightData가 없으면 null
  if (!flightData) return null;

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            결제 페이지
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            선택한 항공편
          </Typography>

          {/* ============= 기존 예약 정보 표시 ============= */}
          {/* <Typography variant="subtitle1">
            ✈ {flightData.selectedDepartureFlight.airline} -{' '}
            {flightData.selectedDepartureFlight.flightName}
          </Typography>
          <Typography variant="body1">
            {flightData.selectedDepartureFlight.origin} →{' '}
            {flightData.selectedDepartureFlight.destination}
          </Typography>
          <Typography variant="body2">
            출발: {flightData.selectedDepartureFlight.departureTime} | 도착:{' '}
            {flightData.selectedDepartureFlight.arrivalTime}
          </Typography>

          {flightData.selectedArrivalFlight && (
            <>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                ✈ {flightData.selectedArrivalFlight.airline} -{' '}
                {flightData.selectedArrivalFlight.flightName}
              </Typography>
              <Typography variant="body1">
                {flightData.selectedArrivalFlight.origin} →{' '}
                {flightData.selectedArrivalFlight.destination}
              </Typography>
              <Typography variant="body2">
                출발: {flightData.selectedArrivalFlight.departureTime} | 도착:{' '}
                {flightData.selectedArrivalFlight.arrivalTime}
              </Typography>
            </>
          )}

          {/* ============= 기존 결제 방식 (신용카드/계좌이체 등) ============= */}
          {/* <Box sx={{ mt: 3 }}>
            <Typography variant="h6">💳 결제 방법 선택</Typography>
            <Select
              fullWidth
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value="CreditCard">신용카드</MenuItem>
              <MenuItem value="BankTransfer">계좌이체</MenuItem>
              <MenuItem value="EasyPay">간편결제</MenuItem>
            </Select>
          </Box> */}

          {/* ============= 기존 버튼 (백엔드 직접 결제) ============= */}
          {/* 
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePayment}
              disabled={loading}
              sx={{ width: '100%', py: 1.5 }}
            >
              {loading ? '결제 처리 중...' : '결제하기'}
            </Button>
          </Box>
          */}

          {/* ============= PortOne 버튼 추가 ============= */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePortOnePay}
              disabled={loading}
              sx={{ width: '100%', py: 1.5, mb: 2 }}
            >
              {loading ? '결제 처리 중...' : 'PortOne로 결제하기'}
            </Button>
            <Button
              variant="outlined"
              color="warning"
              onClick={handlePortOneRefund}
              disabled={loading}
              sx={{ width: '100%', py: 1.5 }}
            >
              {loading ? '환불 처리 중...' : '환불하기'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}
