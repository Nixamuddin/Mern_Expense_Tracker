import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Calculation } from '../Services/Api';
const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {`${((percent ?? 1) * 100).toFixed(0)}%`}
        </text>
    );
};

const Charts = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ['transaction'],
        queryFn: Calculation,
    });

    const chartData = [
        { name: "Income", value: data?.data.income },
        { name: "Expense", value: data?.data.expense },
        { name: "Balance", value: data?.data.balance }
    ];

    return (
        <ResponsiveContainer width="90%" height={150}>
            <PieChart>
                <Legend />
                <Pie
                    data={chartData}
                    cx="40%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {chartData?.map((entry, index) => (
                        <Cell
                            key={`cell-${entry.name}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>

            </PieChart>
        </ResponsiveContainer>

    )
}

export default Charts