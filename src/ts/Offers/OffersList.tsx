import * as React from 'react';
import { Link } from 'react-router';
import { CircularProgress } from 'material-ui';
import Offer from './Offer';

export default function OffersList(props) {
  const {
    list,
    date,
    loading,
    location,
  } = props;

  const items = list.map((item, key) => <Offer data={item} key={key} date={date} location={location}/>);

  return (
    <div className={`offers ${loading ? 'loading' : ''}`}>
      {items}
    </div>
  );
}
