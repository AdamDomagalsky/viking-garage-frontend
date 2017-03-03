import * as React from 'react';
import { FontIcon } from 'material-ui';
import * as SuperSelect from 'material-ui-superselectfield';

export default class Select extends React.Component<any, any> {

  public selectItems = [];

  constructor(props) {
    super(props);
    // select keeps values chosen by user
    this.state = { select: [] };
    // creation of option from selectItems
    this.createSelect(props.selectItems);
    this.onChange = this.onChange.bind(this);
  }

  public createSelect(items) {
    const createGroup = (values, group) => (
      values.map((value, index) => (
        <div
          key={index}
          label={value}
          value={group + value}
          className="select-item"
        >
          {value}
        </div>),
      )
    );

    this.selectItems = items.map((item, index) => (
        <optgroup key={index} label={item.group}>
          {createGroup(item.value, item.group)}
        </optgroup>
      ),
    );
  }

  public updateFilter(values) {
    const filters = [];
    values.map(({ value, label }) => {
      let exists = false;
      const group = value.split(label)[0];
      filters.map((filtr) => {
        if (filtr.group === group) {
          filtr.value.push(label);
          exists = true;
        }
      });
      if (!exists) {
        filters.push({
          group,
          value: [label],
        });
      }
    });
    this.props.filter(filters);
  }

  public onChange(values, name) {
    this.setState({ select: values });
    this.updateFilter(values);
  }

  public selectionRenderer(val) {
    // rerender values displayed in the input
    return val.length
      ? <div className="selected">{val.map(({ _, label }) => label).join(', ')}</div>
      :  <div className="selected empty">Dirtbike</div>;
  }

  render() {
    return (
      <div className="select">
        <FontIcon className="material-icons">keyboard_arrow_down</FontIcon>
        <div className="filter">
          <SuperSelect
            multiple={true}
            value={this.state.select}
            onChange={this.onChange}
            hintText="Select some values"
            selectionsRenderer={this.selectionRenderer}
            fullWidth={true}
          >
            {this.selectItems}
          </SuperSelect>
        </div>
      </div>
    );
  }
}
