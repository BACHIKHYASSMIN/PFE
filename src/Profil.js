import React, { useState, useRef,useEffect } from 'react';
import profilImg from "./Assets/profile.png";
import Footer from './Elements/Footer';
import { Button, Input, Form } from 'antd';
import MenuIcon from "./Assets/menu.png";
import './Profil.css';
import { Link } from 'react-router-dom';
import ImgEdit from "./Assets/photo.png";
import MessageIcon from "./Assets/email.png";
import ArrowIcon from "./Assets/down-arrow.png"
import ChatBox from './Elements/ChatBox';
import deconIcon from "./Assets/decon.png";
import whitemenuIcon from "./Assets/wmenu.png";
import closeIcon from "./Assets/close.png";
import { useTranslation } from 'react-i18next';
import LanguagePopup from './Elements/LangSwitch';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Profil() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedFullName, setEditedFullName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
  const inputRef = useRef(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [filterMenuOpen, setFiltMenuOpen] = useState(null); 
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { TextArea } = Input;
  const { userId, updateProfileImage } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [image,setImage]=useState(null);
  const { logout } = useAuth();
  const handleRecipientEmailChange = (e) => {
    setRecipientEmail(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFiltMenuToggle = (menuType) => {
    if (filterMenuOpen === menuType) {
      setFiltMenuOpen(null); // Fermer le menu si déjà ouvert
    } else {
      setFiltMenuOpen(menuType); // Ouvrir le menu correspondant
    }
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
    const response = await axios.get(`http://localhost:5000/userInfo/${userId}`);
    const userData = response.data.data;
    setUserInfo(userData);
    const userImage=response.data.data.image.data
    const buffer = new Uint8Array(userImage);
    const blob = new Blob([buffer], { type: 'image/jpeg' }); // Changez le type si nécessaire
    const imageUrl = URL.createObjectURL(blob);
    setImage(imageUrl)
  } catch (error) {
    console.error('Erreur lors de la récupération des informations utilisateur :', error);
  }
};





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

  const navigate = useNavigate();

  const handleEditClick = () => {
    inputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Preview the image immediately
    

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    updateProfileImage(imageUrl);
  };
  // Automatically save when selectedFile changes
  useEffect(() => {
    if (selectedFile) {
      handleSave();
    }
  }, [selectedFile]);

  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  
  const handleDeconnect = () => {
    logout(); // Déconnexion de l'utilisateur
    navigate('/'); // Redirection vers la page d'accueil
  };
  
  const handleSave = async () => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('editedName', editedName);
    formData.append('editedFullName', editedFullName);
    formData.append('editedEmail', editedEmail);
    formData.append('editedPassword', editedPassword);
    if (selectedFile) {
      formData.append('profileImage', selectedFile);
    }
  
    try {
      const response = await axios.post('http://localhost:5000/update-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        console.log('User information updated successfully');
        // Convert the updated image to a URL and update the context
        await fetchUserInfo();
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
        {image && <img  style={{backgroundColor:'white', borderRadius: '50%' }} src={image} alt="Profile" />}
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
        <div className="sideProfil-menu">
          <div className="popIcons">
            <img className="popmenu" src={whitemenuIcon} alt="Menu Icon" onClick={handleMenuToggle} />
            <img className="closemenu" src={closeIcon} alt="Close Icon" onClick={handleMenuToggle} />
          </div>
          <div className='lineBar'></div>
          <h3 className='rub' style={{ textAlign: 'center' }}>{t("Menu.Rubrique")}</h3>
          <ul className='mats' style={{ paddingLeft: '20px' }}>
            <li className='rubMat-name'>
            <div className='MenuCat'>
              <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={() => handleFiltMenuToggle(t("Header.Mat"))}  />
           <Link to="/material">{t("Header.Mat")}</Link>
          </div>
          </li>
          {filterMenuOpen === t("Header.Mat") && (
            <>
            <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <Link to="/categorie1" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.MAT")}</Link>
            </li>
            <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <Link to="/categorie2" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.MER")}</Link>
            </li>
            <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
              <Link to="/categorie3" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Bois")}</Link>
            </li>
            </>
          )}
            <li className='rubMat-name'><Link to="/produit">{t("Header.Prod")}</Link></li>
            <li className='rubMat-name'><Link to="/ouvrage">{t("Header.Ouv")}</Link></li>
            <li className='rubMat-name'>
            <div className='MenuCat'>
              <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={() => handleFiltMenuToggle(t("Header.Path"))}  />
           <Link to="/pathologie">{t("Header.Path")}</Link>
          </div>
              </li>
              {filterMenuOpen === t("Header.Path") && (
                <>
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
            </>
              )}
            <li className='rubMat-name'><Link to="/monument">{t("Header.Monu")}</Link></li>
          </ul>
          <div className='lineBar'></div>
          <h3 className='rub' style={{ textAlign: 'center' }}>{t("Menu.Pages")}</h3>
          <Link className="pageLink" to="/acceuil">{t("navbar.accueil")}</Link>
          <Link className="pageLink" to="/Graph">{t("navbar.graph")}</Link>
          <Link className="pageLink" to="/carte-geographique">{t("navbar.carteGeographique")}</Link>
          <Link className="pageLink" to="/recherche-avancee">{t("navbar.rechercheAvancee")}</Link>
          <Link className="pageLink" to="/a-propos">{t("navbar.aPropos")}</Link>
          <div className='lineDecBar'></div>
          <div className='Decon'>
    <img className="dec" src={deconIcon} alt="Decon Icon" onClick={handleDeconnect} />
    <a className='decLink' onClick={handleDeconnect} >{t("Menu.Deconnexion")}</a>
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
    
    </div>
  );
}

export default Profil;
