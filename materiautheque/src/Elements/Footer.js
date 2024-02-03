import React from "react";
import location from "../Assets/location.png"
import mail from "../Assets/mail.png"
import "./Footer.css"
import Class from '../Class';
function Footer() {
  return (
    <div className="Footer">
    <div className="LogoName"> <h3>NUMERIQUEMATERIALS</h3></div> 
    <div className="Pages">
        <ul>
            <li><a>Acceuil</a></li>
            <li><a>Classes</a></li>
            <li><a>Graph</a></li>
            <li><a>Carte Geographique</a></li>
            <li><a>Recherche Avancé</a></li>
            <li><a>A propos</a></li>
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
    
    <div className="Right">
        <p>ALL RIGHTS PRESERVED</p>
        </div>
</div>
  );
}

export default Footer;
