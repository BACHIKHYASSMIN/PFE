import matériautheque from './Assets/Materiautheq.png';
import Materiauphoto from './Assets/Materiauphoto.png';
import ProduitPhoto from './Assets/ProduitPhoto.png';
import MonumentPhoto from './Assets/MonumentPhoto.png';
import PathologiePhoto from './Assets/PathologiePhoto.png'
import OuvragePhoto from './Assets/OuvragePhoto.png';
import localisation from './Assets/localisation.jpg';
import RechAvancée from './Assets/rechercheAvancée.PNG';
import visualisation from './Assets/visualisation.png';
import logo from './Assets/Logo.png'
import './Home.css';
import React, { useEffect, useRef } from 'react';
import NavbarHome from './NavbarHome';
import Footer from './Elements/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import * as THREE from 'three';
import { color } from 'd3';
import { useTranslation } from 'react-i18next';
import zIndex from '@material-ui/core/styles/zIndex';

import Navbar from './Elements/Navbar';



const Home = () => {
  const vantaRef = useRef(null);
  const { t,i18n } = useTranslation();
  const navigate = useNavigate();
  const { isConnected } = useAuth();

  const handleMaterialLinkClick = (url) => {
    if (isConnected) {
      navigate(url);
    } else {
      localStorage.setItem('previousUrl', url);
      navigate('/connexion');
    }
  };



    const containerStyle = {
      position: 'relative',
      width: '100%',   // 100% de la largeur de la vue
      height: '60%',   // 50% de la hauteur de la vue
      overflow: 'hidden',
      marginBottom: '20px', 
    
    };
  
    const descriptionStyle = {
      textAlign:'justify',
      color: '#000000',
      fontSize: '24px',
      maxWidth: '1000px',
      margin: ' auto', // Ajoutez cette ligne pour centrer horizontalement
      marginLeft:'13.1%',
      borderRadius: '10px', // Coins arrondis
    };

    const descriptionTitle = {
      width: '190px',
      height: '50px',
      position: 'absolute',
      top: '5.7%',
      left:'43%',
      //backgroundColor: 'white',
      //backdropFilter: 'blur(10px)', // Effet de flou
      borderRadius: '10px', // Coins arrondis
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex:'1'
    };
    
  
      const sectionStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '130px',
       
      
      };
  
  
    const textColumnStyle = {
      textAlign: 'center',
      color: 'black',
      maxWidth: '600px',
      marginLeft: '10px',
      marginRight: '100px',
      fontSize: '24px',
    
    };
  
    const linkStyle = {
      color: 'blue',
      fontWeight: 'regular',
      textDecoration: 'none',
    };
  
    const cardContainerStyle = {
      display: 'flex',
      justifyContent: 'space-around',
     
      marginBottom: '50px', // Ajustez la marge inférieure selon vos préférences
      height: '340px', // Ajustez la hauteur selon vos préférences
   
    };
  
    const cardStyle = {
      width: '25%',
      padding: '10px',
      border: '1px solid #F39C12',
      borderRadius: '8px',
      color:'#2C3E50 ' , 
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
      textAlign: 'center',
    };
   
    return (
      <div style={containerStyle}>
       <Navbar isAuthenticated={false} />
       <div className='HomeHeader' > </div>
      

        <div   style={descriptionStyle} >
          <p style={{margin:'1%',}}><span style={{fontWeight:'bold'}}>{t("Title.Name")}</span>{t("intro.NumeriqueMaterial")}</p>
        </div>
        <div  className='LineBar'/>
        <ul>
    <li>
                <div style={sectionStyle}>
                <img src={Materiauphoto} alt="Image des matériaux"  style={{ width: '35%', height: '35%' }}/>
          <div style={textColumnStyle}>
            <h2>{t("Header.Mat")}</h2>
            <p style={{marginLeft:'15%'}}>
            {t("intro.MaterialP")}
            </p>
            <div onClick={() => handleMaterialLinkClick('/material')} style={linkStyle}> {t("Paragraph.ConsMat")}</div>
          </div>
        </div>
  
    </li>
  
    <li>
              <div style={sectionStyle}>
          <div style={textColumnStyle}>
          <h2>{t("Header.Prod")}</h2>
            <p>
            {t("intro.ProductP")}
            </p>
            <div onClick={() => handleMaterialLinkClick('/produit')} style={linkStyle}> {t("Paragraph.ConsProd")}</div>
          </div>
          <img src={ProduitPhoto} alt="Image des produits" style={{ width: '35%', height: '35%' }} />
        </div>
    </li>
  
    <li>
      <div style={sectionStyle}>
      <img src={OuvragePhoto} alt="Image des ouvrages"  style={{ width: '35%', height: '35%' }} />
          <div style={textColumnStyle}>
          <h2>{t("Header.Ouv")}</h2>
            <p style={{marginLeft:'15%'}}>
           {t("intro.BuildingP")}
            </p>
            <div  onClick={() => handleMaterialLinkClick('/ouvrage')} style={linkStyle}> {t("Paragraph.ConsOuv")}</div>
            
          </div>
        </div>
    </li>
  
    <li>
              <div style={sectionStyle}>
          <div style={textColumnStyle}>
          <h2>{t("Header.Path")}</h2>
          <p>
          {t("intro.PathP")}
            </p>
            <div onClick={ () => handleMaterialLinkClick('/pathologie')} style={linkStyle}> {t("Paragraph.ConsPath")}</div>
          </div>
          <img src={PathologiePhoto} alt="Image des monuments"  style={{ width: '35%', height: '35%' }} />
        </div>
  
    </li>
  
    <li>
    
      <div style={sectionStyle}>
              <img src={MonumentPhoto} alt="Image des monuments"  style={{ width: '35%', height: '35%' }} />
          <div style={textColumnStyle}>
          <h2>{t("Header.Monu")}</h2>
          <p style={{marginLeft:'15%'}}>
          {t("intro.MonumP")}
            </p>
            <div onClick={() => handleMaterialLinkClick('/monument')} style={linkStyle}> {t("Paragraph.ConsMon")}</div>
          </div>
        </div>
  
  
    </li>
  </ul>
  
 
  <div style={cardContainerStyle}>
        <div style={cardStyle}  onClick={ () => handleMaterialLinkClick('/Graph')}>
          <h2>{t("Tokens.Viz")}</h2>
          <p style={{marginLeft:"12px"}}>{t("Tokens.VizP")}</p>
          <img src={visualisation}  style={{height: '100p%' , width: '35%'}} />
        </div>
  
        <div style={cardStyle} onClick={ () => handleMaterialLinkClick('/carte-geographique')}>
          <h2>{t("Tokens.Loc")}</h2>
          <p style={{marginLeft:"12px"}}>{t("Tokens.LocP")}</p>
          <img src={localisation}  style={{height: '100p%' , width: '35%'}} />
        </div>
  
        <div style={cardStyle} onClick={ () => handleMaterialLinkClick('/recherche-avancee')}>
          <h2>{t("navbar.rechercheAvancee")}</h2>
          <p style={{marginLeft:"12px"}}>{t("Tokens.RechP")}</p>
          <img src={RechAvancée}  style={{height: '100p%' , width: '35%'}} /> 
        </div>
        </div>



   <Footer/>
  
      </div>
  
      
    );
  
  }
  export default Home;