import React, { FC } from 'react';
import { Card, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import {useNavigate} from "react-router-dom";


type Matrix = number[][];
interface AHPTestComponentProps {
    comparisonMatrix: Matrix | null;
    openAHPComponent: boolean;
    setOpenAHPComponent: (value: boolean) => void;
    selectedProduct: any;
}

const AHPTestComponent: FC<AHPTestComponentProps> = ({comparisonMatrix, openAHPComponent, setOpenAHPComponent, selectedProduct}) => {

    const navigate = useNavigate();

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

    const handleClose = () => {
        if(consistencyRatio > 0.1 || consistencyRatio === 0) {
            setOpenAHPComponent(false);
        }
        if (consistencyRatio < 0.1 && consistencyRatio !== 0){
            navigate('/purchase/create/topsisResults', {state: {weights: weights, product: selectedProduct}});
        }

    }

    console.log('consistencyRatio', consistencyRatio);
    console.log('weights', weights);
    console.log('normalizedMatrix', normalizedMatrix);

    //todo if consistency is less than 0.1, create a post request to the backend to save weights
    // todo handle empty and initially filled matrix values. temporarily set to 1 equally importance

    return (
        <>
            <Dialog
                open={openAHPComponent}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        p: 3,
                        backgroundColor: '#2D264B',
                        color: '#fff',
                        width: 400,
                    }
                }}
            >
                <DialogContent sx={{ textAlign: 'center' }}>
                    {(consistencyRatio > 0.1) &&  (
                        <>
                            <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                                <SentimentDissatisfiedIcon
                                    sx={{
                                        fontSize: 50,
                                        color: '#F8A33F',
                                    }}
                                />
                            </Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Your selections are inconsistent.
                            </Typography>
                            <Typography variant="body1">
                                Please review your comparisons.
                            </Typography>
                            <Typography variant="body1">
                                Consistency Ratio: {consistencyRatio.toFixed(2)}
                            </Typography>
                            <Box mt={1}>
                                {weights.map((weight, idx) => (
                                    <Typography key={idx} variant="body1">
                                        {weight.toFixed(2)}
                                    </Typography>
                                ))}
                            </Box>
                        </>
                    )}
                    {(consistencyRatio === 0) &&  (
                        <>
                            <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                                <SentimentDissatisfiedIcon
                                    sx={{
                                        fontSize: 50,
                                        color: '#F8A33F',
                                    }}
                                />
                            </Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Please make a selection
                            </Typography>
                            <Typography variant="body1">
                                Consistency Ratio: {consistencyRatio.toFixed(2)}
                            </Typography>
                        </>
                    )}
                    {(consistencyRatio < 0.1 && consistencyRatio !== 0) && (
                        <>
                            <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                                <SentimentSatisfiedAltIcon
                                    sx={{
                                        fontSize: 50,
                                        color: '#F8A33F',
                                    }}
                                />
                            </Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Your selections are consistent.
                            </Typography>
                            <Typography variant="body1">
                                Consistency Ratio: {consistencyRatio.toFixed(2)}
                            </Typography>
                            <Box mt={1}>
                                {weights.map((weight, idx) => (
                                    <Typography key={idx} variant="body1">
                                        {weight.toFixed(2)}
                                    </Typography>
                                ))}
                            </Box>
                        </>
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', mt: 1 }}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            textTransform: 'none',
                            backgroundColor: '#4A3F6A',
                            color: '#fff',
                            px: 4,
                            py: 1,
                            borderRadius: 3,
                            '&:hover': {
                                backgroundColor: '#372D54',
                            },
                        }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AHPTestComponent;
/*
 {consistencyRatio < 0.1 && (
                <LoadingWrapper
                    message="Calculating..."
                    size={50}
                    autoHideDelay={5000} // Hides after 5 seconds
                    onHide={() => console.log('Loading finished!')}
                />

            )}
 */