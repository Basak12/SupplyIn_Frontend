import React, { FC, useState } from 'react';
import {
    Box,
    Typography,
    Card,
    MenuItem,
    Select,
    Button,
    Stepper,
    Step,
    StepLabel,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import Grid from "@mui/material/Grid2";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {ChevronRight} from "@mui/icons-material";
import AHPTestComponent from "../../../../ahp";

const AdjustImportancePage: FC = () => {
    const location = useLocation();
    const selectedProduct = location.state?.product;
    const [openAHPComponent, setOpenAHPComponent] = useState(false);

    const [comparisonMatrix, setComparisonMatrix] = useState<number[][] | null>(null);

    const steps = ['Select Product', 'Adjust Importance', 'View Result and Purchase'];

    const [comparisons, setComparisons] = useState({
        price: { deliveryTime: '1', warranty: '1', reliability: '1', safety: '1' },
        deliveryTime: { warranty: '1', reliability: '1', safety: '1', price: '1' },
        warranty: { reliability: '1', safety: '1', price: '1', deliveryTime: '1' },
        reliability: { safety: '1', price: '1', deliveryTime: '1', warranty: '1' },
        safety: { price: '1', deliveryTime: '1', warranty: '1', reliability: '1'}
    });

    const categoryDisplayNames: Record<string, string> = {
        price: "Price",
        deliveryTime: "Delivery Time",
        warranty: "Warranty",
        reliability: "Reliability",
        safety: "Safety",
    };

    const handleChange = (
        category: keyof typeof comparisons,
        key: string,
        value: string
    ) => {
        setComparisons((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value,
            },
        }));
    };

    const generateMatrixFromComparisons = () => {
        const criteria = ["price", "deliveryTime", "warranty", "reliability", "safety"] as const;
        type Criterion = typeof criteria[number];

        const matrixSize = criteria.length;
        const matrix: number[][] = Array.from({ length: matrixSize }, () =>
            Array(matrixSize).fill(1)
        );

        for (let i = 0; i < matrixSize; i++) {
            for (let j = i + 1; j < matrixSize; j++) {
                const critA = criteria[i];
                const critB = criteria[j];

                const valA = (comparisons[critA] as Record<string, string>)[critB];
                const valB = (comparisons[critB] as Record<string, string>)[critA];

                let value = 1;
                if (valA) {
                    value = parseFloat(valA);
                } else if (valB) {
                    value = 1 / parseFloat(valB);
                }

                matrix[i][j] = value;
                matrix[j][i] = 1 / value;
            }
        }
        setComparisonMatrix(matrix);
    };

    const handleCalculateWeight = () => {
        generateMatrixFromComparisons();
        setOpenAHPComponent(true);
    };

    const importanceLevels = [
        {
            value: 1,
            label: 'Equally Important'
        },
        {
            value: 3,
            label: 'Moderately Important'
        },
        {
            value: 5,
            label: 'Strongly Important'
        },
        {
            value: 7,
            label: 'Very Strongly Important'
        },
        {
            value: 9,
            label: 'Extremely Important'
        }
    ]


    console.log('comparisons', comparisons);

    return (
        <>
        <Box
            sx={{
                color: '#ffffff',
                p: 4,
            }}
        >
            <Typography variant="h4" align="left" gutterBottom sx={{marginBottom: "2rem"}}>
                Supplier Selection
            </Typography>
            <Stepper alternativeLabel activeStep={1} sx={{ mb: 8 }}>
                {steps.map((label) => (
                    <Step key={label} sx={{
                        color:'white'
                    }}>
                        <StepLabel sx={{
                            '& .MuiStepLabel-label': { color: '#ffffff' },
                            '& .MuiStepIcon-root': { color: '#6c63ff' },
                        }}>
                            <Typography sx={{
                                color:'white'
                            }}>
                                {label}
                            </Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Typography variant="h5" gutterBottom>
                Pairwise Comparison for {selectedProduct?.name}
            </Typography>
            <Grid container spacing={2} display='flex'>
                {Object.entries(comparisons).map(([category, values], index) => (
                    <Grid size={{xs:12, md:6, lg:4}} key={index}>
                        <Card
                            sx={{
                                backgroundColor: '#2c2c40',
                                borderRadius: 3,
                                p: 3,
                                color: '#ffffff',
                                width: '85%',
                            }}
                        >
                            <Typography variant="h6" sx={{ mb: 2, color: '#ff8800' }}>
                                {categoryDisplayNames[category] || category} is
                            </Typography>
                            {Object.keys(values).map((key, idx) => (
                                <Box
                                    key={idx}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="flex-start"
                                    mb={2}
                                >
                                    <Select
                                        value={(values as any)[key] || '1'}
                                        onChange={(e) =>
                                            handleChange(category as keyof typeof comparisons, key, e.target.value)
                                        }
                                        displayEmpty
                                        IconComponent={KeyboardArrowDownIcon}
                                        sx={{
                                            width: 220,
                                            height: 40,
                                            backgroundColor: '#1e1e30',
                                            color: '#ffffff',
                                            borderRadius: 4,
                                            '& .MuiSelect-icon': { color: '#ffffff' },
                                        }}
                                    >
                                        <MenuItem value="" disabled>
                                            Select importance
                                        </MenuItem>
                                        {importanceLevels.map((level) => (
                                            <MenuItem key={level.label} value={level.value}>
                                                {level.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <Typography variant="body1" sx={{
                                        ml: 2,
                                        color: '#ff8800'}}
                                    >
                                        than {categoryDisplayNames[key] || key.charAt(0).toUpperCase() + key.slice(1)}
                                    </Typography>
                                </Box>
                            ))}
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box display="flex" justifyContent="flex-end" mt={-9} mr={3}>
                <Button
                    onClick={handleCalculateWeight}
                    endIcon={<ChevronRight />}
                    variant="contained"
                    sx={{
                        backgroundColor: '#6c63ff',
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        '&:hover': {
                            backgroundColor: '#5a52e6',
                        },
                    }}
                >
                    Run
                </Button>
            </Box>
        </Box>
            {openAHPComponent && (
            <AHPTestComponent
                selectedProduct={selectedProduct}
                comparisonMatrix={comparisonMatrix}
                openAHPComponent={openAHPComponent}
                setOpenAHPComponent={setOpenAHPComponent}/>
            )
          }
    </>
    );
};

export default AdjustImportancePage;
