import React, { FC, useState, useEffect } from "react";
import {
    Box,
    Button,
    Card,
    Stepper,
    Step,
    StepLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import BestSupplierCard from "./components/BestSupplierCard";
import RankingTable from "./components/RankingTable";

type Supplier = {
    name: string;
    criteria: number[];
};

type SupplierScore = {
    name: string;
    score: number;
};

const TOPSISResults: FC = () => {
    const location = useLocation();
    const weights = location.state?.weights;
    const steps = ["Select Product", "Adjust Importance", "View Result and Purchase"];

    const [sortedSuppliers, setSortedSuppliers] = useState<SupplierScore[]>([]);

    const suppliers: Supplier[] = [
        { name: "Supplier A", criteria: [300, 4, 5, 8, 9] },
        { name: "Supplier B", criteria: [250, 3, 6, 7, 8] },
        { name: "Supplier C", criteria: [400, 5, 3, 9, 10] },
    ];

    useEffect(() => {
        if (weights) {
            // Normalize matrix
            const normalizeMatrix = (suppliers: Supplier[]): number[][] => {
                const transposed = suppliers[0].criteria.map((_, colIndex) =>
                    suppliers.map(row => row.criteria[colIndex])
                );
                return suppliers.map(supplier =>
                    supplier.criteria.map((value, index) =>
                        value / Math.sqrt(transposed[index].reduce((sum, val) => sum + val ** 2, 0))
                    )
                );
            };

            // Weighted normalize matrix
            const weightedNormalizeMatrix = (normalizedMatrix: number[][], weights: number[]): number[][] => {
                return normalizedMatrix.map(row =>
                    row.map((value, index) => value * weights[index])
                );
            };

            // Find ideal and anti-ideal solutions
            const findIdealSolutions = (weightedMatrix: number[][]): { ideal: number[]; antiIdeal: number[] } => {
                const ideal = weightedMatrix[0].map((_, colIndex) =>
                    Math.max(...weightedMatrix.map(row => row[colIndex]))
                );
                const antiIdeal = weightedMatrix[0].map((_, colIndex) =>
                    Math.min(...weightedMatrix.map(row => row[colIndex]))
                );
                return { ideal, antiIdeal };
            };

            // Calculate distances
            const calculateDistances = (
                weightedMatrix: number[][],
                ideal: number[],
                antiIdeal: number[]
            ): { distancesToIdeal: number[]; distancesToAntiIdeal: number[] } => {
                const distancesToIdeal = weightedMatrix.map(row =>
                    Math.sqrt(row.reduce((sum, value, index) => sum + (value - ideal[index]) ** 2, 0))
                );
                const distancesToAntiIdeal = weightedMatrix.map(row =>
                    Math.sqrt(row.reduce((sum, value, index) => sum + (value - antiIdeal[index]) ** 2, 0))
                );
                return { distancesToIdeal, distancesToAntiIdeal };
            };

            // Calculate scores
            const calculateScores = (distancesToIdeal: number[], distancesToAntiIdeal: number[]): number[] => {
                return distancesToAntiIdeal.map((distance, index) =>
                    distance / (distance + distancesToIdeal[index])
                );
            };

            const normalizedMatrix = normalizeMatrix(suppliers);
            const weightedMatrix = weightedNormalizeMatrix(normalizedMatrix, weights);
            const { ideal, antiIdeal } = findIdealSolutions(weightedMatrix);
            const { distancesToIdeal, distancesToAntiIdeal } = calculateDistances(weightedMatrix, ideal, antiIdeal);
            const scores = calculateScores(distancesToIdeal, distancesToAntiIdeal);

            const rankedSuppliers = suppliers.map((supplier, index) => ({
                name: supplier.name,
                score: scores[index],
            })).sort((a, b) => b.score - a.score);

            setSortedSuppliers(rankedSuppliers);
        }
    }, [weights]);


    const bestSupplier = sortedSuppliers[0];

    return (
        <Box
            sx={{
                color: "#ffffff",
                p: 4,
            }}
        >
            <Typography variant="h4" align="left" gutterBottom>
                Supplier Selection
            </Typography>
            <Stepper alternativeLabel activeStep={2} sx={{ mb: 4 }}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel
                            sx={{
                                "& .MuiStepLabel-label": { color: "#ffffff" },
                                "& .MuiStepIcon-root": { color: "#6c63ff" },
                            }}
                        >
                            <Typography sx={{
                                color:'white'
                            }}>
                                {label}
                            </Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Grid container spacing={4} justifyContent='center'>
                {bestSupplier && (
                    <BestSupplierCard bestSupplier={bestSupplier} />
                )}
                <Grid size={{xs:12, md:8}}>
                    <RankingTable sortedSuppliers={sortedSuppliers} />
                </Grid>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: "#6c63ff",
                            color: "white",
                            mt: 3,
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#5a54d4",
                            },
                        }}
                    >
                        Purchase
                    </Button>
            </Grid>
        </Box>
    );
};

export default TOPSISResults;
