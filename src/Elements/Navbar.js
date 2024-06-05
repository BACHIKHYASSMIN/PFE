import React, { useState }  from 'react';
import './Navbar.css';  
import  img from "../Assets/img.png";
import { Link } from 'react-router-dom';
import ArrowdIcon from "../Assets/arrowd.png"
import ArrowRight from "../Assets/chevron.png"
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import deconIcon from "../Assets/decon.png"
import { useAuth } from '../AuthContext';
import LangImg from "../Assets/language.png"
import LanguagePopup from './LangSwitch';
// Utilisez la fonction translate ici...



const Navbar = () => {
  const [isClassMenuOpen, setClassMenuOpen] = useState(false);
  const { logout } = useAuth(); 
  const { t,i18n } = useTranslation();
  const { isConnected } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  
  const handleProfil = () => {
    navigate('/profil');
  };
  const  onConnexionClick = () => {
    // Naviguer vers la page "Details" lors du clic sur l'image
    navigate('/connexion');
  };
  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  }
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLangChange = (lang) => {
    toggleLang(lang);
    setIsOpen(false);
  };
  const handleDeconnect = () => {
    logout();// Mettre à jour l'état de connexion à false
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">NumeriqueMaterials</div>
        <ul className="navbar-menu">
          {/* Use Link to navigate to different pages */}
          {isConnected && (
             <>
          <li className="navbar-item"><Link to="/userHome">{t("navbar.accueil")}</Link></li>
         <li className="navbar-item"><Link to="/Graph">{t("navbar.graph")}</Link></li> 
         <li className="navbar-item"><Link to="/carte-geographique">{t("navbar.carteGeographique")}</Link></li>
         </> )}
          {!isConnected && (
            <>
          <li className="navbar-item"><Link to="/accueil">{t("navbar.accueil")}</Link></li>
          <li className="navbar-item"><Link to="/carte-geographique">{t("navbar.carteGeographique")}</Link></li>
          <li className="navbar-item"><Link to="/a-propos">{t("navbar.aPropos")}</Link></li>
          <li><button className="cnx-button" onClick={onConnexionClick}>{t("navbar.connexion")}</button></li>
          </>
          )}
          {isConnected && (
             <>
          <li className="navbar-item"><Link to="/recherche-avancee">{t("navbar.rechercheAvancee")}</Link></li>
          <li className="navbar-item"><Link to="/a-propos">{t("navbar.aPropos")}</Link></li>
         <img className="navbar-img" src={img} alt="Navbar Icon" onClick={handleProfil} />
          
          <LanguagePopup toggleLang={toggleLang} />
          <img className="navbar-imgD" src={deconIcon} alt="Decon Icon" onClick={handleDeconnect} />
          </>
          )}
        </ul>
        
      </div>
    </nav>
  );
}

export default Navbar;
