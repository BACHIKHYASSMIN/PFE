import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
      <footer style={{ marginTop: '40px' }}> 
        <div className="footer-section1">
          <h4>NumeriqueMaterials</h4>
        </div>
  
        <div className="footer-section">
          <h4>Rubriques</h4>
          <ul>
          <li><a href="/matériaux">Matériaux</a></li>
            <li><a href="/Produit">Produits</a></li>
            <li><a href="/Ouvrage">Ouvrages</a></li>
            <li><a href="/Monuments">Monuments</a></li>
            <li><a href="/Pathologies">Pathologies</a></li>
          </ul>
        </div>
  
        <div className="footer-section">
          <h4>Pages</h4>
          <ul>
          <li><a href="/">Accueil</a></li>
            <li><a href="/Graphe">Graphe</a></li>
            <li><a href="/Carte">Carte Géographique</a></li>
            <li><a href="/Recherche">Recherche Avancée</a></li>
          </ul>
        </div>
  
        <div className="footer-section centered">
          <ul>
            <li><i className="fas fa-map-marker-alt"></i> El-Harrach, Alger, Algérie</li>
            <li style={{ marginTop: '8px' }}><i className="far fa-envelope"></i> materialslibrary85@gmail.com</li>
          </ul>
        </div>
      </footer>
    );
  }
  
  export default Footer;