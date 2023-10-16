import { render } from '@testing-library/react';

import ToggleGroup from './ToggleGroup';

describe('ToggleGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ToggleGroup />);
    expect(baseElement).toBeTruthy();
  });
});
