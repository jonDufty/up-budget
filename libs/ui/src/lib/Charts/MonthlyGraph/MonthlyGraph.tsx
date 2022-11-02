import { Box, useTheme } from '@mui/material';
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export interface MonthlyGraphProps {
  chartData: BudgetChartData[];
  chartProps: ChartProps;
}

export interface ChartProps {
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
  const theme = useTheme()
  return (
    <Box width={chartProps.width} height={chartProps.height}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barGap={'-80%'}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar radius={[10, 10, 0, 0]} dataKey="amount" >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-amount-${index}`}
                fill={theme.palette.primary.main}
                stroke={entry.amount > entry.limit ? 'red' : theme.palette.primary.dark}
                strokeWidth={2}
              />
            ))}
          </Bar>
          <Bar radius={[10, 10, 0, 0]} dataKey="limit" fill="#82ca9d">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fillOpacity={'20%'} fill={entry.amount > entry.limit ? 'red' : theme.palette.primary.light} stroke="inherit" strokeDasharray={'5 5'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
