import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

interface LoginButtonProps {
  onClick: React.MouseEventHandler;
  providerName: string;
}

interface ProviderInfo {
  icon: JSX.Element;
  colour: string;
}

const icons: Record<string, ProviderInfo> = {
  Google: {
    icon: <GoogleIcon />,
    colour: 'black',
  },
  GitHub: {
    icon: <GitHubIcon />,
    colour: 'black',
  },
  default: {
    icon: <LoginIcon />,
    colour: 'black',
  },
};

export const LoginButton = ({ onClick, providerName }: LoginButtonProps) => {
  const icon = icons[providerName] || icons['default'];

  return (
    <Container sx={{ width: '100%', padding: '1rem' }}>
      <Button fullWidth={true} variant="outlined" onClick={onClick} startIcon={icon.icon} sx={{ color: icon.colour }}>
        Login with {providerName}
      </Button>
    </Container>
  );
};
