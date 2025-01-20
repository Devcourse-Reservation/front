import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Typography } from '@mui/material';

const options = ['서울', '부산', '제주', '청주', '광주'];

interface ButtonProps {
    value: string;
    onChange: (newValue: string) => void;
}

export default function ArrivalButton({ value, onChange }: ButtonProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        onChange(options[index]);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <List component="nav" aria-label="Location selector">
                <ListItemButton onClick={handleClickListItem}>
                    <ListItemText
                        sx={{
                            justifyItems: 'center'
                        }}
                        primary="To"
                        secondary={value}
                        primaryTypographyProps={{ fontSize: '48px' }}
                        secondaryTypographyProps={{ fontSize: '20px', color: 'gray' }}
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
                        key={option}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
