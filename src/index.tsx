import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './i18n';

import store from './store/store';
import { App } from './App';

import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
);
