import React, { useState, useEffect } from 'react';
import './MaterialDetails.css';  
import  matImg from "./Assets/bois.png"
import dwn from "./Assets/download.png"
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import imageNotFound from "./Assets/block.png"
import Footer from './Elements/Footer';
import Navbar from './Elements/Navbar';
import { Link, useParams } from 'react-router-dom';
import  menuIcon from "./Assets/icon.png"
import deconIcon from "./Assets/decon.png"
import whitemenuIcon from "./Assets/wmenu.png"
import closeIcon from "./Assets/close.png"


import axios from 'axios';
function ProductDetails() {
  const [product, setProduct] = useState(null);
  const {productId} = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [infos,setInfos]=useState();
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
  };
  console.log("productId:", productId);

  useEffect(() => {
    // Convertissez productId en entier en utilisant parseInt()
    fetch(`http://localhost:2000/api/componentsId/${productId}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [productId]);

  useEffect(() => {
    // Convertissez productId en entier en utilisant parseInt()
    fetch(`http://localhost:1000/api/RealtionsData/${productId}`)
      .then(response => response.json())
      .then(data => setInfos(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [productId]);
  const [isMenuOpen, setMenuOpen ,setGraph ,isGraph] = useState(false);
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  

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

  
  
  
  
  


  return (
    
  
    <nav className="details">
       <Navbar/>
       <img className="dwnload" src={dwn} alt="Download" onClick={handleDownloadPdf} />
    
       <div id="pdfContent">
      <div className="products">
      {product && product.component ? (
        <div>
          <p className='mat-name'>{product.component.designation}</p>

          {product.images && product.images.length > 0 ? (
            <div className="slider-container">
              <div
                className="slider-images"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {product.images.map((image, index) => (
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
            <img style={{width:"20%", marginLeft:"20%"}}
            alt='Image Introuvable'
                      src={imageNotFound}
                    />
          )}

        </div>
        ) : (
          <p>Aucun matériau trouvé</p>
        )}
      </div>

      <div className="Description">
  <h3>Description</h3>
  
  {product && product.component ? (
    <ul>
      {product.component.famille && (
        <li><span className='champ'>Type de Famille :</span> {product.component.famille}</li>
      )}
      {product.component.forme && product.component.forme.length > 0 && (
        <li>
          <span className='champ'>Forme :</span>
          {product.component.forme.map((forme, index) => (
            <span key={index}>
              {forme}{index !== product.component.forme.length - 1 && ', '}
            </span>
          ))}
        </li>
      )}
      {product.component.nature && product.component.nature.length > 0 && (
        <li>
          <span className='champ'>Nature :</span>
          {product.component.nature.map((inertie, index) => (
            <span key={index}>
              {inertie}{index !== product.component.nature.length - 1 && ', '}
            </span>
          ))}
        </li>
      )}
      {product.component.couleur && product.component.couleur.length > 0 && (
        <li>
          <span className='champ'>Couleur :</span>
          {product.component.couleur.map((color, index) => (
            <span key={index}>
              {color}{index !== product.component.couleur.length - 1 && ', '}
            </span>
          ))}
        </li>
      )}
      {product.component.inertie_thermique && product.component.inertie_thermique.length > 0 && (
        <li>
          <span className='champ'>Inertie Thermique :</span>
          {product.component.inertie_thermique.map((inertie, index) => (
            <span key={index}>
              {inertie}{index !== product.component.inertie_thermique.length - 1 && ', '}
            </span>
          ))}
        </li>
      )}
      {product.component.isolation_thermique && product.component.isolation_thermique.length > 0 && (
        <li>
          <span className='champ'>Isolation Thermique :</span>
          {product.component.isolation_thermique.map((inertie, index) => (
            <span key={index}>
              {inertie}{index !== product.component.isolation_thermique.length - 1 && ', '}
            </span>
          ))}
        </li>
      )}
      {product.component.longueur && product.component.longueur.length > 0 && (
        <li>
          <span className='champ'>Longueur :</span>
          {product.component.longueur.map((inertie, index) => (
            <span key={index}>
              {inertie}{index !== product.component.longueur.length - 1 && ', '}
            </span>
          ))}
        </li>
      )}
      {product.component.dosage && product.component.dosage.length > 0 && (
        <li>
          <span className='champ'>Dosage :</span>
          {product.component.dosage.map((inertie, index) => (
            <span key={index}>
              {inertie}{index !== product.component.dosage.length - 1 && ', '}
            </span>
          ))}
        </li>
      )}
      {product.component.surface && product.component.surface.length > 0 && (
        <li>
          <span className='champ'>Surface :</span>
          {product.component.surface.map((inertie, index) => (
            <span key={index}>
              {inertie}{index !== product.component.surface.length - 1 && ', '}
            </span>
          ))}
        </li>
      )}
      {product.component.epaisseur && product.component.epaisseur.length > 0 && (
        <li>
          <span className='champ'>Épaisseur :</span>
          {product.component.epaisseur.map((inertie, index) => (
            <span key={index}>
              {inertie}{index !== product.component.epaisseur.length - 1 && ', '}
            </span>
          ))}
        </li>
      )}
      {product.component.largeur && product.component.largeur.length > 0 && (
        <li>
          <span className='champ'>Largeur :</span>
          {product.component.largeur.map((inertie, index) => (
            <span key={index}>
              {inertie}{index !== product.component.largeur.length - 1 && ', '}
            </span>
          ))}
        </li>
      )}
      {product.component.hauteur && product.component.hauteur.length > 0 && (
        <li>
          <span className='champ'>Hauteur :</span>
          {product.component.hauteur.map((inertie, index) => (
            <span key={index}>
              {inertie}{index !== product.component.hauteur.length - 1 && ', '}
            </span>
          ))}
        </li>
      )}
      {product.component.profondeur && product.component.profondeur.length > 0 && (
        <li>
          <span className='champ'>Profondeur :</span>
          {product.component.profondeur.map((inertie, index) => (
            <span key={index}>
              {inertie}{index !== product.component.profondeur.length - 1 && ', '}
            </span>
          ))}
        </li>
      )}
      {product.component.plasticite && product.component.plasticite.length > 0 && (
        <li>
          <span className='champ'>Plasticité :</span>
          {product.component.plasticite.map((inertie, index) => (
            <span key={index}>
              {inertie}{index !== product.component.plasticite.length - 1 && ', '}
            </span>
          ))}
        </li>
      )}
    </ul>
  ) : (
    <p>Aucun Produit trouvé</p>
  )}
</div>

<div className="Vertical">
 
 {/* Affiche les éléments avec une autre relation dans un autre div */}
 {infos && infos.infos  && infos.infos.some(item => item.relation == "REFERENCER_PAR") && (
   
 <div className='Source'>
   <h3>Source</h3>
      {infos.infos
     .filter(item => item.relation == "REFERENCER_PAR")
     .map((item, index) => {
       const { year, title, author, page } = item.Cible.properties;
       const yearDisplay = typeof year === 'object' ? `${year.low} - ${year.high}` : year;
       return (
     
       
       <p key={index}>{title},{author},{yearDisplay},{page}</p>
     )
   })
 }
     </div>
   )}
 
 
 {infos && infos.infos &&  infos.infos.some(item => !['ILLUSTRER_PAR', 'REFERENCER_PAR'].includes(item.relation.toUpperCase())) && (
   <div className="Composition">
     <h3>Informations Relatives</h3>
     {Object.entries(
       infos.infos
         .filter(item => !['ILLUSTRER_PAR', 'REFERENCER_PAR'].includes(item.relation.toUpperCase())) // Filtre les relations à exclure
         .reduce((acc, item) => {
           const relationType = item.relation.toUpperCase(); // Convertit en majuscules pour uniformiser
           if (!acc[relationType]) {
             acc[relationType] = [];
           }
           acc[relationType].push(item.Cible.properties.designation);
           return acc;
         }, {})
     ).map(([relationType, items], index) => (
       <p key={index}>{items.length > 0 ? `${relationType} : [${items.join(", ")}]` : ''}</p>
     ))}
   </div>
 )}
 
 
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
    <li className='rubMat-name' ><Link to="/product">Matériaux</Link></li>
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
  <Link className="pageLink" to="/">Accueil</Link>
  <Link className="pageLink" to="/Graph">Graph</Link>
  <Link className="pageLink" to="/carte-geographique">Carte Geographique</Link>
  <Link className="pageLink" to="/recherche-avancee">Recherche Avancée</Link>
  <Link className="pageLink" to="/a-propos">À propos</Link>
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



export default ProductDetails;
