import * as React from 'react';
import * as _ from 'lodash';
import Accordion from '../Accordion';
import Offerer from './Offerer';

export default function DetailList({ offer }) {
  const { specs } = offer;
  const accordions = _.map(specs, (item, index) => (
      <Accordion
        key={index}
        open={false}
        header={item.title}
        items={item.value}
      />
    ));
  return (
    <div>
      {accordions}
      <Offerer offer={offer} />
    </div>);
}
