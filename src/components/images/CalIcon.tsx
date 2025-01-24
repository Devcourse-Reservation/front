import React from 'react';

interface CalIconprpos {
    onClick?: () => void;
    style?: React.CSSProperties;
}

const CalIcon: React.FC<CalIconprpos> = ({ onClick, style }) => {
    return (
        <img
            src="/날짜.png"
            alt="cal-icon"
            style={{
                width: '20px',
                height: '20px',
                ...style,
            }}
            onClick={onClick}
        />
    );
};

export default CalIcon;
