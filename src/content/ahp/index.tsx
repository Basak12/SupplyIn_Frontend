import React, { FC } from 'react';
import { Card, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface AHPTestComponentProps {}

type Matrix = number[][];

const AHPTestComponent: FC<AHPTestComponentProps> = ({}) => {

    const comparisonMatrix: Matrix = [
        [1, 5, 3, 7, 9], // Price
        [1 / 5, 1, 1 / 3, 3, 5], // Delivery Time
        [1 / 3, 3, 1, 5, 7], // Warranty
        [1 / 7, 1 / 3, 1 / 5, 1, 3], // Reliability
        [1 / 9, 1 / 5, 1 / 7, 1 / 3, 1], // Safety Regulation Compliance
    ];

    const inconsistentComparisonMatrix: Matrix = [
        [1, 5, 9, 7, 5], // Price
        [1 / 5, 1, 3, 3, 5], // Delivery Time
        [1 / 9, 1/3, 1, 5, 3], // Warranty
        [1 / 7, 1 / 3, 1 / 5, 1, 3], // Reliability
        [1 / 5, 1 / 5, 1 / 3, 1 / 3, 1], // Safety Regulation Compliance
    ];


    const criteriaNames = ["Price", "Delivery Time", "Warranty", "Reliability", "Safety Regulations Compliance"];

    // Normalize criteria
    function calculateColumnSums(matrix: Matrix): number[] {
        return matrix[0].map((_, colIndex) =>
            matrix.reduce((sum, row) => sum + row[colIndex], 0)
        );
    }

    // Normalize matrix
    function normalizeMatrix(matrix: Matrix, columnSums: number[]): Matrix {
        return matrix.map(row =>
            row.map((value, colIndex) => value / columnSums[colIndex])
        );
    }

    // Calculate weight matrix
    function calculateWeights(normalizedMatrix: Matrix): number[] {
        return normalizedMatrix.map(row =>
            row.reduce((sum, value) => sum + value, 0) / row.length
        );
    }

    // Consistency ratio
    function calculateConsistencyRatio(matrix: Matrix, weights: number[]): number {
        const n = matrix.length;
        const lambdaMax = matrix.reduce(
            (sum, row, i) =>
                sum + row.reduce((rowSum, value, j) => rowSum + value * weights[j], 0) / weights[i],
            0
        ) / n;

        const consistencyIndex = (lambdaMax - n) / (n - 1);
        const randomIndex = [0.00, 0.00, 0.58, 0.90, 1.12, 1.24]; // Random index
        const consistencyRatio = consistencyIndex / randomIndex[n];
        return consistencyRatio;
    }

    const columnSums = calculateColumnSums(comparisonMatrix);
    const normalizedMatrix = normalizeMatrix(comparisonMatrix, columnSums);
    const weights = calculateWeights(normalizedMatrix);
    const consistencyRatio = calculateConsistencyRatio(comparisonMatrix, weights);

    return (
        <Card sx={{ m: 2, p: 2 }}>
            <TableContainer component={Paper}>
                <Typography variant="h6" align="center" sx={{ pt: 2 }}>
                    Criteria Weights
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Criterion</TableCell>
                            <TableCell align="right">Weight</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {criteriaNames.map((name, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {name}
                                </TableCell>
                                <TableCell align="right">{weights[index].toPrecision(2)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            {consistencyRatio < 0.1 ? (
                                <>
                                <TableCell component="th" scope="row" sx={{backgroundColor:'#bfffb3'}}> Consistent</TableCell>
                                <TableCell align="right" sx={{backgroundColor:'#bfffb3'}}>{consistencyRatio.toFixed(4)}</TableCell>
                                </>
                            ) : (
                                <>
                                <TableCell component="th" scope="row" sx={{backgroundColor:'#ff8f8f'}}> Inconsistent</TableCell>
                                <TableCell align="right" sx={{backgroundColor:'#ff8f8f'}}>{consistencyRatio.toFixed(4)}</TableCell>
                                </>
                            )}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default AHPTestComponent;
