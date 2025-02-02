import { Box, Typography } from '@mui/material'
import InfoButton from '../Buttons/InfoButton'
import ListButton from '../Buttons/ListButton'
import PrepareButton from '../Buttons/PrepareButton'
import BackgroundLetterAvatars from '../Buttons/avatar'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <div
      className="header-container"
      style={{
        margin: '7vh 20vh 3vh 20vh',
      }}
    >
      <header>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: 45,
                fontWeight: 'bold',
                color: '#1E2A3C',
                textShadow: '0px 3px 3px gray',
                cursor: 'pointer',
              }}
              onClick={handleClick}
            >
              ProAliance
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 3,
            }}
          >
            <InfoButton />
            <ListButton />
            <PrepareButton />
          </Box>
          <BackgroundLetterAvatars />
        </Box>
      </header>
    </div>
  )
}
export default Header
