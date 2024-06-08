import React, { useState, useRef, useEffect } from 'react';
import './Interaction.css';
import './Categorie.css';
import Navbar from './Elements/Navbar';
import Footer from './Elements/Footer';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from "./Assets/icon.png";
import deconIcon from "./Assets/decon.png";
import closeIcon from "./Assets/close.png";
import whitemenuIcon from "./Assets/wmenu.png";

import { useTranslation } from 'react-i18next';
import { Typography, Input, Button, List, Avatar, Form, Card, Space } from 'antd';

const Interaction = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const messagesEndRef = useRef(null); // Définir la référence useRef
  const messageIdCounter = useRef(0);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  }

  const handleDeconnect = () => {
    navigate('/');
  };

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const newMessage = {
      id: messageIdCounter.current++,
      text: formValue,
      user: "currentUser",
      replies: [],
      parentId: replyTo
    };
    
    if (replyTo === null) {
      setMessages([...messages, newMessage]);
    } else {
      const updatedMessages = addReply(messages, replyTo, newMessage);
      setMessages(updatedMessages);
    }
  
    setFormValue('');
    setReplyTo(null);
  };
  
  // Fonction pour ajouter une réponse à un message parent
  const addReply = (msgs, parentId, newReply) => {
    return msgs.map(msg => {
      if (msg.id === parentId) {
        return {
          ...msg,
          replies: [...msg.replies, newReply]
        };
      } else if (msg.replies.length > 0) {
        return {
          ...msg,
          replies: addReply(msg.replies, parentId, newReply)
        };
      }
      return msg;
    });
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const renderMessages = (msgs, level = 0) => {
    return msgs.map(msg => (
      <div key={msg.id} style={{ ...styles.messageContainer, marginLeft: `${level * 20}px` }}>
        <ChatMessage message={msg} setReplyTo={setReplyTo} />
        {msg.replies.length > 0 && (
          <div style={styles.repliesContainer}>
            {renderMessages(msg.replies, level + 1)}
          </div>
        )}
      </div>
    ));
  };
  return (
    <div style={{ 
  
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh', // Assurez-vous que la hauteur de la div couvre toute la hauteur de la page
    }}>
      <Navbar/>
      <header style={styles.header}>
        <img src={MenuIcon} alt="Menu Icon" onClick={handleMenuToggle} style={styles.menuIcon} />
        <h1 style={styles.headerText}>{t("Title.espace")}</h1>
      </header>
   
      <div style={styles.container}>
      {isMenuOpen && (
        
        <div className="side-menu">
  <div className="popIcons">
    <img className="popmenu" src={whitemenuIcon} alt="Menu Icon" onClick={handleMenuToggle} />
    <img className="closemenu" src={closeIcon} alt="Close Icon" onClick={handleMenuToggle} />
  </div>
  <div className='lineBar'></div>
  <h3 className='rub' style={{textAlign: 'center' }}>{t("Menu.Rubrique")}</h3>
  <ul className='mats' style={{ paddingLeft: '20px' }}>
    <li className='rubMat-name' ><Link to="/material">{t("Header.Mat")}</Link></li>
    <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie1" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.MAT")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie2" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.MER")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie3" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Bois")}</Link>
</li>
    <li className='rubMat-name'><Link to="/produit">{t("Header.Prod")}</Link></li>
    <li className='rubMat-name'><Link to="/ouvrage">{t("Header.Ouv")}</Link></li>
    <li className='rubMat-name'><Link to="/pathologie">{t("Header.Path")}</Link></li>
    <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/biologique" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Biologique")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/chromatique-dépot" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Chd")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/déformation" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Déformation")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/détachement" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Détachement")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/fissure" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Fissure")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/perte de matière" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.PDM")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/autres" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Autres")}</Link>
