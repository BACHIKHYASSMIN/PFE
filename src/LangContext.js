// LangContext.js

import React, { createContext, useState, useContext } from 'react';

const LangContext = createContext();

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState('fr');

  const toggleLang = () => {
    setLang(prevLang => (prevLang === 'fr' ? 'en' : 'fr'));
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
};
