import * as _ from 'lodash';
import * as fx from 'money';
import i from '../i18n';

const subtypes = [
  'dual-sport',
  'groupon®',
  'off-road',
];

export function renderUnit(offer): string {
  if (!offer) return '';
  const unit = _.includes(subtypes, offer.subtype) ? 'hour' : 'day';
  const price = _.get(offer, 'price', 0);
  return `${fx(price).to(i('USD')).toFixed(2)} ${i('USD')} / ${i(unit)}`;
}

export function countTotal(offer, range: number): string {
  if (!_.has(offer, 'subtype')) return '';
  const unit = _.includes(subtypes, offer.subtype) ? 24 : 1;
  const total = _.get(offer, 'price', 0) * unit * range;
  return `${fx(total).to(i('USD')).toFixed(2)} ${i('USD')}`;
}
