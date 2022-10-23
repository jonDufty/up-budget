import { Box } from '@mui/material';
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export interface MonthlyGraphProps {
  chartData: BudgetChartData[];
  chartProps: ChartProps;
}

interface ChartProps {
  width: number | string;
  height: number | string;
}

export interface BudgetChartData {
  category: string;
  amount: number;
  limit: number;
}

export function MonthlyGraph({ chartData, chartProps }: MonthlyGraphProps) {
  const barWidth = 100;
  return (
    <Box width={chartProps.width} height={chartProps.height}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barGap={'-80%'}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar radius={[10, 10, 0, 0]} dataKey="amount" fill="#8884d8">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-amount-${index}`}
                // fill={entry.amount > entry.limit ? 'red' : '#8884d8'}
                fill='#8884d8'
                stroke={entry.amount > entry.limit ? 'red' : 'inherit'}
                strokeWidth={2}
              />
            ))}
          </Bar>
          <Bar radius={[10, 10, 0, 0]} dataKey="limit" fill="#82ca9d">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fillOpacity={'20%'} fill={entry.amount > entry.limit ? 'red' : 'inherit'} stroke="inherit" strokeDasharray={'5 5'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
