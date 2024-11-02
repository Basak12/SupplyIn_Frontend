import React, { FC } from 'react';
import {Card, Typography, Box} from "@mui/material";

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {

    return (
        <Card sx={{
            m:2, p:2
        }}>
            <Typography>Dashboard Page</Typography>
        </Card>
    );
};

export default DashboardPage;
