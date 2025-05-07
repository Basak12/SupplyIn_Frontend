import React, {FC, useState} from 'react';
import {
    Card,
    Typography,
    Box,
    Fab,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";
import Grid from "@mui/material/Grid2";

type SupplierScore = {
    name: string;
    score: number;
    price: number;
    deliveryTime: number;
    warranty: number;
    reliability: number;
};

interface RankingTableProps {
    sortedSuppliers: SupplierScore[] | null;
    selectedProduct: any;
}

const RankingTable: FC<RankingTableProps> = ({sortedSuppliers, selectedProduct}) => {

    if(sortedSuppliers === null || sortedSuppliers === undefined) {
        return <Typography variant='h6' sx={{
            color: '#ffffff'
        }}>Loading</Typography>;
    }

    if(selectedProduct === null || selectedProduct === undefined) {
        return <Typography variant='h6' sx={{
            color: '#ffffff'
        }}>Loading</Typography>;
    }
    console.log('sortedSuppliers', sortedSuppliers);

    return (
        <Card
            sx={{
                backgroundColor: "#2c2c40",
                padding: 3,
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            }}
        >
            <Typography variant="h6" color="#f5f5f5" mb={2}>
                Result of Suppliers for {selectedProduct.name}
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "white" }}>Supplier</TableCell>
                            <TableCell sx={{ color: "white" }} align="center">Ranking</TableCell>
                            <TableCell sx={{ color: "white" }} align="center">Score</TableCell>
                            <TableCell sx={{ color: "white" }} align="center">Price</TableCell>
                            <TableCell sx={{ color: "white" }} align="center">Delivery Time</TableCell>
                            <TableCell sx={{ color: "white" }} align="center">Warranty</TableCell>
                            <TableCell sx={{ color: "white" }} align="center">Reliability</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedSuppliers.map((supplier, index) => (
                            <TableRow key={supplier.name}>
                                <TableCell sx={{ color: "white" }}>{supplier.name}</TableCell>
                                <TableCell sx={{ color: "white" }} align="center">{index + 1}</TableCell>
                                <TableCell sx={{ color: "white" }} align="center">{supplier.score.toFixed(1)}</TableCell>
                                <TableCell sx={{ color: "white" }} align="center">{supplier.price}</TableCell>
                                <TableCell sx={{ color: "white" }} align="center">{supplier.deliveryTime} Week(s)</TableCell>
                                <TableCell sx={{ color: "white" }} align="center">{supplier.warranty} Years(s)</TableCell>
                                <TableCell sx={{ color: "white" }} align="center">{supplier.reliability}/5</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default RankingTable;
