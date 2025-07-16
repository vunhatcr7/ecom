import React from 'react';
import { Box } from '@mui/material';
import backgroundImage from '../img/backgroundlogin.jpg';
import {
    Code,
    DataObject,
    Storage,
    Web,
    PhoneAndroid,
    Cloud,
    Security,
    Psychology,
    School,
    Computer,
} from '@mui/icons-material';

const BackgroundPattern: React.FC = () => {
    const icons = [
        { icon: <Code />, color: '#FF6B6B', size: 40 },
        { icon: <DataObject />, color: '#4ECDC4', size: 35 },
        { icon: <Storage />, color: '#45B7D1', size: 45 },
        { icon: <Web />, color: '#96CEB4', size: 38 },
        { icon: <PhoneAndroid />, color: '#FFEAA7', size: 42 },
        { icon: <Cloud />, color: '#DDA0DD', size: 36 },
        { icon: <Security />, color: '#98D8C8', size: 39 },
        { icon: <Psychology />, color: '#F7DC6F', size: 41 },
        { icon: <School />, color: '#BB8FCE', size: 44 },
        { icon: <Computer />, color: '#85C1E9', size: 37 },
    ];

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                overflow: 'hidden',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.4)', // Overlay để text dễ đọc hơn
                },
            }}
        >
            {/* Floating Icons */}
            {icons.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        position: 'absolute',
                        color: item.color,
                        opacity: 0.1,
                        animation: `float ${8 + index * 0.5}s ease-in-out infinite`,
                        animationDelay: `${index * 0.5}s`,
                        '@keyframes float': {
                            '0%, 100%': {
                                transform: 'translateY(0px) rotate(0deg)',
                            },
                            '50%': {
                                transform: 'translateY(-20px) rotate(180deg)',
                            },
                        },
                    }}
                    style={{
                        top: `${10 + (index * 8) % 80}%`,
                        left: `${5 + (index * 12) % 90}%`,
                        fontSize: item.size,
                    }}
                >
                    {item.icon}
                </Box>
            ))}

            {/* Additional smaller icons */}
            {Array.from({ length: 15 }).map((_, index) => (
                <Box
                    key={`small-${index}`}
                    sx={{
                        position: 'absolute',
                        color: `hsl(${index * 25}, 70%, 60%)`,
                        opacity: 0.05,
                        animation: `floatSmall ${6 + index * 0.3}s ease-in-out infinite`,
                        animationDelay: `${index * 0.3}s`,
                        '@keyframes floatSmall': {
                            '0%, 100%': {
                                transform: 'translateY(0px) rotate(0deg) scale(1)',
                            },
                            '50%': {
                                transform: 'translateY(-15px) rotate(90deg) scale(1.1)',
                            },
                        },
                    }}
                    style={{
                        top: `${15 + (index * 6) % 85}%`,
                        left: `${10 + (index * 8) % 85}%`,
                        fontSize: 20 + (index % 3) * 5,
                    }}
                >
                    {icons[index % icons.length].icon}
                </Box>
            ))}

            {/* Grid Pattern */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            />
        </Box>
    );
};

export default BackgroundPattern; 