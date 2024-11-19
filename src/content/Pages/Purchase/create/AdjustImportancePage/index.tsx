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

const AdjustImportancePage: FC = () => {
    const location = useLocation();
    const selectedProduct = location.state?.product;

    const steps = ['Select Product', 'Adjust Importance', 'View Result and Purchase'];

    const [comparisons, setComparisons] = useState({
        price: { deliveryTime: '', warranty: '', reliability: '', safety: '' },
        deliveryTime: { warranty: '', reliability: '', safety: '' },
        warranty: { reliability: '', safety: '' },
        reliability: { safety: '' },
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

    const importanceLevels = [
        'Equal Importance',
        'Moderate Importance',
        'Strong Importance',
        'Very Strong Importance',
        'Extreme Importance',
    ];

    console.log('selectedProduct', selectedProduct)
    console.log('comparisons', comparisons)

    return (
        <Box
            sx={{
                color: '#ffffff',
                p: 4,
            }}
        >
            <Typography variant="h4" align="left" gutterBottom>
                Supplier Selection
            </Typography>
            <Stepper alternativeLabel activeStep={1} sx={{ mb: 4 }}>
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
            <Grid container spacing={3}>
                {Object.entries(comparisons).map(([category, values], index) => (
                    <Grid size={{xs:12, md:6,}} key={index}>
                        <Card
                            sx={{
                                backgroundColor: '#2c2c40',
                                borderRadius: 3,
                                p: 3,
                                color: '#ffffff',
                                width: '70%',
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
                                        value={(values as any)[key]}
                                        onChange={(e) =>
                                            handleChange(category as keyof typeof comparisons, key, e.target.value)
                                        }
                                        displayEmpty
                                        IconComponent={KeyboardArrowDownIcon}
                                        sx={{
                                            minWidth: 180,
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
                                            <MenuItem key={level} value={level}>
                                                {level}
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
            <Box display="flex" justifyContent="flex-end">
                <Button
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
    );
};

export default AdjustImportancePage;
