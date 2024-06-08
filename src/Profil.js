import React, { useState, useRef,useEffect } from 'react';
import profilImg from "./Assets/profile.png";
import Footer from './Elements/Footer';
import { Button, Input, Form } from 'antd';
import MenuIcon from "./Assets/menu.png";
import './Profil.css';
import { Link } from 'react-router-dom';
import ImgEdit from "./Assets/photo.png";
import MessageIcon from "./Assets/email.png";
import ChatBox from './Elements/ChatBox';
import deconIcon from "./Assets/decon.png";
import whitemenuIcon from "./Assets/wmenu.png";
import closeIcon from "./Assets/close.png";
import { useTranslation } from 'react-i18next';
import LanguagePopup from './Elements/LangSwitch';
import { useAuth } from './AuthContext';
import axios from 'axios';
function Profil() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedFullName, setEditedFullName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
  const [isMenuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { t, i18n } = useTranslation();
  const { TextArea } = Input;
  const { userId } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const handleRecipientEmailChange = (e) => {
    setRecipientEmail(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };



const handleSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:2000/send-email', {
      recipientEmail,
      subject,
      message,
    });

    if (response.status === 200) {
      console.log('Email sent successfully');
      setRecipientEmail('');
      setSubject('');
      setMessage('');
      setIsSendingMessage(false);
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const fetchUserInfo = async () => {
  try {
    const response = await axios.get(`http://localhost:2000/userInfo/${userId}`);
    const userData = response.data.data;
    setUserInfo(userData);
  } catch (error) {
    console.error('Erreur lors de la récupération des informations utilisateur :', error);
  }
};

const handleSavePhoto = async () => {
  if (selectedFile) {
    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    try {
      const response = await axios.post('http://localhost:2000/upload-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        console.log('Photo uploaded successfully');
        const newPhotoUrl = response.data.photoUrl; // Assurez-vous d'obtenir l'URL de la nouvelle photo depuis la réponse

        // Sauvegarde de l'URL de la nouvelle photo dans le stockage local
        localStorage.setItem('profileImage', newPhotoUrl);

        // Mettre à jour l'interface utilisateur pour refléter le changement
        setUserInfo(prevUserInfo => ({
          ...prevUserInfo,
          profileImage: newPhotoUrl // Mettez à jour l'URL de la photo dans l'état de userInfo
        }));
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  }
};

// Charger l'image de profil depuis le stockage local lors du chargement de la page
useEffect(() => {
  const storedProfileImage = localStorage.getItem('profileImage');
  if (storedProfileImage) {
    // Mettre à jour l'interface utilisateur avec l'image stockée localement
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      profileImage: storedProfileImage
    }));
  }
}, []);


