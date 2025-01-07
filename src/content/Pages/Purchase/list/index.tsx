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

const supplierColorMap: Record<string, { backgroundColor: string; color: string }> = {
    "Supplier X": { backgroundColor: "#4D65BB", color: "black" },
    "Supplier Y": { backgroundColor: "#8CC56F", color: "black" },
    "Supplier Z": { backgroundColor: "#F5C158", color: "black" },
};

const getSupplierStyle = (supplierName: string) => {
    return supplierColorMap[supplierName] || { backgroundColor: "#CCCCCC", color: "black" }; // Default fallback
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
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>Purchase Date</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>Supplier Score</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>Product</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: '1rem' }}>User</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedPurchases.reverse().map((purchase) => (
                                <TableRow key={purchase.id} sx={{ borderBottom: '2px solid #474765' }}>
                                    <TableCell
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        padding: "12px 16px",
                                        backgroundColor: "#2c2c40",
                                        borderBottom: "0px solid #474765",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            minWidth: "80px",
                                            px: 2,
                                            py: 1,
                                            borderRadius: "12px",
                                            fontSize: "0.875rem",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                            ...getSupplierStyle(purchase.supplier.name),
                                            margin: 0,
                                        }}
                                    >
                                        {purchase.supplier.name}
                                    </Box>  
                                    <Typography variant="body2" sx={{ color: "white", margin: 0 }}>
                                            {purchase.supplier.contactInfo}
                                    </Typography>
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', fontSize: '1rem' }}>
                                        {new Date(purchase.purchaseDate).toLocaleDateString('tr-TR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', fontSize: '1rem' }}>
                                        {purchase.supplierScore.toFixed(2)}
                                    </TableCell>
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
