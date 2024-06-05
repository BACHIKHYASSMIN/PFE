import React, { useState, useRef, useEffect } from 'react';
import './LanguageSwitcher.css'; // Assurez-vous d'ajouter les styles nécessaires
import LangImg from '../Assets/language.png'
const LanguagePopup = ({ toggleLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="language-popup" ref={popupRef}>
      <img 
        className="navbar-imgL" 
        src={LangImg} 
        alt="Language Icon" 
        onClick={handleToggle} 
      />
      {isOpen && (
        <div className="popup-menu">
          <div onClick={() => toggleLang('en')}>EN</div>
          <div onClick={() => toggleLang('fr')}>FR</div>
        </div>
      )}
    </div>
  );
}

export default LanguagePopup;
