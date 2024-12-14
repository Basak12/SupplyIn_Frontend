import React, { FC, useState, useEffect } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

interface LoadingWrapperProps {
    message?: string;
    size?: number;
    autoHideDelay?: number;
    onHide?: () => void;
    height?: string;
}

const LoadingWrapper: FC<LoadingWrapperProps> = ({
                                                     message = 'Loading...',
                                                     size = 40,
                                                     autoHideDelay = 3000, // Default to 3 seconds
                                                     onHide,
                                                     height = '30px',
                                                 }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (autoHideDelay > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                if (onHide) {
                    onHide();
                }
            }, autoHideDelay);

            return () => clearTimeout(timer);
        }
    }, [autoHideDelay, onHide]);

    if (!isVisible) {
        return null;
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height={height}
        >
            <CircularProgress size={size} sx={{
                color: 'white',
            }} />
            {message && (
                <Typography variant="body1" sx={{ mt: 2, color: 'white' }}>
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default LoadingWrapper;
