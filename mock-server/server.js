/**server.js */
const express = require('express')
const cors = require('cors')
const faker = require('@faker-js/faker').faker
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// 항공편 검색
app.post('/api/flights/search', (req, res) => {
  const {
    origin,
    destination,
    departureDate,
    returnDate,
    passengers,
    seatClass,
  } = req.body

  console.log('✈️ 항공편 검색 요청 받음:', req.body)

  const mockResponse = {
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

  setTimeout(() => res.json(mockResponse), 1000) // 1초 딜레이 후 응답
})

// ✨ 예시 API: 예약 정보 리스트
app.get('/api/reservations', (req, res) => {
  const reservations = Array.from({ length: 5 }).map(() => ({
    id: faker.datatype.uuid(),
    customerName: faker.name.fullName(),
    flightNumber: faker.random.alphaNumeric(6).toUpperCase(),
    departure: faker.address.cityName(),
    destination: faker.address.cityName(),
    status: faker.helpers.arrayElement(['Confirmed', 'Pending', 'Cancelled']),
    date: faker.date.future().toISOString(),
  }))
  res.json(reservations)
})

// ✨ 예시 API: 특정 예약 정보
app.get('/api/reservations/:id', (req, res) => {
  const { id } = req.params
  const reservation = {
    id,
    customerName: faker.name.fullName(),
    flightNumber: faker.random.alphaNumeric(6).toUpperCase(),
    departure: faker.address.cityName(),
    destination: faker.address.cityName(),
    status: faker.helpers.arrayElement(['Confirmed', 'Pending', 'Cancelled']),
    date: faker.date.future().toISOString(),
  }
  res.json(reservation)
})

// ✨ 예시 API: 예약 생성
app.post('/api/reservations', (req, res) => {
  const newReservation = {
    id: faker.datatype.uuid(),
    ...req.body, // 요청 데이터 유지
  }
  res.status(201).json(newReservation)
})

// ✨ 예시 API: 예약 수정
app.put('/api/reservations/:id', (req, res) => {
  const { id } = req.params
  res.json({ message: `Reservation ${id} updated`, updatedData: req.body })
})

// ✨ 예시 API: 예약 삭제
app.delete('/api/reservations/:id', (req, res) => {
  const { id } = req.params
  res.json({ message: `Reservation ${id} deleted` })
})

// ✨ 기본 루트
app.get('/', (req, res) => {
  res.send('✈️ Mock Server is running!')
})

// 서버 실행
app.listen(PORT, () => {
  console.log(`✅ Mock Server is running on http://localhost:${PORT}`)
})
