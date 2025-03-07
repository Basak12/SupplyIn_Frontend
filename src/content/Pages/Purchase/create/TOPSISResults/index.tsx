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
import {useAuth} from "../../../../../context/AuthContext";
import {getSupplierProductsByProductId} from "../../../../../api/getSupplierProductByProductId";
import {SupplierProduct} from "../../../../../model/supplierProduct";

const TOPSISResults: FC = () => {
    const location = useLocation();
    const { user } = useAuth();
    const weights = location.state?.weights;
    const selectedProduct = location.state?.product;
    const steps = ["Select Product", "Adjust Importance", "View Result and Purchase"];

    const [sortedSuppliers, setSortedSuppliers] = useState<any>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [suppliersByProduct, setSuppliersByProduct] = useState<any>([]);
    const [supplierProduct, setSupplierProduct] = useState<SupplierProduct[]>([]);

    // todo add error handling for null, undefined, empty values for suppliers


    const fetchSupplierProductByProductId = useCallback(async () =>{
        if (!selectedProduct?.id || !selectedProduct?.name) {
            console.error("Product is missing");
            return <LoadingWrapper />;
        }
        try {
            const response = await getSupplierProductsByProductId(selectedProduct.id)
            setSupplierProduct(response);
            const processedData = response.map((item: any) => ({
                id: item.id,
                name: item.supplier.name,
                price: parseFloat(item.price),
                deliveryTime: parseFloat(item.deliveryTimeWeeks),
                warranty: parseFloat(item.warranty.replace(' Years', '')),
                compliance: parseFloat(item.safetyRegulationsCompliance.replace('%', '')),
                reliability: parseFloat(item.reliability),
                criteriaWeights: [
                    parseFloat(item.price),
                    parseFloat(item.deliveryTimeWeeks),
                    parseFloat(item.warranty),
                    parseFloat(item.safetyRegulationsCompliance),
                    parseFloat(item.reliability),
                ],
            }));
            console.log('processedData', processedData);
        }
        catch (error){
            console.log('error', error);
        }
    },[])

    useEffect(() => {
        fetchSupplierProductByProductId();
    }, [fetchSupplierProductByProductId]);

    console.log('aasdadas', supplierProduct);


    if(!supplierProduct) {
        return <p>not found</p>;
    }

    //
    // const fetchSuppliersByProductId = useCallback(async () => {
    //     if (!selectedProduct?.id || !selectedProduct?.name) {
    //         console.error("Product is missing");
    //         return <LoadingWrapper />;
    //     }
    //     try {
    //         const response = await getSuppliersByProduct(selectedProduct.name);
    //         const processedData = response.map((item: any) => ({
    //             id: item.supplierid,
    //             name: item.suppliername,
    //             contactInfo: item.contactinfo,
    //             price: parseFloat(item.price),
    //             deliveryTime: parseFloat(item.deliverytimeweeks),
    //             warranty: parseFloat(item.warranty.replace(' Years', '')),
    //             compliance: parseFloat(item.compliance.replace('%', '')),
    //             reliability: parseFloat(item.reliability),
    //             criteriaWeights: [
    //                 parseFloat(item.price),
    //                 parseFloat(item.deliverytimeweeks),
    //                 parseFloat(item.warranty),
    //                 parseFloat(item.compliance),
    //                 parseFloat(item.reliability),
    //             ],
    //         }));
    //         setSuppliersByProduct(processedData);
    //     } catch (error) {
    //         console.error("Error getting suppliers by product:", error);
    //     }
    // }, [selectedProduct]);
    //
    // useEffect(() => {
    //     fetchSuppliersByProductId();
    // }, [fetchSuppliersByProductId]);

    // TOPSIS calculation
    // useEffect(() => {
    //     if (weights && suppliersByProduct.length > 0) {
    //         const normalizeMatrix = (suppliers: Supplier[]): number[][] => {
    //             const transposed: number[][] = suppliers[0].criteriaWeights.map((_, colIndex) =>
    //                 suppliers.map((supplier) => supplier.criteriaWeights[colIndex])
    //             );
    //
    //             return suppliers.map((supplier) =>
    //                 supplier.criteriaWeights.map((value, index) => {
    //                     const columnValues = transposed[index];
    //                     const sumOfSquares = columnValues.reduce((sum: number, val: number) => sum + val ** 2, 0);
    //                     return value / Math.sqrt(sumOfSquares);
    //                 })
    //             );
    //         };
    //
    //         const weightedNormalizeMatrix = (normalizedMatrix: number[][], weights: number[]): number[][] => {
    //             return normalizedMatrix.map((row) =>
    //                 row.map((value, index) => value * weights[index])
    //             );
    //         };
    //
    //         const findIdealSolutions = (weightedMatrix: number[][]): { ideal: number[]; antiIdeal: number[] } => {
    //             const criteriaTypes: ("cost" | "benefit")[] = ["cost", "cost", "benefit", "benefit", "benefit"]; // Kriter türlerini belirtin
    //
    //             const ideal = weightedMatrix[0].map((_, colIndex) =>
    //                 criteriaTypes[colIndex] === "benefit"
    //                     ? Math.max(...weightedMatrix.map((row) => row[colIndex]))
    //                     : Math.min(...weightedMatrix.map((row) => row[colIndex]))
    //             );
    //
    //             const antiIdeal = weightedMatrix[0].map((_, colIndex) =>
    //                 criteriaTypes[colIndex] === "benefit"
    //                     ? Math.min(...weightedMatrix.map((row) => row[colIndex]))
    //                     : Math.max(...weightedMatrix.map((row) => row[colIndex]))
    //             );
    //
    //             return { ideal, antiIdeal };
    //         };
    //
    //         const calculateDistances = (
    //             weightedMatrix: number[][],
    //             ideal: number[],
    //             antiIdeal: number[]
    //         ): { distancesToIdeal: number[]; distancesToAntiIdeal: number[] } => {
    //             const distancesToIdeal = weightedMatrix.map((row, rowIndex) => {
    //                 const distance = Math.sqrt(
    //                     row.reduce(
    //                         (sum, value, colIndex) => {
    //                             const diff = value - ideal[colIndex];
    //                             const tolerance = 0.0001;
    //                             const adjustedDiff = Math.abs(diff) < tolerance ? tolerance : diff;
    //                             return sum + adjustedDiff ** 2;
    //                         },
    //                         0
    //                     )
    //                 );
    //                 return distance;
    //             });
    //
    //             const distancesToAntiIdeal = weightedMatrix.map((row, rowIndex) => {
    //                 const distance = Math.sqrt(
    //                     row.reduce(
    //                         (sum, value, colIndex) => {
    //                             const diff = value - antiIdeal[colIndex];
    //                             const tolerance = 0.0001;
    //                             const adjustedDiff = Math.abs(diff) < tolerance ? tolerance : diff;
    //                             return sum + adjustedDiff ** 2;
    //                         },
    //                         0
    //                     )
    //                 );
    //                 return distance;
    //             });
    //             return { distancesToIdeal, distancesToAntiIdeal };
    //         };
    //
    //         const calculateScores = (distancesToIdeal: number[], distancesToAntiIdeal: number[]): number[] => {
    //             return distancesToAntiIdeal.map((distance, index) =>
    //                 distance / (distance + distancesToIdeal[index])
    //             );
    //         };
    //
    //         const normalizedMatrix = normalizeMatrix(suppliersByProduct);
    //         const weightedMatrix = weightedNormalizeMatrix(normalizedMatrix, weights);
    //         const { ideal, antiIdeal } = findIdealSolutions(weightedMatrix);
    //         const { distancesToIdeal, distancesToAntiIdeal } = calculateDistances(weightedMatrix, ideal, antiIdeal);
    //         const scores = calculateScores(distancesToIdeal, distancesToAntiIdeal);
    //         const scoresOutOf100 = scores.map(score => score * 100);
    //
    //         const rankedSuppliers = suppliersByProduct.map((supplier: any, index: number) => ({
    //             name: supplier.name,
    //             score: scoresOutOf100[index],
    //             supplierId: supplier.id,
    //         })).sort((a: any, b: any) => b.score - a.score);
    //
    //         setSortedSuppliers(rankedSuppliers);
    //     }
    // }, [weights, suppliersByProduct]);

    // const bestSupplier = sortedSuppliers[0];
    //
    // const postPurchaseResults = useCallback(async (bestSupplier: any) => {
    //     if (!selectedProduct?.id || !bestSupplier?.supplierId || !bestSupplier?.score) {
    //         console.error('Product or supplier is missing');
    //         return;
    //     }
    //     if(!user?.id) {
    //         console.log('User is missing');
    //         return;
    //     }
    //     try {
    //         console.log(selectedProduct, bestSupplier);
    //         const response = await postPurchaseResult({
    //             userId: user.id,
    //             productId: selectedProduct.id,
    //             supplierId: bestSupplier.supplierId,
    //             supplierScore: (bestSupplier.score),
    //         });
    //
    //         console.log('Supplier selection saved', response);
    //     } catch (error) {
    //         console.error('Error saving supplier selection:', error);
    //     }
    // }, [selectedProduct]);
    //
    // const handlePurchase = (bestSupplier: any) => {
    //     setOpen(true);
    //     postPurchaseResults(bestSupplier);
    // };

    if (!suppliersByProduct.length) {
        return (
            <Card sx={{ p: 2, m: 2 }}>
                <Typography>No supplier found for this product</Typography>
            </Card>
        );
    }

    return (
        <>
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
                {/*<Grid container spacing={4} justifyContent="left">*/}
                {/*    <BestSupplierCard bestSupplier={bestSupplier} />*/}
                {/*    <Grid size={{ xs: 12, md: 8 }}>*/}
                {/*        <RankingTable sortedSuppliers={sortedSuppliers} selectedProduct={selectedProduct} />*/}
                {/*    </Grid>*/}
                {/*    <Button*/}
                {/*        onClick={() => handlePurchase(bestSupplier)}*/}
                {/*        variant="contained"*/}
                {/*        sx={{*/}
                {/*            backgroundColor: "#6c63ff",*/}
                {/*            color: "white",*/}
                {/*            textTransform: "none",*/}
                {/*            fontSize: "1.2rem",*/}
                {/*            paddingY: 2,*/}
                {/*            paddingX: 12,*/}
                {/*            width: "20%",*/}
                {/*            "&:hover": {*/}
                {/*                backgroundColor: "#5a54d4",*/}
                {/*            },*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        Purchase*/}
                {/*    </Button>*/}
                {/*</Grid>*/}
            </Box>
            {/*{open && (*/}
            {/*    <SavePurchaseDialog*/}
            {/*        selectedProduct={selectedProduct}*/}
            {/*        bestSupplier={bestSupplier}*/}
            {/*        open={open}*/}
            {/*        setOpen={setOpen}*/}
            {/*    />*/}
            {/*)}*/}
        </>
    );
};

export default TOPSISResults;
