import React, { FC } from 'react';
import {Card, Typography, Box} from "@mui/material";

interface ProductPageProps {}

const ProductPage: FC<ProductPageProps> = ({}) => {

    return (
        <Card sx={{
            m:2, p:2
        }}>
            <Typography>Product Page</Typography>
        </Card>
    );
};

export default ProductPage;
