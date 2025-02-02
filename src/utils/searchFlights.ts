export const searchFlights = async ({
  origin,
  destination,
  departureDate,
  returnDate,
  passengers,
  seatClass,
}: {
  origin: string
  destination: string
  departureDate: string | null
  returnDate: string | null
  passengers: number
  seatClass: string
}) => {
  try {
    const response = await fetch('url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origin: origin.split(' ')[0], //공항 코드만 추출
        destination: destination.split(' ')[0],
        departureDate,
        returnDate,
        passengers,
        seatClass,
      }),
    })

    if (!response.ok) {
      throw new Error('검색 요청 실패')
    }

    const data = await response.json()
    console.log('검색 결과: ', data)


    return data
  } catch (err) {
    console.error('항공편 검색 중 오류 발생: ', err)
    throw err
  }
}
