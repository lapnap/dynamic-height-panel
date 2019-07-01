import React from 'react';
import {DynamicHeightPanel, Props} from './DynamicHeightPanel';
import { render } from '@testing-library/react';

const setup = (propOverrides?: object) => {
  const props: Props = {
    height: 300,
    width: 300,
    options: {
      min: 100,
      max: 300,
      speed: 100,
    },
  } as Props; // partial

  Object.assign(props, propOverrides);

  const { asFragment, container } = render(<DynamicHeightPanel {...props} />);
  return { asFragment, container };
};

describe('Render Panel with basic options', () => {
  it('should render', () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });
});
