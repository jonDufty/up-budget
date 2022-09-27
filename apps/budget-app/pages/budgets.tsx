import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface BudgetsProps {}

const StyledBudgets = styled.div`
  color: pink;
`;

export function Budgets(props: BudgetsProps) {
  return (
    <StyledBudgets>
      <h1>Welcome to Budgets!</h1>
    </StyledBudgets>
  );
}

export default Budgets;
