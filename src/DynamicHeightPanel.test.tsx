import React from 'react';
import {shallow} from 'enzyme';
import {DynamicHeightPanel, Props} from './DynamicHeightPanel';

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

  const wrapper = shallow(<DynamicHeightPanel {...props} />);
  const instance = wrapper.instance() as DynamicHeightPanel;

  return {
    instance,
    wrapper,
  };
};

describe('Render Panel with basic options', () => {
  it('should render', () => {
    const {wrapper} = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
