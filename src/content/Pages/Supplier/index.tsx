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
import { Supplier } from '../../../model/supplier';
import {getSuppliers} from "../../../api/getSuppliers";
import LoadingWrapper from "../../../components/LoadingWrapper";

interface SupplierPageProps {}

const SupplierPage: FC<SupplierPageProps> = ({}) => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    const fetchSuppliers = useCallback(async () => {
        try {
            const response = await getSuppliers();
            setSuppliers(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, []);


    useEffect(() => {
        fetchSuppliers();
    }, [fetchSuppliers]);

    if(suppliers === null || suppliers === undefined) {
        return <LoadingWrapper height='100%'/>;
    }

    if(suppliers.length === 0) {
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
                    No Suppliers Found
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
            direction='column' sx={{

        }}>
            <Grid size={12} sx={{
                backgroundColor: '#2c2c40',
            }}>
                <Box p={3}>
                    <Typography variant='h6' color='white'>Suppliers</Typography>
                </Box>
            </Grid>
            <Grid size={12} sx={{
                mt:4
            }}>
                <TableContainer component={Paper} sx={{ backgroundColor: '#2c2c40' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ borderBottom: '2px solid #474765' }}>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>Supplier Name</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>Contact Info</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {suppliers.map((supplier) => (
                                <TableRow key={supplier.id} sx={{ borderBottom: '2px solid #474765' }}>
                                    <TableCell sx={{ color: 'white', fontSize: '1rem' }}>{supplier.name}</TableCell>
                                    <TableCell sx={{ color: 'white', fontSize: '1rem' }}>{supplier.contactInfo}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default SupplierPage;
