import React, { useState } from 'react';
import './Material.css';  
import  menuIcon from "../Assets/icon.png"
import homeIcon from "../Assets/Vector.png"
import NoImage from "../Assets/block.png"
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
const Pathologie = ({pathologies}) => {
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
        
         <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '10px',textAlign: 'center', marginLeft:'30%' }}>
         {t("Header.Path")}
      </Typography.Title>
          </div>
          <div className='MaterialCat'>
  <img className="home" src={homeIcon}  />
  <Link to="/acceuil" style={{marginLeft:'10px', color: 'blue', textDecoration: 'none' }}>{t("navbar.accueil")}</Link> {/* Lien vers la page d'accueil */}
  <span className='Path' style={{ color: 'blue' }}>&gt;</span> {/* Utilisation de span pour le symbole ">" */}
  <Link to="/pathologie" style={{ marginLeft:'10px',color: 'blue', textDecoration: 'none' }}> {t("Header.Path")}</Link> {/* Lien vers la page Monument */}
  
</div>
          <Categories pathologies={pathologies} categorieName= {t("Menu.Biologique")}/>
          <Categories pathologies={pathologies} categorieName={t("Menu.Chd")}/>
          <Categories pathologies={pathologies} categorieName={t("Menu.Déformation")}/>
          <Categories pathologies={pathologies} categorieName={t("Menu.Détachement")}/>
          <Categories pathologies={pathologies} categorieName={t("Menu.Fissure")}/>
          <Categories pathologies={pathologies} categorieName={t("Menu.PDM")}/>
          <Categories pathologies={pathologies} categorieName={t("Menu.Autres")}/>

       
   <ChatBox/>   

      <Footer/>
    </na>
  );
}


const Categories = (props) => {
  const CatName = props.categorieName;
  const pathologies=props.pathologies
  const { t,i18n } = useTranslation();
  const navigate = useNavigate();
  console.log('pathologies',pathologies)
  const handleImageClick = (materialId) => {
    const integerMaterialId = parseInt(materialId, 10);
    navigate(`/details/${integerMaterialId}`);
  };

  let categoryContent;
  let categoryUrl;

  if (CatName === t("Menu.Biologique")) {
    categoryContent = (
      <div className='CategorieList'>
        { pathologies
          .filter(pathologie => pathologie.category === "BIOLOGIQUE")
          .slice(0, 3)
          .map((pathologie, index) => (
            <div className='CardMatItem' key={index}>
            <p>{pathologie.title}</p>
            <img 
              className="mat-img" 
              src={NoImage}
              //src={`data:image/jpg;base64, ${pathologie.image[0]}`} // Affiche la première image
              onClick={() => handleImageClick(pathologie.id)} 
              alt="Material"
            />
          </div>
          ))}
      </div>
    );
    categoryUrl = "/biologique";
  }
  else if (CatName === t("Menu.Chd")) {
    categoryContent = (
      <div className='CategorieList'>
        { pathologies
          .filter(pathologie => pathologie.category === "CHROMATIQUE")
          .slice(0, 3)
          .map((pathologie, index) => (
            <div className='CardMatItem' key={index}>
            <p>{pathologie.title}</p>
            <img 
              className="mat-img" 
              src={NoImage}
              //src={`data:image/jpg;base64, ${pathologie.image[0]}`} // Affiche la première image
              onClick={() => handleImageClick(pathologie.id)} 
              alt="Material"
            />
          </div>
          ))}
      </div>
    );
    categoryUrl = "/chromatique-dépot";
  } else if (CatName ===t("Menu.Déformation")) {
    categoryContent = (
      <div className='CategorieList'>
        { pathologies
          .filter(pathologie => pathologie.category === "DEFORMATION")
          .slice(0, 3)
          .map((pathologie, index) => (
            <div className='CardMatItem' key={index}>
            <p>{pathologie.title}</p>
            <img 
              className="mat-img" 
              src={NoImage}
              //src={`data:image/jpg;base64, ${pathologie.image[0]}`} // Affiche la première image
              onClick={() => handleImageClick(pathologie.id)} 
              alt="Material"
            />
          </div>
          ))}
      </div>
    );
    categoryUrl = "/déformation";
  } else if (CatName === t("Menu.Détachement")) {
    categoryContent = (
      <div className='CategorieList'>
        { pathologies
          .filter(pathologie => pathologie.category === "DETACHEMENT")
          .slice(0, 3)
          .map((pathologie, index) => (
            <div className='CardMatItem' key={index}>
            <p>{pathologie.title}</p>
            <img 
              className="mat-img" 
              src={NoImage}
              //src={`data:image/jpg;base64, ${pathologie.image[0]}`} // Affiche la première image
              onClick={() => handleImageClick(pathologie.id)} 
              alt="Material"
            />
          </div>
          ))}
      </div>
    );
    categoryUrl = "/détachement";
  } else if (CatName === t("Menu.Fissure")) {
    categoryContent = (
      <div className='CategorieList'>
        { pathologies
          .filter(pathologie => pathologie.category === "FISSURE")
          .slice(0, 3)
          .map((pathologie, index) => (
            <div className='CardMatItem' key={index}>
            <p>{pathologie.title}</p>
            <img 
              className="mat-img" 
              src={NoImage}
              //src={`data:image/jpg;base64, ${pathologie.image[0]}`} // Affiche la première image
              onClick={() => handleImageClick(pathologie.id)} 
              alt="Material"
            />
          </div>
          ))}
      </div>
    );
    categoryUrl = "/fissure";
    }else if (CatName === t("Menu.PDM")) {
      categoryContent = (
        <div className='CategorieList'>
          { pathologies
            .filter(pathologie => pathologie.category === "PERTE MATIERE")
            .slice(0, 3)
            .map((pathologie, index) => (
              <div className='CardMatItem' key={index}>
              <p>{pathologie.title}</p>
              <img 
                className="mat-img" 
                src={NoImage}
                //src={`data:image/jpg;base64, ${pathologie.image[0]}`} // Affiche la première image
                onClick={() => handleImageClick(pathologie.id)} 
                alt="Material"
              />
            </div>
            ))}
        </div>
      );
      categoryUrl = "/perte de matière";
    } else if (CatName === t("Menu.Autres")) {
      categoryContent = (
        <div className='CategorieList'>
          { pathologies
            .filter(pathologie => pathologie.category === "AUTRE")
            .slice(0, 3)
            .map((pathologie, index) => (
              <div className='CardMatItem' key={index}>
              <p>{pathologie.title}</p>
              <img 
                className="mat-img" 
                src={NoImage}
                //src={`data:image/jpg;base64, ${pathologie.image[0]}`} // Affiche la première image
                onClick={() => handleImageClick(pathologie.id)} 
                alt="Material"
              />
            </div>
            ))}
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