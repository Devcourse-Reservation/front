import { Box } from "@mui/material";

const BackgroundBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Box
        sx={{
            backgroundImage: `url('/tempbackground.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '50vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        {children}
    </Box>
);

export default BackgroundBox;
