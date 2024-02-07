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

const Pathologie = () => {
  const [isMenuOpen, setMenuOpen ,setGraph ,isGraph] = useState(false);
 

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  
  return (
    <na className="material">
       <Navbar/>
      <div className="material-head">
          <img className="menu" src={menuIcon} alt="Menu Icon"
          onClick={handleMenuToggle}  />
         <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '10px',textAlign: 'center', marginLeft:'30%' }}>
        Pathologies
      </Typography.Title>
          </div>
          <div className='MaterialCat'>
  <img className="home" src={homeIcon}  />
  <Link to="/" style={{ color: 'blue', textDecoration: 'none' }}>Accueil</Link> {/* Lien vers la page d'accueil */}
  <span className='Path' style={{ color: 'blue' }}>&gt;</span> {/* Utilisation de span pour le symbole ">" */}
  <Link to="/pathologie" style={{ color: 'blue', textDecoration: 'none' }}>pathologie</Link> {/* Lien vers la page Monument */}
  
</div>
          <Categories  categorieName="Biologique"/>
          <Categories  categorieName="Chromatique-dépot"/>
          <Categories  categorieName="Déformation"/>
          <Categories  categorieName="Détachement"/>
          <Categories  categorieName="Fissure"/>
          <Categories  categorieName="Pertes de matière"/>
          <Categories  categorieName="Autres"/>

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
    <li className='rubMat-name' ><Link to="/material">Matériaux</Link></li>
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
  <Link className="pageLink" to="/">Accueil</Link>
  <Link className="pageLink" to="/Graph">Graph</Link>
  <Link className="pageLink" to="/carte-geographique">Carte Geographique</Link>
  <Link className="pageLink" to="/recherche-avancee">Recherche Avancée</Link>
  <Link className="pageLink" to="/a-propos">À propos</Link>
  <div className='lineDecBar'></div>
  <div className='Decon'>
    <img className="dec" src={deconIcon} alt="Decon Icon" onClick={handleMenuToggle} />
    <a className='decLink' href="/lien2">Deconnexion</a>
  </div>
</div>
      )}
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

  if (CatName === "Biologique") {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
          <p >Pathologie 1</p>
          <img src={agrImg} onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 2</p>
          <img src={pierImg} onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 3</p>
          <img src={agrImg} onClick={handleImageClick} />
        </div>
        {/* Ajoutez d'autres éléments spécifiques à cette catégorie si nécessaire */}
      </div>
    );
    categoryUrl = "/biologique";
  } else if (CatName === "Chromatique-dépot") {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
          <p >Pathologie 1</p>
          <img src={agrImg} onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 2</p>
          <img src={pierImg} onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 3</p>
          <img src={agrImg} onClick={handleImageClick} />
        </div>
        {/* Ajoutez d'autres éléments spécifiques à cette catégorie si nécessaire */}
      </div>
    );
    categoryUrl = "/chromatique-dépot";
  } else if (CatName === "Déformation") {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
          <p >Pathologie 1</p>
          <img src={agrImg} onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 2</p>
          <img src={pierImg} onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 3</p>
          <img src={agrImg} onClick={handleImageClick} />
        </div>
        {/* Ajoutez d'autres éléments génériques si nécessaire */}
      </div>
    );
    categoryUrl = "/déformation";
  } else if (CatName === "Détachement") {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
          <p >Pathologie 1</p>
          <img src={agrImg} onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 2</p>
          <img src={pierImg} onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 3</p>
          <img src={agrImg} onClick={handleImageClick} />
        </div>
        {/* Ajoutez d'autres éléments spécifiques à cette catégorie si nécessaire */}
      </div>
    );
    categoryUrl = "/détachement";
  } else if (CatName === "Fissure") {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
          <p >Pathologie 1</p>
          <img src={agrImg} onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 2</p>
          <img src={pierImg} onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 3</p>
          <img src={agrImg} onClick={handleImageClick} />
        </div>
        {/* Ajoutez d'autres éléments spécifiques à cette catégorie si nécessaire */}
      </div>
    );
    categoryUrl = "/fissure";
    }else if (CatName === "Pertes de matière") {
      categoryContent = (
        <div className='CategorieList'>
          <div className='CardMatItem'>
            <p >Pathologie 1</p>
            <img src={agrImg} onClick={handleImageClick} />
          </div>
          <div className='CardMatItem'>
            <p >Pathologie 2</p>
            <img src={pierImg} onClick={handleImageClick} />
          </div>
          <div className='CardMatItem'>
            <p >Pathologie 3</p>
            <img src={agrImg} onClick={handleImageClick} />
          </div>
          {/* Ajoutez d'autres éléments spécifiques à cette catégorie si nécessaire */}
        </div>
      );
      categoryUrl = "/perte de matière";
    } else if (CatName === "Autres") {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
          <p >Pathologie 1</p>
          <img src={agrImg} onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 2</p>
          <img src={pierImg} onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pathologie 3</p>
          <img src={agrImg} onClick={handleImageClick} />
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
          <h3>Voir Tout</h3>
        </Link>
      </div>
      {categoryContent}
    </div>
  );
}



export default Pathologie;