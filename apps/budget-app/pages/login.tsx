import { Box } from '@mui/material';
import { CtxOrReq } from 'next-auth/client/_utils';
import { BuiltInProviderType } from 'next-auth/providers';
import { signIn, getCsrfToken, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react';

interface LoginProps {
  csrfToken: string;
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
}

const Login = ({ csrfToken, providers }: LoginProps) => {
  return (
    <Box>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
      ))}
    </Box>
  );
};

export default Login;

export async function getServerSideProps(context: CtxOrReq) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      csrfToken,
    },
  };
}
