import React, { useState, useEffect } from 'react';
import './Interaction.css';
import './Categorie.css';
import Navbar from './Elements/Navbar';
import Footer from './Elements/Footer';
import { Link } from 'react-router-dom';
import MenuIcon from "./Assets/menu.png";
import deconIcon from "./Assets/decon.png"
import closeIcon from "./Assets/close.png"
import whitemenuIcon from "./Assets/wmenu.png"
import { useTranslation } from 'react-i18next';
const Interaction = () => {
  const [message, setMessage] = useState('');
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { t,i18n } = useTranslation();
  const [messages, setMessages] = useState([
    { message: 'Message 1', reply: false },
    { message: 'Message 2', reply: false },
    { message: 'Message 3', reply: false },
  ]);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyIndex, setReplyIndex] = useState(null);

  const sendMessage = (e) => {
    e.preventDefault();
    setMessages([...messages, { message: replyMessage, reply: false }]);
    setReplyMessage('');
    setReplyIndex(null);
  };

  const replyToMessage = (index) => {
    setReplyIndex(index);
  };

  const handleReplyChange = (e) => {
    setReplyMessage(e.target.value);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <Navbar />
      <header>
        <div className="Interactionhead">
          <img src={MenuIcon} alt="InteractionPage" onClick={handleMenuToggle} />
        </div>
      </header>
      <div className="background">
  <div className="interaction">
    <h1>{t("Title.espace")}</h1>
    <div className="flex-container">
      <div className="messages">
        <h2>Messages</h2>
        {/* Affichage de la liste des messages */}
        {messages.map((message, index) => (
          <div key={index} className="message">
            <p>{message.message}</p>
            {/* Bouton pour répondre au message */}
            {!message.reply && (
              <button onClick={() => replyToMessage(index)}>{t("Btn.Repondre")}</button>
            )}
            {/* Formulaire pour répondre au message */}
            {replyIndex === index && (
              <form onSubmit={sendMessage}>
                <input
                  type="text"
                  value={replyMessage}
                  onChange={handleReplyChange}
                />
                <button type="submit">{t("Btn.Envoyer")}</button>
              </form>
            )}
          </div>
        ))}
      </div>
  <div className="vertical-divider"></div>
      {/* Formulaire pour envoyer un nouveau message */}
      
      <form onSubmit={sendMessage} className="send-message-form" >
        <input 
          type="text"
          value={replyMessage}
          onChange={handleReplyChange}
          placeholder={t("Tokens.EnvoyerMess")}
        />
        <button type="submit" className="send-button">{t("Btn.Envoyer")}</button>
      </form>
    </div>
  </div>
</div>

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
      <Footer />
      </div>
      
  );
};

export default Interaction;
