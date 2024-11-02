import React, { FC } from 'react';
import {Card, Typography, Box} from "@mui/material";

interface UserPageProps {}

const UserPage: FC<UserPageProps> = ({}) => {

    return (
        <Card sx={{
            m:2, p:2
        }}>
            <Typography>Product Page</Typography>
        </Card>
    );
};
export default UserPage;
