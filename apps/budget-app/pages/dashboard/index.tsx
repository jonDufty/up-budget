import styled from '@emotion/styled';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { GithubLoginButton } from '../../components/AppMenu/GithubLoginButton';
import { MonthlyGraph } from '@up-budget/ui';
/* eslint-disable-next-line */
export interface DashboardProps {}

const StyledDashboard = styled.div`
  color: pink;
`;

const chartData = [
  {
    category: 'rent',
    amount: 2000,
    limit: 2000,
  },
  {
    category: 'utilities',
    amount: 600,
    limit: 500,
  },
  {
    category: 'groceries',
    amount: 500,
    limit: 700,
  },
  {
    category: 'other',
    amount: 200,
    limit: 1000,
  },
];

export function Dashboard(props: DashboardProps) {
  const { data: session } = useSession();

  return (
    <StyledDashboard>
      <h1>{session ? `Logged in as ${session.user.name}` : 'Welcome to Dashboard!'} </h1>
      {session && <Image src={session.user.image} alt="No image" width={200} height={200} />}
      <MonthlyGraph chartData={chartData} />
    </StyledDashboard>
  );
}

export default Dashboard;
