import React from 'react'
import { MenuItem, Select } from '@mui/material'

interface Airport {
  id: number
  name: string
  code: string
}

interface DepartureButtonProps {
  value: string
  onChange: (value: string) => void
  options: Airport[] // ✅ 공항 데이터 리스트 추가
}

export default function DepartureButton({
  value,
  onChange,
  options,
}: DepartureButtonProps) {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((airport) => (
        <MenuItem key={airport.id} value={airport.code}>
          {airport.name} ({airport.code})
        </MenuItem>
      ))}
    </Select>
  )
}
