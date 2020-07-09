import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';

import Grid from './components/Grid';

const jsx = (
  <Grid />
);

ReactDOM.render(jsx, document.getElementById('app'));