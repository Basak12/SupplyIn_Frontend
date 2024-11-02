import React, { FC } from 'react';
import {Card, Typography, Box} from "@mui/material";
import AHPTestComponent from "../../ahp";

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {

    return (
        <Card sx={{
            m:2, p:2
        }}>
            <Typography>Dashboard Page</Typography>
            <AHPTestComponent/>
        </Card>
    );
};

export default DashboardPage;
