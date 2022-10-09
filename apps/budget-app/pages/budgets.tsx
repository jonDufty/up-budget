import useSWR, { Fetcher } from "swr";

interface BudgetInfo {
  category: string;
  limit?: number;
  id?: number
}

const API_URL = "https://api.budget-dev.jdufty.com"

const budgetFetcher: Fetcher<BudgetInfo[]> = async (url: string) => {
  const apiUrl = API_URL + url
  const res = await fetch(apiUrl)
  if (!res.ok) {
    throw new Error(`Error fetching data ${res.status} ${res.statusText}`)
  }
  const budgets = await res.json() as BudgetInfo[]
  return budgets
}

/* eslint-disable-next-line */
export interface BudgetsProps {}

export function Budgets(props: BudgetsProps) {
  const { data: budgets, error } = useSWR("/budgets", budgetFetcher);

  if (error) {
    console.error(error)
    return <h1>An error has occurred</h1>
  }
  if (!budgets) return <h4>Loading...;</h4>

  return (
    <div>
      {
        budgets.map((b, i) => {
          return <div key={`${b.category}-${i}`}>{b.category}, {b.limit}</div>
        })
      }
    </div>
  );
}

export default Budgets;
