import React, { FC } from 'react';
import {Card, Typography, Box} from "@mui/material";
import Grid from "@mui/material/Grid2";

interface ProductPageProps {}

const ProductPage: FC<ProductPageProps> = ({}) => {

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
                    <Typography variant='h6' color='white'>Product Page</Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ProductPage;
