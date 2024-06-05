import '../Home.css';
import Footer from './Footer';
import Navbar from './Navbar';
import React, { useState } from 'react';
import materiautheque from '../Assets/Materiautheque.png';
import Materiauphoto from '../Assets/Materiauphoto.png';
import ProduitPhoto from '../Assets/ProduitPhoto.png';
import MonumentPhoto from '../Assets/MonumentPhoto.png';
import OuvragePhoto from '../Assets/OuvragePhoto.png';
import localisation from '../Assets/localisation.jpg';
import RechAvancée from '../Assets/rechercheAvancée.PNG';
import visualisation from '../Assets/visualisation.png';
import { useTranslation } from 'react-i18next';

const UserHome = () => {
  const { t,i18n } = useTranslation();
  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  }
  
  const containerStyle = {
    position: 'relative',
    width: '100%',   // 100% de la largeur de la vue
    height: '60%',   // 50% de la hauteur de la vue
    overflow: 'hidden',
    marginBottom: '20px', 
  
  };

  const descriptionStyle = {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'semi-bold',
    fontSize: '24px',
    maxWidth: '850px',
    margin: ' auto', // Ajoutez cette ligne pour centrer horizontalement
    marginBottom: '100px', // Ajoutez cette ligne pour définir la marge basse
    marginTop: '50px'
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
     <Navbar />
      <img src={materiautheque} alt="Description de l'image" style={{ width: '100%', height: '10%' }} />

      <div style={descriptionStyle} >
        <p>{t("intro.NumeriqueMaterial")}</p>
      </div>

      <ul>
  <li>
              <div style={sectionStyle}>
              <img src={Materiauphoto} alt="Image des matériaux"  style={{ width: '35%', height: '35%' }}/>
        <div style={textColumnStyle}>
          <h2>{t("Header.Mat")}</h2>
          <p>{t("intro.MaterialP")}</p>
          <a href="/material" style={linkStyle}>{t("Tokens.suivre")}{t("Header.Mat")}...</a>
        </div>
      </div>

  </li>

  <li>
            <div style={sectionStyle}>
        <div style={textColumnStyle}>
        <h2>{t("Header.Prod")}</h2>
          <p>{t("intro.ProductP")}</p>
          <a href="/produit" style={linkStyle}>{t("Tokens.suivre")}{t("Header.Prod")}...</a>
        </div>
        <img src={ProduitPhoto} alt="Image des produits" style={{ width: '35%', height: '35%' }} />
      </div>
  </li>

  <li>
    <div style={sectionStyle}>
    <img src={OuvragePhoto} alt="Image des ouvrages"  style={{ width: '35%', height: '35%' }} />
        <div style={textColumnStyle}>
        <h2>{t("Header.Ouv")}</h2>
          <p>{t("intro.BuildingP")}</p>
          <a href="/ouvrage" style={linkStyle}>{t("Tokens.suivre")}{t("Header.Ouv")}...</a>
        </div>
      </div>
  </li>

  <li>
            <div style={sectionStyle}>
        <div style={textColumnStyle}>
        <h2>{t("Header.Path")}</h2>
        <p>{t("intro.PathP")} </p>
          <a href="/pathologie" style={linkStyle}>{t("Tokens.suivre")}{t("Header.Path")}...</a>
        </div>
        <img src={MonumentPhoto} alt="Image des monuments"  style={{ width: '35%', height: '35%' }} />
      </div>

  </li>

  <li>
  
    <div style={sectionStyle}>
            <img src={MonumentPhoto} alt="Image des monuments"  style={{ width: '35%', height: '35%' }} />
        <div style={textColumnStyle}>
        <h2>{t("Header.Monu")}</h2>
        <p>{t("intro.MonumP")}</p>
          <a href="/monument" style={linkStyle}>{t("Tokens.suivre")}{t("Header.Monu")}...</a>
        </div>
      </div>


  </li>
</ul>


<div style={cardContainerStyle}>
      <div style={cardStyle}>
        <h2>{t("Tokens.Viz")}</h2>
        <p>{t("Tokens.VizP")}</p>
        <img src={visualisation}  style={{height: '100p%' , width: '35%'}} />
      </div>

      <div style={cardStyle}>
        <h2>{t("Tokens.Loc")}</h2>
        <p>{t("Tokens.LocP")}</p>
        <img src={localisation}  style={{height: '100p%' , width: '35%'}} />
      </div>

      <div style={cardStyle}>
        <h2>{t("navbar.rechercheAvancee")}</h2>
        <p>{t("Tokens.RechP")}</p>
        <img src={RechAvancée}  style={{height: '100p%' , width: '35%'}} /> 
      </div>
      </div>



 <Footer/>

    </div>

    
  );

}

export default UserHome;