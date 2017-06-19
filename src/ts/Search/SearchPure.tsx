import * as React from 'react';
import { FontIcon } from 'material-ui';
import Date from './Date';
import Type from './Type';
import Location from './Location';
import Distance from './Distance';

export default function SearchPure(props) {
  const {
    locationFilter,
    distanceFilter,
    typeFilter,
    dateFilter,
    location,
  } = props;

  return (
    <div className="search">
      <Location
        value={location}
        filter={locationFilter} />
      <Distance filter={distanceFilter} />
      <Type filter={typeFilter} />
      <Date filter={dateFilter} />
    </div>
  );
}
