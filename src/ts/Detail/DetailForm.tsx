import * as React from 'react';
import * as _ from 'lodash';
import {
  DatePicker,
  FontIcon,
  SelectField,
  MenuItem,
} from 'material-ui';
import * as items from './mockup';
import debug from 'debug';
const log = debug('app:DetailForm');

export default class DetailForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
    const offer = items['ktm'];
    const price = Object.keys(offer.price.unit)[0]
    const priceState = offer.price.unit[price] + price;
    const now = new Date();
    this.state = {
      price: priceState,
      startDate: now,
      endDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
      equipment: 1,
    };
    this.endDateChange = this.endDateChange.bind(this);
    this.startDateChange = this.startDateChange.bind(this);
    this.priceChange = this.priceChange.bind(this);
    this.equipmentChange = this.equipmentChange.bind(this);
  }

  startDateChange(ev, date) {
    log('start date changed', date);
    this.setState({ startDate: date })
  }

  endDateChange(ev, date) {
    log('start date changed', date);
    this.setState({ endDate: date })
  }

  equipmentChange(ev, index, equipment) {
    log('equipment changed', equipment);
    this.setState({ equipment });
  }

  priceChange(ev, index, value) {
    log('price changed', value);
    this.setState({ price: value });
  }

  render() {
    const {
      price,
    } = items['ktm'];

    const selectPrice = _.map(price.unit, (num, key) => (
      <MenuItem
        key={num + key}
        value={num + key}
        primaryText={`Base price: ${num} ${price.value} / ${key}`}
      >
      </MenuItem>));

    return (
      <div>
        <div className="field">
          <FontIcon className="fa fa-money" />
          <SelectField
            value={this.state.price}
            onChange={this.priceChange}
            fullWidth={true}
          >
          { selectPrice }
          </SelectField>
        </div>
        <div className="field">
          <FontIcon className="material-icons">today</FontIcon>
          <DatePicker
            className="date-picker"
            autoOk={true}
            value={this.state.startDate}
            onChange={this.startDateChange}
            hintText="Today"
            fullWidth={true}
          />
        </div>
        <div className="field">
          <FontIcon className="material-icons">date_range</FontIcon>
          <DatePicker
            className="date-picker"
            autoOk={true}
            value={this.state.endDate}
            onChange={this.endDateChange}
            hintText="19/01/2017"
            fullWidth={true}
          />
        </div>
        <div className="field">
          <FontIcon className="fa fa-angle-down" />
          <SelectField
            value={this.state.equipment}
            onChange={this.equipmentChange}
            fullWidth={true}
          >
            <MenuItem key={1} value={1} primaryText="Equipment: Basic" />
            <MenuItem key={2} value={2} primaryText="Equipment: Semi" />
            <MenuItem key={3} value={3} primaryText="Equipment: Full" />
          </SelectField>
        </div>
        <button className="ride-btn">
          <span className="raido">
            &#5809;
          </span>
          <span>
            IDE
          </span>
        </button>
      </div>
    );
  }
}
