// src/types.ts
export interface Flight {
  id: number
  flightName: string
  airline: string
  status: string
  departureAirportId: number
  arrivalAirportId: number
  departureTime: string
  arrivalTime: string
  createdAt: string
  updatedAt: string
  departureAirport: {
    code: string
  }
  arrivalAirport: {
    code: string
  }
}
