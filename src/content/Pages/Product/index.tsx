import React, {FC, useCallback, useEffect, useState} from 'react';
import {
    Card,
    Typography,
    Box,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {Product} from "../../../model/product";
import {getProducts} from "../../../api/getProducts";
import LoadingWrapper from '../../../components/LoadingWrapper';

interface ProductPageProps {}

const ProductPage: FC<ProductPageProps> = ({}) => {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = useCallback(async () => {
            try {
                const response = await getProducts();
                setProducts(response);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const productNames: Record<string, number> = {};
    const filteredProducts = products.filter((product) => {
        productNames[product.name] = (productNames[product.name] || 0) + 1;
        return productNames[product.name] > 1;
    });

    console.log('filteredProducts', filteredProducts);

    if(products === null || products === undefined) {
        return <LoadingWrapper height='100%'/>;
    }

    if(products.length === 0) {
        return (
            <Box
                sx={{
                    color: '#ffffff',
                    backgroundColor: '#2c2c40',
                    p: 4,
                    m:1
                }}
            >
                <Typography variant="h5" align="left" gutterBottom sx={{marginBottom: "2rem"}}>
                    No Products Found
                </Typography>
            </Box>
        );
    }
    return (
        <Grid
            container
            display='flex'
            justifyContent='center'
            alignItems='stretch'
            m={1}
            mt={2}
            direction='column' sx={{
        }}>
            <Grid size={12} sx={{
                backgroundColor: '#2c2c40',
                borderRadius:2
            }}>
                <Box m={2}>
                    <Typography variant='h6' color='white'>Products</Typography>
                </Box>
            </Grid>
            <Grid size={12} sx={{
                mt:4,
            }}>
                <TableContainer component={Paper} sx={{ backgroundColor: '#2c2c40' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ borderBottom: '2px solid #474765' }}>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>Product Name</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>Description</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>Category</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id} sx={{ borderBottom: '2px solid #474765' }}>
                                    <TableCell sx={{ color: 'white', fontSize: '1rem' }}>{product.name}</TableCell>
                                    <TableCell sx={{ color: 'white', fontSize: '1rem' }}>{product.description}</TableCell>
                                    <TableCell sx={{ color: 'white', fontSize: '1rem' }}>{product.productCategory}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default ProductPage;
