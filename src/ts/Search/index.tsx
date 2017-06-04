import * as React from 'react';
import { FontIcon } from 'material-ui';
import Date from './Date';
import Select from './Select';
import Location from './Location';
import Range from './Range';

export default function Search(props) {
  const {
    locationFilter,
    selectFilter,
    rangeFilter,
    dateFilter,
  } = props;

  return (
    <div className="search">
      <Location
        icon="location_on"
        filter={locationFilter} />
      <Range filter={rangeFilter} />
      <Select filter={selectFilter} />
      <Date filter={dateFilter} />
    </div>
  );
}
