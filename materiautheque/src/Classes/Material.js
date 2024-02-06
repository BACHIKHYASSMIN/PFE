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
import categorie from '../Categorie'; 
import Details from '../MaterialDetails';
import Graph from '../Graph';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Elements/Navbar';
import Footer from '../Elements/Footer';
import { Form, Select, Button, Input, Card, Row, Col , Typography } from 'antd';

const Material = () => {
  const [isMenuOpen, setMenuOpen ,setGraph ,isGraph] = useState(false);
 

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  
  return (
    <na className="material">
      <Navbar />
      <div className="material-head">
          <img className="menu" src={menuIcon} alt="Menu Icon"
          onClick={handleMenuToggle}  />
          <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '40px',textAlign: 'center', marginLeft:'30%' }}>
        Matériaux
      </Typography.Title>
          </div>
          <div className='MaterialCat'>
          <img className="home" src={homeIcon}  />
          <p className='Path' >Acceuil &gt; Matériaux</p>
          </div>
          <Categories  categorieName="Matériaux à base de terre"/>
          <Categories  categorieName="Minéraux et Roches"/>
          <Categories  categorieName="Bois"/>

          {/* Afficher le menu latéral s'il est ouvert */}
      {isMenuOpen && (
        
        <div className="side-menu">
          <div className="popIcons">
          <img className="popmenu" src={whitemenuIcon} alt="Menu Icon"
          onClick={handleMenuToggle}  />
          <img className="closemenu" src={closeIcon} alt="Close Icon"
          onClick={handleMenuToggle}  />
          </div>
          <div className='lineBar'></div>
          <h3 className='rub'>Rubriques</h3>
          <ul className='mats'>
          <li className='rubMat-name'><Link to="/material">Matériaux</Link> </li>
          <ul>
          <li className='catgs' >Matériaux à base de terre</li>
          <li className='catgs' >Minéraux et Roches</li>
          <li className='catgs' >Bois</li>
          </ul>
          <li className='rubMat-name'><Link to="/produit">Produits</Link></li>
          <li className='rubMat-name' ><Link to="/ouvrage">Ouvrages</Link></li>
          <li className='rubMat-name' ><Link to="/pathologie">Pathologies</Link></li>
          <li className='rubMat-name' ><Link to="/monument">Monuments</Link></li>
          </ul>
          <div className='lineBar'></div>
          <h3 className='rub'>Pages</h3>
          {/* Ajoutez vos liens du menu ici */}
         <Link className="pageLink" to="/">Accueil</Link>
          <Link className="pageLink" to="/Graph">Graph</Link>
         <Link className="pageLink" to="/carte-geographique">Carte Geographique</Link>
          <Link className="pageLink"  to="/recherche-avancee">Recherche Avancée</Link>
         <Link className="pageLink" to="/a-propos">À propos</Link>
      
          <div className='lineDecBar'></div>
          <div className='Decon'>
          <img className="dec" src={deconIcon} alt="Decon Icon"
          onClick={handleMenuToggle}  />
          <a  className='decLink' href="/lien2">Deconnexion</a>
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

  if (CatName === "Matériaux à base de terre") {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
        <p >Terre Cuite</p>
          <img src={agrImg} onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
        <p >Terre non Cuite</p>
          <img src={pierImg} onClick={handleImageClick}  />
        </div>
        {/* Ajoutez d'autres éléments spécifiques à cette catégorie si nécessaire */}
      </div>
    );
  } else if (CatName === "Minéraux et Roches") {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
          <p >Congiomérat et liant</p>
          <img src={agrImg} onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Pierre</p>
          <img src={pierImg} onClick={handleImageClick} />
        </div>
        {/* Ajoutez d'autres éléments spécifiques à cette catégorie si nécessaire */}
      </div>
    );
  } else {
    categoryContent = (
      <div className='CategorieList'>
        <div className='CardMatItem'>
          <p >Cédre</p>
          <img src={agrImg} onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Thuya</p>
          <img src={pierImg} onClick={handleImageClick} />
        </div>
        <div className='CardMatItem'>
          <p >Essence non Identifiée</p>
          <img src={agrImg} onClick={handleImageClick} />
        </div>
        {/* Ajoutez d'autres éléments génériques si nécessaire */}
      </div>
    );
  }
  return (
    <div className='Categories'>
      <div className='catTitle'>
        <h3>{CatName}</h3>
      </div>
      <div className='CardDetails'>
        <Link to="/categorie">
          <h3>Voir Tout</h3>
        </Link>
      </div>
      {categoryContent}
    </div>
  );
}


export default Material;