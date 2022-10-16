import { render } from '@testing-library/react';

import FrontendApiClient from './frontend-api-client';

describe('FrontendApiClient', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontendApiClient />);
    expect(baseElement).toBeTruthy();
  });
});
