import React, { FC } from 'react';
import {Card, Typography, Box} from "@mui/material";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = ({}) => {

    return (
        <Card sx={{
            m:2, p:2
        }}>
            <Typography>Login Page</Typography>

            <Typography>test</Typography>
        </Card>
    );
};

export default LoginPage;