useEffect(() => {
    fetchUserInfo();
  
}, []);

  const handleMessageIconClick = () => {
    setIsSendingMessage(true);
    setIsEditing(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setEditedFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEditedEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setEditedPassword(e.target.value);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setIsSendingMessage(false);
  };

 

  const handleEditClick = () => {
    inputRef.current.click();
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleSave = async () => {
    console.log(userId)
    try {
      const response = await axios.post('http://localhost:2000/update-user', {
        userId,
        editedName,
        editedFullName,
        editedEmail,
        editedPassword,
      });

      if (response.status === 200) {
        console.log('User information updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  return (
    <div className='profil'>
      <div className='Profilhead'>
        <img src={MenuIcon} alt="Profile" onClick={handleMenuToggle} />
        <div className="langBtn">
          <LanguagePopup toggleLang={toggleLang} />
        </div>
      </div>
      <div className={`ProfilCard ${isEditing ? 'editing' : ''} ${isSendingMessage ? 'sending-message' : ''}`}>
        <div className='ProfilImage'>
          <img src={profilImg} alt="Profile" />
          {isEditing && (
            <div className="EditIcon">
              <img src={ImgEdit} alt="Edit Icon" onClick={handleEditClick} />
            </div>
          )}
          {!isEditing && (
            <div className={`MessageIcon ${isEditing ? 'editing' : ''} ${isSendingMessage ? 'sending-message' : ''}`}>
              <img src={MessageIcon} alt="Message Icon" onClick={handleMessageIconClick} />
            </div>
          )}
          <h3>{userInfo["Username"]}</h3>
        </div>
        <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleFileSelect} />
        <div className='ProfilData'>
          <div className='Output'>
            <h4>{t("Tokens.fullName")}:</h4>
            <div className='MailOutput'>{userInfo["full name"]}</div>
          </div>
          <div className='Output'>
            <h4>Email :</h4>
            <div className='MailOutput'>{userInfo["email"]}</div>
          </div>
        </div>
        <Button className='Edit' onClick={toggleEditing}>
          {isEditing || isSendingMessage ? t("Btn.Annuler") : t("Btn.Modifier")}
        </Button>
      </div>
      {isEditing && (
        <div className='EditForm'>
          <h3>{t("Tokens.Infos")}</h3>
          <div className='ProfilInput'>
            <h5>{t("Tokens.userName")}</h5>
            <Input value={editedName} onChange={handleNameChange} placeholder="Nom d'utilisateur" />
          </div>
          <div className='ProfilInput'>
            <h5>{t("Tokens.fullName")}</h5>
            <Input value={editedFullName} onChange={handleFullNameChange} placeholder="Nom et Prénom" />
          </div>
          <div className='ProfilInput'>
            <h5>Email</h5>
            <Input value={editedEmail} onChange={handleEmailChange} placeholder="Email" />
          </div>
          <div className='ProfilInput'>
            <h5>Password</h5>
            <Input value={editedPassword} onChange={handlePasswordChange} type='password' />
          </div>
          <Button type="primary" onClick={handleSave} className='Save'>{t("Btn.Valider")}</Button>
        </div>
      )}

      {isMenuOpen && (
        <div className="side-menu">
          <div className="popIcons">
            <img className="popmenu" src={whitemenuIcon} alt="Menu Icon" onClick={handleMenuToggle} />
            <img className="closemenu" src={closeIcon} alt="Close Icon" onClick={handleMenuToggle} />
          </div>
          <div className='lineBar'></div>
          <h3 className='rub' style={{ textAlign: 'center' }}>{t("Menu.Rubrique")}</h3>
          <ul className='mats' style={{ paddingLeft: '20px' }}>
            <li className='rubMat-name'><Link to="/material">{t("Header.Mat")}</Link></li>
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
          <h3 className='rub' style={{ textAlign: 'center' }}>{t("Menu.Pages")}</h3>
          <Link className="pageLink" to="/">{t("navbar.accueil")}</Link>
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

      {isSendingMessage && (
        <div className='SendMessage'>
          <h3>{t("Tokens.EnvoyerMess")}</h3>
          <Form onFinish={handleSubmit}>
            <Form.Item name="recipientEmail" label={t("Tokens.Destinataire")}>
              <Input
                value={recipientEmail}
                onChange={handleRecipientEmailChange}
                placeholder={t("Tokens.DesPlc")}
              />
            </Form.Item>
            <Form.Item name="subject" label={t("Tokens.Objet")}>
              <Input
                value={subject}
                onChange={handleSubjectChange}
                placeholder={t("Tokens.ObjPlc")}
              />
            </Form.Item>
            <Form.Item name="message" label="Message">
              <TextArea
                value={message}
                onChange={handleMessageChange}
                placeholder={t("Tokens.mess")}
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </Form.Item>
            <Form.Item>
              <Button className="Edit" type="primary" htmlType="submit">{t("Btn.Envoyer")}</Button>
            </Form.Item>
          </Form>
        </div>
      )}
      <ChatBox />
      <Footer />
    </div>
  );
}

export default Profil;
