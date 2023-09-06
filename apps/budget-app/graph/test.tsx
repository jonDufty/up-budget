import { useTestBudgetsQuery } from './query.generated';

function Test() {
  const { data, loading, error } = useTestBudgetsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data.helloAgain);
  return <div>hello</div>;
}
