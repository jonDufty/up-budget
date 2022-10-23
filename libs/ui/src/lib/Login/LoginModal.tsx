import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import { LoginButton } from './LoginButton';
import { useEffect, useState } from 'react';

interface LoginModalProps {
  open: boolean;
  onClose: (value: string) => void;
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

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

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login Modal</DialogTitle>
      <DialogContent>
        {providers &&
          Object.values(providers).map((provider) => {
            return (
              <div key={provider.name}>
                <LoginButton providerName={provider.name} onClick={() => signIn(provider.id)} />
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
