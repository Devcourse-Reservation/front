import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Box, Typography } from '@mui/material';

const options = [
    { name: '서울', code: 'ICN' },
    { name: '부산', code: 'PUS' },
    { name: '제주', code: 'CJU' },
    { name: '청주', code: 'CJJ' },
    { name: '광주', code: 'KWJ' },
]

interface ButtonProps {
    value: string;
    onChange: (newValue: string) => void
}

export default function ArrivalButton({ value, onChange }: ButtonProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        onChange(`${options[index].code} ${options[index].name}`)
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <List component="nav" aria-label="Location selector">
                <ListItemButton onClick={handleClickListItem} sx={{ textAlign: 'center' }}>
                    <ListItemText
                        primary={value || "도착지"}
                        secondary="도착지"
                        primaryTypographyProps={{ fontSize: '22px', color: '#1E2A3C', fontWeight: 'bold' }}
                        secondaryTypographyProps={{ fontSize: '15px', color: 'gray' }}
                    />
                </ListItemButton>
            </List>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option.code}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        <Typography
                            variant="body1"
                            sx={{ fontWeight: 'bold', marginRight: 1 }}
                        >
                            {option.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: 'gray' }}
                        >
                            {option.code}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
