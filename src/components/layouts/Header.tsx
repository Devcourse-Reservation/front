import { Box, Typography } from "@mui/material"
import InfoButton from "../Buttons/InfoButton"
import ListButton from "../Buttons/ListButton"
import PrepareButton from "../Buttons/PrepareButton"
import BackgroundLetterAvatars from "../Buttons/avatar"

const Header = () => {
    return (
        <div className="header-container"
            style={{
                marginTop: '7vh',
                marginLeft: '25vh',
                marginRight: '25vh',
                marginBottom: '3vh'
            }}
        >
            <header>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: 45,
                            fontWeight: 'bold',

                        }}
                        style={{ color: '#1E2A3C', textShadow: '0px 3px 3px gray' }}>ProAliance</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 3
                        }}>
                        <InfoButton />
                        <ListButton />
                        <PrepareButton />
                    </Box>
                    <BackgroundLetterAvatars />
                </Box>
            </header>

        </div >
    )
}
export default Header