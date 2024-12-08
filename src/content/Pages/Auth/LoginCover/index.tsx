import React, { FC, useState } from 'react';
import { CardMedia, Typography, Box, TextField, Button, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import {Navigate, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useAuth} from "../../../../context/AuthContext";

const LoginPage: FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('john.doe@example.com');
    const [password, setPassword] = useState('123456');
    const [error, setError] = useState<string | null>(null);


    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email,
                password,
            });

            console.log('response', response);
            const { access_token, user } = response.data;
            console.log('user', user)
            if (!access_token) {
                throw new Error('Token missing in response');
            }
            login(access_token, user.name, user.surname, user.email);
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <Box width="100%" sx={{ backgroundColor: '#F6F6F6' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ height: '100vh' }}>
                <Grid
                    size={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        paddingLeft: '5vw',
                        backgroundImage: 'url(/images/login_background.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <Box sx={{ position: 'absolute', top: 50, left: 70 }}>
                        <CardMedia component="img" height={45} image="/images/logo_white.png" alt="logo" sx={{ width: 220 }} />
                    </Box>
                    <Typography variant="h1" sx={{ fontWeight: 'bold', color: 'whitesmoke' }}>
                        Welcome <br /> to <br />Supply In
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2, color: 'whitesmoke' }}>
                        Because one supplier does not fit all.
                    </Typography>
                </Grid>
                <Grid size={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Paper elevation={3} sx={{ padding: 4, width: '300px', textAlign: 'center' }}>
                        <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
                            Login
                        </Typography>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && (
                            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                                {error}
                            </Typography>
                        )}
                        <Button
                            onClick={handleLogin}
                            variant="contained"
                            fullWidth
                            sx={{ backgroundColor: '#2E2E48', color: '#fff' }}
                        >
                            Log in
                        </Button>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Don't have an account? <a href="/register">Register</a>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginPage;
