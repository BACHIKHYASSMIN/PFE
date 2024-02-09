import React, { useState, useRef } from 'react';
import profilImg from "./Assets/profile.png";
import Footer from './Elements/Footer';
import { Button, Input , Form } from 'antd';
import MenuIcon from "./Assets/menu.png";
import './Profil.css';
import { Link } from 'react-router-dom';
import deconIcon from "./Assets/decon.png"
import whitemenuIcon from "./Assets/wmenu.png"
import closeIcon from "./Assets/close.png"
import ImgEdit from "./Assets/photo.png"
import MessageIcon from "./Assets/email.png"

function Profil() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [isMenuOpen, setMenuOpen ] = useState(false);
  const inputRef = useRef(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false); 
  const [recipientEmail, setRecipientEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { TextArea } = Input;
  const handleRecipientEmailChange = (e) => {
    setRecipientEmail(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    
    console.log('Adresse e-mail du destinataire :', recipientEmail);
    console.log('Objet du message :', subject);
    console.log('Contenu du message :', message);
   
    setRecipientEmail('');
    setSubject('');
    setMessage('');
  };
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEditedEmail(e.target.value);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
   
  };

  const handleSave = () => {
   
    setIsEditing(false);

  
    setEditedName('');
    setEditedEmail('');
  };

  const handleEditClick = () => {
   
    inputRef.current.click();
  };

 
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
  
  };

  const handleMessageIconClick = () => {
    setIsSendingMessage(true); 
  };

  return (
    <div className='profil'>
      <div className='Profilhead'>
      <img src={MenuIcon} alt="Profile"  on onClick={handleMenuToggle} />
      </div>
      <div className={`ProfilCard ${isEditing ? 'editing' : ''} ${isSendingMessage ? 'sending-message' : ''}`}>
        <div className='ProfilImage'>
          <img src={profilImg} alt="Profile" />
          {isEditing && ( 
            <div className="EditIcon">
              <img src={ImgEdit} alt="Edit Icon" onClick={handleEditClick}/>
            </div>
          )}
          {!isEditing && ( 
  <div className={`MessageIcon  ${isEditing ? 'editing' : ''} ${isSendingMessage ? 'sending-message' : ''}`}>
    <img src={MessageIcon} alt="Message Icon" onClick={handleMessageIconClick} />
  </div>
  )}
          <h3>Nom Utilisateur</h3>
        </div>
        <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleFileSelect} />
        <div className='ProfilData'>
          <div className='Output'>
            <h4>Nom Et Prenom :</h4>
            <div className='MailOutput'>Nom Complet</div>
          </div>
          <div className='Output'>
            <h4>Email :</h4>
            <div className='MailOutput'>example@gmail.com</div>
          </div>
        </div>
        <Button className='Edit' onClick={toggleEditing}>
          {isEditing ? 'Annuler' : 'Modifier'}
        </Button>
      </div>
      {isEditing && (
        <div className='EditForm'>
           <h3>Informations Personelle</h3>
           <div className='ProfilInput'>
           <h5>Nom d'utilisateur</h5>
           <Input value={editedName} onChange={handleNameChange} placeholder="Nom d'utilisateur" />
           </div>

           <div className='ProfilInput'>
           <h5>Nom Complete</h5>
           <Input value={editedName} onChange={handleNameChange} placeholder="Nom et Prenom" />
           </div>

           <div className='ProfilInput'>
           <h5>Email</h5>
           <Input value={editedName} onChange={handleNameChange} placeholder="Email" />
           </div>

           <div className='ProfilInput'>
           <h5>Password</h5>
           <Input value={editedName} onChange={handleNameChange} type='password' />
           </div>
          <Button type="primary" onClick={handleSave} className='Save'>Valider</Button>
        </div>
      )}


  
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
  <Link className="pageLink" to="/">Accueil</Link>
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


{isSendingMessage && ( 
        <div className='SendMessage'>
          
          <h3>Envoyer un message </h3>
          <Form onFinish={handleSubmit}>
      <Form.Item name="recipientEmail" label="Destinataire">
        <Input
          value={recipientEmail}
          onChange={handleRecipientEmailChange}
          placeholder="Adresse e-mail du destinataire"
        />
      </Form.Item>
      <Form.Item name="subject" label="Objet">
        <Input
          value={subject}
          onChange={handleSubjectChange}
          placeholder="Objet du message"
        />
      </Form.Item>
      <Form.Item name="message" label="Message">
        <TextArea
          value={message}
          onChange={handleMessageChange}
          placeholder="Contenu du message"
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
      </Form.Item>
      <Form.Item>
          <Button  className="Edit" type="primary" onClick={() => setIsSendingMessage(false)}>Fermer</Button>
          </Form.Item>
    </Form>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Profil;
