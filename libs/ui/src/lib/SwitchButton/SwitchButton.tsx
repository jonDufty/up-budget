import { Paper, ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps, ToggleButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Dispatch, SetStateAction, useState } from 'react';
import { colors } from '../settings/colors';
import { borderRadius, buttonHeights, fontSize } from '../settings/sizes';

interface SwitchButtonProps {
  active: string;
  inactive: string;
  size?: 'small' | 'medium' | 'large' | undefined;
  onClick?: Dispatch<SetStateAction<boolean>>;
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)<ToggleButtonGroupProps>(({ theme, size }) => ({
  height: buttonHeights[size || 'medium'],
  fontSize: fontSize[size || 'medium'],
  textTransform: 'none',
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const StyledToggleButton = styled(ToggleButton)<ToggleButtonProps>(({ theme, size }) => ({
  textTransform: 'none',
  // backgroundColor: colors.primary['main'],
  // color: colors.secondary[100],
  // small shadow along
  borderRadius: borderRadius[size || 'medium'],
  '&:hover': {
    backgroundColor: colors.secondary[300],
  },
  '&.Mui-selected': {
    color: colors.secondary['100'],
    backgroundColor: colors.primary['main'],
    '&:hover': {
      backgroundColor: colors.primary[600],
    },
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  border: `1px solid ${colors.secondary[300]}`,
  // borderRadius: borderRadius['medium'],
  boxShadow: `0px 1px 2px -2px ${colors.secondary[300]}`,
}));

export function SwitchButton({ active, inactive, onClick, size }: SwitchButtonProps) {
  const [selected, setSelected] = useState<string>(active);

  const handleClick = (event: React.MouseEvent<HTMLElement>, selection: string | null) => {
    selection && setSelected(selection);
    onClick && onClick(selection === active);
  };

  return (
      <StyledPaper elevation={0}>
        <StyledToggleButtonGroup fullWidth exclusive value={selected} onChange={handleClick} size={size}>
          {[active, inactive].map((o, i) => {
            return (
              <StyledToggleButton key={`${o}-${i}`} value={o} size={size}>
                {o}
              </StyledToggleButton>
            );
          })}
        </StyledToggleButtonGroup>
      </StyledPaper>
  );
}
