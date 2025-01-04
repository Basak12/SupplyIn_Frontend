import React, {FC, useState} from 'react';
import { CardMedia, Typography, Box, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from "../../../../config";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoadingWrapper from "../../../../components/LoadingWrapper";

const RegisterPage: FC = () => {
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            surname: Yup.string().required('Surname is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const response = await axios.post(`${API_URL}/auth/register`, values);
                console.log('User registered:', response);
                navigate('/login')
                setLoading(false);
            } catch (err) {
                // @ts-ignore
                if(err.status === 500){
                    setRegisterError('This email already exists');
                }
                setLoading(false);
            }
        },
    });

    return (
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
                onSubmit={formik.handleSubmit}
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
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    label="Surname"
                    variant="outlined"
                    name="surname"
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.touched.surname && Boolean(formik.errors.surname)}
                    helperText={formik.touched.surname && formik.errors.surname}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                {registerError && (
                    <Typography variant="body2" color="error">
                        {registerError}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ mt: 2 }}
                >
                    {loading ? (
                        <LoadingWrapper message='' size={24}/>
                    ) : (
                        'Register'
                    )}
                </Button>
            </Box>
        </Paper>
    );
};

export default RegisterPage;
