import React, {FC, useCallback, useEffect, useState} from 'react';
import {Box, Card, Chip, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import LoadingWrapper from "../../../../../components/LoadingWrapper";
import {Supplier} from "../../../../../model/supplier";
import {getSuppliers} from "../../../../../api/getSuppliers";

interface SupplierCardProps {}

const SupplierCard:FC<SupplierCardProps> = () => {
    const navigate = useNavigate()
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    const fetchSuppliers = useCallback(async () => {
            try {
                const response = await getSuppliers();
                setSuppliers(response);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }, [])
    ;

    useEffect(() => {
        fetchSuppliers();
    }, [fetchSuppliers]);


    if(suppliers === null || suppliers === undefined) {
        return <LoadingWrapper height='100%'/>;
    }

    return(
        <Card sx={{
            backgroundColor: '#2c2c40',
            color: '#ffffff',
            p: 2,
            borderWidth: 1,
            //borderColor: 'rgba(169,223,216,0.6)',
            //borderStyle: 'solid',
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
                    Supplier Count
                </Typography>
                <Typography variant='h4' sx={{
                    fontWeight: 'bold',
                    mt: 2,
                }}>
                    {suppliers.length}
                </Typography>
            </Box>
            <Box display='flex' justifyContent='flex-end' alignItems='flex-end' mt='auto'>
                <Chip
                    onClick={() => navigate('/supplier')}
                    label='View Suppliers'
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

export default SupplierCard;
