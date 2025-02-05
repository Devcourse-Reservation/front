import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import TicketIcon from '../images/TicketIcon'
import ArrivalButton from '../Buttons/ArrivalButton'
import DepartureButton from '../Buttons/DepartButton'

interface Airport {
  id: number
  name: string
  code: string
}

interface LocationSelectProps {
  from: string
  to: string
  setFrom: (value: string) => void
  setTo: (value: string) => void
}

export default function LocationSelect({
  from,
  to,
  setFrom,
  setTo,
}: LocationSelectProps) {
  const [airports, setAirports] = useState<Airport[]>([]) // 공항 목록 상태

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch('http://localhost:3000/airports') // ✅ 백엔드 API 호출
        if (!response.ok) throw new Error('공항 데이터를 불러올 수 없습니다.')
        const data = await response.json()
        console.log('공항 데이터 로딩 성공: ', data)
        setAirports(data) // 공항 목록 업데이트
      } catch (err) {
        console.error('공항 정보 로딩 실패:', err)
      }
    }
    fetchAirports()
  }, [])

  useEffect(() => {
    console.log('🔍 useState에 저장된 공항 데이터:', airports)
  }, [airports]) // 공항 데이터가 변경될 때마다 실행

  const handleFromChange = (newFrom: string) => {
    if (newFrom === to) {
      alert('출발지와 도착지는 같을 수 없습니다.')
      return
    }
    setFrom(newFrom)
  }

  const handleToChange = (newTo: string) => {
    if (newTo === from) {
      alert('도착지와 출발지는 같을 수 없습니다.')
      return
    }
    setTo(newTo)
  }

  const swapLocations = () => {
    if (from !== to) {
      setFrom(to)
      setTo(from)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
      }}
    >
      {/* 출발지 선택 */}
      <Box>
        <DepartureButton
          value={from}
          onChange={handleFromChange}
          options={airports}
        />
      </Box>

      <TicketIcon onClick={swapLocations} style={{ cursor: 'pointer' }} />

      {/* 도착지 선택 */}
      <Box sx={{ margin: 0, justifyItems: 'center' }}>
        <ArrivalButton
          value={to}
          onChange={handleToChange}
          options={airports}
        />
      </Box>
    </Box>
  )
}
