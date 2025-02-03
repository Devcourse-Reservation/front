import axios from 'axios'

const API_HOST = 'https://backend.com' // 실제 백엔드 주소로 변경

export const getTicketById = async (ticketId: number, token: string) => {
  try {
    const response = await axios.get(`${API_HOST}/tickets/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const { ticket, passengerCount } = response.data

    return {
      id: ticket.id,
      reservationNumber: ticket.reservationNumber,
      ticketType: ticket.ticketType,
      status: ticket.status,
      reservedAt: ticket.reservedAt,
      cancelledAt: ticket.cancelledAt,
      createdAt: ticket.createdAt,
      seat: {
        class: ticket.Seat.class,
        status: ticket.Seat.status,
      },
      flight: {
        airline: ticket.Flight.airline,
        departureTime: ticket.Flight.departureTime,
        arrivalTime: ticket.Flight.arrivalTime,
        departureAirport: {
          name: ticket.Flight.departureAirport.name,
          code: ticket.Flight.departureAirport.code,
        },
        arrivalAirport: {
          name: ticket.Flight.arrivalAirport.name,
          code: ticket.Flight.arrivalAirport.code,
        },
      },
      passengerCount: passengerCount,
    }
  } catch (error) {
    console.error('티켓 조회 중 오류 발생:', error)
    throw new Error('티켓 정보를 불러올 수 없습니다.')
  }
}
