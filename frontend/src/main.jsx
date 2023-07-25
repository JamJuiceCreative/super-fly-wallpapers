import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import App from './App.jsx';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { StoreProvider } from './Store.jsx';

// Set the base URL for Axios
axios.defaults.baseURL = 'http://localhost:5000';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <PayPalScriptProvider deferLoading={true}>
          <App />
        </PayPalScriptProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
