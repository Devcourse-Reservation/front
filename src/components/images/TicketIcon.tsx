import React from 'react';

interface TicketIconProps {
    onClick?: () => void;
    style?: React.CSSProperties; // style 속성을 추가
}

const TicketIcon: React.FC<TicketIconProps> = ({ onClick, style }) => {
    return (
        <img
            src="/왕복.png"
            alt="icon"
            style={{
                width: '34px',
                height: '34px',
                ...style, // 전달받은 스타일 병합
            }}
            onClick={onClick} // 클릭 이벤트 핸들러
        />
    );
};

export default TicketIcon;
