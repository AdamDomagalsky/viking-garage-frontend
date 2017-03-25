import * as React from 'react';
import * as _ from 'lodash';

export default function HeaderVG({ offer }) {
  const image = _.get(offer, 'images.main');
  const offerer = _.get(offer, 'offerer');

  return (
    <div>
      <div
        className="image"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="title">
        {offer.title}
      </div>
      <div className="owner">
        <div
          className="picture"
          style={{ backgroundImage: `url(${offerer.picture})` }}
        />
        <div className="owner-details">
          <div className="fullname">
            {offerer.fullname}
          </div>
          <div className="location">
            {`${offerer.location.city}, ${offerer.location.country}`}
          </div>
        </div>
      </div>
      <div className="text">
        {offer.description}
      </div>
    </div>
  );
}