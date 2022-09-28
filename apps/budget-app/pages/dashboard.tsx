import styled from '@emotion/styled';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { GithubLoginButton } from '../components/AppMenu/GithubLoginButton';

/* eslint-disable-next-line */
export interface DashboardProps {}

const StyledDashboard = styled.div`
  color: pink;
`;

export function Dashboard(props: DashboardProps) {
  const { data: session} = useSession()

  return (
    <StyledDashboard>
      <h1>{session ? `Logged in as ${session.user.name}` : "Welcome to Dashboard!"} </h1>
      {session &&
        <Image src={session.user.image} alt="No image" width={200} height={200} />
      }
    </StyledDashboard>
  );
}

export default Dashboard;
