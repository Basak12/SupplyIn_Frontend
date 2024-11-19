import React, { FC, useEffect, useState } from 'react';
import {Card, Typography, Box, TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody, Fab} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useLocation} from "react-router-dom";

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
    const { pathname } = useLocation();

    return (
        <>
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
                    <Typography variant='h6' color='white'>Dashboard Page</Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default DashboardPage;

