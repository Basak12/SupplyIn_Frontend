import React, {FC, useState} from 'react';
import {Card, Typography, Box, TextField, Button, Paper, Grid} from "@mui/material";
import { styled } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";

interface LoginPageProps {}

const StyledGrid = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(5),
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
    height: '100vh',
}));

const LoginPage: FC<LoginPageProps> = ({}) => {

    const navigate = useNavigate();

    return (
        <>
            <Grid container style={{ height: '100vh' }}>
                <Grid item xs={12} md={6} sx={{ backgroundColor: '#e3d3cf', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '5vw' }}>
                    <Typography variant="h1" component="h1" style={{ fontWeight: 'bold' }}>
                        Welcome <br /> to <br />Supply In
                    </Typography>
                    <Typography variant="h6" style={{ marginTop: '10px', color: '#333' }}>
                        Because one supplier does not fit all.
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Paper elevation={3} style={{ padding: '40px', width: '300px', textAlign: 'center' }}>
                        <Typography variant="h5" component="h2" style={{ marginBottom: '20px' }}>
                            Login
                        </Typography>
                        <TextField label="Email" variant="outlined" fullWidth style={{ marginBottom: '20px' }} />
                        <TextField label="Password" type="password" variant="outlined" fullWidth style={{ marginBottom: '20px' }} />
                        <Button
                            onClick={() => navigate('/dashboard')}
                            variant="contained" fullWidth style={{ backgroundColor: '#884e4e', color: '#fff' }}>
                            Log in
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default LoginPage;


