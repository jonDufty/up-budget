import styled from 'styled-components';
import { Menu } from '@up-budget/ui';
import { Box } from '@mui/system';

const MenuItems = [
  {
    linkTo: '/merchants',
    name: 'Merchants',
  },
  {
    linkTo: '/budgets',
    name: 'Budgets',
  },
  {
    linkTo: '/dashboard',
    name: 'Dashboard',
  },
];
export function Index() {
  return (
    <Box>
      <Menu items={MenuItems}></Menu>
    </Box>
  );
}

export default Index;
