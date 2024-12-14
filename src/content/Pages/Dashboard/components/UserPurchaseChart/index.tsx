import React, { FC } from 'react';
import ReactECharts from 'echarts-for-react';
import {Purchase} from "../../../../../model/purchase";
import {Card} from "@mui/material";

interface UserPieChartProps {
    purchases: Purchase[];
}

const UserPieChart: FC<UserPieChartProps> = ({ purchases }) => {
    const userCounts: Record<string, number> = purchases.reduce((acc, purchase) => {
        const userName = purchase.user.name;
        acc[userName] = (acc[userName] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(userCounts).map(([name, count]) => ({
        name,
        value: count,
    }));

    const chartOptions = {
        title: {
            text: 'Most Purchases by User',
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
                name: 'Users',
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

    return(
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

export default UserPieChart;
