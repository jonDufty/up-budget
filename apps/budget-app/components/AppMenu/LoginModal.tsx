import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  getCsrfToken,
  getProviders,
  LiteralUnion,
  signIn,
} from 'next-auth/react';
import { GithubLoginButton } from './GithubLoginButton';
import { useEffect, useState } from 'react';

interface LoginModalProps {
  open: boolean;
  onClose: (value: string) => void;
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const [providers, setProviders] = useState<
    Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
  >();

  const handleClose = () => {
    onClose('Nothing selected');
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  useEffect(() => {
    async function oauthProviders() {
      const provs = await getProviders();
      setProviders(provs);
    }
    oauthProviders();
  }, []);
  console.log(process.env.NEXTAUTH_URL, process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET)
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login Modal</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Login via Github is the only supported option
        </DialogContentText>
        {providers && Object.values(providers).map((provider) => {
          return (
            <div key={provider.name}>
              <GithubLoginButton onClick={() => signIn(provider.id)}/>
            </div>
          );
        })}
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
