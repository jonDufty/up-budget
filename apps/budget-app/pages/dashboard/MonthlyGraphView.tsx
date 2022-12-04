import { Grid } from '@mui/material';
import { BudgetGraph, ChartProps, MenuSelector } from '@up-budget/ui';
import { DataBudgetGraph, MonthlyGraphData } from '../../fixtures/ChartData';

interface MonthlyGraphProps {
  chartProps: ChartProps;
}

export function MonthlyGraphView({ chartProps }: MonthlyGraphProps) {
  const categories = MonthlyGraphData.map((e) => e.category);
  return (
    <Grid container>
      <Grid item xs={2}>
        <MenuSelector options={categories} maxSelected={3} />
      </Grid>
      <Grid item xs={10}>
        <BudgetGraph category="Rent" chartData={DataBudgetGraph} limit={600} chartProps={chartProps} />
      </Grid>
    </Grid>
  );
}
