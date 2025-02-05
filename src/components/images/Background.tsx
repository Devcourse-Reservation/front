import { Box } from '@mui/material'
import React from 'react'

const BackgroundBox = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url('/tempbackground.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  )
}
export default BackgroundBox
