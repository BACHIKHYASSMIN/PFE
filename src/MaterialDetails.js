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
  const [currentIndex, setCurrentIndex] = useState(0);
 const [infos,setInfos]=useState();
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? material.component.images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    // Convertissez productId en entier en utilisant parseInt()
    fetch(`http://localhost:1000/api/RealtionsData/${materialId}`)
      .then(response => response.json())
      .then(data => setInfos(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [materialId]);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === material.component.images.length - 1 ? 0 : prevIndex + 1));
  };
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
          <p className='mat-name'>{material.component.designation}</p>

          {material.component.images && material.component.images.length > 0 ? (
            <div className="slider-container">
              <div
                className="slider-images"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {material.component.images.map((image, index) => (
                  <div className="slider-image" key={image.id}>
                    <img
                      className="mat-img"
                      src={`data:image/jpg;base64, ${image}`}
                      alt={`Image ${index}`}
                    />
                  </div>
                ))}
              </div>
              <a className="prev" onClick={prevSlide}>&#10094;</a>
              <a className="next" onClick={nextSlide}>&#10095;</a>
            </div>
          ) : (
            <p>Aucune image trouvée pour ce matériau</p>
          )}

        </div>
      ) : (
        <p>Aucun matériau trouvé</p>
      )}
    </div>


      <div className="Description">
      <h3 >Description</h3>
      
      {material && material.component ? (

        <ul>
            <li><span className='champ'> Type de Famille : </span>  {material.component.famille}</li>
            <li><span className='champ'> Forme:</span>   {material.component.forme.map((forme,index)=> (
         <span key={index}>
         {forme}{index !== material.component.forme.length - 1 && ', '}
       </span>
      ))}</li>
      <li>
      <span className='champ'> Nature: </span> {material.component.nature.map((inertie, index) => (
    <span key={index}>
      {inertie}{index !== material.component.nature.length - 1 && ', '}
    </span>
  ))}
</li>
      <li>
      <span className='champ'>  Couleur: </span> {material.component.couleur.map((color, index) => (
    <span key={index}>
      {color}{index !== material.component.couleur.length - 1 && ', '}
    </span>
  ))}
</li>
<li>
      <span className='champ'>  Inertie Thermique: </span> {material.component.inertie_thermique.map((inertie, index) => (
    <span key={index}>
      {inertie}{index !== material.component.inertie_thermique.length - 1 && ', '}
    </span>
  ))}
</li>
<li>
      <span className='champ'> Isolation thermique: </span> {material.component.isolation_thermique.map((inertie, index) => (
    <span key={index}>
      {inertie}{index !== material.component.isolation_thermique.length - 1 && ', '}
    </span>
  ))}
</li>
<li>
      <span className='champ'>  Longeur: </span> {material.component.longueur.map((inertie, index) => (
    <span key={index}>
      {inertie}{index !== material.component.longueur.length - 1 && ', '}
    </span>
  ))}
</li>
<li>
      <span className='champ'>  Dosage: </span> {material.component.dosage.map((inertie, index) => (
    <span key={index}>
      {inertie}{index !== material.component.dosage.length - 1 && ', '}
    </span>
  ))}
</li>
<li>
      <span className='champ'>  Surface: </span> {material.component.surface.map((inertie, index) => (
    <span key={index}>
      {inertie}{index !== material.component.surface.length - 1 && ', '}
    </span>
  ))}
</li>
<li>

      <span className='champ'> Epaisseur: </span> {material.component.epaisseur.map((inertie, index) => (
    <span key={index}>
      {inertie}{index !== material.component.epaisseur.length - 1 && ', '}
    </span>
  ))}
</li>
<li>
      <span className='champ'>  Largeur: </span> {material.component.largeur.map((inertie, index) => (
    <span key={index}>
      {inertie}{index !== material.component.largeur.length - 1 && ', '}
    </span>
  ))}
</li>
<li>

      <span className='champ'> Hauteur: </span> {material.component.hauteur.map((inertie, index) => (
    <span key={index}>
      {inertie}{index !== material.component.hauteur.length - 1 && ', '}
    </span>
  ))}
</li>
<li>

      <span className='champ'> Profondeur: </span> {material.component.profondeur.map((inertie, index) => (
    <span key={index}>
      {inertie}{index !== material.component.profondeur.length - 1 && ', '}
    </span>
  ))}
</li>
<li>

      <span className='champ'> Plasticite: </span> {material.component.plasticite.map((inertie, index) => (
    <span key={index}>
      {inertie}{index !== material.component.plasticite.length - 1 && ', '}
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
  <h3>Informations Relatives</h3>
  {infos && infos.infos ? (
    // Utilisation de reduce pour regrouper les éléments par type de relation
    Object.entries(infos.infos.reduce((acc, item) => {
      const relationType = item.relation.toUpperCase(); // Convertit en majuscules pour uniformiser
      if (!acc[relationType]) {
        acc[relationType] = [];
      }
      acc[relationType].push(item.Cible);
      return acc;
    }, {})).map(([relationType, items], index) => (
      <p key={index}>{items.length > 0 ? `${relationType} : [${items.join(", ")}]` : ''}</p>
    ))
  ) : (
    <p>Aucune information trouvée</p>
  )}
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
