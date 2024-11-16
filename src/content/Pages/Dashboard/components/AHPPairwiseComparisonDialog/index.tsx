import React, { FC, useEffect, useState } from 'react';
import {
    DialogTitle,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    DialogContentText,
    Box,
    Slider, Typography, Stack
} from "@mui/material";

interface AHPPairwiseComparisonDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}


const AHPPairwiseComparisonDialog: FC<AHPPairwiseComparisonDialogProps> = ({open,setOpen}) => {

    const [value, setValue] = useState<number>(3);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
    };

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{"Pairwise Comparison"}</DialogTitle>
            <DialogContent>
                <Box width={500}>
                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                        <Typography>
                        Price
                        </Typography>
                        <Slider
                            onChange={handleChange}
                            value={value}
                            step={1}
                            marks
                            min={1}
                            max={9}
                        />
                        <Typography>
                            Delivery Time
                        </Typography>
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose}>Agree</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AHPPairwiseComparisonDialog;
