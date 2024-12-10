import React, { FC, useState } from 'react';
import { CardMedia, Typography, Box, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from "../../../../config";

const RegisterPage: FC = () => {
    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<boolean>(false);

    const [surname, setSurname] = useState('');
    const [surnameError, setSurnameError] = useState<boolean>(false);


    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<boolean>(false);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState<boolean>(false);


    const handleRegister = async () => {
        if(name === '' || name === null || name === undefined){
            setNameError(true);
        }
        if(surname === '' || surname === null || surname === undefined){
            setSurnameError(true);
        }
        if(email === '' || email === null || email === undefined){
            setEmailError(true);
        }
        if(password === '' || password === null || password === undefined){
            setPasswordError(true);
        }

        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                name,
                surname,
                email,
                password,
            });

            console.log('User registered:', response.data);
            navigate('/login');

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    maxWidth: 500,
                    margin: 'auto',
                    mt: 5,
                    textAlign: 'center',
                    borderRadius: 2,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        mt: 2,
                    }}
                >
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        error={nameError}
                    />
                    <TextField
                        label="Surname"
                        variant="outlined"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                        error={surnameError}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        error={emailError}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        error={passwordError}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRegister}
                        sx={{ mt: 2 }}
                    >
                        Register
                    </Button>
                </Box>
            </Paper>
        </>
    );
};

export default RegisterPage;
