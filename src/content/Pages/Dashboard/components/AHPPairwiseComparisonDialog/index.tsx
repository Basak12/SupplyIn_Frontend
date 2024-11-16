import React, { FC, useState } from 'react';
import {
    DialogTitle,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Slider,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2"

interface AHPPairwiseComparisonDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const AHPPairwiseComparisonDialog: FC<AHPPairwiseComparisonDialogProps> = ({ open, setOpen }) => {
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

    const handleSliderChange = (key: string) => (event: Event, newValue: number | number[]) => {
        setSliderValues((prev) => ({
            ...prev,
            [key]: newValue as number,
        }));
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="lg"
            PaperProps={{
                style: {
                    maxHeight: '90vh',
                    overflow: 'visible',
                },
            }}
        >
            <DialogTitle>
                Pairwise Comparison
                <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                    Please indicate relative importances by using sliders below. (e.g., if price is strongly important than delivery time, proceed the slider to 5)
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
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
            </DialogTitle>
            <DialogContent
                sx={{
                    overflow: "visible",
                    padding: 4,
                }}
            >
                <Grid container spacing={3} alignItems="center">
                    {Object.entries(sliderValues).map(([key, value]) => {
                        const [first, second] = key.split("-");
                        return (
                            <Grid container key={key} spacing={2} alignItems="center">
                                <Grid size={3} sx={{ textAlign: "right" }}>
                                    <Typography noWrap>
                                        {first}
                                    </Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Slider
                                        onChange={handleSliderChange(key)}
                                        value={value}
                                        step={1}
                                        marks
                                        min={1}
                                        max={9}
                                        valueLabelDisplay="auto"  // Show value above the slider
                                        valueLabelFormat={(value) => `${value}`}  // Display the current value
                                    />
                                </Grid>
                                <Grid size={3} sx={{ textAlign: "left" }}>
                                    <Typography noWrap>
                                        {second}
                                    </Typography>
                                </Grid>
                            </Grid>
                        );
                    })}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose}>Agree</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AHPPairwiseComparisonDialog;
