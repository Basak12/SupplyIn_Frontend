import React, {FC, useState} from 'react';
import {Card, Typography, Box, Fab} from "@mui/material";
import Grid from "@mui/material/Grid2";
interface PurchasePageProps {}

const PurchasePage: FC<PurchasePageProps> = ({}) => {

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
                    <Typography variant='h6' color='white'>Product List Page</Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default PurchasePage;
