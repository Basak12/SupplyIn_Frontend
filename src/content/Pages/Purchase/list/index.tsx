import React, {FC, useState} from 'react';
import {Card, Typography, Box, Fab} from "@mui/material";
import Grid from "@mui/material/Grid2";
interface PurchasePageProps {}

const PurchasePage: FC<PurchasePageProps> = ({}) => {

    return (
        <Grid container display='flex' justifyContent='center' alignItems='stretch' direction='row' sx={{
            backgroundColor: '#f6f6f6',
        }}>
           <Typography variant='h5'>purchase list</Typography>
        </Grid>
    );
};

export default PurchasePage;
