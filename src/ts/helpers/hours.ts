import * as _ from 'lodash';
import * as fx from 'money';
import c from '../i18n/currency';
import i from '../i18n';

const subtypes = [
  'dual-sport',
  'groupon®',
  'off-road',
];

export function isHourlySubtype(offer): boolean {
  if (!offer) return false;
  return _.includes(subtypes, offer.subtype);
}

export function renderUnit(offer): string {
  if (!offer) return '';
  const unit = isHourlySubtype(offer) ? 'hour' : 'day';
  const price = _.get(offer, 'price', 0);
  return `${fx(price).to(c()).toFixed(2)} ${c()} / ${i(unit)}`;
}

export function countTotal(offer, range: number): string {
  if (!_.has(offer, 'subtype')) return '';
  const total = _.get(offer, 'price', 0) * range;
  return `${fx(total).to(c()).toFixed(2)} ${c()}`;
}
