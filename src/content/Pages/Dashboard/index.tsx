import React, {FC, useCallback, useEffect, useState} from 'react';
import {
    Typography,
    Box,
    Divider
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {Navigate, useLocation} from "react-router-dom";
import PurchaseBarChart from "./components/PurchaseBarChart";
import {Purchase} from "../../../model/purchase";
import {getPurchases} from "../../../api/getPurchases";
import LoadingWrapper from "../../../components/LoadingWrapper";
import PurchaseCard from "./components/PurchaseCard";
import ProductCard from "./components/ProductCard";
import SupplierCard from "./components/SupplierCard";
import SupplierPieChart from "./components/SupplierPieChart";
import UserPurchaseChart from "./components/UserPurchaseChart";
import PurchaseLineChart from "./components/PurchaseLineChart";

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
    const { pathname } = useLocation();

    const [purchases, setPurchases] = useState<Purchase[]>([]);

    const fetchPurchases = useCallback(async () => {
        try {
            const response = await getPurchases();
            setPurchases(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, []);

    useEffect(() => {
        fetchPurchases();
    },[fetchPurchases]);

    if(purchases === null || purchases === undefined) {
        return <LoadingWrapper height='100%'/>;
    }

    return (
        <>
            <Grid
              container
              display='flex'
              justifyContent='center'
              alignItems='stretch'
              mx={1}
              mt={2}
              direction='row'
            >
                <Grid size={12}>
                    <Box my={2}>
                        <Typography variant='h5' color='white' sx={{
                            ml:1
                        }}>Dashboard</Typography>
                        <Divider sx={{backgroundColor:'rgba(169,223,216,0.6)', my:1}}/>
                    </Box>
                </Grid>
                <Grid size={12}
                      container
                      display='flex'
                      justifyContent='center' direction='row'
                      spacing={2}
                >
                    <Grid size={4}>
                       <PurchaseCard purchases={purchases}/>
                    </Grid>
                    <Grid size={4}>
                       <ProductCard/>
                    </Grid>
                    <Grid size={4}>
                       <SupplierCard/>
                    </Grid>
                </Grid>
                <Grid size={12}
                      container
                      display='flex'
                      justifyContent='center' direction='row'
                      my={2}
                      spacing={2}>
                    <Grid size={6}>
                        <SupplierPieChart purchases={purchases} />
                    </Grid>
                    <Grid size={6}>
                        <UserPurchaseChart purchases={purchases} />
                    </Grid>
                </Grid>
                <Grid size={12}
                      container
                      display='flex'
                      justifyContent='center'
                      direction='row'
                      spacing={2}>
                    <Grid size={6}>
                        <PurchaseBarChart purchases={purchases} />
                    </Grid>
                    <Grid size={6}>
                        <PurchaseLineChart purchases={purchases} />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default DashboardPage;

