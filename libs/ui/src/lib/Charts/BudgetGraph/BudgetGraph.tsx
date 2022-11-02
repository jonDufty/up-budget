import { Box, useTheme } from '@mui/material';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartProps } from '../MonthlyGraph/MonthlyGraph'

interface BudgetGraphProps {
  chartData: BudgetGraphData[];
  limit: number;
  category: string;
  chartProps: ChartProps
}

export interface BudgetGraphData {
  month: string;
  amount: number;
  limit: number;
}

export function BudgetGraph({ chartData, limit, category, chartProps }: BudgetGraphProps) {
  const theme = useTheme()
  const avg = chartData.map((e) => e.amount).reduce((a, x) => a + x, 0) / chartData.length;
  const data = chartData.map((e) => {
    return { ...e, average: avg };
  });

  return (
    <Box width={chartProps.width} height={chartProps.height}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            left: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" radius={[10, 10, 0, 0]} fill={theme.palette.primary.main} opacity={'80%'} />
          <Line dataKey="limit" type="monotone" />
          <ReferenceLine label="average" y={avg} type="monotone" stroke={theme.palette.secondary.main} strokeDasharray="5 5" />
          <ReferenceLine label="limit" y={limit} type="monotone" stroke={theme.palette.info.dark} />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}
