import { render } from '@testing-library/react';

import Menu from './menu';

describe('Menu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Menu items={[{ linkTo: '/', name: '/base' }]} />);
    expect(baseElement).toBeTruthy();
  });
});
