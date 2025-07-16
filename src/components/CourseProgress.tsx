import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

interface CourseProgressProps {
    progress: number;
    size?: 'small' | 'medium' | 'large';
    showPercentage?: boolean;
}

const CourseProgress: React.FC<CourseProgressProps> = ({
    progress,
    size = 'medium',
    showPercentage = true
}) => {
    const getProgressColor = (progress: number) => {
        if (progress >= 80) return 'success';
        if (progress >= 60) return 'info';
        if (progress >= 40) return 'warning';
        return 'error';
    };

    const getHeight = () => {
        switch (size) {
            case 'small': return 4;
            case 'large': return 12;
            default: return 8;
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ flex: 1 }}>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        color={getProgressColor(progress) as any}
                        sx={{
                            height: getHeight(),
                            borderRadius: getHeight() / 2,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            '& .MuiLinearProgress-bar': {
                                borderRadius: getHeight() / 2,
                                transition: 'transform 0.8s ease-in-out',
                            },
                        }}
                    />
                </Box>
                {showPercentage && (
                    <Box sx={{ minWidth: 35, ml: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            {progress}%
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default CourseProgress; 