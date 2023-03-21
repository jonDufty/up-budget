import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../settings/colors';

const borderRadius = {
  small: '10px',
  medium: '12px',
  large: '14px',
};

const buttonWidths = {
  small: '100px',
  medium: '200px',
  large: '300px',
};

const buttonHeights = {
  small: '30px',
  medium: '40px',
  large: '50px',
};

const fontSize = {
  small: '14px',
  medium: '16px',
  large: '20px',
};

export interface ButtonProps extends MuiButtonProps {
  appearance?: 'primary' | 'secondary' | 'transparent' | 'error';
}

// A styled version of MuiButton that passes in all its props
export const Button = styled(MuiButton)<ButtonProps>(({ size, color, appearance }) => ({
  // Make the button background color primary.main and the text secondary
  backgroundColor: colors.primary['main'],
  color: colors.secondary[100],
  '&:hover': {
    backgroundColor: colors.primary[400],
  },
  // Make button text un capitlized
  textTransform: 'none',
  // default to medium size
  borderRadius: borderRadius[size || 'medium'],
  padding: '16px 24px',
  height: buttonHeights[size || 'medium'],
  fontSize: fontSize[size || 'medium'],
  ...(appearance === 'secondary' && {

    backgroundColor: 'transparent',
    border: `2px solid ${colors.primary[700]}`,
    color: colors.primary[700],
    '&:hover': {
      backgroundColor: colors.secondary[100],
    },
  }),
  ...(appearance === 'transparent' && {
    backgroundColor: 'transparent',
    color: colors.primary[600],
    '&:hover': {
      backgroundColor: colors.primary[100],
    },
  }),
  ...(appearance === 'error' && {
    backgroundColor: colors.error[600],
    border: `2px solid ${colors.error[700]}`,
    color: colors.secondary[100],
    '&:hover': {
      backgroundColor: colors.error[500],
    },
  }),
}));

export default Button;
