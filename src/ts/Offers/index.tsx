import * as React from 'react';
import Container from '../Container';
import Search from '../Search';
import OffersList from './OffersList';
import * as api from './api';
import debug from 'debug';
import * as _ from 'lodash';
const log = debug('app:Offers');
import { offers } from '../Detail/mockup';

export default class Offers extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.loadMore();
  }

  loadMore() {
    this.setState({ loading: true });
    api.get()
      .then(res => {
        if (res['err']) throw res['msg'];
        this.setState({
          data: res,
          loading: false,
        });
      })
      .catch(err => {
        log(`Get request error ${err}`);
        this.setState({
          data: _.map(offers, i => i),
          loading: false,
        })
      })
  }

  locationFilter(filter) { log('change filter location', filter); }

  selectFilter(filter) { log('change filter select', filter); }

  dateFilter(filter) { log('change filter date', filter); }

  render() {
    return (
      <Container>
        <Search
          selectItems={getSelectItems()}
          locationFilter={this.locationFilter}
          selectFilter={this.selectFilter}
          dateFilter={this.dateFilter}
        />
        <OffersList
          data={this.state.data}
          loading={this.state.loading}
          loadMore={this.loadMore}
        />
      </Container>
    );
  }
}

const getSelectItems = () => ([
  {
    group: 'Motorcycle',
    value: [
      'Off-road',
      'Street',
      'Dual-sport',
      'Scooter',
      'Electric',
      'Small (children)',
    ],
  },
  {
    group: 'Mechanic',
    value: [
      'Off-road & dual-sport',
      'Street',
      'Electric',
      'Scooter',
    ],
  },
  {
    group: 'Coach / Instructor',
    value: [
      'Off-road',
      'Street',
    ],
  },
  {
    group: 'Guide',
    value: [
      'Off-road',
      'Street',
    ],
  },
  {
    group: 'Equipment',
    value: [
      'Off-road',
      'Street',
    ],
  },
  {
    group: 'Parts',
    value: [
      'Dirtbikes',
      'Streetbikes',
    ],
  },
  {
    group: 'Circuits',
    value: [
      'Motocross',
      'Enduro',
      'Race tracks',
    ],
  },
  {
    group: 'Other',
    value: [
      'Shops',
      'Events',
      'Clubs',
    ],
  },
]);
