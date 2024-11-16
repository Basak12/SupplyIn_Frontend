import React, { FC, useEffect, useState } from 'react';
import {Card, Typography, Box, TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody, Fab} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from '@mui/icons-material/Add';
import AHPPairwiseComparisonModal from "./components/AHPPairwiseComparisonDialog";
import {useLocation} from "react-router-dom";

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
    const { pathname } = useLocation();

    const [open, setOpen] = useState<boolean>(false);
    const [comparisonMatrix, setComparisonMatrix] = useState<number[][] | null>(null);

    const handleOpen = () => {
        setOpen(true)
    }

    console.log('comparisonMatrix', comparisonMatrix);

    return (
        <>
            <Grid container display='flex' justifyContent='center' alignItems='stretch' direction='row' sx={{
                backgroundColor: '#f6f6f6',
            }}>
                <Grid size={12}>
                    <Box display='flex' justifyContent='flex-end' m={1}>
                        <Fab color="secondary" aria-label="add" onClick={handleOpen}>
                            <AddIcon />
                        </Fab>
                    </Box>
                </Grid>
            </Grid>
            {open && <AHPPairwiseComparisonModal
                open={open}
                setOpen={setOpen}
                comparisonMatrix={comparisonMatrix}
                setComparisonMatrix={setComparisonMatrix}/>
            }
        </>
    );
};

export default DashboardPage;

