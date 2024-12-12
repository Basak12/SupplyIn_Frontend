import React, {FC, useCallback, useEffect, useState} from 'react';
import {
    Card,
    Typography,
    Box,
    Fab,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {Purchase} from "../../../../model/purchase";
import {getPurchases} from "../../../../api/getPurchases";
import LoadingWrapper from "../../../../components/LoadingWrapper";
interface PurchasePageProps {}

const PurchasePage: FC<PurchasePageProps> = ({}) => {
    const [purchases, setPurchases] = useState<Purchase[]>([]);

    const fetchPurchases = useCallback(async () => {
        try {
            const response = await getPurchases();
            setPurchases(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, []);

    useEffect(() => {
        fetchPurchases();
    },[fetchPurchases]);

    if(purchases === null || purchases === undefined) {
        return <LoadingWrapper/>;
    }

    if(purchases.length === 0) {
        return (
            <Box
                sx={{
                    color: '#ffffff',
                    backgroundColor: '#2c2c40',
                    p: 4,
                    m: 1
                }}
            >
                <Typography variant="h5" align="left" gutterBottom sx={{marginBottom: "2rem"}}>
                    No Purchases Found
                </Typography>
            </Box>
        );
    }

    console.log('purchases', purchases);

    return (
        <Grid
            container
            display='flex'
            justifyContent='center'
            alignItems='stretch'
            m={1}
            direction='column'>
            <Grid size={12} sx={{
                backgroundColor: '#2c2c40',
            }}>
                <Box p={3}>
                    <Typography variant='h6' color='white'>Purchases</Typography>
                </Box>
            </Grid>
            <Grid size={12} sx={{
                mt:4
            }}>
                <TableContainer component={Paper} sx={{ backgroundColor: '#2c2c40' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>Supplier</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>Purchase Date</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>Supplier Score</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>Product</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>User</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {purchases.map((purchase) => (
                                <TableRow key={purchase.id}>
                                    <TableCell sx={{ color: 'white', fontSize: '1rem' }}>
                                        {purchase.supplier.name} ({purchase.supplier.contactInfo})
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', fontSize: '1rem' }}>{new Date(purchase.purchaseDate).toLocaleDateString()}</TableCell>
                                    <TableCell sx={{ color: 'white', fontSize: '1rem' }}>{purchase.supplierScore.toFixed(2)}</TableCell>

                                    <TableCell sx={{ color: 'white', fontSize: '1rem' }}>
                                        {purchase.product.name} - {purchase.product.description}
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', fontSize: '1rem' }}>
                                        {purchase.user.name} {purchase.user.surname}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default PurchasePage;
