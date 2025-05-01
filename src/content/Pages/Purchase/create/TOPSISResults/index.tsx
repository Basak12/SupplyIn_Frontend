import React, { FC, useState, useEffect, useCallback } from "react";
import {
    Box,
    Button,
    Stepper,
    Step,
    StepLabel,
    Typography,
    Card,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import BestSupplierCard from "./components/BestSupplierCard";
import RankingTable from "./components/RankingTable";
import SavePurchaseDialog from "./components/SavePurchaseDialog";
import { postPurchaseResult } from "../../../../../api/postPurchaseResult";
import LoadingWrapper from "../../../../../components/LoadingWrapper";
import { getSuppliersByProduct } from "../../../../../api/getSupplierByProduct";
import { Supplier } from "../../../../../model/supplier";
import { useAuth } from "../../../../../context/AuthContext";
import { getSupplierProductsByProductId } from "../../../../../api/getSupplierProductByProductId";
import { SupplierProduct } from "../../../../../model/supplierProduct";

const TOPSISResults: FC = () => {
    const location = useLocation();
    const { user } = useAuth();
    const weights = location.state?.weights;
    const selectedProduct = location.state?.product;
    const steps = ["Select Product", "Adjust Importance", "View Result and Purchase"];

    const [sortedSuppliers, setSortedSuppliers] = useState<any>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [supplierProduct, setSupplierProduct] = useState<SupplierProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSupplierProductByProductId = useCallback(async () => {
        if (!selectedProduct?.id) {
            console.error("Product ID is missing");
            setError("Product information is missing.");
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await getSupplierProductsByProductId(selectedProduct.id);
            const processedData = response.map((item:any) => ({
                id: item.id,
                name: item.supplier.name,
                supplierId: item.supplier.id,
                price: parseFloat(item.price),
                deliveryTime: parseFloat(item.deliveryTimeWeeks),
                warranty: parseFloat(item.warranty.replace(' Years', '')),
                compliance: parseFloat(item.safetyRegulationsCompliance.replace('%', '')),
                reliability: parseFloat(item.reliability),
                criteriaWeight: {
                    price: parseFloat(item.price),
                    deliveryTime: parseFloat(item.deliveryTimeWeeks),
                    warranty: parseFloat(item.warranty.replace(' Years', '')),
                    safetyRegulationsCompliance: parseFloat(item.safetyRegulationsCompliance.replace('%', '')),
                    reliability: parseFloat(item.reliability),
                },
            }));
            setSupplierProduct(processedData);
        } catch (err: any) {
            console.error('Error fetching supplier products:', err);
            setError("Failed to fetch supplier products.");
        } finally {
            setLoading(false);
        }
    }, [selectedProduct?.id]);

    useEffect(() => {
        fetchSupplierProductByProductId();
    }, [fetchSupplierProductByProductId]);

    const normalizeMatrix = useCallback(
        (supplierProducts: SupplierProduct[]): number[][] => {
            if (!supplierProducts || supplierProducts.length === 0 || !supplierProducts[0]?.criteriaWeight) {
                return [];
            }

            const criteriaKeys = Object.keys(supplierProducts[0].criteriaWeight);
            const transposed: number[][] = criteriaKeys.map((key, colIndex) =>
                supplierProducts.map((supplierProduct) => (supplierProduct.criteriaWeight as any)[key] as number)
            );

            return supplierProducts.map((supplier) => {
                const criteriaValues = Object.values(supplier.criteriaWeight) as number[];
                return criteriaValues.map((value, index) => {
                    const columnValues = transposed[index];
                    const sumOfSquares = columnValues.reduce((sum: number, val: number) => sum + val ** 2, 0);
                    return value / Math.sqrt(sumOfSquares);
                });
            });
        },
        []
    );

    const weightedNormalizeMatrix = useCallback(
        (normalizedMatrix: number[][], weights: number[]): number[][] => {
            return normalizedMatrix.map((row) =>
                row.map((value, index) => (weights && weights[index] !== undefined) ? value * weights[index] : value)
            );
        },
        []
    );

    const findIdealSolutions = useCallback(
        (weightedMatrix: number[][]): { ideal: number[]; antiIdeal: number[] } => {
            if (!weightedMatrix || weightedMatrix.length === 0 || weightedMatrix[0].length === 0) {
                return { ideal: [], antiIdeal: [] }; // Handle empty matrix
            }
            const criteriaTypes: ("cost" | "benefit")[] = ["cost", "cost", "benefit", "benefit", "benefit"];

            const ideal = weightedMatrix[0].map((_, colIndex) =>
                criteriaTypes[colIndex] === "benefit"
                    ? Math.max(...weightedMatrix.map((row) => row[colIndex]))
                    : Math.min(...weightedMatrix.map((row) => row[colIndex]))
            );

            const antiIdeal = weightedMatrix[0].map((_, colIndex) =>
                criteriaTypes[colIndex] === "benefit"
                    ? Math.min(...weightedMatrix.map((row) => row[colIndex]))
                    : Math.max(...weightedMatrix.map((row) => row[colIndex]))
            );

            return { ideal, antiIdeal };
        },
        []
    );

    const calculateDistances = useCallback(
        (
            weightedMatrix: number[][],
            ideal: number[],
            antiIdeal: number[]
        ): { distancesToIdeal: number[]; distancesToAntiIdeal: number[] } => {
            const calculateDistance = (row: number[], target: number[]) => {
                return Math.sqrt(
                    row.reduce((sum, value, colIndex) => {
                        const diff = value - target[colIndex];
                        const tolerance = 0.0001;
                        const adjustedDiff = Math.abs(diff) < tolerance ? tolerance : diff;
                        return sum + adjustedDiff ** 2;
                    }, 0)
                );
            };

            const distancesToIdeal = weightedMatrix.map((row) => calculateDistance(row, ideal));
            const distancesToAntiIdeal = weightedMatrix.map((row) => calculateDistance(row, antiIdeal));

            return { distancesToIdeal, distancesToAntiIdeal };
        },
        []
    );

    const calculateScores = useCallback(
        (distancesToIdeal: number[], distancesToAntiIdeal: number[]): number[] => {
            return distancesToAntiIdeal.map((distance, index) =>
                distance / (distance + distancesToIdeal[index])
            );
        },
        []
    );

    useEffect(() => {
        if (supplierProduct && supplierProduct.length > 0 && weights && weights.length > 0) {
            const normalizedMatrix = normalizeMatrix(supplierProduct);
            const weightedMatrix = weightedNormalizeMatrix(normalizedMatrix, weights);
            const { ideal, antiIdeal } = findIdealSolutions(weightedMatrix);
            const { distancesToIdeal, distancesToAntiIdeal } = calculateDistances(weightedMatrix, ideal, antiIdeal);
            const scores = calculateScores(distancesToIdeal, distancesToAntiIdeal);
            const scoresOutOf100 = scores.map(score => score * 100);

            const rankedSuppliers = supplierProduct.map((supplierProduct, index) => ({
                ...supplierProduct,
                score: scoresOutOf100[index],
                supplierId: supplierProduct.supplierId,
            })).sort((a, b) => b.score - a.score);

            setSortedSuppliers(rankedSuppliers);
        }
    }, [supplierProduct, weights, normalizeMatrix, weightedNormalizeMatrix, findIdealSolutions, calculateDistances, calculateScores]);

    const bestSupplier = sortedSuppliers[0];
    const postPurchaseResults = useCallback(async (bestSupplier: any) => {
        if (!bestSupplier?.id || bestSupplier?.score === undefined || bestSupplier?.score === null) {
            console.error('Supplier information is missing for purchase');
            return;
        }
        if(!selectedProduct?.id){
            console.error('Product information is missing for purchase');
            return;
        }
        if (!user?.id) {
            console.log('User is missing');
            return;
        }
        try {
            const response = await postPurchaseResult({
                userId: user.id,
                productId: selectedProduct.id,
                supplierId: bestSupplier.supplierId,
                supplierScore: parseFloat(bestSupplier.score.toFixed(2)),
            });
            setOpen(true);
        } catch (error) {
            console.error('Error saving supplier selection:', error);
        }
    }, [selectedProduct?.id, user?.id]);

    if (loading) {
        return <LoadingWrapper />;
    }

    if (error) {
        return (
            <Card sx={{ p: 2, m: 2 }}>
                <Typography color="error">{error}</Typography>
            </Card>
        );
    }

    if (!supplierProduct?.length) {
        return (
            <Card sx={{ p: 2, m: 2 }}>
                <Typography>No supplier found for this product</Typography>
            </Card>
        );
    }

    return (
        <Box sx={{ color: "#ffffff", p: 4 }}>
            <Typography variant="h4" align="left" gutterBottom sx={{ marginBottom: "2rem" }}>
                Supplier Selection
            </Typography>
            <Stepper alternativeLabel activeStep={2} sx={{ mb: 10 }}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel sx={{
                            "& .MuiStepLabel-label": { color: "#ffffff" },
                            "& .MuiStepIcon-root": { color: "#6c63ff" },
                        }}>
                            <Typography sx={{ color: 'white' }}>{label}</Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Grid container spacing={4} justifyContent="left">
                {sortedSuppliers[0] && <BestSupplierCard bestSupplier={sortedSuppliers[0]} />}
                <Grid size={{ xs: 12, md: 8 }}>
                    <RankingTable sortedSuppliers={sortedSuppliers} selectedProduct={selectedProduct} />
                </Grid>
            </Grid>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    setOpen(true);
                    postPurchaseResults(bestSupplier);
                }}
                sx={{
                    backgroundColor: "#6c63ff",
                    color: "#ffffff",
                    "&:hover": {
                        backgroundColor: "#5a54e0",
                    },
                    mt: 4,
                }}>
                Save Purchase
            </Button>
            {open && sortedSuppliers[0] && (
                <SavePurchaseDialog
                    selectedProduct={selectedProduct}
                    bestSupplier={sortedSuppliers[0]}
                    open={open}
                    setOpen={setOpen}
                />
            )}
        </Box>
    );
};

export default TOPSISResults;