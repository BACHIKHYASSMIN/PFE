
import './Categorie.css';
import React, { useState }  from 'react';
import  menuIcon from "./Assets/icon.png"
import homeIcon from "./Assets/Vector.png"
import FilterIcon from "./Assets/filter.png"
import agrImg from  "./Assets/agr.png"
import pierImg from  "./Assets/pier.png"
import ArrowIcon from "./Assets/arrow.png"
import deconIcon from "./Assets/decon.png"
import whitemenuIcon from "./Assets/wmenu.png"
import closeBIcon from "./Assets/closeb.png"
function Categorie() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
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
  return (
      <div className='cat'>
        <div className="categorie-head">
          <img className="menu" src={menuIcon}  />
          <p className="tit">Matériaux</p>
          <div className='catlist'>
          <div className='catIt'><p>Matériaux à base de terre</p> </div>
          <div className='catIt'> <p>Minéraux et Roches</p> </div>
          <div className='catIt'> <p>Bois</p> </div>
          </div>
          </div>
          <div className='MaterialCat'>
          <img className="home" src={homeIcon}  />
          <p className='Path' >Acceuil &gt; Matériaux &gt; Matériaux à base de terre</p>
          </div>
          <div className='searchBar'>
          <div className='Filter'>
          <img className="fit" src={FilterIcon}  onClick={handleMenuToggle}  />
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
      {isMenuOpen && (
        
        <div className="side-filter-menu">
          <div className="popFIcon">
          <h3 className='filter'>Filters</h3>
          <img className="closebmenu" src={closeBIcon} alt="Close Icon"
          onClick={handleMenuToggle}  />
          </div>
          <div className='lineFBar'></div>
          <div className='FilterCat'>
          <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={handleMenuToggle}  />
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
          onClick={handleMenuToggle}  />
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
          onClick={handleMenuToggle}  />
          <h3 className='filt-name' >Ouvrages</h3>
          </div>
          <div className='FilterCat'>
    <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={handleMenuToggle}  />
          <h3 className='filter-name' >Pathologies</h3>
          </div>
          <div className='FilterCat'>
    <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={handleMenuToggle}  />
          <h3 className='filter-name' >Monuments</h3>
          </div>
          <div className='lineFBar'></div>
          <div className='ValBtn'>
          <button className='annuler'>Annuler</button>
          <button className='valider'>Valider</button>
          </div>
        </div>
      )}
      </div>
      
  );
}

export default Categorie;
