import { useSession } from "next-auth/react";
import Image from 'next/image';


export function Index() {
  const { data: session } = useSession();
  return (
    <>
    <h1>{session ? `Logged in as ${session.user.name}` : 'Welcome to Dashboard!'} </h1>
    { session && <Image src={session.user.image} alt="No image" width={200} height={200} /> }
    </>
    )
}

export default Index;
