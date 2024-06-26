import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarHome.css'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const NavbarHome = ({ }) => {
  const navigate = useNavigate();
  const { t,i18n } = useTranslation();
  const  onConnexionClick = () => {
    // Naviguer vers la page "Details" lors du clic sur l'image
    navigate('/connexion');
  };
  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  }
    return (
      <nav className="navbarHome">
        <div className="navbarHome-items">
          <h1>NumeriqueMaterials</h1>
          <ul>
            <li><Link to="/">{t("navbar.accueil")}</Link></li>
            <li><Link to="/a-propos">{t("navbar.aPropos")}</Link></li>
            {/* Appelle la fonction onConnexionClick lorsque le bouton est cliqué */}
            <li><button className="connect-button" onClick={onConnexionClick}>{t("navbar.connexion")}</button></li>
          </ul>
          <div className="navbar-button">
        <button  className="navbar-btn" onClick={()=>{toggleLang("en")}}>EN</button>
          <button  className="navbar-btn" onClick={()=>{toggleLang("fr")}}>FR</button>
        </div>
        </div>
      </nav>
    );
  };
  export default NavbarHome;