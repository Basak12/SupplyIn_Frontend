import React, {FC, useState} from 'react';
import {Card, Typography, Box, Fab, Dialog, DialogContent, Button} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from 'react-router-dom';
interface SavePurchaseDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedProduct: any;
    bestSupplier: any;
}

const SavePurchaseDialog: FC<SavePurchaseDialogProps> = ({open,setOpen, selectedProduct, bestSupplier}) => {

    const navigate = useNavigate();
    const handleClose = () => {
        setOpen(false);
    };

    const handleMakeNewSupplierSelection = () => {
        navigate("/purchase/create");
    }

    const handleViewPurchases = () => {
        navigate("/purchase/list");
    }

    if(selectedProduct === null || selectedProduct === undefined) {
        return <Typography variant='h6' sx={{
            color: '#ffffff'
        }}>Loading</Typography>;
    }
    if(bestSupplier === null || bestSupplier === undefined) {
        return <Typography variant='h6' sx={{
            color: '#ffffff'
        }}>Loading</Typography>;
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "#2b2769",
                        padding: "32px",
                        color: "white",
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                        You have purchased
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {selectedProduct.name}
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            color: "#f5a623",
                            marginY: 2,
                        }}
                    >
                        {bestSupplier.name}
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2} mt={3} width="100%">
                        <Button
                            onClick={handleViewPurchases}
                            variant="contained"
                            sx={{
                                backgroundColor: "#6c63ff",
                                color: "white",
                                "&:hover": { backgroundColor: "#5851d9" },
                            }}
                            fullWidth
                        >
                            View my purchases
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#4b4c75",
                                color: "white",
                                "&:hover": { backgroundColor: "#39395a" },
                            }}
                            fullWidth
                            onClick={handleMakeNewSupplierSelection}
                        >
                            Make new supplier selection
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SavePurchaseDialog;
