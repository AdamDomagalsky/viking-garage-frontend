import 'mocha';
import * as React from 'react';
import { expect } from 'chai';
import { default as Detail } from './index';
import { shallow } from 'enzyme';

describe('<Detail />', () => {
  it('check for inner components', () => {
    const wrapper = shallow(<Detail params={{ id: 1 }} />);
    expect(wrapper.find('AppBarVG')).to.have.length(1);
    expect(wrapper.find('HeaderVG')).to.have.length(1);
    expect(wrapper.find('FormVG')).to.have.length(1);
    expect(wrapper.find('Accordion')).to.have.length(1);
    expect(wrapper.find('ListVG')).to.have.length(1);
    expect(wrapper.find('NetworkError')).to.have.length(1);
  });
});
