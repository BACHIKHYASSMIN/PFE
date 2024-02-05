import React, { useState } from 'react';
import './Material.css';  
import '../Categorie.css'
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
import FilterIcon from "../Assets/filter.png"
import closeBIcon from "../Assets/closeb.png"
import ArrowIcon from "../Assets/arrow.png"



const Produit = () => {
 

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);

 
  const  handleFilterMenuToggle = () => {
    setFilterMenuOpen(!isFilterMenuOpen);
  };
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  
    
    const handleCheckbox1Change = () => {
      setChecked1(!isChecked1);
    };
    const handleCheckbox2Change = () => {
      setChecked2(!isChecked2);
    };
    const handleCheckbox3Change = () => {
      setChecked3(!isChecked3);
    };
    return(
    <na className="material">
      <div className="material-head">
          <img className="menu" src={menuIcon} alt="Menu Icon"
          onClick={handleMenuToggle}  />
          <p className="title">Produits</p>
          </div>
          <div className='MaterialCat'>
          <img className="home" src={homeIcon}  />
          <p className='Path' >Acceuil &gt; Produit</p>
          </div>
          <div className='searchBar'>
          <div className='Filter'>
          <img className="fit" src={FilterIcon}  onClick={handleFilterMenuToggle}  />
          <p >Filtres</p>
          </div>
          <div className='Search'>
          <input  type="text" placeholder="Rechercher un matériau" className='bar' />
          <button className='valide'>Valider</button>
          </div>
          </div>
          <div className='catElements'>
          <div className='CatItem'>
              <p >Agrégat</p>
              <img  src={agrImg}/>
              </div>
              <div className='catItem'>
              <p >Pierre</p>
              <img  src={pierImg}/>
              </div>
              <div className='catItem'>
              <p >Pierre</p>
              <img  src={pierImg}/>
              </div>
              <div className='catItem'>
              <p >Agrégat</p>
              <img  src={agrImg}/>
              </div>
              <div className='catItem'>
              <p >Pierre</p>
              <img  src={pierImg}/>
              </div>
               <div className='catItem'>
              <p >Agrégat</p>
              <img  src={agrImg}/>
              </div>
              
              </div>
              <div className='Links'>
              <a >1</a>
              <a >2</a>
              <a >3</a>
              <a >&gt;</a>
              </div>  

        {/* Afficher le menu latéral s'il est ouvert */}
      {isFilterMenuOpen && (
        
        <div className="side-filter-menu">
          <div className="popFIcon">
          <h3 className='filter'>Filters</h3>
          <img className="closebmenu" src={closeBIcon} alt="Close Icon"
          onClick={handleFilterMenuToggle}  />
          </div>
          <div className='lineFBar'></div>
          <div className='FilterCat'>
          <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={handleFilterMenuToggle}  />
          <h3 className='catt'>Famille des matériaux</h3>
          </div>
          <div className='catboxList'>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked1}  onChange={handleCheckbox1Change} />
      <label htmlFor="checkbox">Matériaux à base de terre</label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked2}  onChange={handleCheckbox2Change} />
      <label htmlFor="checkbox">Minéraux et Roches</label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked3}  onChange={handleCheckbox3Change} />
      <label htmlFor="checkbox">Bois</label>
    </div>   
    </div> 
    <div className='FilterCat'>
    <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={handleFilterMenuToggle}  />
          <h3 className='filt-name'>Produits</h3>
          </div>
          <div className='catboxList'>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked1}  onChange={handleCheckbox1Change} />
      <label htmlFor="checkbox">Mortier</label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked2}  onChange={handleCheckbox2Change} />
      <label htmlFor="checkbox">Dalle</label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked3}  onChange={handleCheckbox3Change} />
      <label htmlFor="checkbox">Couche</label>
    </div>   
    </div> 
    <div className='FilterCat'>
    <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={handleFilterMenuToggle}  />
          <h3 className='filt-name' >Ouvrages</h3>
          </div>
          <div className='FilterCat'>
    <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={handleFilterMenuToggle}  />
          <h3 className='filter-name' >Pathologies</h3>
          </div>
          <div className='FilterCat'>
    <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={handleFilterMenuToggle}  />
          <h3 className='filter-name' >Monuments</h3>
          </div>
          <div className='lineFBar'></div>
          <div className='ValBtn'>
          <button className='annuler'>Annuler</button>
          <button className='valider'>Valider</button>
          </div>
        </div>
      )}


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
          <li className='rubMat-name'><Link to="/">Matériaux</Link> </li>
          <ul>
          <li className='catgs' >Matériaux à base de terre</li>
          <li className='catgs' >Minéraux et Roches</li>
          <li className='catgs' >Bois</li>
          </ul>
          <li className='rubMat-name'><Link to="/produit">Produits</Link></li>
          <li className='rubMat-name' ><Link to="/">Ouvrages</Link></li>
          <li className='rubMat-name' ><Link to="/">Pathologies</Link></li>
          <li className='rubMat-name' ><Link to="/">Monuments</Link></li>
          </ul>
          <div className='lineBar'></div>
          <h3 className='rub'>Pages</h3>
          {/* Ajoutez vos liens du menu ici */}
         <Link className="pageLink" to="/">Accueil</Link>
          <Link className="pageLink" to="/">Classes</Link>
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

    </na>
  );
}





export default Produit;