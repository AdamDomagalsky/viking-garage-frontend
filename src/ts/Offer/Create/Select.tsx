import * as React from 'react';
import {
  DropDownMenu,
  FontIcon,
  MenuItem,
} from 'material-ui';
import IconWrap from '../../IconWrap';

const menuItems = [
  'coach',
  'motorcycle',
].map((s, i) => <MenuItem key={i} value={i} primaryText={s} />);

export default function Select({ selected, onChange }) {
    return (
      <div className="title">
        <span className="text">Add new offer:</span>
        <DropDownMenu
          value={selected}
          onChange={onChange}
          labelStyle={{ fontSize: 34, textDecoration: 'underline', paddingLeft: 14 }}
          listStyle={{ marginLeft: 10 }}
          underlineStyle={{ borderTop: 'none' }}
          iconStyle={{ display: 'none' }}
        >
          {menuItems}
        </DropDownMenu>
        <IconWrap
          icon="keyboard_arrow_down"
          style={{ fontSize: 34 }}
        />
    </div>);
}
