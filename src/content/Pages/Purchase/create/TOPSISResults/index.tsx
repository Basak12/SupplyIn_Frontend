import React, {FC, useState, useEffect, useCallback} from "react";
import {
    Box,
    Button,
    Stepper,
    Step,
    StepLabel,
    Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import BestSupplierCard from "./components/BestSupplierCard";
import RankingTable from "./components/RankingTable";
import SavePurchaseDialog from "./components/SavePurchaseDialog";
import {postCriteriaWeight} from "../../../../../api/postCriteriaWeight";
import {postPurchaseResult} from "../../../../../api/postPurchaseResult";
import product from "../../../Product";

type Supplier = {
    name: string;
    criteria: number[];
    id: number;
};

type SupplierScore = {
    name: string;
    score: number;
    supplierId: number;
};

const TOPSISResults: FC = () => {
    const location = useLocation();
    const weights = location.state?.weights;
    const selectedProduct = location.state?.product;
    const steps = ["Select Product", "Adjust Importance", "View Result and Purchase"];

    const [sortedSuppliers, setSortedSuppliers] = useState<SupplierScore[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    const suppliers: Supplier[] = [
        { name: "Supplier A", criteria: [300, 4, 5, 8, 9], id: 1 },
        { name: "Supplier B", criteria: [250, 3, 6, 7, 8], id: 2  },
        { name: "Supplier C", criteria: [400, 5, 3, 9, 10], id: 3 },
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
            const criteriaTypes = ["cost", "cost", "benefit", "benefit", "benefit"]; // Example: Price, Delivery Time -> cost; Others -> benefit

            const findIdealSolutions = (weightedMatrix: number[][]): { ideal: number[]; antiIdeal: number[] } => {
                const ideal = weightedMatrix[0].map((_, colIndex) =>
                    criteriaTypes[colIndex] === "benefit"
                        ? Math.max(...weightedMatrix.map(row => row[colIndex]))
                        : Math.min(...weightedMatrix.map(row => row[colIndex]))
                );
            const antiIdeal = weightedMatrix[0].map((_, colIndex) =>
                criteriaTypes[colIndex] === "benefit"
                    ? Math.min(...weightedMatrix.map(row => row[colIndex]))
                    : Math.max(...weightedMatrix.map(row => row[colIndex]))
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
                supplierId: supplier.id,
            })).sort((a, b) => b.score - a.score);

            setSortedSuppliers(rankedSuppliers);
        }
    }, [weights]);


    const bestSupplier = sortedSuppliers[0];

    const postPurchaseResult = useCallback(async () => {
        if(!selectedProduct?.id || !bestSupplier?.supplierId || !bestSupplier?.score) {
            console.error('Product or supplier is missing');
            return;
        };
        try {
            const response = await postCriteriaWeight({
                productId: selectedProduct.id,
                supplierId: bestSupplier.supplierId,
                supplierScore: bestSupplier.score,
            });

            console.log('Criteria weight saved successfully:', response);
        } catch (error) {
            console.error('Error saving criteria weight:', error);
        }
    }, []);

    const handlePurchase = () => {
        setOpen(true);
        postPurchaseResult();

    }
    console.log('bestSupplier', bestSupplier)
    console.log('selectedProduct', selectedProduct)

    return (
      <>
        <Box
            sx={{
                color: "#ffffff",
                p: 4,
            }}
        >
            <Typography variant="h4" align="left" gutterBottom sx={{marginBottom: "2rem"}}>
                Supplier Selection
            </Typography>
            <Stepper alternativeLabel activeStep={2} sx={{ mb: 10 }}>
                {steps.map((label) => (
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
            <Grid container spacing={4} justifyContent='left'>
                    <BestSupplierCard bestSupplier={bestSupplier} />
                <Grid size={{xs:12, md:8}}>
                    <RankingTable sortedSuppliers={sortedSuppliers} selectedProduct={selectedProduct} />
                </Grid>
                <Button
                    onClick={handlePurchase}
                    variant="contained"
                    sx={{
                        backgroundColor: "#6c63ff",
                        color: "white",
                        textTransform: "none",
                        fontSize: "1.2rem",
                        mt: -10,
                        ml:10,
                        paddingY: 2,
                        paddingX: 12,
                        width: "20%",
                        "&:hover": {
                            backgroundColor: "#5a54d4",
                        },
                    }}
                >
                    Purchase
                </Button>

            </Grid>
        </Box>
          {open &&
              <SavePurchaseDialog selectedProduct={selectedProduct} bestSupplier={bestSupplier} open={open} setOpen={setOpen} />
          }
     </>
    );
};

export default TOPSISResults;
