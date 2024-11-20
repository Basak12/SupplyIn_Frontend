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
};

interface RankingTableProps {
    sortedSuppliers: SupplierScore[] | null;
}

const RankingTable: FC<RankingTableProps> = ({sortedSuppliers}) => {

    if(sortedSuppliers === null || sortedSuppliers === undefined) {
        return <Typography variant='h6' sx={{
            color: '#ffffff'
        }}>Loading</Typography>;
    }

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
                Result of Suppliers for Product A
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "white" }}>Supplier</TableCell>
                            <TableCell sx={{ color: "white" }} align="center">
                                Ranking
                            </TableCell>
                            <TableCell sx={{ color: "white" }} align="center">
                                Value
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedSuppliers.map((supplier, index) => (
                            <TableRow key={supplier.name}>
                                <TableCell sx={{ color: "white" }}>{supplier.name}</TableCell>
                                <TableCell sx={{ color: "white" }} align="center">
                                    {index + 1}
                                </TableCell>
                                <TableCell sx={{ color: "white" }} align="center">
                                    {supplier.score.toFixed(3)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default RankingTable;
