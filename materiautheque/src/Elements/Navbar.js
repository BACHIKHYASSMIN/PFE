import React from 'react';
import './Navbar.css';  
import  img from "../Assets/img.png";
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">NumeriqueMaterials</div>
        <ul className="navbar-menu">
          {/* Use Link to navigate to different pages */}
          <li className="navbar-item"><Link to="/">Accueil</Link></li>
          <li className="navbar-item"><Link to="/">Classes</Link></li>
          <li className="navbar-item"><Link to="/Graph">Graph</Link></li>
          <li className="navbar-item"><Link to="/carte-geographique">Carte Geographique</Link></li>
          <li className="navbar-item"><Link to="/recherche-avancee">Recherche Avancée</Link></li>
          <li className="navbar-item"><Link to="/a-propos">À propos</Link></li>
          <img className="navbar-img" src={img} alt="Navbar Icon" />
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
