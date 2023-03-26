import { Button as MuiButton, ButtonProps as MuiButtonProps, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../settings/colors';
import { borderRadius, buttonHeights, fontSize } from '../settings/sizes';

export interface ButtonProps extends MuiButtonProps {
  appearance?: 'primary' | 'secondary' | 'transparent' | 'error';
}

// A styled version of MuiButton that passes in all its props
export const Button = styled(MuiButton)<ButtonProps>(({ size, color, appearance }) => ({

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
  '&.Mui-selected': {
    backgroundColor: colors.primary[400],
  },

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
    '&:hover' : {
      backgroundColor: colors.secondary[200],
    },
    '&.Mui-disabled': {
      backgroundColor: colors.secondary[200],
    },
    // Make selected state slightly darker
    '&.Mui-selected': {
      backgroundColor: colors.secondary[400],
    },
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
    '&.Mui-selected': {
      backgroundColor: colors.primary[300],
    },
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
      border: 'none'
    },
    '&.Mui-selected': {
      backgroundColor: colors.primary[400],
    },

  }),
}));

export const ButtonToggle = styled(ToggleButton)<ButtonProps>(({ size, color, appearance }) => ({

  // Primary button appearance
  backgroundColor: colors.primary['main'],
  color: colors.secondary[100],
  border: 'none',
  '&:hover': {
    backgroundColor: colors.primary[400],
  },
  // Disabled state slightly lighter
  '&.Mui-disabled': {
    backgroundColor: colors.primary[400],
  },
  // Selected state slightly darker
  '&.Mui-selected': {
    backgroundColor: colors.primary[600],
    color: colors.secondary[100],
  },

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
    '&:hover' : {
      backgroundColor: colors.secondary[200],
    },
    '&.Mui-disabled': {
      backgroundColor: colors.secondary[200],
    },
    // Make selected state slightly darker
    '&.Mui-selected': {
      backgroundColor: colors.secondary[400],
    },
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
    '&.Mui-selected': {
      backgroundColor: colors.primary[300],
    },
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
      border: 'none'
    },
    '&.Mui-selected': {
      backgroundColor: colors.error[400],
    },

  }),
}));

export default Button;
