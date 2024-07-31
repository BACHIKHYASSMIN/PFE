import React, { useState, useEffect } from 'react';
import './Material.css';  
import  menuIcon from "../Assets/icon.png"
import homeIcon from "../Assets/Vector.png"
import agrImg from  "../Assets/agr.png"
import pierImg from  "../Assets/pier.png"
import NoImage from "../Assets/block.png"
import deconIcon from "../Assets/decon.png"
import whitemenuIcon from "../Assets/wmenu.png"
import closeIcon from "../Assets/close.png"
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Elements/Navbar';
import Footer from '../Elements/Footer';

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
        .filter(materiau => materiau.famille === "Base terre" && materiau.image && materiau.image.length > 0)
        .slice(0, 3) // Limite à seulement 3 éléments
        .map((materiau, index) => (
          <div className='CardMatItem' key={index}>
            <p>{materiau.title}</p>
            <img 
              className="mat-img" 
              src={`data:image/jpg;base64, ${materiau.image[0]}`} // Affiche la première image
              onClick={() => handleImageClick(materiau.id)} 
              alt="Material"
            />
          </div>
        ))}
    </div>
    
    );
    categoryUrl = "/categorie1";
  } else if (CatName === t("Menu.MER")) {
    categoryContent = (
      <div className='CategorieList'>
      { materials
        .filter(materiau => materiau.famille === "Minérale et roche" && materiau.image && materiau.image.length > 0)
        .slice(0, 3) // Limite à seulement 3 éléments
        .map((materiau, index) => (
          <div className='CardMatItem' key={index}>
            <p>{materiau.title}</p>
            <img 
              className="mat-img" 
              src={`data:image/jpg;base64, ${materiau.image[0]}`} // Affiche la première image
              onClick={() => handleImageClick(materiau.id)} 
              alt="Material"
            />
          </div>
        ))}
    </div>
    
    
    );
    categoryUrl = "/categorie2";
  } else {
    categoryContent = (
      <div className='CategorieList'>
      { materials
        .filter(materiau => materiau.famille === "Bois" && materiau.image && materiau.image.length > 0)
        .slice(0, 3) // Limite à seulement 3 éléments
        .map((materiau, index) => (
          <div className='CardMatItem' key={index}>
            <p>{materiau.title}</p>
            <img 
              className="mat-img" 
              src={`data:image/jpg;base64, ${materiau.image[0]}`} // Affiche la première image
              onClick={() => handleImageClick(materiau.id)} 
              alt="Material"
            />
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