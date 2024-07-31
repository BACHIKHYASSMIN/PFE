// À propos de NumeriqueMaterials

import React from 'react';
import './Apropos.css'; // Importer le fichier CSS pour les styles
import Footer from './Elements/Footer';
import Navbar from './Elements/Navbar';
import { useTranslation } from 'react-i18next';
import { CiSearch } from "react-icons/ci";
import objectif from './Assets/objectif.png'
import feature from './Assets/feature.png'
import interact from './Assets/ecran-tactile.png'

const Apropos = () => {
  const { t,i18n } = useTranslation();
  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  }

    return (
      <div>
        <Navbar/>
        <div className='Container'>
        <div className='Header'>
        <p className="AboutDescription"><span style={{fontWeight:'bold',color:'white'}}>{t("Title.Name")} </span>{t("Paragraph.decouvert")}</p>
          </div>
          <div className="section-container">
         
                <p style={{marginLeft:'0%'}}><span style={{color:'#2C3E50', fontSize:'40px'}} >{t("Title.Decouvrir")}</span> 
                <span style={{color:'white ', fontSize:'40px',fontWeight:'bold'}} >{t("Title.Name")}</span></p>
                <p style={{width:'50%',fontSize:'20px',marginLeft:'2%'}}>{t("Paragraph.decouvert")}</p>
           
            </div>

            <div className="section2-container" >
            <p style={{marginLeft:'3%'}} >
        {(() => {
          return (
            <>
              <span style={{ color: 'white', fontSize: '40px' }}>{t("Title.objectif").split(' ')[0]}</span><span style={{ color: '#F39C12', fontSize: '40px' }}>  {t("Title.objectif").split(' ')[1]}  {t("Title.objectif").split(' ')[2]}</span>
            </>
          );
        })()}
      </p>
      <div >
      <p style={{color:'white',fontSize:'26px'}}>{t("Paragraph.objectifsP")}</p>
                <ul className="white-bullets" style={{color:'white',width:'110%'}}>
                  <li style={{display:'flex'}}><img  style={{marginRight:'2%'}} src={objectif}/>{t("Paragraph.objectifsL1")}</li>
                  <li style={{display:'flex'}}><img style={{marginRight:'2%'}} src={objectif}/>{t("Paragraph.objectifsL2")}</li>
                  <li style={{display:'flex'}} ><img style={{marginRight:'2%'}}src={objectif}/>{t("Paragraph.objectifsL3")}</li>
                  <li style={{display:'flex'}}><img style={{marginRight:'2%'}} src={objectif}/>{t("Paragraph.objectifsL4")}</li>
                </ul>
      </div>
                
              </div>
              <div className="section3-container" >
              <p style={{marginLeft:'10%',width:'400px'}}>
       
              <span style={{ color: '#2C3E50', fontSize: '40px' }}>{t("Title.fonction").split(' ')[0]}</span><span style={{ color: 'white', fontSize: '40px' }}>  {t("Title.fonction").split(' ')[1]}  {t("Title.fonction").split(' ')[2]}</span>
      </p>
      <div >
                <p style={{color:'black',fontSize:'26px',marginLeft:'23%'}} >{t("Paragraph.fonctionP")}</p>
                <ul className="white-bullets" style={{color:'black',width:'80%',marginLeft:'15%'}}>
                  <li style={{display:'flex'}}><img  style={{marginRight:'1%'}} src={feature}/>{t("Paragraph.fonctionL1")}</li>
                  <li style={{display:'flex'}}><img  style={{marginRight:'1%'}} src={feature}/>{t("Paragraph.fonctionL2")}</li>
                  <li style={{display:'flex'}}><img  style={{marginRight:'1%'}} src={feature}/>{t("Paragraph.fonctionL3")}</li>
                  <li style={{display:'flex'}}><img  style={{marginRight:'1%'}} src={feature}/>{t("Paragraph.fonctionL4")}</li>
                  <li style={{display:'flex'}}><img  style={{marginRight:'1%'}} src={feature}/>{t("Paragraph.fonctionL5")}</li>
                </ul>
                </div>
              </div>
              <div className="section4-container">
              <p style={{marginLeft:'10%',width:'500px'}}>
       
       <span style={{ color: 'white', fontSize: '40px' }}>{t("Title.espace").split(' ')[0]}</span><span style={{ color: '#F39C12', fontSize: '40px' }}>  {t("Title.espace").split(' ')[1]}  {t("Title.espace").split(' ')[2]}</span>
</p>
<div >
                <p style={{color:'white',fontSize:'22px',width:'80%',marginLeft:'15%'}} >{t("Paragraph.espaceP")}</p>
                <ul className="white-bullets" style={{color:'white',marginLeft:'15%'}}>
                  <li style={{display:'flex'}}><img  style={{marginRight:'1%'}} src={interact}/>{t("Paragraph.espaceL1")}</li>
                  <li style={{display:'flex'}}><img  style={{marginRight:'1%'}} src={interact}/>{t("Paragraph.espaceL2")}</li>
                  <li style={{display:'flex'}}><img  style={{marginRight:'1%'}} src={interact}/>{t("Paragraph.espaceL3")}</li>
                  <li style={{display:'flex'}}><img  style={{marginRight:'1%'}} src={interact}/>{t("Paragraph.espaceL4")} </li>
               </ul>
               </div>
            </div>
            </div>
        
        
        <Footer />
      </div>
    );
  }
  

  
    
export default Apropos;
