import React, {FC, useCallback, useEffect, useState} from 'react';
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
import {ChevronRight} from "@mui/icons-material";
import {getProducts} from "../../../../api/getProducts";
import LoadingWrapper from "../../../../components/LoadingWrapper";
import {Product} from "../../../../model/product";

const CreatePurchasePage: FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await getProducts();
            setProducts(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [])
    ;

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const steps = ['Select Product', 'Adjust Importance', 'View Result and Purchase'];

    const handleContinue = () => {
        navigate('/purchase/create/adjustImportance', { state: { product: selectedProduct } });
    };

    if(products === null || products === undefined) {
        return <LoadingWrapper/>;
    }

    if(products.length === 0) {
        return (
            <Box
                sx={{
                    color: '#ffffff',
                    p: 4,
                }}
            >
                <Typography variant="h4" align="left" gutterBottom sx={{marginBottom: "2rem"}}>
                    Supplier Selection
                </Typography>
                <Typography variant="h6" align="center" sx={{marginBottom: "2rem"}}>
                    No products found
                </Typography>
            </Box>
        );
    }

    const filteredProducts = products.reduce((acc, product) => {
        if (!acc.find(item => item.name === product.name)) {
            acc.push(product);
        }
        return acc;
    }, [] as { id: string, name: string, description: string }[]);


    return (
        <Box
            sx={{
                color: '#ffffff',
                p: 4,
            }}
        >
            <Typography variant="h4" align="left" gutterBottom sx={{marginBottom: "2rem"}}>
                Supplier Selection
            </Typography>
            <Stepper alternativeLabel activeStep={0} sx={{ mb: 10 }}>
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
            <Grid container spacing={3}>
                {filteredProducts.map((product, index) => (
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
                        endIcon={<ChevronRight />}
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
