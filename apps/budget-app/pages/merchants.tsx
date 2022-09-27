import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface MerchantsProps {}

const StyledMerchants = styled.div`
  color: pink;
`;

export function Merchants(props: MerchantsProps) {
  return (
    <StyledMerchants>
      <h1>Welcome to Merchants!</h1>
    </StyledMerchants>
  );
}

export default Merchants;
