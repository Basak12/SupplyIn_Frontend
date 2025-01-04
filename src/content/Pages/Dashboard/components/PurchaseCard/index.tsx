import React, {FC} from 'react';
import {Purchase} from "../../../../../model/purchase";
import {Box, Card, Chip, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface PurchaseCardProps {
    purchases: Purchase[];
}

const PurchaseCard:FC<PurchaseCardProps> = ({ purchases }) => {
    const navigate = useNavigate()

    return(
        <Card sx={{
            backgroundColor: '#2c2c40',
            color: '#ffffff',
            p: 2,
            borderWidth: 1,
            //borderColor: 'rgba(169,223,216,0.6)',
            //borderStyle: 'solid',
            borderRadius: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            height: 120
        }}>
            <Box>
                <Typography variant='body1' sx={{
                    fontWeight: 'bold',
                }}>
                    Purchase Count
                </Typography>
                <Typography variant='h4' sx={{
                    fontWeight: 'bold',
                    mt: 2,
                }}>
                    {purchases.length}
                </Typography>
            </Box>
            <Box display='flex' justifyContent='flex-end' alignItems='flex-end' mt='auto'>
                <Chip
                    onClick={() => navigate('/purchase/list')}
                    label='View Purchases'
                    sx={{
                        backgroundColor: '#A9DFD8',
                        color: '#161c28',
                        fontWeight: 'bold',
                    }}
                />
            </Box>
        </Card>
    );
};

export default PurchaseCard;
