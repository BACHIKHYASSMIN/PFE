import React, { useState, useEffect } from 'react';
import './Material.css';  
import  menuIcon from "../Assets/icon.png"
import homeIcon from "../Assets/Vector.png"
import agrImg from  "../Assets/agr.png"
import pierImg from  "../Assets/pier.png"
import deconIcon from "../Assets/decon.png"
import whitemenuIcon from "../Assets/wmenu.png"
import closeIcon from "../Assets/close.png"
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Elements/Navbar';
import Footer from '../Elements/Footer';
import axios from 'axios';
import { Form, Select, Button, Input, Card, Row, Col , Typography } from 'antd';
import ChatBox from '../Elements/ChatBox';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext';

const Material = ({materials}) => {
  const [isMenuOpen, setMenuOpen ] = useState(false);
  const [data, setData] = useState([]);
  const { t,i18n } = useTranslation();
  const [produits, setProduits] = useState([]);
 const {logout}=useAuth();

  const navigate = useNavigate();

  const handleImageClick = (materialId) => {
    const integerMaterialId = parseInt(materialId, 10);
    navigate(`/materiauDetails/${integerMaterialId}`);
  };
 
  const handleDeconnect = () => {
    logout(); // Déconnexion de l'utilisateur
    navigate('/'); // Redirection vers la page d'accueil
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


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
          {t("Header.Mat")}
      </Typography.Title>
          </div>
          <div className='MaterialCat'>
  <img className="home" src={homeIcon}  />
  <Link to="/acceuil" style={{ marginLeft:'10px',color: 'blue', textDecoration: 'none' }}>{t("navbar.accueil")}</Link> 
  <span className='Path' style={{ color: 'blue' }}  >&gt;</span> 
  <Link to="/material" style={{ marginLeft:'10px', color: 'blue', textDecoration: 'none' }}>{t("Header.Mat")}</Link>
</div>
          <Categories materials={materials} categorieName={t("Menu.MAT")}/>
          <Categories  materials={materials} categorieName={t("Menu.MER")}/>
          <Categories  materials={materials} categorieName={t("Menu.Bois")}/>

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
    <li className='rubMat-name'><Link to="/monument">{t("Header.Monu")}</Link></li>
    </ul>
  <div className='lineBar'></div>
  <h3 className='rub'  style={{textAlign: 'center' }} >{t("Menu.Pages")}</h3>
  {/* Ajoutez vos liens du menu ici */}
  <Link className="pageLink" to="/acceuil">{t("navbar.accueil")}</Link>
  <Link className="pageLink" to="/Graph">{t("navbar.graph")}</Link>
  <Link className="pageLink" to="/carte-geographique">{t("navbar.carteGeographique")}</Link>
  <Link className="pageLink" to="/recherche-avancee">{t("navbar.rechercheAvancee")}</Link>
  <Link className="pageLink" to="/a-propos">{t("navbar.aPropos")}</Link>
  <div className='lineDecBar'></div>
  <div className='Decon'>
    <img className="dec" src={deconIcon} alt="Decon Icon" onClick={handleDeconnect} />
    <a className='decLink' onClick={handleDeconnect}>{t("Menu.Deconnexion")}</a>
  </div>
</div>

      )}
   <ChatBox/>   
<Footer/>
    </na>
  );
}


const Categories = (props) => {
  const { t,i18n } = useTranslation();
  const CatName = props.categorieName;
  const materials=props.materials
  const navigate = useNavigate();
  const handleImageClick = (materialId) => {
    const integerMaterialId = parseInt(materialId, 10);
    navigate(`/materiauDetails/${integerMaterialId}`);
  };
 

  let categoryContent;
  let categoryUrl;

  if (CatName === t("Menu.MAT")) {
    categoryContent = (
      <div className='CategorieList'>
        { materials
          .filter(materiau => materiau.famille === "Base terre")
          .slice(0, 3)
          .map((materiau, index) => (
            <div className='CardMatItem' key={index}>
              <p>{materiau.title}</p>
              {materiau.image && materiau.image.length > 0 ? (
                <img 
                  className="mat-img" 
                  src={`data:image/jpg;base64, ${materiau.image[0]}`} // Affiche la première image
                  onClick={() => handleImageClick(materiau.id)} 
                  alt="Material"
                />
              ) : (
                <img src={`data:image/jpg;base64, ${materiau.image}`}  onClick={() => handleImageClick(materiau.id)}/>
              )}
            </div>
          ))}
      </div>
    );
    categoryUrl = "/categorie1";
  } else if (CatName === t("Menu.MER")) {
    categoryContent = (
      <div className='CategorieList'>
        { materials
          .filter(materiau => materiau.famille === "Minérale et roche")
          .slice(0, 3)
          .map((materiau, index) => (
            <div className='CardMatItem' key={index}>
              <p>{materiau.title}</p>
              {materiau.image && materiau.image.length > 0 ? (
                <img 
                  className="mat-img" 
                  src={`data:image/jpg;base64, ${materiau.image[0]}`} // Affiche la première image
                  onClick={() => handleImageClick(materiau.id)} 
                  alt="Material"
                />
              ) : (
                <img src={`data:image/jpg;base64, ${materiau.image}`}  onClick={() => handleImageClick(materiau.id)}/>
              )}
            </div>
          ))}
      </div>
    );
    categoryUrl = "/categorie2";
  } else {
    categoryContent = (
      <div className='CategorieList'>
        { materials
          .filter(materiau => materiau.famille === "Bois")
          .slice(0, 3)
          .map((materiau, index) => (
            <div className='CardMatItem' key={index}>
              <p>{materiau.title}</p>
              {materiau.image && materiau.image.length > 0 ? (
                <img 
                  className="mat-img" 
                  src={`data:image/jpg;base64, ${materiau.image[0]}`} // Affiche la première image
                  onClick={() => handleImageClick(materiau.id)} 
                  alt="Material"
                />
              ) : (
                <img src={`data:image/jpg;base64, ${materiau.image}`}  onClick={() => handleImageClick(materiau.id)}/>
              )}
            </div>
          ))}
      </div>
    );
    categoryUrl = "/categorie3";
  }

  return (
   <div>
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

 </div> 



 
  );

}



export default Material;