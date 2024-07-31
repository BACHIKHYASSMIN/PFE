import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import translationEN from './translation/en/global.json';
import translationFR from './translation/fr/global.json';
import { AuthProvider } from './AuthContext';
import './fonts.css'; 
i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: { translation: translationEN },
    fr: { translation: translationFR },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18next}>
        <AuthProvider>
        <App />
        </AuthProvider>
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();