import * as React from 'react';
import * as _ from 'lodash';
import AppBarVG from '../AppBarVG';
import Header from '../Header';
import Groupon from '../Groupon';
import SearchPure from '../Search/SearchPure';
import OffersList from './OffersList';
import * as api from './api';
import i from '../i18n';

interface OffersProps {
  list: [object];
  last: boolean;
  empty: boolean;
  loading: boolean;

  date: any;
  type: any;
  location: any;
  distance: any;

  loadMore: () => void;
  typeFilter: (type: any) => void;
  dateFilter: (date: any) => void;
  locationFilter: (location: any) => void;
  distanceFilter: (distance: any) => void;
};

export default function Offers(props: OffersProps) {
  const {
    list,
    last,
    empty,
    loading,
    loadMore,
    date,
    location,
  } = props;

  const emptyMsg = empty && (<div className="offers-empty">{i('There is no offers matching to your filters!')}</div>);
  const loadMoreBtn = !last && (<button onClick={loadMore} className="loadmore">{i('Load more')}</button>);

  return (
    <div>
      <AppBarVG {...props} />
      <Header />
      <Groupon />
      <div className="mobile-hid">
        <SearchPure {...props} />
      </div>
      {emptyMsg}
      <OffersList
        date={date}
        list={list}
        loading={loading}
        location={location}
      />
      {loadMoreBtn}
    </div>
  );
}
