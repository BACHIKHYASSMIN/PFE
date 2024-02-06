import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarHome.css'
import { useNavigate } from 'react-router-dom';
const NavbarHome = ({ }) => {
  const navigate = useNavigate();
  const  onConnexionClick = () => {
    // Naviguer vers la page "Details" lors du clic sur l'image
    navigate('/connexion');
  };
    return (
      <nav className="navbarHome">
        <div className="navbarHome-items">
          <h1>NumeriqueMaterials</h1>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/">Graph</Link></li>
            <li><Link to="/">Carte Geographique</Link></li>
            <li><Link to="/">Recherche Avancée</Link></li>
            <li><Link to="/">A propos</Link></li>
            {/* Appelle la fonction onConnexionClick lorsque le bouton est cliqué */}
            <li><button className="connect-button" onClick={onConnexionClick}>Se Connecter</button></li>
          </ul>
        </div>
      </nav>
    );
  };
  export default NavbarHome;