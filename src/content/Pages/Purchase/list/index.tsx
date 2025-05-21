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

const colorPalette = [
    "#4D65BB",
    "#8CC56F",
    "#F5C158",
    "#E87A90",
    "#708090",
    "#A0522D",
    "#DDA0DD",
    "#40E0D0",
    "#FFA07A",
    "#9ACD32"
];

const supplierColorCache: Record<string, { backgroundColor: string; color: string }> = {};

const getStringHash = (str: string): number => {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
};

const getSupplierStyle = (supplierId: string) => {
    if (supplierColorCache[supplierId]) {
        return supplierColorCache[supplierId];
    }

    const hash = getStringHash(supplierId);
    const colorIndex = hash % colorPalette.length;
    const backgroundColor = colorPalette[colorIndex];
    const style = { backgroundColor, color: "white" };
    supplierColorCache[supplierId] = style;
    return style;
};

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

    const sortedPurchases = purchases.sort((a, b) => {
        const dateA = new Date(a.purchaseDate);
        const dateB = new Date(b.purchaseDate);
        return dateA.getTime() - dateB.getTime();
    });

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

    return (
        <Grid
            container
            display='flex'
            justifyContent='center'
            alignItems='stretch'
            m={1}
            mt={2}
            direction='column'>
            <Grid size={12} sx={{
                backgroundColor: '#2c2c40',
                borderRadius: 2
            }}>
                <Box m={2}>
                    <Typography variant='h6' color='white'>Purchases</Typography>
                </Box>
            </Grid>
            <Grid size={12} sx={{
                mt:2,
            }}>
                <TableContainer component={Paper} sx={{ backgroundColor: '#2c2c40' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ borderBottom: '2px solid #474765' }}>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>Supplier</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>Supplier Score</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>Product</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>User</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>Purchase Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedPurchases.reverse().map((purchase) => (
                                <TableRow key={purchase.id} sx={{ border: '2px solid #474765' }}>
                                    <TableCell sx={{ color: 'white', fontSize: '1rem' }}>
                                        {purchase.supplier.name}
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', fontSize: '1rem' }}>
                                        {purchase.supplierScore.toFixed(2)}
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', fontSize: '1rem' }}>
                                        {purchase.product.name}
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', fontSize: '1rem' }}>
                                        {purchase.user.name} {purchase.user.surname}
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', fontSize: '1rem' }}>
                                        {new Date(purchase.purchaseDate).toLocaleDateString('tr-TR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
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
