import React, { FC } from 'react';
import {Card, Typography, Box, TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody} from "@mui/material";
import AHPTestComponent from "../../ahp";
import Grid from "@mui/material/Grid2";

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {

    const criteria = ["Price", "Delivery Time", "Warranty", "Reliability", "Safety Regulation Compliance"];
    const comparisonMatrix = [
        [1, 5, 3, 7, 9],
        [1 / 5, 1, 1 / 3, 3, 5],
        [1 / 3, 3, 1, 5, 7],
        [1 / 7, 1 / 3, 1 / 5, 1, 3],
        [1 / 9, 1 / 5, 1 / 7, 1 / 3, 1]
    ];

    const inconsistentComparisonMatrix = [
        [1, 5, 9, 7, 5], // Price
        [1 / 5, 1, 3, 3, 5], // Delivery Time
        [1 / 9, 1/3, 1, 5, 3], // Warranty
        [1 / 7, 1 / 3, 1 / 5, 1, 3], // Reliability
        [1 / 5, 1 / 5, 1 / 3, 1 / 3, 1], // Safety Regulation Compliance

    ];

    return (
        <Grid container display='flex' justifyContent='center' alignItems='stretch' direction='row' sx={{
            backgroundColor: '#f6f6f6',
            height: '100vh',
            width: '100vw',
        }}>
            <Grid size={6}>
                <Card sx={{
                    m:2, p:2
                }}>
                        <TableContainer component={Paper}>
                            <Typography variant="h6" align="center" sx={{ pt: 2 }}>
                                Criteria Comparison Matrix
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Criteria</TableCell>
                                        {criteria.map((criterion, index) => (
                                            <TableCell key={index} align="center">{criterion}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {inconsistentComparisonMatrix.map((row, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            <TableCell>{criteria[rowIndex]}</TableCell>
                                            {row.map((value, colIndex) => (
                                                <TableCell key={colIndex} align="center">
                                                    {value.toFixed(3)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    <br/>
                </Card>
            </Grid>
            <Grid size={6}>
                <AHPTestComponent/>
            </Grid>
        </Grid>
    );
};

export default DashboardPage;
