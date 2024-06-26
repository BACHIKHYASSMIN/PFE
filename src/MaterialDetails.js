import React, { useState, useEffect } from 'react';
import './MaterialDetails.css';  
import  matImg from "./Assets/bois.png"
import dwn from "./Assets/download.png"
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Footer from './Elements/Footer';
import Navbar from './Elements/Navbar';
import { Link, useParams } from 'react-router-dom';
import  menuIcon from "./Assets/icon.png"
import deconIcon from "./Assets/decon.png"
import whitemenuIcon from "./Assets/wmenu.png"
import closeIcon from "./Assets/close.png"
import axios from 'axios';
function MaterialDetails() {
  const [material, setMaterial] = useState([]);
  const { materialId } = useParams();
  console.log('materialId :' ,{materialId});
  useEffect(() => {
    // Convertissez productId en entier en utilisant parseInt()
    fetch(`http://localhost:2000/api/componentsId/${materialId}`)
      .then(response => response.json())
      .then(data => setMaterial(data))
      .catch(error => console.error('Error fetching material details:', error));
  }, [materialId]);
  const handleDownloadPdf = async () => {
    const pdf = new jsPDF();
    const divs = document.querySelectorAll('#pdfContent > div');
  
    let yOffset = 10; // Décalage vertical initial
  
    for (let i = 0; i < divs.length; i++) {
      const div = divs[i];
      const otherElements = Array.from(div.childNodes)
        .map(node => node.innerText)
        .join('\n');
  
      const textLines = pdf.splitTextToSize(otherElements, pdf.internal.pageSize.getWidth() - 20); // -20 pour laisser une marge
  
      if (yOffset + pdf.getTextDimensions(textLines).h > pdf.internal.pageSize.getHeight() - 10) {
        pdf.addPage();
        yOffset = 10;
      }
  
      pdf.text(textLines, 10, yOffset);
      yOffset += pdf.getTextDimensions(textLines).h + 10; // Ajouter la hauteur du texte et un espacement de 10
  
      if (i < divs.length - 1) {
        pdf.setDrawColor(0); // Couleur de la ligne de séparation
        pdf.setLineWidth(0.5); // Épaisseur de la ligne de séparation
        pdf.line(10, yOffset, pdf.internal.pageSize.getWidth() - 10, yOffset); // Dessiner une ligne de séparation
        yOffset += 10; // Ajouter un espacement après la ligne de séparation
      }
    }
  
    pdf.save('download.pdf');
  };

  const [isMenuOpen, setMenuOpen ,setGraph ,isGraph] = useState(false);
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };


  return (
    
  
    <nav className="details">
       <Navbar/>
       <img className="dwnload" src={ dwn} alt="Download" onClick={handleDownloadPdf} />
       <img className="menuList" src={menuIcon} alt="Menu Icon"  onClick={handleMenuToggle}  />
       <div id="pdfContent">
       <div className="materials">
  {material && material.component ? (
    <div>
      <img className="mat-img" src={`data:image/jpg;base64, ${material.component.image}`} alt="Material Image" />
      <p className='mat-name'>{material.component.designation}</p>
    </div>
  ) : (
    <p>Aucun matériau trouvé</p>
  )}
</div>


      <div className="Description">
      <h3 >Description</h3>
      
      {material && material.component ? (

        <ul>
            <li><span className='champ'> Type de Famille : </span>  {material.component.inertie_thermique}</li>
<li><span className='champ'> Forme:</span>   {material.component.forme.map((forme,index)=> (
         <span key={index}>
         {forme}{index !== material.component.forme.length - 1 && ', '}
       </span>
      ))}</li>
      <li>
      <span className='champ'>  Couleur: </span> {material.component.couleur.map((color, index) => (
    <span key={index}>
      {color}{index !== material.component.couleur.length - 1 && ', '}
    </span>
  ))}
</li>
      </ul>
          ):(
            <p>Aucun matériau trouvé</p>
          )
}
      </div>
      <div className="Vertical">
      <div className="Source">
      <h3 >Source</h3>
      {material && material.component ? (
         <p>{material.component.source}</p>
         ):(
          <p>Aucun matériau trouvé</p>
        )
}
      </div>
      <div className="Composition">
      <h3 >Composition</h3>
      </div>
      </div>
      </div>
      {/* Afficher le menu latéral s'il est ouvert */}
      {isMenuOpen && (
        
        <div className="side-menu">
  <div className="popIcons">
    <img className="popmenu" src={whitemenuIcon} alt="Menu Icon" onClick={handleMenuToggle} />
    <img className="closemenu" src={closeIcon} alt="Close Icon" onClick={handleMenuToggle} />
  </div>
  <div className='lineBar'></div>
  <h3 className='rub' style={{textAlign: 'center' }}>Rubriques</h3>
  <ul className='mats' style={{ paddingLeft: '20px' }}>
    <li className='rubMat-name' ><Link to="/material">Matériaux</Link></li>
    <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie1" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Matériaux à base de terre</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie2" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Minéraux et Roches</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie3" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Bois</Link>
</li>
    <li className='rubMat-name'><Link to="/produit">Produits</Link></li>
    <li className='rubMat-name'><Link to="/ouvrage">Ouvrages</Link></li>
    <li className='rubMat-name'><Link to="/pathologie">Pathologies</Link></li>
    <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/biologique" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Biologique</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/chromatique-dépot" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Chromatique-dépot</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/déformation" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Déformation</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/détachement" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Détachement</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/fissure" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Fissure</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/perte de matière" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Pertes de matière</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/autres" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Autres</Link>
</li>
    <li className='rubMat-name'><Link to="/monument">Monuments</Link></li>
    </ul>
  <div className='lineBar'></div>
  <h3 className='rub'  style={{textAlign: 'center' }} >Pages</h3>
  {/* Ajoutez vos liens du menu ici */}
  <Link className="pageLink" to="/userHome">Accueil</Link>
  <Link className="pageLink" to="/Graph">Graph</Link>
  <Link className="pageLink" to="/carte-geographique">Carte Geographique</Link>
  <Link className="pageLink" to="/recherche-avancee">Recherche Avancée</Link>
  <Link className="pageLink" to="/a-propos">À propos</Link>
  <div className='lineDecBar'></div>
  <div className='Decon'>
    <img className="dec" src={deconIcon} alt="Decon Icon" onClick={handleMenuToggle} />
    <a className='decLink' href="/lien2">Deconnexion</a>
  </div>
</div>

      )}
    </nav>
  

  );
}



export default  MaterialDetails;
