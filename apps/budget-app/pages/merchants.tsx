import styled from '@emotion/styled';
import { CategoryBar, MerchantInfo } from '@up-budget/ui';
import { GetServerSideProps } from 'next';

const MERCHANTS: MerchantInfo[] = [
  {
    name: "Bunnings",
    upCategory: 'home-and-stuff',
    category: null
  },
  {
    name: "Coles",
    upCategory: 'home-and-stuff',
    category: null
  },
  {
    name: "Pub 1 defined",
    upCategory: 'bar-and-restaurant',
    category: 'drinks'
  },
  {
    name: "Pub 2",
    upCategory: 'bar-and-restaurant',
    category: null
  },
  {
    name: "Pub 3",
    upCategory: 'bar-and-restaurant',
    category: null
  },
]

const CATEGORIES = [
  "drinks",
  "groceries",
  "home"
]

/* eslint-disable-next-line */
export interface MerchantsProps {
  merchants: MerchantInfo[]
  categories: string[]
}

const StyledMerchants = styled.div`
  color: red;
`;

export function Merchants({merchants, categories}: MerchantsProps) {
  return (
    <CategoryBar merchants={merchants} categories={categories} />
  );
}

export default Merchants;

export const getServerSideProps: GetServerSideProps = async (context) => {

  return {
    props: {
      merchants: MERCHANTS,
      categories: CATEGORIES
    }
  }
}
