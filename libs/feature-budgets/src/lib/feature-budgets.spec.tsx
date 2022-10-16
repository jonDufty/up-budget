import { render } from '@testing-library/react';

import FeatureBudgets from './feature-budgets';

describe('FeatureBudgets', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatureBudgets />);
    expect(baseElement).toBeTruthy();
  });
});
