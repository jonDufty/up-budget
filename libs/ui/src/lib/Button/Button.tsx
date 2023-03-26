import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../settings/colors';
import { borderRadius, buttonHeights, fontSize } from '../settings/sizes';

export interface ButtonProps extends MuiButtonProps {
  appearance?: 'primary' | 'secondary' | 'transparent' | 'error';
  selected?: boolean;
}

// A styled version of MuiButton that passes in all its props
export const Button = styled(MuiButton)<ButtonProps>(({ size, appearance, selected }) => ({
  // Primary button appearance
  backgroundColor: colors.primary['main'],
  color: colors.secondary[100],
  '&:hover': {
    backgroundColor: colors.primary[400],
  },
  // Disabled state slightly lighter
  '&.Mui-disabled': {
    backgroundColor: colors.primary[400],
  },
  // Selected state slightly darker
  ...(selected && {
    backgroundColor: colors.primary[600],
  }),

  // Make button text un capitlized
  textTransform: 'none',
  borderRadius: borderRadius[size || 'medium'],
  padding: '16px 24px',
  height: buttonHeights[size || 'medium'],
  fontSize: fontSize[size || 'medium'],

  // Secondary Button Appearances
  ...(appearance === 'secondary' && {
    backgroundColor: colors.secondary[300],
    // border: `2px solid ${colors.primary[700]}`,
    color: colors.secondary[800],
    '&:hover': {
      backgroundColor: colors.secondary[200],
    },
    '&.Mui-disabled': {
      backgroundColor: colors.secondary[200],
    },
    // Make selected state slightly darker
    ...(selected && {
      backgroundColor: colors.secondary[400],
    }),
    // Apply the selected class when selcted == true
  }),
  ...(appearance === 'transparent' && {
    backgroundColor: 'transparent',
    color: colors.primary[600],
    '&:hover': {
      backgroundColor: colors.primary[100],
    },
    '&.Mui-disabled': {
      backgroundColor: colors.primary[100],
    },
    ...(selected && {
      backgroundColor: colors.primary[300],
    }),
  }),
  ...(appearance === 'error' && {
    backgroundColor: colors.error[600],
    // border: `2px solid ${colors.error[700]}`,
    color: colors.secondary[100],
    '&:hover': {
      backgroundColor: colors.error[500],
    },
    '&.Mui-disabled': {
      backgroundColor: colors.error[400],
      border: 'none',
    },
    ...(selected && {
      backgroundColor: colors.primary[400],
    }),
  }),
}));

export default Button;
