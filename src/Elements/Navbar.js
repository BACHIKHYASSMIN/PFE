import React, { useState }  from 'react';
import './Navbar.css';  
import  img from "../Assets/img.png";
import { Link } from 'react-router-dom';
import ArrowdIcon from "../Assets/arrowd.png"
import ArrowRight from "../Assets/chevron.png"


const Navbar = () => {

  const [isClassMenuOpen, setClassMenuOpen] = useState(false);
  const handleClassMenuToggle = () => {
    setClassMenuOpen(!isClassMenuOpen);
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">NumeriqueMaterials</div>
        <ul className="navbar-menu">
          {/* Use Link to navigate to different pages */}
          <li className="navbar-item"><Link to="/">Accueil</Link></li>
          <li className="navbar-item"><Link onClick={handleClassMenuToggle} >Classes</Link></li>
          <li className="navbar-ite"><img className="arrowd" src={ArrowdIcon} alt="ArrowDown" onClick={handleClassMenuToggle}  /></li>
          <li className="navbar-item"><Link to="/Graph">Graph</Link></li>
          <li className="navbar-item"><Link to="/carte-geographique">Carte Geographique</Link></li>
          <li className="navbar-item"><Link to="/recherche-avancee">Recherche Avancée</Link></li>
          <li className="navbar-item"><Link to="/a-propos">À propos</Link></li>
          <img className="navbar-img" src={img} alt="Navbar Icon" />
        </ul>
      </div>

        {/* Afficher le menu latéral s'il est ouvert */}
        {isClassMenuOpen && (
        
        <div className="Class-menu">
          <li className='rubClass-name'><Link to="/material" onClick={handleClassMenuToggle}>Matériaux</Link> </li>
          <li className='rubClass-name'><Link to="/produit" onClick={handleClassMenuToggle}>Produits</Link></li>
          <li className='rubClass-name' ><Link to="/ouvrage" onClick={handleClassMenuToggle}>Ouvrages</Link></li>
          <li className='rubClass-name' ><Link to="/pathologie" onClick={handleClassMenuToggle}>Pathologies</Link></li>
          <li className='rubClass-name' ><Link to="/monument" onClick={handleClassMenuToggle}>Monuments</Link></li>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
