import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useTestTimeQuery } from '../graph/query.generated';
import { Tailwind } from '@up-budget/ui';

export default function Index() {
  const { data: session } = useSession();
  const { data: timeData, loading, error } = useTestTimeQuery();

  return (
    <>
      <h1>{session ? `Logged in as ${session.user?.name}` : 'Welcome to Dashboard!'} </h1>
      {session && <Image src={session.user?.image || ''} alt="No image" width={200} height={200} />}
      <h1>{loading ? 'Loading...' : timeData?.getTime}</h1>
      <Tailwind />

    </>
  );
}
