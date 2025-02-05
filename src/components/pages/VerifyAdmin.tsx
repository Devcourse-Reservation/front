import { useState } from 'react';
import { Box, Button, Container, Paper, TextField, Typography, CircularProgress } from '@mui/material';

const API_BASE_URL = 'http://localhost:3000'; // 백엔드 API 주소

export default function AdminVerification() {
  const [emailSent, setEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 1️⃣ 관리자 인증 코드 요청 (이메일 전송)
  const handleRequestAdminCode = async () => {
    try {
      setLoading(true);
      setMessage('');

      const response = await fetch(`${API_BASE_URL}/auth/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 쿠키 포함
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || '관리자 인증 코드 요청 실패');

      setEmailSent(true);
      setMessage('✅ 인증 코드가 이메일로 전송되었습니다.');
    } catch (error) {
      setMessage(`❌ 오류: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ 인증 코드 검증
  const handleVerifyAdmin = async () => {
    try {
      setLoading(true);
      setMessage('');

      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ verificationCode }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || '관리자 인증 실패');

      setMessage('🎉 관리자 인증 완료! 이제 관리자 권한이 부여되었습니다.');
    } catch (error) {
      setMessage(`❌ 오류: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          관리자 인증
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
          이메일을 통해 인증 코드를 받아 관리자 권한을 요청하세요.
        </Typography>

        {/* 1️⃣ 관리자 인증 코드 요청 버튼 */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRequestAdminCode}
            disabled={loading || emailSent}
            sx={{ width: '100%', py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : '이메일로 인증 코드 받기'}
          </Button>
        </Box>

        {/* 2️⃣ 인증 코드 입력 필드 */}
        {emailSent && (
          <>
            <TextField
              fullWidth
              label="인증 코드 입력"
              variant="outlined"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              sx={{ mb: 3 }}
            />

            {/* 3️⃣ 인증 코드 검증 버튼 */}
            <Button
              variant="contained"
              color="success"
              onClick={handleVerifyAdmin}
              disabled={loading || !verificationCode}
              sx={{ width: '100%', py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} /> : '인증 코드 확인'}
            </Button>
          </>
        )}

        {/* 메시지 출력 (성공 / 실패) */}
        {message && (
          <Typography
            variant="body1"
            color={message.includes('✅') || message.includes('🎉') ? 'green' : 'error'}
            sx={{ textAlign: 'center', mt: 2 }}
          >
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
