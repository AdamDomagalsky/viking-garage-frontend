import * as React from 'react';
import * as moment from 'moment';
import {
  DatePicker,
  FontIcon,
} from 'material-ui';
import i from '../i18n';

export default class DateVG extends React.Component<any, any> {
  state = {
    start: null,
    end: null,
  }

  onChangeStart = (event, date) => {
    if (this.state.end) this.props.filter({ start: date, end: this.state.end });
    this.setState({ start: date });
  }

  onChangeEnd = (event, date) => {
    if (this.state.start) this.props.filter({ start: this.state.start, end: date });
    this.setState({ end: date });
  }

  render() {
    return (
      <div className="date-wrap">
        <div className="date">
          <FontIcon className="material-icons">today</FontIcon>
          <DatePicker
            className="filter"
            autoOk={true}
            onChange={this.onChangeStart}
            hintText={i('Start Date')}
            fullWidth={true}
            hintStyle={{ paddingLeft: 30 }}
            inputStyle={{ paddingLeft: 30 }}
          />
        </div>
        <div className="date">
          <FontIcon className="material-icons">date_range</FontIcon>
          <DatePicker
            className="filter"
            autoOk={true}
            onChange={this.onChangeEnd}
            hintText={i('End Date')}
            fullWidth={true}
            hintStyle={{ paddingLeft: 30 }}
            inputStyle={{ paddingLeft: 30 }}
          />
        </div>
      </div>
    );
  }
}
