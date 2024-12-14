import React, { FC } from 'react';
import ReactECharts from 'echarts-for-react';
import {Purchase} from "../../../../../model/purchase";
import { Card } from '@mui/material';

interface SupplierPieChartProps {
    purchases: Purchase[];
}

const SupplierPieChart: FC<SupplierPieChartProps> = ({ purchases }) => {

    const supplierCounts: Record<string, number> = purchases.reduce((acc, purchase) => {
        const supplierName = purchase.supplier.name; // Tedarikçi ismini al
        acc[supplierName] = (acc[supplierName] || 0) + 1; // Tedarikçinin sayısını artır
        return acc;
    }, {} as Record<string, number>);


    const chartData = Object.entries(supplierCounts).map(([name, count]) => ({
        name,
        value: count,
    }));

    const chartOptions = {
        title: {
            text: 'Most Selected Suppliers',
            left: 'center',
            textStyle: {
                color: '#e3e6ec',
                fontSize: 18,
                fontWeight: 'bold',
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
        },
        series: [
            {
                name: 'Suppliers',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: 'outside',
                    color: '#A6A8B1',
                },
                data: chartData,
                itemStyle: {
                    borderRadius: 5,
                    borderWidth: 2,
                },
            },
        ],
    };

    return (
        <Card sx={{
                backgroundColor: '#2c2c40',
                color: '#ffffff',
                p: 2,
                borderWidth: 1,
                borderColor: '#2c2c40',
                borderStyle: 'solid',
                borderRadius: 5,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
            }}>
            <ReactECharts option={chartOptions} />
            </Card>
    )
};
export default SupplierPieChart;
