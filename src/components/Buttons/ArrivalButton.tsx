import React from 'react'
import { MenuItem, Select } from '@mui/material'

interface Airport {
  id: number
  name: string
  code: string
}

interface ArrivalButtonProps {
  value: string
  onChange: (value: string) => void
  options: Airport[]
}

export default function ArrivalButton({
  value,
  onChange,
  options,
}: ArrivalButtonProps) {
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
