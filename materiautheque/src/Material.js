import React, { useState } from 'react';
import './Material.css';  
import  menuIcon from "./Assets/icon.png"
import homeIcon from "./Assets/Vector.png"
import agrImg from  "./Assets/agr.png"
import pierImg from  "./Assets/pier.png"
import deconIcon from "./Assets/decon.png"
import whitemenuIcon from "./Assets/wmenu.png"
import closeIcon from "./Assets/close.png"
import { Link } from 'react-router-dom';
import categorie from './Categorie'; 
import Details from './MaterialDetails';
import Graph from './Graph';


const Material = () => {
  const [isMenuOpen, setMenuOpen ,setGraph ,isGraph] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleGraphToggle = () => {
    setGraph(!isGraph);
  };
  return (
    <na className="material">
      <div className="material-head">
          <img className="menu" src={menuIcon} alt="Menu Icon"
          onClick={handleMenuToggle}  />
          <p className="title">Matériaux</p>
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
          <li className='rub-name'>Matériaux </li>
          <ul>
          <li className='catgs' >Matériaux à base de terre</li>
          <li className='catgs' >Minéraux et Roches</li>
          <li className='catgs' >Bois</li>
          </ul>
          <li className='rub-name'>Produits</li>
          <li className='rub-name' >Ouvrages</li>
          <li className='rub-name' >Pathologies</li>
          <li className='rub-name' >Monuments</li>
          </ul>
          <div className='lineBar'></div>
          <h3 className='rub'>Pages</h3>
          {/* Ajoutez vos liens du menu ici */}
          <a className='pageLink' href="/Acceuil">Acceuil</a>
          <a  className='pageLink' onClick={handleGraphToggle}>Graph</a>
          <a  className='pageLink' href="/lien3">Carte Geographique</a>
          <a  className='pageLink' href="/lien3">Recherche AVancé</a>
          <a  className='pageLink' href="/lien3">A propos</a>
      
          <div className='lineDecBar'></div>
          <div className='Decon'>
          <img className="dec" src={deconIcon} alt="Decon Icon"
          onClick={handleMenuToggle}  />
          <a  className='decLink' href="/lien2">Deconnexion</a>
          </div>
        </div>
      )}


      {isGraph  && (
      <Graph />
      )}
    </na>
  );
}


const Categories =(props) =>{
  const CatName = props.categorieName;
  const handleImageClick = () => {
  };
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
            <div className='CategorieList'>
              <div className='CardItem'>
              <p >Agrégat</p>
              <img  src={agrImg} onClick={handleImageClick} />
              </div>
              <div className='CardItem'>
              <p >Pierre</p>
              <img  src={pierImg} onClick={<Details />}/>
              </div>
              <div className='CardItem'>
              <p >Agrégat</p>
              <img  src={agrImg} onClick={<Details />}/>
              </div>
            </div>
                       </div>


);
}


export default Material;