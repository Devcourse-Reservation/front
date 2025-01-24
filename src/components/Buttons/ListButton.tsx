import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ListButton() {
    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant="text"
                size='large'
                sx={{
                    fontSize: 22,
                    color: '#1E2A3C'
                }}>항공편</Button>
        </Stack>
    );
}