import React from 'react';
import './MaterialDetails.css';  
import  matImg from "./Assets/bois.png"
import dwn from "./Assets/download.png"
import Footer from './Elements/Footer';
import Navbar from './Elements/Navbar';
import { Link } from 'react-router-dom';


const Details= () => {
  return (
    <nav className="details">
       <Navbar />
       <img className="dwnload" src={ dwn}  />
      <div className="material">
      <img className="mat-img" src={ matImg}  />
      <p className='mat-name'>Bois</p>
      </div>

      <div className="Description">
      <h3 >Description</h3>
      <ul>
      <li>Type de Famille:</li>
      <li>Nature:</li>
      <li>Forme :</li>
      <li>Couleur:</li>
      <li>Provenance :</li>
      <li>Disponibilité:</li>
      </ul>
      </div>
      <div className="Vertical">
      <div className="Source">
      <h3 >Source</h3>
      </div>
      <div className="Composition">
      <h3 >Composition</h3>
      </div>
      </div>
      <Footer />
    </nav>
  );
}

export default Details;
