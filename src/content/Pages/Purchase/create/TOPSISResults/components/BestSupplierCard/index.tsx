import React, {FC, useState} from 'react';
import {Card, Typography, Box, Fab, Button} from "@mui/material";
import Grid from "@mui/material/Grid2";
interface BestSupplierCardProps {
    bestSupplier: any;
}

const BestSupplierCard: FC<BestSupplierCardProps> = ({bestSupplier}) => {

    if(bestSupplier === null || bestSupplier === undefined) {
        return <Typography variant='h6' sx={{
            color: '#ffffff'
        }}>Loading</Typography>;
    }

    return (
        <Card
            sx={{
                backgroundColor: "#2c2c40",
                padding: 4,
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                textAlign: "center",
            }}
        >
            <Typography variant="h6" color="#f5f5f5">
                Best Score
            </Typography>
            <Typography variant="h4" color="#6c63ff" sx={{ mt: 2 }}>
                {bestSupplier.name}
            </Typography>
            <Typography variant="body1" color="#b0b0b0" sx={{ mt: 1 }}>
                {bestSupplier.score.toFixed(1)}
            </Typography>
        </Card>
    );
};

export default BestSupplierCard;
