import React, { FC } from 'react';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';
import {Card} from "@mui/material";
import {Purchase} from "../../../../../model/purchase";
import * as echarts from 'echarts';


interface PurchaseLineChartProps {
    purchases: Purchase[];
}

const PurchaseLineChart: FC<PurchaseLineChartProps> = ({ purchases }) => {
    const dailyPurchases: Record<string, number> = purchases.reduce((acc, purchase) => {
        const date = dayjs(purchase.purchaseDate).format('DD-MM-YYYY');
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const dates = Object.keys(dailyPurchases).sort();
    const counts = dates.map(date => dailyPurchases[date]);

    const chartOptions = {
        title: {
            text: 'Purchases by Date',
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
                type: 'line',
                lineStyle: {
                    color: '#A9DFD8',
                },
            },
            formatter: '{b}: {c}',
        },
        xAxis: {
            type: 'category',
            data: dates,
            axisLabel: {
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
            name: 'Purchase Count',
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
        },
        series: [
            {
                name: 'Purchases',
                type: 'line',
                data: counts,
                smooth: true,
                lineStyle: {
                    width: 4,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        { offset: 0, color: '#89CFF0' },
                        { offset: 1, color: '#A9DFD8' },
                    ]),
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#89CFF0' },
                        { offset: 1, color: 'rgba(169, 223, 216, 0)' },
                    ]),
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
    );
};

export default PurchaseLineChart;
