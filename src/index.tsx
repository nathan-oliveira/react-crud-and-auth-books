import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './Main/App';
import store from './Store';
import reportWebVitals from './reportWebVitals';
import './I18n'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// React.StrictMode
root.render(
  <React.Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </React.Fragment>
);

reportWebVitals();
