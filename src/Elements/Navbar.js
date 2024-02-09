import React, { useState }  from 'react';
import './Navbar.css';  
import  img from "../Assets/img.png";
import { Link } from 'react-router-dom';
import ArrowdIcon from "../Assets/arrowd.png"
import ArrowRight from "../Assets/chevron.png"
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

  const [isClassMenuOpen, setClassMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleProfil = () => {
    navigate('/profil');
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">NumeriqueMaterials</div>
        <ul className="navbar-menu">
          {/* Use Link to navigate to different pages */}
          <li className="navbar-item"><Link to="/">Accueil</Link></li>
          <li className="navbar-item"><Link to="/Graph">Graph</Link></li>
          <li className="navbar-item"><Link to="/carte-geographique">Carte Geographique</Link></li>
          <li className="navbar-item"><Link to="/recherche-avancee">Recherche Avancée</Link></li>
          <li className="navbar-item"><Link to="/a-propos">À propos</Link></li>
          <img className="navbar-img" src={img} alt="Navbar Icon"  onClick={handleProfil}/>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
