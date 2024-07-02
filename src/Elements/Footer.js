import React from "react";
import location from "../Assets/location.png"
import mail from "../Assets/mail.png"
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
    <div className="LogoName"> <h3>NUMERIQUEMATERIALS</h3></div> 
    <div className="Pages">
        <ul className="footer-links">
            <li><a href="/">{t("navbar.accueil")}</a></li>
            <li><a>{t("navbar.classes")}</a></li>
            <li><a href="/graph">{t("navbar.graph")}</a></li>
            <li><a href="/carte-geographique">{t("navbar.carteGeographique")}</a></li>
            <li><a href="/recherche-avancee">{t("navbar.rechercheAvancee")}</a></li>
            <li><a href="/a-propos">{t("navbar.aPropos")}</a></li>
        </ul>
    </div>
    <div className="Contact">
    <div className="Location ">
        <img src={location}/>
        <p className="locName">{t("Footer.localosation")}</p>
    </div>
    <div className="Email">
    <img src={mail}/>
        <p className="mailAdr">materialslibrary85@gmail.com</p> 
    </div>
    </div>
    <div className="Contact">
    <div className="Location ">
    <p className="locName">{t("Footer.ENcadrement")}</p> 
    <p className="locName">Khouri Selma </p> 
    <p className="locName">Oufaida Houda</p> 
    </div>
    </div>
    <div className="Contact">
    <div className="Location ">
    <p className="locName">{t("Footer.Realisation")}</p> 
    <p className="locName">Bachikh Yassmin</p> 
    <p className="locName">Belmrabet Izdihar</p> 
    </div>
    </div>
    <div className="Right">
        <p> {t("Footer.Droits")} © [2024] </p>
        </div>
</div>
  );
}

export default Footer;
