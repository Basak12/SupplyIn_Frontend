import React, {FC} from 'react';
import ReactECharts from 'echarts-for-react';
import {Purchase} from "../../../../../model/purchase";
import {Card} from "@mui/material";

interface PurchaseBarChartProps {
    purchases: Purchase[];
}

const PurchaseBarChart:FC<PurchaseBarChartProps> = ({ purchases }) => {

    const productCounts: Record<string, number> = purchases.reduce((acc, purchase) => {
        const productName = purchase.product.name;
        acc[productName] = (acc[productName] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const chartData = {
        title: {
            text: 'Product Purchase Counts',
            left: 'center',
            textStyle: {
                color: '#e3e6ec',
                fontSize: 18,
                fontWeight: 'bold',
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        legend: {
            data: ['Product Count'],
            top: '10%',
            textStyle: {
                color: '#A6A8B1',
                fontSize: 14,
            },
        },
        grid: {
            left: '5%',
            bottom: '10%',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            name: 'Name',
            nameTextStyle: {
                color: '#A6A8B1',
                fontSize: 14,
            },
            data: Object.keys(productCounts),
            axisLabel: {
                rotate: 0,
                color: '#A6A8B1',
                fontSize: 12,
            },
            axisLine: {
                lineStyle: {
                    color: '#6E707E',
                },
            },
        },
        yAxis: {
            type: 'value',
            name: 'Count',
            nameTextStyle: {
                color: '#A6A8B1',
                fontSize: 14,
            },
            axisLabel: {
                color: '#A6A8B1',
                fontSize: 12,
            },
            axisLine: {
                lineStyle: {
                    color: '#6E707E',
                },
            },
            splitLine: {
                lineStyle: {
                    color: '#41424B',
                },
            },
        },
        series: [
            {
                name: 'Product Count',
                data: Object.values(productCounts),
                type: 'bar',
                barWidth: '50%',
                itemStyle: {
                    borderRadius: [4, 4, 0, 0],
                },
            },
        ],
    };


    return  (
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
            <ReactECharts option={chartData} />
        </Card>
    )
};

export default PurchaseBarChart;
