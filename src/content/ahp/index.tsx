import React, { FC } from 'react';
import { Card, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import LoadingWrapper from '../../components/LoadingWrapper';


type Matrix = number[][];
interface AHPTestComponentProps {
    comparisonMatrix: Matrix | null;
}

const AHPTestComponent: FC<AHPTestComponentProps> = ({comparisonMatrix}) => {

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

    if(!comparisonMatrix) {
        return <p>Loading..</p>
    }

    const columnSums = calculateColumnSums(comparisonMatrix);
    const normalizedMatrix = normalizeMatrix(comparisonMatrix, columnSums);
    const weights = calculateWeights(normalizedMatrix);
    const consistencyRatio = calculateConsistencyRatio(comparisonMatrix, weights);

    return (
        <>
            {consistencyRatio > 0.1 &&  (
                <Box sx={{
                    backgroundColor: '#ff8f8f',
                    p:2
                }}>
                    <Typography variant="subtitle1" textAlign='center'>
                            Your matrix is inconsistent. Please review your comparisons.
                        </Typography>
                </Box>
            )}
            {consistencyRatio < 0.1 && (
                <LoadingWrapper
                    message="Calculating..."
                    size={50}
                    autoHideDelay={5000} // Hides after 5 seconds
                    onHide={() => console.log('Loading finished!')}
                />

            )}
        </>
    );
};

export default AHPTestComponent;
