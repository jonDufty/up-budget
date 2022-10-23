import { Box } from '@mui/material';
import { Area, Bar, BarChart, CartesianGrid, Cell, ComposedChart, Legend, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface BudgetGraphProps {
  chartData: BudgetGraphData[];
  limit: number
  category: string
}

interface BudgetGraphData {
  month: string;
  amount: number;
  limit: number;

}


export function BudgetGraph({ chartData, limit, category }: BudgetGraphProps) {
  const avg = chartData.map((e) => e.amount).reduce((a, x) => a + x, 0) / chartData.length
  const data = chartData.map((e) => { return { ...e, average: avg } })

  return (
    <Box width={500} height={300}>
    <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            left:0
          }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
          <Bar dataKey="amount" fill="#8884d8" opacity={"50%"}/>
          <Line dataKey="limit" type="monotone" />
          <ReferenceLine label="average" y={avg} type="monotone" stroke="#8884d8" strokeDasharray="5 5"/>
          {/* <Line dataKey="average" type="monotone" stroke="#8884d8" strokeDasharray="5 5" /> */}
      </ComposedChart>
    </ResponsiveContainer>
    </Box>
  );
}
