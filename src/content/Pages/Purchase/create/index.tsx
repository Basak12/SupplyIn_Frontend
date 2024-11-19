import React, { FC, useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Stepper,
    Step,
    StepLabel,
    TextField,
    InputAdornment,
    Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';

const CreatePurchasePage: FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const navigate = useNavigate();

    const steps = ['Select Product', 'Adjust Importance', 'View Result and Purchase'];

    const products = [
        { name: 'Product A', description: 'Test machine for xyz' },
        { name: 'Product B', description: 'Test machine for abc' },
        { name: 'Product C', description: 'Test machine for mno' },
        { name: 'Product D', description: 'Test machine for pqr' },
        { name: 'Product E', description: 'Test machine for bsk' },
        { name: 'Product F', description: 'Test machine for ayc' },
        { name: 'Product G', description: 'Test machine for zyn' },
        { name: 'Product H', description: 'Test machine for eda' },
    ];

    const handleContinue = () => {
        navigate('/purchase/create/adjustImportance', { state: { product: selectedProduct } });
    };

    return (
        <Box
            sx={{
                color: '#ffffff',
                p: 4,
            }}
        >
            {/* Header */}
            <Typography variant="h4" align="center" gutterBottom>
                Supplier Selection
            </Typography>
            <Stepper alternativeLabel activeStep={0} sx={{ mb: 4 }}>
                {steps.map((label) => (
                    <Step key={label} sx={{
                        color:'white'
                    }}>
                        <StepLabel sx={{
                            '& .MuiStepLabel-label': { color: '#ffffff' },
                            '& .MuiStepIcon-root': { color: '#6c63ff' },
                        }}>
                            <Typography sx={{
                                color:'white'
                            }}>
                                {label}
                            </Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box display="flex" justifyContent="center" mb={4}>
                <TextField
                    placeholder="Search product"
                    variant="outlined"
                    fullWidth
                    sx={{
                        maxWidth: 600,
                        backgroundColor: '#2c2c40',
                        input: { color: '#ffffff' },
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#ffffff' }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </Box>

            {/* Product Cards */}
            <Grid container spacing={3}>
                {products.map((product, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                        <Card
                            onClick={() => setSelectedProduct(product)}
                            sx={{
                                backgroundColor:
                                    selectedProduct?.name === product.name
                                        ? '#6c63ff'
                                        : '#2c2c40',
                                borderRadius: 3,
                                color: '#ffffff',
                                height: 150,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                transition: 'transform 0.2s',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" align="center">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" align="center">
                                    {product.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {selectedProduct && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Button
                        variant="contained"
                        onClick={handleContinue}
                        sx={{
                            backgroundColor: '#6c63ff',
                            color: '#ffffff',
                            borderRadius: 3,
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            '&:hover': {
                                backgroundColor: '#5a52e6',
                            },
                        }}
                    >
                        Continue
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default CreatePurchasePage;
