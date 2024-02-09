// À propos de NumeriqueMaterials

import React from 'react';
import './Apropos.css'; // Importer le fichier CSS pour les styles
import Footer from './Elements/Footer';
import Navbar from './Elements/Navbar';


const Apropos = () => {
    return (
      <div>
        <Navbar/>
     


     
        <div className="apropos-container apropos-background ">
          <div>
          <h1 className="apropos-title">À Propos de NumeriqueMaterials</h1> 
            <div className=" section-container">
              <section className="apropos-section">
                <h2>Découvrez NumeriqueMaterials</h2>
                <p>NumeriqueMaterials représente une matériauthèque numérique en ligne spécialisée dans la facilitation de la recherche de matériaux. NumeriqueMaterials offre aux utilisateurs une base de données complète et actualisée, comprenant une vaste gamme de matériaux de construction et de conception.Cette  plateforme est conçue pour être accessible et conviviale, offrant ainsi une expérience utilisateur intuitive et efficace pour les chercheurs, les ingénieurs et les professionnels de l'architecture. L'objectif est de simplifier le processus de recherche de matériaux, permettant aux  utilisateurs de la plateforme de trouver rapidement les informations nécessaires pour leurs projets.</p>
              </section>
            </div>
          </div>
          
          <div >
            <div className=" section-container1">
              <section className="apropos-section">
                <h2>Objectifs du Projet</h2>
                <p>Les objectifs de NumeriqueMaterials sont les suivants :</p>
                <ul className="white-bullets">
                  <li>Fournir une plateforme conviviale et intuitive pour la recherche de matériaux de construction.</li>
                  <li>Offrir une base de données complète et actualisée de matériaux provenant de diverses sources.</li>
                  <li>Permettre aux utilisateurs de filtrer et d'étudier facilement les différents matériaux en fonction de leurs besoins spécifiques.</li>
                  <li>Faciliter la gestion des matériaux pour les architectes, les ingénieurs et les professionnels de la construction.</li>
                </ul>
              </section>
            </div>
          </div>
          
          <div >
            <div className=" section-container">
              <section className="apropos-section">
                <h2>Fonctionnalités de la Plateforme</h2>
                <p>Fonctionnalités offertes par NumeriqueMaterials :</p>
                <ul className="white-bullets">
                  <li>Consultation de vastes collections de matériaux, produits, ouvrages, pathologies et monuments disponibles dans la base de données et provenant de diverses sources fiables.</li>
                  <li>Recherche avancée avec des filtres personnalisables pour trouver rapidement les matériaux recherchés.</li>
                  <li>Visualisation de graphiques et de données statistiques pour analyser les tendances et les performances des matériaux.</li>
                  <li>Utilisation de filtres pour affiner les résultats de recherche en fonction de critères spécifiques.</li>
                  <li>Exploration des détails techniques, des caractéristiques et des propriétés de chaque matériau, produit, ouvrage, pathologie et monument.</li>
                </ul>
              </section>
            </div>
            
          </div>
          <div >
            <div className=" section-container2">
              <section className="apropos-section">
                <h2>Espace d'Interaction</h2>
                <p>La plateforme NumeriqueMaterials dispose d'un Espace d'Interaction dédié à l'échange et à la collaboration entre utilisateurs.  Dans cet espace, vous avez la possibilité de :</p>
                <ul className="white-bullets">
                  <li>Partager vos expériences et suggestions pour contribuer à l'amélioration continue de NumeriqueMaterials.</li>
                  <li>Échanger des idées, des conseils et des références avec une communauté active et engagée.</li>
                  <li>Collaborer avec d'autres utilisateurs afin de résoudre des problèmes spécifiques ou de mener à bien des projets communs.</li>
                  <li>Poser des questions pour obtenir des informations complémentaires </li>
               </ul>
              </section>
            </div>
            
          </div>
          
        </div>
        
        <Footer />
      </div>
    );
  }
  

  
    
export default Apropos;
