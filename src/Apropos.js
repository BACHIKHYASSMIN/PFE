// À propos de NumeriqueMaterials

import React from 'react';
import './Apropos.css'; // Importer le fichier CSS pour les styles
import Footer from './Elements/Footer';
import Navbar from './Elements/Navbar';
import { useTranslation } from 'react-i18next';


const Apropos = () => {
  const { t,i18n } = useTranslation();
  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  }
    return (
      <div>
        <Navbar/>
     


     
        <div className="apropos-container apropos-background ">
          <div>
          <h1 className="apropos-title">{t("Title.abouT")}</h1> 
            <div className=" section-container">
              <section className="apropos-section">
                <h2>{t("Title.Decouvrir")}</h2>
                <p>{t("Paragraph.decouvert")}</p>
              </section>
            </div>
          </div>
          
          <div >
            <div className=" section-container1">
              <section className="apropos-section">
                <h2>{t("Title.objectif")}</h2>
                <p>{t("Paragraph.objectifsP")}</p>
                <ul className="white-bullets">
                  <li>{t("Paragraph.objectifsL1")}</li>
                  <li>{t("Paragraph.objectifsL2")}</li>
                  <li>{t("Paragraph.objectifsL3")}</li>
                  <li>{t("Paragraph.objectifsL4")}</li>
                </ul>
              </section>
            </div>
          </div>
          
          <div >
            <div className=" section-container">
              <section className="apropos-section">
                <h2>{t("Title.fonction")}</h2>
                <p>{t("Paragraph.fonctionP")}</p>
                <ul className="white-bullets">
                  <li>{t("Paragraph.fonctionL1")}</li>
                  <li>{t("Paragraph.fonctionL2")}</li>
                  <li>{t("Paragraph.fonctionL3")}</li>
                  <li>{t("Paragraph.fonctionL4")}</li>
                  <li>{t("Paragraph.fonctionL5")}</li>
                </ul>
              </section>
            </div>
            
          </div>
          <div >
            <div className=" section-container2">
              <section className="apropos-section">
                <h2>{t("Title.espace")}</h2>
                <p>{t("Paragraph.espaceP")}</p>
                <ul className="white-bullets">
                  <li>{t("Paragraph.espaceL1")}</li>
                  <li>{t("Paragraph.espaceL2")}</li>
                  <li>{t("Paragraph.espaceL3")}</li>
                  <li>{t("Paragraph.espaceL4")} </li>
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
