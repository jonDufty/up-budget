import * as React from 'react';
import { IconButton, List, ListItem } from '@mui/material';
import { Button } from '../../Button/Button';
import { MenuBook } from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import { colors } from '../../settings/colors';
import { borderRadius } from '../../settings/sizes';

export interface MenuItemProps {
  linkTo: string;
  name: string;
  icon?: React.ReactNode;
}

export interface MenuProps {
  items: MenuItemProps[];
  compact: boolean;
}

const StyledIcon = styled(IconButton)<{ selected: boolean }>(({ selected }) => ({
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
  // Make click area rounded square instead of circle
  borderRadius: borderRadius.medium,
}));

const StyledList = styled(List)<{ compact: boolean }>(({ compact }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '0',
  width: '200px',
  // Ease transition between compact and non-compact
  ...(compact && {
    width: '100%',
  }),

  // Ease transition of changing width
  transition: 'width 0.5s',
}));

const StyledButton = styled(Button)(() => ({
  // Make buttons all the same width
  width: '200px',
  display: 'flex',
  justifyContent: 'flex-start',

}))

const FallbackIcon = () => <MenuBook htmlColor={colors.primary[600]} />;

export function Menu({ items, compact }: MenuProps) {
  const [selected, setSelected] = useState(items[0]?.name || '');
  const [menuCompact, setMenuCompact] = useState(compact);

  return (
    <StyledList compact>
      {items.map((item, idx) => {
        const buttonProps = {
          key: item.name,
          onClick: () => setSelected(item.name),
          selected: item.name === selected,
        };

        return (
          <Link href={item.linkTo} passHref style={{ textDecoration: 'none' }}>
            <ListItem sx={{ width: '200px', padding: '4px' }}>
              {compact ? (
                <StyledButton fullWidth {...buttonProps} appearance="transparent" startIcon={item.icon || <FallbackIcon />}>
                  {item.name}
                </StyledButton>
              ) : (
                <StyledIcon {...buttonProps}>{item.icon || <FallbackIcon />}</StyledIcon>
              )}
            </ListItem>
          </Link>
        );
      })}
    </StyledList>
  );
}
