import React from "react";
import location from "../Assets/location.png"
import mail from "../Assets/mail.png"
import "./Footer.css"
import Class from '../App';
function Footer() {
  return (
  
  <div className="Footer">
    <div className="LogoName"> <h3>NUMERIQUEMATERIALS</h3></div> 
    <div className="Pages">
        <ul className="footer-links">
            <li><a href="/">Acceuil</a></li>
            <li><a>Classes</a></li>
            <li><a href="/graph">Graph</a></li>
            <li><a href="/carte-geographique">Carte Geographique</a></li>
            <li><a href="/recherche-avancee">Recherche Avancé</a></li>
            <li><a href="/a-propos">A propos</a></li>
                 
        </ul>
    </div>
    <div className="Contact">
    <div className="Location ">
        <img src={location}/>
        <p className="locName">El harrach,Alger,Algérie</p>
    </div>
    <div className="Email">
    <img src={mail}/>
        <p className="mailAdr">materialslibrary85@gmail.com</p> 
    </div>
    </div>
    <div className="Contact">
    <div className="Location ">
    <p className="locName">Encadré par :</p> 
    <p className="locName">ENS Khouri Selma </p> 
    <p className="locName">ENS Oufaida Houda</p> 
    </div>
    </div>
    <div className="Contact">
    <div className="Location ">
    <p className="locName">Réalisé par :</p> 
    <p className="locName">Bachikh Yassmin</p> 
    <p className="locName">Belmrabet Izdihar</p> 
    </div>
    </div>
    <div className="Right">
        <p> Tous droits réservés © [2024] </p>
        </div>
</div>
  );
}

export default Footer;
