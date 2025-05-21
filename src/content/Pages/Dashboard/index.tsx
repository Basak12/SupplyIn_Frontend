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
import axios from "axios";

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
                <Grid size={12}
                sx={{
                    backgroundColor: '#2c2c40',
                    mb:2,
                    borderWidth: 1,
                    borderRadius: 2
                }}>
                    <Box m={2}>
                        <Typography variant='h5' color='white' sx={{
                            ml:1
                        }}>Dashboard</Typography>
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
                {
                    purchases.length === 0 ? (
                        <Grid  size={12}
                               container
                               display='flex'
                               justifyContent='center' direction='row'
                               my={2}
                               mx={1}
                               spacing={2}
                               sx={{
                                   backgroundColor: '#2c2c40',
                                   mb:2,
                                   borderWidth: 1,
                                   borderRadius: 2,
                                   p:1,
                                   width: '50%',
                               }}>
                            <Typography variant='h5' color='white'>
                                No purchases found
                            </Typography>
                        </Grid>
                    ):
                        <>
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
                        </>
                }
            </Grid>
        </>
    );
};

export default DashboardPage;

