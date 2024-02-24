import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Details from './MaterialDetails';
import Graph from './Graph';
import Carte from './carte';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import SchemaViewer from './test';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';


import translationEN from './translation/en/global.json';
import translationFR from './translation/fr/global.json';

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'en',                              // language to use
  resources: {
    en: {
      translation: translationEN            // 'translation' is our custom namespace
    },
    fr: {
      translation: translationFR
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <I18nextProvider i18n={i18next}>
    <App />
    </I18nextProvider>
  </BrowserRouter>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
