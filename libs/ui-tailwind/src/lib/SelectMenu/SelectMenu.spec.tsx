import { render } from '@testing-library/react';

import SelectMenu from './SelectMenu';

describe('SelectMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SelectMenu />);
    expect(baseElement).toBeTruthy();
  });
});
