import React, { useState,useEffect }  from 'react';
import './Navbar.css';  
import  img from "../Assets/img.png";
import MenuIcon from "../Assets/menu.png";
import { Link } from 'react-router-dom';
import ArrowdIcon from "../Assets/arrowd.png"
import ArrowRight from "../Assets/chevron.png"
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import deconIcon from "../Assets/logout.png"
import { useAuth } from '../AuthContext';
import LangImg from "../Assets/language.png"
import logo from '../Assets/LogoBg.png'
import ArrowIcon from "../Assets/down-arrow.png"
import LanguagePopup from './LangSwitch';
import whitemenuIcon from "../Assets/wmenu.png";
import closeIcon from "../Assets/close.png";
// Utilisez la fonction translate ici...



const Navbar = () => {
  const [isClassMenuOpen, setClassMenuOpen] = useState(false);
  const { t,i18n } = useTranslation();
  const { isConnected, logout,role,image,isUpdated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [filterMenuOpen, setFiltMenuOpen] = useState(null); 
  const [imgSrc,setImgSrc]=useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (image && !isUpdated) {
      try {
        const buffer = new Uint8Array(image.data);
        const blob = new Blob([buffer], { type: 'image/jpeg' }); // Changez le type si nécessaire
        const imageUrl = URL.createObjectURL(blob);
        setImgSrc(imageUrl);
      } catch (error) {
        console.error("Error creating image URL:", error);
      }
    } else{
      setImgSrc(image);
    }
  }, [image]);
  console.log('image',imgSrc)
  const handleProfil = () => {
    navigate('/profil');
  };
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleFiltMenuToggle = (menuType) => {
    if (filterMenuOpen === menuType) {
      setFiltMenuOpen(null); // Fermer le menu si déjà ouvert
    } else {
      setFiltMenuOpen(menuType); // Ouvrir le menu correspondant
    }
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
      <div className='navbar-logo'>
      {!isConnected && (

          <li> <img className='Logo' style={{width: '100%', height: '100px' }}  src={logo} onClick={() => navigate('/')} /></li>   
        )}
        {isConnected && (
           <li> <img className='Logo' style={{width: '100%', height: '100px' }}  src={logo} onClick={() => navigate('/acceuil')} /></li>   
        )}
          </div>
         
           
          <div className="navbarHome-elements">
      {isConnected && (
        <div className="navbarHome-menu">
          <img src={MenuIcon} alt="Profile" onClick={handleMenuToggle} />
        </div>
      )}
    
        <ul className="navbar-menu">
          {/* Use Link to navigate to different pages */}
          {isConnected && (
             <>
          <li className="navbar-item"><Link to="/userHome">{t("navbar.accueil")}</Link></li>
         <li className="navbar-item"><Link to="/Graph">{t("navbar.graph")}</Link></li> 
         <li className="navbar-item"><Link to="/carte-geographique">{t("navbar.carteGeographique")}</Link></li>
         <li className="navbar-item"><Link to="/recherche-avancee">{t("navbar.rechercheAvancee")}</Link></li>
          <li className="navbar-item"><Link to="/a-propos">{t("navbar.aPropos")}</Link></li>
          {role === 'administrateur' && (
                <li className="navbar-item"><Link to="/admin"> Gestion des utilisateurs</Link></li>
              )}
         </> )}
          {!isConnected && (
            <>
          <li className="navbar-item"><Link to="/">{t("navbar.accueil")}</Link></li>
          <li className="navbar-item"><Link to="/a-propos">{t("navbar.aPropos")}</Link></li>
          <li><button className="connect-button" onClick={onConnexionClick}>{t("navbar.connexion")}</button></li>
          
          </>
          )}
          {isConnected && (
             <>
            {imgSrc ? (
  <img
    className="navbar-img"
    src={imgSrc}
    alt="Profile"
    onClick={handleProfil}
    style={{ backgroundColor: 'white', width: '50px', height: '50px', borderRadius: '50%' }}
  />
) : (
  <img
    className="navbar-img"
    src={img}
    alt="Default Profile"
    onClick={handleProfil}
  />
)}

          <img className="navbar-imgD" src={deconIcon} alt="Decon Icon" onClick={handleDeconnect} />
          </>
          )}
        </ul>
        <div className="nav-button">
        <button  className="nav-btn" onClick={()=>{toggleLang("en")}}>EN</button>
          <button  className="nav-btn" onClick={()=>{toggleLang("fr")}}>FR</button>
        </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="side-menu">
          <div className="popIcons">
            <img className="popmenu" src={whitemenuIcon} alt="Menu Icon" onClick={handleMenuToggle} />
            <img className="closemenu" src={closeIcon} alt="Close Icon" onClick={handleMenuToggle} />
          </div>
          <div className='lineBar'></div>
          <h3 className='rub' style={{ textAlign: 'center' }}>{t("Menu.Rubrique")}</h3>
          <ul className='mats' style={{ paddingLeft: '20px' }}>
            <li className='rubMat-name'>
            <div className='MenuCat'>
              <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={() => handleFiltMenuToggle(t("Header.Mat"))}  />
           <Link to="/material">{t("Header.Mat")}</Link>
          </div>
          </li>
          {filterMenuOpen === t("Header.Mat") && (
            <>
            <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <Link to="/categorie1" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.MAT")}</Link>
            </li>
            <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <Link to="/categorie2" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.MER")}</Link>
            </li>
            <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <Link to="/categorie3" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Bois")}</Link>
            </li>
            </>
          )}
            <li className='rubMat-name'><Link to="/produit">{t("Header.Prod")}</Link></li>
            <li className='rubMat-name'><Link to="/ouvrage">{t("Header.Ouv")}</Link></li>
            <li className='rubMat-name'>
            <div className='MenuCat'>
              <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={() => handleFiltMenuToggle(t("Header.Path"))}  />
           <Link to="/pathologie">{t("Header.Path")}</Link>
          </div>
              </li>
              {filterMenuOpen === t("Header.Path") && (
                <>
            <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <Link to="/biologique" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Biologique")}</Link>
            </li>
            <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <Link to="/chromatique-dépot" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Chd")}</Link>
            </li>
            <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <Link to="/déformation" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Déformation")}</Link>
            </li>
            <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <Link to="/détachement" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Détachement")}</Link>
            </li>
            <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <Link to="/fissure" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Fissure")}</Link>
            </li>
            <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <Link to="/perte de matière" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.PDM")}</Link>
            </li>
            <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <Link to="/autres" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Autres")}</Link>
            </li>
            </>
              )}
            <li className='rubMat-name'><Link to="/monument">{t("Header.Monu")}</Link></li>
          </ul>
          <div className='lineBar'></div>
          <h3 className='rub' style={{ textAlign: 'center' }}>{t("Menu.Pages")}</h3>
          <Link className="pageLink" to="/acceuil">{t("navbar.accueil")}</Link>
          <Link className="pageLink" to="/Graph">{t("navbar.graph")}</Link>
          <Link className="pageLink" to="/carte-geographique">{t("navbar.carteGeographique")}</Link>
          <Link className="pageLink" to="/recherche-avancee">{t("navbar.rechercheAvancee")}</Link>
          <Link className="pageLink" to="/a-propos">{t("navbar.aPropos")}</Link>
          <div className='lineDecBar'></div>
          <div className='Decon'>
    <img className="dec" src={deconIcon} alt="Decon Icon" onClick={handleDeconnect} />
    <a className='decLink' onClick={handleDeconnect} >{t("Menu.Deconnexion")}</a>
  </div>
          </div>
      )}
    </nav>
  );
}

export default Navbar;
