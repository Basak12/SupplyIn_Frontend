import React, { FC, useState, useEffect } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

interface LoadingWrapperProps {
    message?: string;
    size?: number;
    color?: 'primary';
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

            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [autoHideDelay, onHide]);

    if (!isVisible) {
        return null; // Do not render anything if not visible
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
            <CircularProgress size={size} color={color} />
            {message && (
                <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default LoadingWrapper;
