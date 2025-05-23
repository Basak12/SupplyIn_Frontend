import React, { FC, useState } from 'react';
import { CardMedia, Typography, Box, TextField, Button, Paper, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../../../context/AuthContext";
import API_URL from "../../../../config";
import LoadingWrapper from "../../../../components/LoadingWrapper";

const LoginPage: FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password,
            });
            const { access_token, user } = response.data;
            if (!access_token) {
                throw new Error('Token missing in response');
            }
            localStorage.setItem("access_token", access_token);
            login(access_token, user.name, user.surname, user.email, user.id);
            setLoading(false);
        } catch (err) {
            setError('Invalid email or password. Please try again.');
            setLoading(false);
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
                    <Box sx={{ position: 'absolute', top: 50, left: 80 }}>
                        <CardMedia component="img" height={45} image="/images/logo_new.png" alt="logo" sx={{ width: 220 }} />
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
                            disabled={loading}
                        >
                            {loading ? (
                                <LoadingWrapper message='' size={24}/>
                            ) : (
                                'Log in'
                            )}
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
