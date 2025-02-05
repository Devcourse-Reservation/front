/**searchFlights.ts */
import axios from 'axios'
import { Flight } from '../types'

const API_HOST = process.env.API_BASE_URL || 'http://localhost:3000'

interface SearchParams {
  origin: string
  destination: string
  departureDate: string | null
  returnDate: string | null
  passengers: number
  seatClass: string
}

export const searchFlights = async (params: SearchParams) => {
  try {
    console.log('요청 데이터: ', params)

    const { data } = await axios.post(`${API_HOST}/flights/search`, {
      origin: params.origin.split(' ')[0], // 공항 코드만 추출
      destination: params.destination.split(' ')[0],
      departureDate: params.departureDate,
      returnDate: params.returnDate || null,
      passengers: params.passengers,
      seatClass: params.seatClass,
    })

    console.log('검색 결과:', data)
    return data // 검색된 항공편 데이터 반환
  } catch (error) {
    console.error('항공편 검색 중 오류 발생:', error)
    throw new Error('항공편을 검색하는 중 오류가 발생했습니다.')
  }
}
