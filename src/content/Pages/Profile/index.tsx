import React, {FC} from "react";
import {Avatar, Box, Card, CardContent, Divider, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useAuth} from "../../../context/AuthContext";
import LoadingWrapper from "../../../components/LoadingWrapper";

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = ({}) => {
    const { user } = useAuth();

    if(user === null || user === undefined) {
        return <LoadingWrapper/>;
    }

    return (
        <Grid
            container
            display='flex'
            justifyContent='center'
            alignItems='center'
            m={1}
            direction='column'
        >
                <Box display="flex" flexDirection="column" p={5} color="white" width='50%' mt={10} sx={{
                    backgroundColor: '#2c2c40',
                }}>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant="h6">
                            Name:
                        </Typography>
                        <Typography variant="h6">
                            {user.name}
                        </Typography>
                    </Box>
                    <Divider sx={{backgroundColor:'#fff', my:1}}/>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant="h6">
                            Surname:
                        </Typography>
                        <Typography variant="h6">
                            {user.surname}
                        </Typography>
                    </Box>
                    <Divider sx={{backgroundColor:'#fff', my:1}}/>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant="h6">
                            Email:
                        </Typography>
                        <Typography variant="h6">
                            {user.email}
                        </Typography>
                    </Box>
                </Box>
        </Grid>
    );
};

export default ProfilePage;

