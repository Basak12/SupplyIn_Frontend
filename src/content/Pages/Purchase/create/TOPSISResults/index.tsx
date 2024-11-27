import React, {FC, useState, useEffect, useCallback} from "react";
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
import {postCriteriaWeight} from "../../../../../api/postCriteriaWeight";
import {postPurchaseResult} from "../../../../../api/postPurchaseResult";
import product from "../../../Product";
import LoadingWrapper from "../../../../../components/LoadingWrapper";
import {getSuppliersByProduct} from "../../../../../api/getSupplierByProduct";

type SupplierScore = {
    name: string;
    score: number;
    supplierId: number;
};

type Supplier = {
    id: number;
    name: string;
    contactInfo: string;
    price: number;
    warranty: string;
    reliability: number;
    safetyReg: string;
    estDeliveryDate: Date;
    criteria: number[];
};


const TOPSISResults: FC = () => {
    const location = useLocation();
    const weights = location.state?.weights;
    const selectedProduct = location.state?.product;
    const steps = ["Select Product", "Adjust Importance", "View Result and Purchase"];

    const [sortedSuppliers, setSortedSuppliers] = useState<SupplierScore[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [suppliersByProduct, setSuppliersByProduct] = useState<Supplier[]>([]);

    const fetchSuppliersByProductId = useCallback(async () => {
        if(selectedProduct.ProID === null || selectedProduct.ProID === undefined) {
            console.error('Product is missing');
            return <LoadingWrapper />;
        };
        try {
            const response = await getSuppliersByProduct({
                productId: selectedProduct.ProID,
                });
            const processedData = response.map((item: any) => ({
                id: item.SID,
                name: item.SupplierName,
                contactInfo: item.contactInfo,
                price: parseFloat(item.price),
                warranty: item.warranty,
                reliability: item.reliability === "Excellent" ? 10 : item.reliability === "Reliable" ? 8 : 5,
                safetyReg: item.safetyReg,
                estDeliveryDate: new Date(item.estDeliveryDate),
                criteria: [
                    parseFloat(item.price),
                    item.warranty,
                    item.safetyReg,
                    item.reliability === "Excellent" ? 10 : item.reliability === "Reliable" ? 8 : 5,
                ]
            }));
            setSuppliersByProduct(processedData);

        } catch (error) {
            console.error('Error getting supplier by product:', error);
        }
    }, []);

    useEffect(() => {
        fetchSuppliersByProductId();
    }, [fetchSuppliersByProductId]);

    useEffect(() => {
        if (weights && suppliersByProduct.length > 0) {
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
            const criteriaTypes: ("cost" | "benefit")[] = ["cost", "cost", "benefit", "benefit", "benefit"];

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

            const normalizedMatrix = normalizeMatrix(suppliersByProduct);
            const weightedMatrix = weightedNormalizeMatrix(normalizedMatrix, weights);
            const { ideal, antiIdeal } = findIdealSolutions(weightedMatrix);
            const { distancesToIdeal, distancesToAntiIdeal } = calculateDistances(weightedMatrix, ideal, antiIdeal);
            const scores = calculateScores(distancesToIdeal, distancesToAntiIdeal);

            const rankedSuppliers = suppliersByProduct
                .map((supplier, index) => ({
                    name: supplier.name,
                    score: scores[index],
                    supplierId: supplier.id,
                }))
                .sort((a, b) => b.score - a.score);

            setSortedSuppliers(rankedSuppliers);
        }
    }, [weights, suppliersByProduct]);


    const bestSupplier = sortedSuppliers[0];

    const postPurchaseResults = useCallback(async (bestSupplier: any) => {
        if(!selectedProduct?.ProID || !bestSupplier?.supplierId || !bestSupplier?.score) {
            console.error('Product or supplier is missing');
            return <LoadingWrapper />;
        };
        try {
            console.log(selectedProduct, bestSupplier)

            const response = await postPurchaseResult({
                productId: selectedProduct?.ProID,
                supplierId: bestSupplier?.supplierId,
                supplierScore: (bestSupplier?.score) * 100,
            });

            console.log('supplier selection saved', response);
        } catch (error) {
            console.error('Error saving supplier selection:', error);
        }
    }, []);

    const handlePurchase = (bestSupplier:any) => {
        setOpen(true);
        postPurchaseResults(bestSupplier)
    }

    if(suppliersByProduct === null || suppliersByProduct === undefined) {
        return (
            <Card sx={{
                p:2,
                m:2
            }}>
                <Typography>No supplier found for this product</Typography>

            </Card>
        );
    }

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
            {suppliersByProduct.length === 0 ? (<Box sx={{
                p:2,
                m:2
            }}>
                <Typography variant='h5'>No supplier found for {selectedProduct.name}</Typography>

            </Box>) : (<Grid container spacing={4} justifyContent='left'>
                <BestSupplierCard bestSupplier={bestSupplier} />
                <Grid size={{xs:12, md:8}}>
                    <RankingTable sortedSuppliers={sortedSuppliers} selectedProduct={selectedProduct} />
                </Grid>
                <Button
                    onClick={() => handlePurchase(bestSupplier)}
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

            </Grid>)
            }
        </Box>
          {open &&
              <SavePurchaseDialog selectedProduct={selectedProduct} bestSupplier={bestSupplier} open={open} setOpen={setOpen} />
          }
     </>
    );
};

export default TOPSISResults;
