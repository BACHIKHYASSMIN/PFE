import React from 'react';
import './Navbar.css';  
import  img from "./Assets/img.png"


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">NumeriqueMaterials</div>
        <ul className="navbar-menu">
          <li className="navbar-item">Accueil</li>
          <li className="navbar-item">Graph</li>
          <li className="navbar-item">Carte Geographique</li>
          <li className="navbar-item">Recherche Avancée</li>
          <li className="navbar-item">À propos</li>
          <img className="navbar-img" src={img}  />
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
