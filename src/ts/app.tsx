import * as React from 'react';
import { render } from 'react-dom';
import Main from './Main';
import '../js/pollyfills';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
const { AppContainer } = require('react-hot-loader');

injectTapEventPlugin();
const root = document.getElementById('app');
render(<AppContainer><Main /></AppContainer>, root);

// Handle hot reloading requests from Webpack
declare var module: { hot: any };
if (module.hot) {
  module.hot.accept('./Main', () => {
    // If we receive a HMR request for our App container,
    // then reload it using require (we can't do this dynamically with import)
    const NextApp = require('./Main').default;
    render(<AppContainer><NextApp /></AppContainer>, root);
  });
}
