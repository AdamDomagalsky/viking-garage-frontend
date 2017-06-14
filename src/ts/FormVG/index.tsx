import * as React from 'react';
import * as _ from 'lodash';
import * as fx from 'money';
import * as moment from 'moment';
import FormPure from './FormPure';
import FormWrap from './FormWrap';
import Contact from '../Contact';
import i from '../i18n';

export default class FormVG extends React.Component<any, any> {
  state = {
    startDate: null,
    endDate: null,
    equipment: 1,
  };

  getTitle = () => _.get(this.props.offer, 'title', '')
  getPrice = () => _.get(this.props.offer, 'price', 0)
  getRange = () => (this.state.startDate && this.state.endDate) ? (Math.abs(moment(this.state.endDate).diff(moment(this.state.startDate), 'days')) + 1) : 0;
  getTotal = () => this.getPrice() * this.getRange();
  endDateChange = (ev, endDate) => this.setState({ endDate });
  startDateChange = (ev, startDate) => this.setState({ startDate });
  equipmentChange = (ev, index, equipment) => this.setState({ equipment });

  getMessage = () => `RIDE REQUEST - ${this.getTitle()}
Offer: ${location.hostname}/offer/${this.props.offer.id},
Start date: ${this.state.startDate},
End date: ${this.state.endDate},
Equipment: ${this.state.equipment},
Price: ${fx(this.getPrice()).to(i('USD')).toFixed(2)} ${i('USD')},
Total: ${fx(this.getTotal()).to(i('USD')).toFixed(2)} ${i('USD')},
Currency: ${i('USD')}`;

  render() {
    const title = this.getTitle();
    const price = this.getPrice();
    const total = this.getTotal();

    const formData = {
      ...this.state,
      price,
      total,
      endDateChange: this.endDateChange,
      startDateChange: this.startDateChange,
      equipmentChange: this.equipmentChange,
    }

    return (
      <FormWrap>
        <div className="title">{title}</div>
        <FormPure {...formData} />
        <div>
          <Contact
            type="ride"
            button={<div className="ride-btn">RIDE</div>}
            message={this.getMessage}
            success={{
              title: i('Your ride is booked.'),
              body: i('Our team will contact you within the next 24 hours in order to confirm it and discuss the details.\n\nGet ready for an unforgettable experience with VIKING GARAGE!'),
            }}
          >
            <div className="title">
              {title}
            </div>
            <FormPure {...formData} />
            <div className="text">
              {i('If you are interested in that ride, leave us your details - our team will contact you:')}
            </div>
          </Contact>
        </div>
      </FormWrap>
    );
  }
}
