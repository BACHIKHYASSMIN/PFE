import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Elements/Navbar';
import Footer from './Elements/Footer';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import MenuIcon from "./Assets/icon.png";
import { Link, useNavigate } from 'react-router-dom';
import deconIcon from "./Assets/decon.png";
import whitemenuIcon from "./Assets/wmenu.png";
import closeIcon from "./Assets/close.png";
import menuIcon from "./Assets/icon.png";

const Interaction = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const messagesEndRef = useRef(null);
  const { t } = useTranslation();
  const messageIdCounter = useRef(1); // Utilisé pour générer des IDs uniques

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/messages');
      const messages = response.data;
      const structuredMessages = structureMessages(messages);
      setMessages(structuredMessages);
    } catch (error) {
      console.error('Erreur lors de la récupération des messages :', error);
    }
  };

  const structureMessages = (messages) => {
    const messageMap = {};
    const structuredMessages = [];

    messages.forEach((message) => {
      messageMap[message.id] = { ...message, replies: [] };
    });

    messages.forEach((message) => {
      if (message.parentID === 0) {
        structuredMessages.push(messageMap[message.id]);
      } else if (messageMap[message.parentID]) {
        messageMap[message.parentID].replies.push(messageMap[message.id]);
      }
    });

    return structuredMessages;
  };

  const sendMessagesToServer = async (newMessage) => {
    try {
      const response = await axios.post('http://localhost:2000/api/messages', {
        message: newMessage.text,
        parentId: newMessage.parentId,
        localId: newMessage.id
      });
  
      const serverMessage = { ...newMessage, id: response.data.id }; // Mettre à jour l'ID et autres données retournées par le serveur
  
      // Mettre à jour l'état des messages après l'ajout du nouveau message
      const updatedMessages = [...messages, serverMessage];
      setMessages(structureMessages(updatedMessages));
  
      // Optionnel : récupérer à nouveau les messages après mise à jour
      fetchMessages();
  
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message au serveur :', error);
    }
  };
  

  const sendMessage = async (e) => {
    e.preventDefault();

    let level = 0;
    if (replyTo !== null) {
      const repliedMessage = messages.find(msg => msg.id === replyTo);
      if (repliedMessage) {
        level = repliedMessage.level + 1; // Calcul du niveau de profondeur
      }
    }

    const newMessage = {
      id: messageIdCounter.current++, // ID unique (local)
      text: formValue,
      user: "currentUser",
      parentId: replyTo !== null ? replyTo : 0, // Utiliser l'ID réel du parent dans la base de données
      level: level // Utilisation du niveau calculé
    };

    // Envoyer le message au serveur
    try {
      await sendMessagesToServer(newMessage);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message au serveur :', error);
      return; // Arrêter l'exécution si une erreur se produit
    }

    // Effacer le formulaire et réinitialiser la réponse
    setFormValue('');
    setReplyTo(null);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const renderMessages = (messages, level = 0) => {
    return messages.map((message) => (
      <div key={message.id} style={{ marginLeft: `${level * 20}px`, marginBottom: '10px' }}>
        <div style={{ ...styles.message, ...styles.card }}>
          <p style={styles.messageText}>{message.message}</p>
          <button onClick={() => setReplyTo(message.id)} style={styles.replyButton}>{t("Tokens.Reply")}</button>
        </div>
        {message.replies && message.replies.length > 0 && renderMessages(message.replies, level + 1)}
      </div>
    ));
  };

  return (
    <div style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
    }}>
      <Navbar />
      <header style={styles.header}>
        <img src={MenuIcon} alt="Menu Icon" onClick={handleMenuToggle} style={styles.menuIcon} />
        <h1 style={styles.headerText}>{t("Title.espace")}</h1>
      </header>
      <div style={styles.container}>
        {isMenuOpen && (
          <div className="side-menu">
            {/* Contenu du menu */}
          </div>
        )}
        <div style={styles.chatContainer}>
          {messages.length > 0 ? (
            renderMessages(messages)
          ) : (
            <p>Aucun message à afficher.</p>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} style={styles.form}>
          {replyTo && (
            <div style={styles.replyingTo}>
              Répondre au message ID: {replyTo}
              <button onClick={() => setReplyTo(null)} style={styles.cancelReplyButton}>{t("Btn.Annuler")}</button>
            </div>
          )}
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder={t("Tokens.TapeMess")}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>{t("Btn.Envoyer")}</button>
        </form>
      </div>
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
  <Link to="/déformation" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Deformation")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/détachement" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Detachment")}</Link>
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
    <img className="dec" src={deconIcon} alt="Decon Icon" onClick={handleMenuToggle} />
    <a className='decLink' href="/lien2">{t("Menu.Deconnexion")}</a>
  </div>
</div>

      )}
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '50px',
    height: '80vh',
    width: '100%',
    maxWidth: '98%',
    margin: '0 auto',
    border: '2px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#ECF0F1',
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
  chatContainer: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
  },
  form: {
    display: 'flex',
    borderTop: '1px solid #ddd',
    padding: '10px',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    marginRight: '10px',
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#2C3E50',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  replyButton: {
    marginTop: '5px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#34B7F1',
    cursor: 'pointer',
  },
  replyingTo: {
    marginBottom: '10px',
    backgroundColor: '#fff',
    padding: '5px 10px',
    borderRadius: '20px',
    color: '#075E54',
  },
  cancelReplyButton: {
    marginLeft: '10px',
    padding: '2px 5px',
    backgroundColor: '#f8d7da',
    color: '#842029',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    marginBottom: '12px',
    padding: '10px',
    borderRadius: '8px',
    maxWidth: '98%',
    wordWrap: 'break-word',
    position: 'relative',
  },
  card: {
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    borderRadius: '10px',
  },
  messageText: {
    margin: 0,
  },

};

export default Interaction;