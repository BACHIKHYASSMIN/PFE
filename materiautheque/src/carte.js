
import './carte.css';
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
import Navbar from './Elements/Navbar';
import Footer from './Elements/Footer';
import  Map from './Map';
function Carte() {
  const monuments = [
    { name: 'Monument 1', lat: 40.7128, lng: -74.0060 },
    { name: 'Monument 2', lat: 34.0522, lng: -118.2437 },
    // Add more monuments as needed
  ];
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
      <div className='graph'>
        <Navbar />
          <h3 className="titre">Graphe de connaissance </h3>
          <div className='SearchF'>
          <button className='valide'  onClick={handleMenuToggle}>Filtrer</button>
          <input  type="text" placeholder="Rechercher un matériau" className='bar' />
          <button className='valide'>Valider</button>
          </div>
         
          <div>
      <h2>Offline Map with Monuments</h2>
      <Map monuments={monuments} />
    </div>
              
      
            
            
         {/* Afficher le menu latéral s'il est ouvert */}
      {isMenuOpen && (
        
        <div className="side-filter">
          <div className="popFIcon">
          <h3 className='filter'>Filters</h3>
          <img className="closebmenu" src={closeBIcon} alt="Close Icon"
          onClick={handleMenuToggle}  />
          </div>
          <div className='lineFBar'></div>
          <div className='FilterCat'>
          <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={handleMenuToggle}  />
          <h3 className='catt'>Monuments</h3>
          </div>
          <div className='catboxList'>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked1}  onChange={handleCheckbox1Change} />
      <label htmlFor="checkbox"></label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked2}  onChange={handleCheckbox2Change} />
      <label htmlFor="checkbox"></label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked3}  onChange={handleCheckbox3Change} />
      <label htmlFor="checkbox"></label>
    </div>   
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

export default Carte;
