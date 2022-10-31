import { useSession } from 'next-auth/react';
import { MonthlyGraph } from '@up-budget/ui';
import { MonthlyGraphData } from '../../fixtures/ChartData'
import { useEffect, useState } from 'react';
/* eslint-disable-next-line */
export interface DashboardProps {}

const chartData = MonthlyGraphData

export function Dashboard(props: DashboardProps) {
  const { data: session } = useSession();
  const [width, setWidth] = useState(0)


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

  return (
    <div>
      <MonthlyGraph chartProps={{ width: 0.8 * width, height: Math.min(window.innerHeight, 400) }} chartData={chartData} />
    </div>
  );
}

export default Dashboard;
