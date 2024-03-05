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

const Material = () => {
  const [isMenuOpen, setMenuOpen ] = useState(false);
  const [data, setData] = useState([]);

  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const { t,i18n } = useTranslation();
  const toggleLang=(lang:String) =>{
    i18n.changeLanguage(lang);
  }
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
          {t("Matheader.message")}
      </Typography.Title>
          </div>
          <div className='MaterialCat'>
  <img className="home" src={homeIcon}  />
  <Link to="/" style={{ color: 'blue', textDecoration: 'none' }}>{t("navbar.accueil")}</Link> {/* Lien vers la page d'accueil */}
  <span className='Path' style={{ color: 'blue' }}>&gt;</span> {/* Utilisation de span pour le symbole ">" */}
  <Link to="/material" style={{ color: 'blue', textDecoration: 'none' }}>{t("Matheader.message")}</Link> {/* Lien vers la page Monument */}
</div>
          <Categories  categorieName="Matériaux à base de terre"/>
          <Categories  categorieName="Minéraux et Roches"/>
          <Categories  categorieName="Bois"/>

          {/* Afficher le menu latéral s'il est ouvert */}
      {isMenuOpen && (
        
        <div className="side-menu">
  <div className="popIcons">
    <img className="popmenu" src={whitemenuIcon} alt="Menu Icon" onClick={handleMenuToggle} />
    <img className="closemenu" src={closeIcon} alt="Close Icon" onClick={handleMenuToggle} />
  </div>
  <div className='lineBar'></div>
  <h3 className='rub' style={{textAlign: 'center' }}>Rubriques</h3>
  <ul className='mats' style={{ paddingLeft: '20px' }}>
    <li className='rubMat-name' ><Link to="/material">{t("Matheader.message")}</Link></li>
    <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie1" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Matériaux à base de terre</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie2" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Minéraux et Roches</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie3" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Bois</Link>
</li>
<li className='rubMat-name'><Link to="/produit">Produits</Link></li>



    <li className='rubMat-name'><Link to="/ouvrage">Ouvrages</Link></li>
    <li className='rubMat-name'><Link to="/pathologie">Pathologies</Link></li>
    <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/biologique" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Biologique</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/chromatique-dépot" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Chromatique-dépot</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/déformation" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Déformation</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/détachement" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Détachement</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/fissure" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Fissure</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/perte de matière" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Pertes de matière</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/autres" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Autres</Link>
</li>
    <li className='rubMat-name'><Link to="/monument">Monuments</Link></li>
    </ul>
  <div className='lineBar'></div>
  <h3 className='rub'  style={{textAlign: 'center' }} >Pages</h3>
  {/* Ajoutez vos liens du menu ici */}
  <Link className="pageLink" to="/">{t("navbar.accueil")}</Link>
  <Link className="pageLink" to="/Graph">{t("navbar.graph")}</Link>
  <Link className="pageLink" to="/carte-geographique">{t("navbar.carteGeographique")}</Link>
  <Link className="pageLink" to="/recherche-avancee">{t("navbar.rechercheAvancee")}</Link>
  <Link className="pageLink" to="/a-propos">{t("navbar.aPropos")}</Link>
  <div className='lineDecBar'></div>
  <div className='Decon'>
    <img className="dec" src={deconIcon} alt="Decon Icon" onClick={handleMenuToggle} />
    <a className='decLink' href="/lien2">Deconnexion</a>
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
  const navigate = useNavigate();
  const handleImageClick = () => {
    // Naviguer vers la page "Details" lors du clic sur l'image
    navigate('/details');
  };

  let categoryContent;
  let categoryUrl;

  if (CatName === "Matériaux à base de terre") {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
          <p >Terre Cuite</p>
          <img  onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Terre non Cuite</p>
          <img  onClick={handleImageClick}  />
        </div>
        
        {/* Ajoutez d'autres éléments spécifiques à cette catégorie si nécessaire */}
      </div>
    );
    categoryUrl = "/categorie1";
  } else if (CatName === "Minéraux et Roches") {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
          <p >Conglomérat et liant</p>
          <img  onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pierre</p>
          <img  onClick={handleImageClick} />
        </div>
       
        {/* Ajoutez d'autres éléments spécifiques à cette catégorie si nécessaire */}
      </div>
    );
    categoryUrl = "/categorie2";
  } else {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
          <p >Cèdre</p>
          <img  onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Thuya</p>
          <img  onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Essence non Identifiée</p>
          <img  onClick={handleImageClick} />
        </div>
        {/* Ajoutez d'autres éléments génériques si nécessaire */}
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
          <h3>Voir Tout</h3> 
        </Link>
      </div>
      {categoryContent}
    </div>

 </div> 



 
  );

}



export default Material;