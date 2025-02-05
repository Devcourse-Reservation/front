import React from 'react';

interface TicketIconProps {
    onClick?: () => void;
    style?: React.CSSProperties;
}

const TicketIcon: React.FC<TicketIconProps> = ({ onClick, style }) => {
    return (
        <img
            src="/왕복.png"
            alt="icon"
            style={{
                width: '34px',
                height: '34px',
                ...style,
            }}
            onClick={onClick}
        />
    );
};

export default TicketIcon;
