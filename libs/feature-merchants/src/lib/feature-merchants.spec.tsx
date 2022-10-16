import { render } from '@testing-library/react';

import FeatureMerchants from './feature-merchants';

describe('FeatureMerchants', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatureMerchants />);
    expect(baseElement).toBeTruthy();
  });
});
