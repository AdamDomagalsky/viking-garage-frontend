import * as React from 'react';
import {
  FontIcon,
} from 'material-ui';

const iconStyle = {
  fontSize: 14,
  paddingRight: 7,
};

export default function Footer(props) {
  return (
    <div className="footer">
      <ul className="contact">
        <li>
          <a href="https://www.instagram.com/vikinggarage" target="_blank">
            INSTAGRAM
            <span className="mobile-hid"> vikinggarage</span>
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/vikinggarage888" target="_blank">
            FACEBOOK
            <span className="mobile-hid"> vikinggarage888</span>
          </a>
        </li>
        <li>
          <a href="https://github.com/michalmikolajczyk/" target="_blank">
            GITHUB
          </a>
        </li>
        <li>
          <a href="mailto:ride@vikinggarage.com" target="_blank">
            E-MAIL
            <span className="mobile-hid"> ride@vikinggarage.com</span>
          </a>
        </li>
      </ul>
      <ul className="contact right">
        <li>
          <a href="https://vikinggarage.slack.com" target="_blank">
            SLACK
          </a>
        </li>
        <li>
          <a href="tel:+48697951264" target="_blank">
            PHONE
            <span className="mobile-hid"> +48 697 951 264</span>
          </a>
        </li>
        <li>
          <a href="skype:michaljanmikolajczyk?chat" target="_blank">
            SKYPE
          </a>
        </li>
      </ul>
      <div className="madeby">
        <div className="nowrap">
          <FontIcon style={iconStyle} color="white" className="fa fa-copyright" />
          2017 VIKING GARAGE
        </div>
      </div>
    </div>
  );
}
