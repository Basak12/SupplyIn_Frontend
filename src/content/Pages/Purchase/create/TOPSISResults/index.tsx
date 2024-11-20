import React, {FC, useState} from 'react';
import {Card, Typography, Box, Fab} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useLocation} from "react-router-dom";
interface TOPSISResultsProps {}

const TOPSISResults: FC<TOPSISResultsProps> = ({}) => {

    const location = useLocation();
    const weights = location.state?.weights;

    console.log(weights.map((weight: number) => weight.toFixed(2)));

    return (
        <Grid
            container
            display='flex'
            justifyContent='center'
            alignItems='stretch'
            m={1}
            direction='row' sx={{
            backgroundColor: '#2c2c40',
        }}>
            <Grid size={12}>
                <Box p={3}>
                    <Typography variant='h6' color='white'>TOPSIS Result Page</Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default TOPSISResults;