</li>
    <li className='rubMat-name'><Link to="/monument">{t("Header.Monu")}</Link></li>
    </ul>
  <div className='lineBar'></div>
  <h3 className='rub'  style={{textAlign: 'center' }} >{t("Menu.Pages")}</h3>
  {/* Ajoutez vos liens du menu ici */}
  <Link className="pageLink" to="/userHome">{t("navbar.accueil")}</Link>
  <Link className="pageLink" to="/Graph">{t("navbar.graph")}</Link>
  <Link className="pageLink" to="/carte-geographique">{t("navbar.carteGeographique")}</Link>
  <Link className="pageLink" to="/recherche-avancee">{t("navbar.rechercheAvancee")}</Link>
  <Link className="pageLink" to="/a-propos">{t("navbar.aPropos")}</Link>
  <div className='lineDecBar'></div>
  <div className='Decon'>
    <img className="dec" src={deconIcon} alt="Decon Icon" onClick={handleDeconnect} />
    <a className='decLink' href="/lien2">{t("Menu.Deconnexion")}</a>
  </div>
</div>

      )}
        <div style={styles.chatContainer}>
          {renderMessages(messages)}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} style={styles.form}>
          {replyTo && (
            <div style={styles.replyingTo}>
              Réponde au  message ID: {replyTo}
              <button onClick={() => setReplyTo(null)} style={styles.cancelReplyButton}>{t("Btn.Annuler")}</button>
            </div>
          )}
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder=  {t("Tokens.TapeMess")}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>{t("Btn.Envoyer")}</button>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

const ChatMessage = ({ message, setReplyTo }) => {
  
  const { t, i18n } = useTranslation();
  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  }
  const handleReply = () => {
    setReplyTo(message.id);
  };

  return (
    <div style={styles.message}>
      <p style={styles.messageText}>{message.text}</p>
      <button onClick={handleReply} style={styles.replyButton}>{t("Tokens.Reply")}</button>
    </div>
  );
};

const styles = {
  
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop : '50px', 
    height: '60vh',
    width: '100%',
    maxWidth: '90%',
    margin: '0 auto',
    border: '2px solid #2C3E50',
    borderRadius: '8px',
    overflow: 'hidden',
    
   
  },
  header: {
    backgroundColor: '#ffffff',
    padding: '10px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
 
  },
  headerText: {
    color: '#000000',
    margin: 0,
    flex: 1,
  },
  menuIcon: {
    cursor: 'pointer',
  },
  sideMenu: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '250px',
    height: '100%',
    backgroundColor: '#333',
    color: '#fff',
    zIndex: 1000,
    padding: '20px',
  },
  popIcons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  popmenu: {
    cursor: 'pointer',
  },
  closemenu: {
    cursor: 'pointer',
  },
  lineBar: {
    height: '1px',
    backgroundColor: '#fff',
    margin: '10px 0',
  },
  menuTitle: {
    textAlign: 'center',
  },
  menuList: {
    listStyle: 'none',
    padding: 0,
  },
  menuItem: {
    padding: '10px 0',
  },
  pageList: {
    listStyle: 'none',
    padding: 0,
  },
  pageItem: {
    padding: '10px 0',
  },
  lineDecBar: {
    height: '1px',
    backgroundColor: '#fff',
    margin: '10px 0',
  },
  decon: {
    display: 'flex',
    alignItems: 'center',
  },
  dec: {
    cursor: 'pointer',
    marginRight: '10px',
  },
  decLink: {
    color: '#fff',
    textDecoration: 'none',
  },
  chatContainer: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
  },
  form: {
    display: 'flex',
    borderTop: '1px solid #2C3E50',
    padding: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #2C3E50',
    borderRadius: '4px',
    marginRight: '10px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#6200ea',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  message: {
    marginBottom: '10px',
  },
  messageText: {
    margin: 0,
    padding: '10px',
    border: '1px solid #2C3E50',
    borderRadius: '2px ',
    backgroundColor: '#f1f1f1',
  },
  reply: {
    marginTop: '5px',
    fontSize: '0.8em',
    color: '#888',
  },
  repliesContainer: {
    marginLeft: '20px', // Ajoute une marge à gauche pour l'indentation des réponses
    borderLeft: '2px solid #ddd', // Ajoute une bordure à gauche pour marquer l'indentation
    paddingLeft: '10px', // Ajoute un padding à gauche pour l'indentation
  },
  replyButton: {
    marginTop: '5px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#6200ea',
    cursor: 'pointer',
  }
};



export default Interaction;

