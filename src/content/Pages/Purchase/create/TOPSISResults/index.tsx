import React, {FC, useState} from 'react';
import {Card, Typography, Box, Fab} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useLocation} from "react-router-dom";
interface TOPSISResultsProps {}

type Supplier = {
    name: string;
    criteria: number[];
};

const TOPSISResults: FC<TOPSISResultsProps> = ({}) => {

    const location = useLocation();
    const weights = location.state?.weights;

    console.log(weights.map((weight: number) => weight.toFixed(2)));

    const suppliers: Supplier[] = [
        { name: 'Supplier A', criteria: [300, 4, 5, 8, 9] },
        { name: 'Supplier B', criteria: [250, 3, 6, 7, 8] },
        { name: 'Supplier C', criteria: [400, 5, 3, 9, 10] }
    ];

    function normalizeMatrix(suppliers: Supplier[]): number[][] {
        const transposed = suppliers[0].criteria.map((_, colIndex) =>
            suppliers.map(row => row.criteria[colIndex])
        );
        return suppliers.map(supplier =>
            supplier.criteria.map((value, index) =>
                value / Math.sqrt(transposed[index].reduce((sum, val) => sum + val ** 2, 0))
            )
        );
    }

    function weightedNormalizeMatrix(normalizedMatrix: number[][], weights: number[]): number[][] {
        return normalizedMatrix.map(row =>
            row.map((value, index) => value * weights[index])
        );
    }

    function findIdealSolutions(weightedMatrix: number[][]): { ideal: number[]; antiIdeal: number[] } {
        const ideal = weightedMatrix[0].map((_, colIndex) =>
            Math.max(...weightedMatrix.map(row => row[colIndex]))
        );
        const antiIdeal = weightedMatrix[0].map((_, colIndex) =>
            Math.min(...weightedMatrix.map(row => row[colIndex]))
        );
        return { ideal, antiIdeal };
    }

    function calculateDistances(weightedMatrix: number[][], ideal: number[], antiIdeal: number[]): { distancesToIdeal: number[]; distancesToAntiIdeal: number[] } {
        const distancesToIdeal = weightedMatrix.map(row =>
            Math.sqrt(row.reduce((sum, value, index) => sum + (value - ideal[index]) ** 2, 0))
        );
        const distancesToAntiIdeal = weightedMatrix.map(row =>
            Math.sqrt(row.reduce((sum, value, index) => sum + (value - antiIdeal[index]) ** 2, 0))
        );
        return { distancesToIdeal, distancesToAntiIdeal };
    }

    function calculateScores(distancesToIdeal: number[], distancesToAntiIdeal: number[]): number[] {
        return distancesToAntiIdeal.map((distance, index) =>
            distance / (distance + distancesToIdeal[index])
        );
    }

    const normalizedMatrix = normalizeMatrix(suppliers);
    const weightedMatrix = weightedNormalizeMatrix(normalizedMatrix, weights);
    const { ideal, antiIdeal } = findIdealSolutions(weightedMatrix);
    const { distancesToIdeal, distancesToAntiIdeal } = calculateDistances(weightedMatrix, ideal, antiIdeal);
    const scores = calculateScores(distancesToIdeal, distancesToAntiIdeal);

    suppliers.forEach((supplier, index) => {
        console.log(`${supplier.name} - Score: ${scores[index]}`);
    });

    const bestSupplierIndex = scores.indexOf(Math.max(...scores));
    console.log(`Best Supplier: ${suppliers[bestSupplierIndex].name}`);

    //todo post TOPSIS rsults to backend

    return (
        <Grid
            container
            display='flex'
            justifyContent='center'
            alignItems='stretch'
            m={1}
            direction='row' sx={{
            backgroundColor: '#2c2c40',
        }}>
            <Grid size={12}>
                <Box p={3}>
                    <Typography variant='h6' color='white'>TOPSIS Result Page</Typography>
                </Box>
            </Grid>
            <Grid size={12}>
                <Box p={3}>
                    {
                        suppliers.map((supplier, index) => (
                            <Card key={index} sx={{
                                backgroundColor: bestSupplierIndex === index ? '#6c63ff' : '#2c2c40',
                                borderRadius: 3,
                                color: '#ffffff',
                                height: 150,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                transition: 'transform 0.2s',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}>
                                <Typography variant='h6' align='center'>{supplier.name}</Typography>
                                <Typography variant='body2' align='center'>Score: {scores[index].toFixed(2)}</Typography>
                            </Card>
                        ))
                    }
                </Box>
            </Grid>
        </Grid>
    );
};

export default TOPSISResults;
