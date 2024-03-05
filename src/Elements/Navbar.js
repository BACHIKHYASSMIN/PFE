import React, { useState }  from 'react';
import './Navbar.css';  
import  img from "../Assets/img.png";
import { Link } from 'react-router-dom';
import ArrowdIcon from "../Assets/arrowd.png"
import ArrowRight from "../Assets/chevron.png"
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


// Utilisez la fonction translate ici...



const Navbar = () => {
  const [isClassMenuOpen, setClassMenuOpen] = useState(false);
  const { t,i18n } = useTranslation();
  const navigate = useNavigate();
  const handleProfil = () => {
    navigate('/profil');
  };
  const  onConnexionClick = () => {
    // Naviguer vers la page "Details" lors du clic sur l'image
    navigate('/connexion');
  };
  const toggleLang=(lang:String) =>{
    i18n.changeLanguage(lang);
  }


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">NumeriqueMaterials</div>
        <ul className="navbar-menu">
          {/* Use Link to navigate to different pages */}
          <li className="navbar-item"><Link to="/userHome">{t("navbar.accueil")}</Link></li>
         <li className="navbar-item"><Link to="/Graph">{t("navbar.graph")}</Link></li>
          <li className="navbar-item"><Link to="/carte-geographique">{t("navbar.carteGeographique")}</Link></li>
          <li className="navbar-item"><Link to="/recherche-avancee">{t("navbar.rechercheAvancee")}</Link></li>
          <li className="navbar-item"><Link to="/a-propos">{t("navbar.aPropos")}</Link></li>
         <img className="navbar-img" src={img} alt="Navbar Icon" onClick={handleProfil} />
          <button  className="navbar-btn" onClick={()=>{toggleLang("en")}}>EN</button>
          <button  className="navbar-btn" onClick={()=>{toggleLang("fr")}}>FR</button>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
