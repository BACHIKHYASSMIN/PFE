import React from "react";
import location from "../Assets/location.png"
import Logo from "../Assets/LogoBg.png"
import call from "../Assets/telephone.png"
import mail from "../Assets/arroba.png"
import web from "../Assets/web.png"
import gps from "../Assets/gps.png"
import EPAUVAP from "../Assets/epau-vap.jpeg"
import ESILCSI from "../Assets/esi-lcsi.png"
import "./Footer.css"
import Class from '../App';
import { useTranslation } from 'react-i18next';
function Footer() {
    const { t,i18n } = useTranslation();
  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  }
  
  return (
  
  <div className="Footer">
    <div className="colomn1">
    <div className="LogoSection">
      <img  className="LogoImg"src={Logo}/>
      <p className="DescriptionApp">{t("Footer.descriptions")}</p>
    </div>
    <div className="BarVertical"/>
    <ul className="footer-links">
    <li><a href="/">{t("navbar.accueil")}</a></li>
    <li><a>{t("navbar.classes")}</a></li>
    <li><a href="/graph">{t("navbar.graph")}</a></li>
    <li><a href="/carte-geographique">{t("navbar.carteGeographique")}</a></li>
    <li><a href="/recherche-avancee">{t("navbar.rechercheAvancee")}</a></li>
    <li><a href="/a-propos">{t("navbar.aPropos")}</a></li>
    </ul>
    <div className="BarVertical"/>
    <ul className="footer-usefulLinks">
    <li><h3>{t("Footer.usfulLinks")}</h3></li>
    <li><a href="http://www.m-culture.gov.dz/index.php/fr/" target="_blank">www.m-culture.gov.dz/index.php/fr/</a></li>
    <li><a href="https://whc.unesco.org/en/statesparties/dz" target="_blank">whc.unesco.org/en/statesparties/dz</a></li>
    <li><a href="https://www.ogebc.dz/index.php/fr/" target="_blank">www.ogebc.dz/index.php/fr/</a></li>
    <li><a href="https://cnra.dz/" target="_blank">cnra.dz/</a></li>
    <li><a href="https://turathi.dz/" target="_blank">turathi.dz/</a></li>
    <li><a href="https://www.patrimoineculturelalgerien.com/" target="_blank">www.patrimoineculturelalgerien.com/</a></li>
    <li><a href="https://www.ppca.dz/" target="_blank">www.ppca.dz/</a></li>
    </ul>
    <div className="BarVertical"/>
    <div className="ContactSection">
    <h3>{t("Footer.contact")}</h3>
      <ul className="footer-contacts">
    <li ><img  className="Icons"src={call}/><span >+213 000000000 </span></li>
    <li><img  className="Icons"src={mail}/><a >tarmeem1.0@gmail.com </a></li>
    <li><img  className="Icons"src={gps}/><span > ...............</span></li>
    <li><img  className="Icons"src={web}/><div className="IconsLinks"><a href="https://www.epau-alger.edu.dz/fr/" > www.epau-alger.edu.dz/fr/</a><a href="https://www.esi.dz/" > www.esi.dz/</a></div></li>
  
    </ul>
    </div>
    </div>
    <div className="colomn2">
    <p className="Rights" style={{color:'white'}}><span style={{fontWeight:"bold",color:'white'}}>TARMEEM </span>,{t("Footer.Droits")}.2024.</p>
    <div className="Organisme"><img   src={EPAUVAP}/><img src={ESILCSI}/></div>
    <div className="Equipe">
    <ul className="EquipeNames"><li >{t("Footer.Promoteur")}</li><li >Kacher Sabrina</li><li> Allaouchiche Sara</li></ul>
    <ul className="EquipeNames"><li >{t("Footer.Promoteur")}</li><li>Kacher Sabrina</li><li > Allaouchiche Sara</li></ul>
    <ul className="EquipeNames"><li >{t("Footer.Realisation")}</li><li>Bachikh Yassmin</li><li >Belmrabet Izdihar</li></ul>
    <ul className="EquipeNames"><li >{t("Footer.ENcadrement")}</li><li >Khouri Selma</li><li >Oufaida Houda</li></ul>
    </div>
    </div>
</div>
  );
}

export default Footer;
