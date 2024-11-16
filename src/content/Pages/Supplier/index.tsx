import React, { FC } from 'react';
import {Card, Typography, Box} from "@mui/material";

interface SupplierPageProps {}

const SupplierPage: FC<SupplierPageProps> = ({}) => {

    return (
        <Card sx={{
            m:2, p:2
        }}>
            <Typography>Supplier Page</Typography>
        </Card>
    );
};

export default SupplierPage;
