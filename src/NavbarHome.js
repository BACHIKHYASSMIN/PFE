import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarHome.css'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from './Assets/LogoBg.png'
const NavbarHome = ({ }) => {
  const navigate = useNavigate();
  const { t,i18n } = useTranslation();
  const onLogoClick=()=>{
    navigate('/');
  }
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
          <div className='navbar-logo'>
          <li > <img className='Logo'  style={{width: '100%', height: '100px' }} src={logo} onClick={onLogoClick} /></li>   
          </div>
          <div className="navbarHome-elements">
          <ul className='Elements'>
            <li className='navbarItemHome'><Link to="/">{t("navbar.accueil")}</Link></li>
            <li className='navbarItemHome'><Link to="/a-propos">{t("navbar.aPropos")}</Link></li>
            {/* Appelle la fonction onConnexionClick lorsque le bouton est cliqué */}
            <li className='navbarItemHome'><button className="connect-button" onClick={onConnexionClick}>{t("navbar.connexion")}</button></li>
          </ul>
          <div className="navbar-button">
        <button  className="navbar-btn" onClick={()=>{toggleLang("en")}}>EN</button>
          <button  className="navbar-btn" onClick={()=>{toggleLang("fr")}}>FR</button>
        </div>
        </div>
        </div>
      </nav>
    );
  };
  export default NavbarHome;