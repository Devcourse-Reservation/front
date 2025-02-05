/**Avatar */
import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import { useNavigate } from 'react-router-dom'

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      cursor: 'pointer',
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }
}

export default function BackgroundLetterAvatars() {
  const navigate = useNavigate()

  const handleClick = () => {
    console.log('Avatar clicked')
    navigate('/login') // 로그인 페이지로 이동
  }

  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        {...stringAvatar('User Name')}
        alt="User Name"
        sx={{ width: 56, height: 56 }}
        onClick={handleClick} // 클릭하면 로그인 페이지 이동
      />
    </Stack>
  )
}
