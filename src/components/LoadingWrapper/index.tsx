import React, { FC, useState, useEffect } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

interface LoadingWrapperProps {
    message?: string;
    size?: number;
    color?: string;
    autoHideDelay?: number; // Delay in milliseconds after which the loader hides
    onHide?: () => void; // Optional callback when the loader hides
}

const LoadingWrapper: FC<LoadingWrapperProps> = ({
                                                     message = 'Loading...',
                                                     size = 40,
                                                     color = 'primary',
                                                     autoHideDelay = 3000, // Default to 3 seconds
                                                     onHide,
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
            height="100%"
            minHeight="200px"
        >
            <CircularProgress size={size} sx={{
                color: color,
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
