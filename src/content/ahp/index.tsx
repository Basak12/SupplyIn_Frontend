import React, { FC } from 'react';
import {Card, Typography, Box} from "@mui/material";

interface AHPTestComponentProps {}

const AHPTestComponent: FC<AHPTestComponentProps> = ({}) => {

    type Matrix = number[][];

    const comparisonMatrix: Matrix = [
        [1, 5, 3, 7, 9], // Price
        [1 / 5, 1, 1 / 3, 3, 5], // Delivery Time
        [1 / 3, 3, 1, 5, 7], // Warranty
        [1 / 7, 1 / 3, 1 / 5, 1, 3], // Reliability
        [1 / 9, 1 / 5, 1 / 7, 1 / 3, 1], // Safety Regulation Compliance
    ];

    const criteriaNames = ["Price", "Delivery Time", "Warranty", "Reliability", "Safety Regulations Compliance"];

//normalize criteria
    function calculateColumnSums(matrix: Matrix): number[] {
        return matrix[0].map((_, colIndex) =>
            matrix.reduce((sum, row) => sum + row[colIndex], 0)
        );
    }

// normalize matrix
    function normalizeMatrix(matrix: Matrix, columnSums: number[]): Matrix {
        return matrix.map(row =>
            row.map((value, colIndex) => value / columnSums[colIndex])
        );
    }

// calculate weight matrix
    function calculateWeights(normalizedMatrix: Matrix): number[] {
        return normalizedMatrix.map(row =>
            row.reduce((sum, value) => sum + value, 0) / row.length
        );
    }

    //consistency ratio
    function calculateConsistencyRatio(matrix: Matrix, weights: number[]): number {
        const n = matrix.length;
        const lambdaMax = matrix.reduce(
            (sum, row, i) =>
                sum + row.reduce((rowSum, value, j) => rowSum + value * weights[j], 0) / weights[i],
            0
        ) / n;

        const consistencyIndex = (lambdaMax - n) / (n - 1);
        const randomIndex = [0.00, 0.00, 0.58, 0.90, 1.12, 1.24]; //random index
        const consistencyRatio = consistencyIndex / randomIndex[n];
        return consistencyRatio;
    }

    const columnSums = calculateColumnSums(comparisonMatrix);
    const normalizedMatrix = normalizeMatrix(comparisonMatrix, columnSums);
    const weights = calculateWeights(normalizedMatrix);
    const consistencyRatio = calculateConsistencyRatio(comparisonMatrix, weights);

    console.log("consistency ratio:", consistencyRatio);
    console.table(comparisonMatrix);

    if (consistencyRatio < 0.1) {
        console.log("Consistent");
    } else {
        console.log("Too consistent");
    }

    return (
        <Card sx={{
            m:2, p:2
        }}>
            {criteriaNames.map((name, index) => (
                <Typography key={index}>{name} Weight: {weights[index].toPrecision(2)}</Typography>
            ))}
            <Box display='flex' justifyContent='flex-start' alignItems='center'>
            <Typography> consistency ratio: {consistencyRatio}</Typography>
                {consistencyRatio < 0.1 ? (
                    <Typography> consistent </Typography>
                ) : (
                    <Typography> too consistent</Typography>)
                }
            </Box>
        </Card>
    );
};

export default AHPTestComponent;
