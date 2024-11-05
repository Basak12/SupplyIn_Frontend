import React, { FC } from 'react';
import {Card, Typography, Box, TextField, Button, Paper, CardMedia} from "@mui/material";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
    const navigate = useNavigate();

    return (
        <Box width='100%' sx={{
            backgroundColor: '#F6F6F6',
        }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ height: '100vh'}}>
                <Grid size={6} sx={{ backgroundColor: '#e3d3cf', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '5vw' }}>
                    <Box sx={{ position: 'absolute', top: 50, left: 70 }}>
                        <CardMedia component="img" height={45} image='/images/logo.png' alt="logo" sx={{ width: 220 }} />
                    </Box>
                    <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
                        Welcome <br /> to <br />Supply In
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2, color: '#333' }}>
                        Because one supplier does not fit all.
                    </Typography>
                </Grid>
                <Grid size={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Paper elevation={3} sx={{ padding: 4, width: '300px', textAlign: 'center' }}>
                        <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
                            Login
                        </Typography>
                        <TextField label="Email" variant="outlined" fullWidth sx={{ mb: 2 }} />
                        <TextField label="Password" type="password" variant="outlined" fullWidth sx={{ mb: 2 }} />
                        <Button
                            onClick={() => navigate('/dashboard')}
                            variant="contained" fullWidth sx={{ backgroundColor: '#884e4e', color: '#fff' }}>
                            Log in
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>

    );
};

export default LoginPage;

