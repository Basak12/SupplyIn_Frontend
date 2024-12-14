import React, {FC, useCallback, useEffect, useState} from 'react';
import {Purchase} from "../../../../../model/purchase";
import {Box, Card, Chip, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Product} from "../../../../../model/product";
import {getProducts} from "../../../../../api/getProducts";
import LoadingWrapper from "../../../../../components/LoadingWrapper";

interface ProductCardProps {}

const ProductCard:FC<ProductCardProps> = () => {
    const navigate = useNavigate()
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


    const filteredProducts = products.reduce((acc, product) => {
        if (!acc.find(item => item.name === product.name)) {
            acc.push(product);
        }
        return acc;
    }, [] as { id: string, name: string, description: string }[]);

    if(products === null || products === undefined) {
        return <LoadingWrapper/>;
    }

    return(
        <Card sx={{
            backgroundColor: '#2c2c40',
            color: '#ffffff',
            p: 2,
            borderWidth: 1,
            borderColor: 'rgba(169,223,216,0.6)',
            borderStyle: 'solid',
            borderRadius: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            height: 120
        }}>
            <Box>
                <Typography variant='body1' sx={{
                    fontWeight: 'bold',
                }}>
                    Product Category Count
                </Typography>
                <Typography variant='h4' sx={{
                    fontWeight: 'bold',
                    mt: 2,
                }}>
                    {filteredProducts.length}
                </Typography>
            </Box>
            <Box display='flex' justifyContent='flex-end' alignItems='flex-end' mt='auto'>
                <Chip
                    onClick={() => navigate('/products')}
                    label='View Products'
                    sx={{
                        backgroundColor: '#A9DFD8',
                        color: '#161c28',
                        fontWeight: 'bold',
                    }}
                />
            </Box>
        </Card>
    );
};

export default ProductCard;
