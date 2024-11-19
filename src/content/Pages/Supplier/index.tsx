import React, { FC } from 'react';
import {Card, Typography, Box} from "@mui/material";
import Grid from "@mui/material/Grid2";

interface SupplierPageProps {}

const SupplierPage: FC<SupplierPageProps> = ({}) => {

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
                    <Typography variant='h6' color='white'>Supplier Page</Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SupplierPage;
