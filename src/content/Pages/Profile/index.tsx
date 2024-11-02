import React, {FC} from "react";
import {Card, Typography} from "@mui/material";

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = ({}) => {

    return (
        <Card sx={{
            m:2, p:2
        }}>
            <Typography>Profile Page</Typography>
        </Card>
    );
};

export default ProfilePage;

