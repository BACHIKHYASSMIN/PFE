import React, { useState } from 'react';
import './Material.css';  
import  menuIcon from "../Assets/icon.png"
import homeIcon from "../Assets/Vector.png"
import agrImg from  "../Assets/agr.png"
import pierImg from  "../Assets/pier.png"
import deconIcon from "../Assets/decon.png"
import whitemenuIcon from "../Assets/wmenu.png"
import closeIcon from "../Assets/close.png"
import { Link } from 'react-router-dom';
import categorie from '../MatérialsCatégories/Categorie1'; 
import Details from '../MaterialDetails';
import Graph from '../Graph';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Elements/Navbar';
import { Form, Select, Button, Input, Card, Row, Col , Typography } from 'antd';
import Footer from '../Elements/Footer';
import ChatBox from '../Elements/ChatBox';
import { useTranslation } from 'react-i18next';
const Pathologie = () => {
  const [isMenuOpen, setMenuOpen ,setGraph ,isGraph] = useState(false);
  const { t,i18n } = useTranslation();
  const navigate = useNavigate();
  const handleDeconnect = () => {
    navigate('/');
  };

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  
  return (
    <na className="material">
      <Navbar  /> 
      <div className="material-head">
          <img className="menu" src={menuIcon} alt="Menu Icon"
          onClick={handleMenuToggle}  />
         <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '10px',textAlign: 'center', marginLeft:'30%' }}>
         {t("Header.Path")}
      </Typography.Title>
          </div>
          <div className='MaterialCat'>
  <img className="home" src={homeIcon}  />
  <Link to="/" style={{marginLeft:'10px', color: 'blue', textDecoration: 'none' }}>{t("navbar.accueil")}</Link> {/* Lien vers la page d'accueil */}
  <span className='Path' style={{ color: 'blue' }}>&gt;</span> {/* Utilisation de span pour le symbole ">" */}
  <Link to="/pathologie" style={{ marginLeft:'10px',color: 'blue', textDecoration: 'none' }}> {t("Header.Path")}</Link> {/* Lien vers la page Monument */}
  
</div>
          <Categories  categorieName={t("Menu.MAT")}/>
          <Categories  categorieName={t("Menu.Chd")}/>
          <Categories  categorieName={t("Menu.Déformation")}/>
          <Categories  categorieName={t("Menu.Détachement")}/>
          <Categories  categorieName={t("Menu.Fissure")}/>
          <Categories  categorieName={t("Menu.PDM")}/>
          <Categories  categorieName={t("Menu.Autres")}/>

        {/* Afficher le menu latéral s'il est ouvert */}
        {isMenuOpen && (
        
        <div className="side-menu">
  <div className="popIcons">
    <img className="popmenu" src={whitemenuIcon} alt="Menu Icon" onClick={handleMenuToggle} />
    <img className="closemenu" src={closeIcon} alt="Close Icon" onClick={handleMenuToggle} />
  </div>
  <div className='lineBar'></div>
  <h3 className='rub' style={{textAlign: 'center' }}>{t("Menu.Rubrique")}</h3>
  <ul className='mats' style={{ paddingLeft: '20px' }}>
    <li className='rubMat-name' ><Link to="/material">{t("Header.Mat")}</Link></li>
    <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie1" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.MAT")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie2" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.MER")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie3" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Bois")}</Link>
</li>
    <li className='rubMat-name'><Link to="/produit">{t("Header.Prod")}</Link></li>
    <li className='rubMat-name'><Link to="/ouvrage">{t("Header.Ouv")}</Link></li>
    <li className='rubMat-name'><Link to="/pathologie">{t("Header.Path")}</Link></li>
    <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/biologique" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Biologique")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/chromatique-dépot" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Chd")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/déformation" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Deformation")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/détachement" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Detachment")}</Link>
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
    <li className='rubMat-name'><Link to="/monument">{t("Header.Monu")}</Link></li>
    </ul>
  <div className='lineBar'></div>
  <h3 className='rub'  style={{textAlign: 'center' }} >{t("Menu.Pages")}</h3>
  {/* Ajoutez vos liens du menu ici */}
  <Link className="pageLink" to="/">{t("navbar.accueil")}</Link>
  <Link className="pageLink" to="/Graph">{t("navbar.graph")}</Link>
  <Link className="pageLink" to="/carte-geographique">{t("navbar.carteGeographique")}</Link>
  <Link className="pageLink" to="/recherche-avancee">{t("navbar.rechercheAvancee")}</Link>
  <Link className="pageLink" to="/a-propos">{t("navbar.aPropos")}</Link>
  <div className='lineDecBar'></div>
  <div className='Decon'>
    <img className="dec" src={deconIcon} alt="Decon Icon" onClick={handleDeconnect} />
    <a className='decLink' href="/lien2">{t("Menu.Deconnexion")}</a>
  </div>
