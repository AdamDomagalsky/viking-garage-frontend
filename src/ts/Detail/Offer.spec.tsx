import 'mocha';
import * as React from 'react';
import { expect } from 'chai';
import Offer from './Offer';
import { shallow } from 'enzyme';
import * as offers from './mockup';
const offer = offers.ktm;

describe('<Offer />', () => {
  it('check for inner components: Header, Accordions and Comments', () => {
    const wrapper = shallow(<Offer offer={offer} />);
    expect(wrapper.find('Header')).to.have.length(1);
    expect(wrapper.find('Accordion')).to.have.length(1);
    expect(wrapper.find('Comments')).to.have.length(1);
  });
});
