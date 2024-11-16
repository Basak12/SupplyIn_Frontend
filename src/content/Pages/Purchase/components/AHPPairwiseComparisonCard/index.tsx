import React, { FC, useState } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    CardHeader,
    Button,
    Slider,
    Typography,
    Box,
    Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AHPTestComponent from '../../../../ahp';

interface AHPPairwiseComparisonCardProps {
    comparisonMatrix: number[][] | null;
    setComparisonMatrix: (matrix: number[][]) => void;
}

const AHPPairwiseComparisonCard: FC<AHPPairwiseComparisonCardProps> = ({ comparisonMatrix, setComparisonMatrix }) => {
    const [sliderValues, setSliderValues] = useState<Record<string, number>>({
        "Price-Delivery Time": 3,
        "Price-Warranty": 3,
        "Price-Reliability": 3,
        "Price-Safety Regulations Compliance": 3,
        "Delivery Time-Warranty": 3,
        "Delivery Time-Reliability": 3,
        "Delivery Time-Safety Regulations Compliance": 3,
        "Warranty-Reliability": 3,
        "Warranty-Safety Regulations Compliance": 3,
        "Reliability-Safety Regulations Compliance": 3,
    });

    const [calculateAHP, setCalculateAHP] = useState<boolean>(false);

    const handleSliderChange = (key: string) => (event: Event, newValue: number | number[]) => {
        setSliderValues((prev) => ({
            ...prev,
            [key]: newValue as number,
        }));
    };

    const criteria = [
        "Price",
        "Delivery Time",
        "Warranty",
        "Reliability",
        "Safety Regulations Compliance",
    ];

    const generateComparisonMatrix = () => {
        const size = criteria.length;
        const matrix: number[][] = Array.from({ length: size }, () =>
            Array(size).fill(1)
        );

        criteria.forEach((rowCriterion, i) => {
            criteria.forEach((colCriterion, j) => {
                if (i === j) return; // Diagonal elements remain 1
                const key = `${rowCriterion}-${colCriterion}`;
                const reverseKey = `${colCriterion}-${rowCriterion}`;

                if (sliderValues[key]) {
                    matrix[i][j] = sliderValues[key];
                    matrix[j][i] = 1 / sliderValues[key];
                } else if (sliderValues[reverseKey]) {
                    matrix[i][j] = 1 / sliderValues[reverseKey];
                    matrix[j][i] = sliderValues[reverseKey];
                }
            });
        });

        return matrix;
    };

    const handleCalculateWeights = () => {
        setCalculateAHP(true);
        setComparisonMatrix(comparisonMatrix || generateComparisonMatrix());
    };

    return (
        <Card sx={{ maxWidth: '100%', margin: 'auto', mt: 4 }}>
            <CardHeader
                title="Pairwise Comparison"
                subheader="Please indicate relative importance by using sliders below. (e.g., if price is strongly important than delivery time, proceed the slider to 5)"
            />
            {!calculateAHP && (
                <>
            <CardContent>
                <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
                    Value Legend:
                    <br />
                    <strong>1:</strong> Equal Importance
                    <br />
                    <strong>3:</strong> Moderate Importance
                    <br />
                    <strong>5:</strong> Strong Importance
                    <br />
                    <strong>7:</strong> Very Strong Importance
                    <br />
                    <strong>9:</strong> Extreme Importance
                </Typography>
                <Divider sx={{ mb: 2 }} />
                    <Grid alignItems="stretch">
                        {Object.entries(sliderValues).map(([key, value]) => {
                            const [first, second] = key.split("-");
                            return (
                                <Grid container key={key} spacing={0} my={0.5}>
                                    <Grid size={12} mb={-1}>
                                        <Box display='flex' justifyContent='space-between'>
                                            <Typography>{first}</Typography>
                                            <Typography>{second}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={12}>
                                        <Slider
                                            onChange={handleSliderChange(key)}
                                            value={value}
                                            step={1}
                                            marks
                                            min={1}
                                            max={9}
                                            valueLabelDisplay="auto"
                                            valueLabelFormat={(value) => `${value}`}
                                        />
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleCalculateWeights} variant='outlined'>
                    Calculate Weights
                </Button>
            </CardActions>
                </>
            )}
            {calculateAHP && <AHPTestComponent comparisonMatrix={comparisonMatrix} />}
        </Card>
    );
};

export default AHPPairwiseComparisonCard;
