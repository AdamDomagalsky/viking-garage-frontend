import * as React from 'react';
import * as _ from 'lodash';
import {
  browserHistory,
  Link,
} from 'react-router';
import {
  Divider,
  FontIcon,
  IconButton,
  IconMenu,
  MenuItem,
  SelectField,
  Paper,
} from 'material-ui';
import IconWrap from '../IconWrap'
import LanguageSelection from '../i18n/LanguageSelection';
import CurrencySelection from '../i18n/CurrencySelection';
import i18n from '../i18n';
const i = i18n;
const usersFlag = process.env.USERS || false;

interface MenuVGProps { refresh: () => void; }

function logout(refresh) {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  }
  refresh();
  browserHistory.push('/');
};

const checkUser = () => typeof localStorage !== 'undefined' ? !!JSON.parse(localStorage.getItem('user')) : false;

function userSection(refresh) {
  const user = JSON.parse(localStorage.getItem('user'))
  const image = user && user['image'];
  const iconButtonElement = image
    ? <MenuItem className="user-image" style={{ background: `url(${image})` }}/>
    : <IconWrap icon="account_circle" aria="user account" />
  const paperStyle = {
    height: 30,
    width: 30,
  }
  const iconButtonElementWrapper = <IconButton><Paper style={paperStyle} circle={true}>{iconButtonElement}</Paper></IconButton>

  return (
    <IconMenu
      className="user-profile"
      iconButtonElement={iconButtonElementWrapper}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      desktop={true}
    >
      <MenuItem primaryText={i('Profile')} containerElement={<Link to="/user/profile" />} />
      <MenuItem primaryText={i('Add offer')} containerElement={<Link to="/add-offer" />} />
      <MenuItem primaryText={i('Deals')} containerElement={<Link to="/deals" />} />
      <MenuItem primaryText={i('Messages')} containerElement={<Link to="/user/inbox" />} />
      <MenuItem primaryText={i('Account')} containerElement={<Link to="/user/account" />} />
      <Divider />
      <MenuItem primaryText={i('Log out')} onClick={logout.bind(this, refresh)} />
    </IconMenu>
  );
}

const logIn = <MenuItem className="menu-item" containerElement={<Link to="/login" />} primaryText={i('Log in')} />
const signUp = <MenuItem className="menu-item" containerElement={<Link to="/signup" />} primaryText={i('Sign up')} />

export default function MenuVG(props: MenuVGProps) {
  const menuItems = (
    <div className="menu">
      <MenuItem className="menu-item" containerElement={<Link to="/owner" />} primaryText={i('List Your Motorcycle')} />
      <MenuItem className="menu-item" containerElement={<Link to="/expert" />} primaryText={i('Bike Experts Offers')} />
      <MenuItem className="menu-item" containerElement={<Link to="/about" />} primaryText={i('About')} />
      <MenuItem className="menu-item" containerElement={<Link to="/faq" />} primaryText={i('FAQ')} />
      {/* <MenuItem className="menu-item" containerElement={<Link to="/blog" />} primaryText={i('Blog')} /> */}
      <MenuItem className="menu-item" containerElement={<a href="https://www.indiegogo.com/projects/viking-garage-disrupting-a-motorcycle-industry-community" target="_blank" />} primaryText={i('Indiegogo')} />
      {/* <LanguageSelection {...props} /> */}
      <CurrencySelection {...props} />
      {usersFlag && !checkUser() && logIn}
      {usersFlag && !checkUser() && signUp}
      {usersFlag && checkUser() && userSection(props.refresh)}
    </div>
  );

  return (
    <div>
      <IconMenu className="mobile-tablet-only menu-burger-icon" iconButtonElement={<IconButton><FontIcon className="fa fa-bars" /></IconButton>}>
        {menuItems}
      </IconMenu>
      <div className="mobile-tablet-hid">
        {menuItems}
      </div>
    </div>
  );
}
