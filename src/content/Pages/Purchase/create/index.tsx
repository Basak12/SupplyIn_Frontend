import React, {FC, useState} from 'react';
import {Card, Typography, Box, Fab} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import AHPPairwiseComparisonCard from '../components/AHPPairwiseComparisonCard';

interface CreatePurchasePageProps {}

const CreatePurchasePage: FC<CreatePurchasePageProps> = ({}) => {

    const [open, setOpen] = useState<boolean>(false);
    const [comparisonMatrix, setComparisonMatrix] = useState<number[][] | null>(null);

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <Grid container display='flex' justifyContent='center' alignItems='stretch' direction='row' sx={{
            backgroundColor: '#f6f6f6',
        }}>
            <Grid size={12}>
                <Box display='flex' justifyContent='flex-end' m={1}>
                    <Fab color="secondary" aria-label="add" onClick={handleOpen}>
                        <AddIcon />
                    </Fab>
                </Box>
                <Typography variant='h5'>create purchase</Typography>
                {open && <AHPPairwiseComparisonCard comparisonMatrix={comparisonMatrix} setComparisonMatrix={setComparisonMatrix}/> }
            </Grid>
        </Grid>
    );
};

export default CreatePurchasePage;
