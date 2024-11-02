import React, { FC } from 'react';
import {Card, Typography, Box} from "@mui/material";

interface PurchasePageProps {}

const PurchasePage: FC<PurchasePageProps> = ({}) => {

    return (
        <Card sx={{
            m:2, p:2
        }}>
            <Typography>Purchase Page</Typography>
        </Card>
    );
};

export default PurchasePage;
