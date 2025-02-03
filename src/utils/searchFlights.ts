import { Flight } from '../types'

const API_HOST = 'https://backend.com' // 아직 연결 안됨

// ✅ 매개변수 타입을 명확히 지정
interface SearchParams {
  origin: string
  destination: string
  departureDate: string | null
  returnDate: string | null
  passengers: number
  seatClass: string
}

// ✅ 반환 타입도 명확히 지정
export const searchFlights = async ({
  origin,
  destination,
  departureDate,
  returnDate,
  passengers,
  seatClass,
}: SearchParams): Promise<{
  departureFlights: Flight[]
  returnFlights: Flight[]
}> => {
  try {
    console.log('요청 데이터: ', {
      origin,
      destination,
      departureDate,
      returnDate,
      passengers,
      seatClass,
    })

    // // 백엔드 연결 시 주석 해제
    // const response = await fetch(`${API_HOST}/flights/search`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     origin: origin.split(' ')[0], //공항 코드만 추출
    //     destination: destination.split(' ')[0],
    //     departureDate,
    //     returnDate,
    //     passengers,
    //     seatClass,
    //   }),
    // })

    // console.log('응답 상태 코드: ', response.status)

    // if (!response.ok) {
    //   throw new Error(`검색 요청 실패: ${response.statusText}`)
    // }

    // const data = await response.json()
    // console.log('검색 결과: ', data)

    // return data

    // Mock 데이터
    const mockResponse: {
      departureFlights: Flight[]
      returnFlights: Flight[]
    } = {
      departureFlights: [
        {
          id: 1,
          flightName: 'DL202',
          airline: 'Delta Airlines',
          status: 'Scheduled',
          departureAirportId: 1,
          arrivalAirportId: 2,
          departureTime: `${departureDate}T08:00:00.000Z`,
          arrivalTime: `${departureDate}T11:30:00.000Z`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          departureAirport: { code: origin },
          arrivalAirport: { code: destination },
        },
      ],
      returnFlights: returnDate
        ? [
            {
              id: 2,
              flightName: 'DL203',
              airline: 'Delta Airlines',
              status: 'Scheduled',
              departureAirportId: 2,
              arrivalAirportId: 1,
              departureTime: `${returnDate}T18:00:00.000Z`,
              arrivalTime: `${returnDate}T21:30:00.000Z`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              departureAirport: { code: destination },
              arrivalAirport: { code: origin },
            },
          ]
        : [],
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve(mockResponse), 1000)
    )
  } catch (err) {
    console.error('항공편 검색 중 오류 발생: ', err)
    throw err
  }
}
