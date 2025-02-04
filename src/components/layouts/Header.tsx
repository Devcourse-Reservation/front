import { Box } from "@mui/material"
import InfoButton from "../Buttons/InfoButton"
import ListButton from "../Buttons/ListButton"
import PrepareButton from "../Buttons/PrepareButton"
import LoginButton from "../Buttons/LoginButton"
import LogoutButton from "../Buttons/LogoutButton"
import Logo from "../images/Logo"
import BackgroundLetterAvatars from "../Buttons/avatar"

const Header = () => {
    return (
        <div className="header-container"
            style={{
                marginLeft: '15vh'
            }}
        >
            <header>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 30
                    }}>
                    <Box>
                        <Logo />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyItems: 'right',
                            alignItems: 'center',
                            gap: 3
                        }}>
                        <Box>
                            <InfoButton />
                        </Box>
                        <Box>
                            <ListButton />
                        </Box>
                        <Box>
                            <PrepareButton />
                        </Box>
                        <Box>
                            <LoginButton />
                        </Box>
                        <Box>
                            <LogoutButton />
                        </Box>
                        <Box
                            sx={{
                                marginLeft: 55
                            }}>
                            <BackgroundLetterAvatars />
                        </Box>
                    </Box>
                </Box>
            </header>

        </div >
    )
}
export default Header