import * as React from 'react';
import { mount } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// source: https://github.com/callemall/material-ui/issues/5330
export function mountWithTheme(node) {
  return mount(node, {
    context: {
      muiTheme: getMuiTheme(),
    },
    childContextTypes: {
      muiTheme: React.PropTypes.object.isRequired,
    },
  });
}

export function mountWithFormsy(node) {
  return mount(node, {
    context: {
      muiTheme: getMuiTheme(),
      formsy: {
        attachToForm() { },
        detachFromForm() { },
        validate() { },
        isFormDisabled() { },
        isValidValue() { }
      }
    },
    childContextTypes: {
      muiTheme: React.PropTypes.object.isRequired,
      formsy: React.PropTypes.object.isRequired,
    },
  });
}
