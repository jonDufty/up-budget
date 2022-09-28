import GitHubIcon from '@mui/icons-material/GitHub';
import { Button } from "@mui/material";
import { Container } from '@mui/system';
import React from "react";

interface GithubLoginButtonProps {
  onClick: React.MouseEventHandler
}

export const GithubLoginButton = ({ onClick }: GithubLoginButtonProps) => {
  return (
    <Container sx={{width:'100%', padding:'1rem'}}>

      <Button fullWidth={true} variant='outlined' onClick={onClick} startIcon={<GitHubIcon />}
      sx={{color:'black'}}
      >Login With GitHub</Button>
    </Container>
  )
}
