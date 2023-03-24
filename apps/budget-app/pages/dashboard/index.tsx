import { useSession } from 'next-auth/react';
import { MonthlyGraph, SwitchButton } from '@up-budget/ui';
import { MonthlyGraphData } from '../../fixtures/ChartData'
import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { MonthlyGraphView } from '../../components/MonthlyGraph/MonthlyGraphView';
/* eslint-disable-next-line */
export interface DashboardProps {}

const chartData = MonthlyGraphData

export function Dashboard(props: DashboardProps) {
  const { data: session } = useSession();
  const [width, setWidth] = useState(0)

  const [showMonthly, setShowMonthly] = useState(true)


  useEffect(() => {

    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (width === 0 && window) {
      setWidth(window.innerWidth)
    }
  }, [])

  if (!session) {
    return <div>Unauthenticated. Please log in</div>
  }

  const chartProps={ width: 0.8 * width, height: Math.min(window.innerHeight, 500) }

  return (
    <>
      <SwitchButton size='medium' active='Monthly Graph' inactive='Budget History' onClick={()=> setShowMonthly(!showMonthly)} />
      {
        showMonthly ?
          <Paper variant='elevation' elevation={4}>
            <MonthlyGraph chartProps={chartProps} chartData={chartData} />
          </Paper>
          :
          <MonthlyGraphView chartProps={chartProps} />
      }
    </>
  );
}

export default Dashboard;