</div>

      )}
   <ChatBox/>   

      <Footer/>
    </na>
  );
}


const Categories = (props) => {
  const CatName = props.categorieName;
  const { t,i18n } = useTranslation();
  const navigate = useNavigate();
  const handleImageClick = () => {
    // Naviguer vers la page "Details" lors du clic sur l'image
    navigate('/details');
  };

  let categoryContent;
  let categoryUrl;

  if (CatName === t("Menu.MAT")) {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
          <p >Pathologie 1</p>
          <img  onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 2</p>
          <img  onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 3</p>
          <img  onClick={handleImageClick} />
        </div>
        {/* Ajoutez d'autres éléments spécifiques à cette catégorie si nécessaire */}
      </div>
    );
    categoryUrl = "/biologique";
  } else if (CatName === t("Menu.Chd")) {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
          <p >Pathologie 1</p>
          <img  onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 2</p>
          <img  onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 3</p>
          <img  onClick={handleImageClick} />
        </div>
        {/* Ajoutez d'autres éléments spécifiques à cette catégorie si nécessaire */}
      </div>
    );
    categoryUrl = "/chromatique-dépot";
  } else if (CatName ===t("Menu.Déformation")) {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
          <p >Pathologie 1</p>
          <img  onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 2</p>
          <img  onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 3</p>
          <img  onClick={handleImageClick} />
        </div>
        {/* Ajoutez d'autres éléments génériques si nécessaire */}
      </div>
    );
    categoryUrl = "/déformation";
  } else if (CatName === t("Menu.Détachement")) {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
          <p >Pathologie 1</p>
          <img  onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 2</p>
          <img  onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 3</p>
          <img  onClick={handleImageClick} />
        </div>
        {/* Ajoutez d'autres éléments spécifiques à cette catégorie si nécessaire */}
      </div>
    );
    categoryUrl = "/détachement";
  } else if (CatName === t("Menu.Fissure")) {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
          <p >Pathologie 1</p>
          <img  onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 2</p>
          <img  onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 3</p>
          <img  onClick={handleImageClick} />
        </div>
        {/* Ajoutez d'autres éléments spécifiques à cette catégorie si nécessaire */}
      </div>
    );
    categoryUrl = "/fissure";
    }else if (CatName === t("Menu.PDM")) {
      categoryContent = (
        <div className='CategorieList'>
          <div className='CardMatItem'>
            <p >Pathologie 1</p>
            <img  onClick={handleImageClick} />
          </div>
          <div className='CardMatItem'>
            <p >Pathologie 2</p>
            <img  onClick={handleImageClick} />
          </div>
          <div className='CardMatItem'>
            <p >Pathologie 3</p>
            <img  onClick={handleImageClick} />
          </div>
          {/* Ajoutez d'autres éléments spécifiques à cette catégorie si nécessaire */}
        </div>
      );
      categoryUrl = "/perte de matière";
    } else if (CatName === t("Menu.Autres")) {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
          <p >Pathologie 1</p>
          <img  onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 2</p>
          <img  onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 3</p>
          <img  onClick={handleImageClick} />
        </div>
        {/* Ajoutez d'autres éléments spécifiques à cette catégorie si nécessaire */}
      </div>
    );
    categoryUrl = "/autres";
    }
  return (
    <div className='Categories'>
      <div className='catTitle'>
        <h3>{CatName}</h3>
      </div>
      <div className='CardDetails'>
        <Link to={categoryUrl}>
          <h3>{t("Tokens.voirTout")}</h3>
        </Link>
      </div>
      {categoryContent}
    </div>
  );
}



export default Pathologie;