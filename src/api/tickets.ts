import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000' // ✅ 실제 백엔드 주소로 변경

export const getTicketById = async (ticketId: number, token: string) => {
  try {
    // ✅ API 요청: axios 사용
    const response = await axios.get(`${API_BASE_URL}/tickets/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // 백엔드 인증 필요 시 추가
      },
    })

    // ✅ 응답 데이터 확인 (백엔드 스펙과 맞는지 체크 필요)
    const ticket = response.data

    // ✅ 반환할 데이터 구조 정리
    return {
      id: ticket.id,
      reservationNumber: ticket.reservationNumber,
      ticketType: ticket.ticketType,
      status: ticket.status,
      reservedAt: ticket.reservedAt,
      cancelledAt: ticket.cancelledAt,
      createdAt: ticket.createdAt,
      seat: {
        class: ticket.seat?.class, // ✅ seat 객체가 없는 경우 에러 방지
        status: ticket.seat?.status,
      },
      flight: {
        airline: ticket.flight?.airline, // ✅ flight 객체가 없는 경우 에러 방지
        departureTime: ticket.flight?.departureTime,
        arrivalTime: ticket.flight?.arrivalTime,
        departureAirport: {
          name: ticket.flight?.departureAirport?.name || '정보 없음',
          code: ticket.flight?.departureAirport?.code || 'N/A',
        },
        arrivalAirport: {
          name: ticket.flight?.arrivalAirport?.name || '정보 없음',
          code: ticket.flight?.arrivalAirport?.code || 'N/A',
        },
      },
      passengerCount: ticket.passengerCount || 1, // 기본값 설정
    }
  } catch (error: any) {
    console.error(
      '티켓 조회 중 오류 발생:',
      error.response?.data || error.message
    )
    throw new Error(
      `티켓 정보를 불러올 수 없습니다. (${error.response?.status || 'Unknown'})`
    )
  }
}
