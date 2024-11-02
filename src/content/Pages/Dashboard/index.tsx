import React, { FC } from 'react';
import {Card, Typography, Box, TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody} from "@mui/material";
import AHPTestComponent from "../../ahp";

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {

    const criteria = ["Price", "Delivery Time", "Warranty", "Reliability", "Safety Regulation Compliance"];
    const data = [
        [1, 5, 3, 7, 9],
        [1 / 5, 1, 1 / 3, 3, 5],
        [1 / 3, 3, 1, 5, 7],
        [1 / 7, 1 / 3, 1 / 5, 1, 3],
        [1 / 9, 1 / 5, 1 / 7, 1 / 3, 1]
    ];


    return (
        <Card sx={{
            m:2, p:2
        }}>
            <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
                <Typography variant="h6" align="center" sx={{ pt: 2 }}>
                    Criteria Comparison Matrix
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Criteria</TableCell>
                            {criteria.map((criterion, index) => (
                                <TableCell key={index} align="center">{criterion}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <TableCell>{criteria[rowIndex]}</TableCell>
                                {row.map((value, colIndex) => (
                                    <TableCell key={colIndex} align="center">
                                        {value.toFixed(3)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <AHPTestComponent/>
        </Card>
    );
};

export default DashboardPage;
