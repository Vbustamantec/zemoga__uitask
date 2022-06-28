import React from 'react';
import ReactDOM from 'react-dom/client';

import { GlobalContextProvider } from './context/GlobalContextProvider';
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>,
);
