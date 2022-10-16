import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface FeatureBudgetsProps {}

const StyledFeatureBudgets = styled.div`
  color: pink;
`;

export function FeatureBudgets(props: FeatureBudgetsProps) {
  return (
    <StyledFeatureBudgets>
      <h1>Welcome to FeatureBudgets!</h1>
    </StyledFeatureBudgets>
  );
}

export default FeatureBudgets;
