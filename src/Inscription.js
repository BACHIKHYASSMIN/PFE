import './Inscription.css';
import axios from 'axios';
import React, { useState, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import Connexion from './Connexion';
import { useNavigate , Link} from 'react-router-dom';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import lang from './Assets/lang.png'
const Inscription = ({ onClose }) => {
  const vantaRef = useRef(null);
  const { t, i18n } = useTranslation();
  
  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  };
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showConnexion, setShowConnexion] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
   // Définir des états pour stocker les valeurs des champs de formulaire
   const [nomComplet, setNomComplet] = useState('');
   const [email, setEmail] = useState('');
   const [motDePasse, setMotDePasse] = useState('');
   const [affiliation, setAffiliation] = useState('');
  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async () => {
    setLoading(true); // Activer le chargement

    try {
      // Envoyer une requête POST à votre API côté serveur pour traiter l'inscription
      const response = await axios.post('http://localhost:5000/api/register', {
        nomComplet,
        email,
        motDePasse
      });
      console.log(response.data); // Afficher la réponse de l'API

      // Réinitialiser les champs de formulaire après la soumission réussie
      setNomComplet('');
      setEmail('');
      setMotDePasse('');
      message.error('l\'inscription est réussit'); 
      setShowConnexion(true); // Afficher la carte de connexion

    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      message.error('Erreur lors de l\'inscription'); 
    } finally {
      setLoading(false); // Désactiver le chargement
    }
  };


  const Inscrire = () => {
    navigate('/material');
  }

  return (
    <>
    {<div className="inscription-overlay"></div>}
      {<div className="inscription-background"></div>}
    <div className="inscription-modal" style={{ textAlign: 'center', padding: '40px', margin: '10px' }}>
    <div style={{position:'absolute',top:'5%',left:'79%'}}>
        <img 
        className="navbar-imgL" 
        src={lang} 
        alt="Language Icon" 
        onClick={handleToggle} 
      />
      {isOpen && (
        <div className="popup-menu">
          <div onClick={() => toggleLang('en')}>EN</div>
          <div onClick={() => toggleLang('fr')}>FR</div>
        </div>
      )}
        
        </div>
      <h2 style={{ color: '#5B828E', marginBottom: '30px' }}>{t('Tokens.registre')}</h2>

      <h5 style={{ color: 'black', marginBottom: '10px', textAlign: 'left' }}>{t('Tokens.fullName')}</h5>
      <Form form={form} >
        <Form.Item
          name="Nom Complet"
          rules={[{ required: true, message: 'Entrer votre Nom svp' }]}
          style={{ marginBottom: '20px' }}
        >
          <Input value={nomComplet} onChange={(e) => setNomComplet(e.target.value)} />
        </Form.Item>

        <h5 style={{ color: 'black', marginBottom: '10px', textAlign: 'left' }}>{t('Tokens.Email')}</h5>
        <Form.Item
          name="Email"
          rules={[{ required: true, message: 'Entrer votre Email svp!' }]}
          style={{ marginBottom: '20px' }}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)}  />
        </Form.Item>
        
        <h5 style={{ color: 'black', marginBottom: '10px', textAlign: 'left' }}>{t('Tokens.Aff')}</h5>
        <Form.Item
          name="Affiliation"
          rules={[{ required: true, message: 'Entrer votre Affiliatin svp!' }]}
          style={{ marginBottom: '20px' }}
        >
          <Input value={affiliation} onChange={(e) => setAffiliation(e.target.value)}  />
        </Form.Item>
        <h5 style={{ color: 'black', marginBottom: '10px', textAlign: 'left' }}>{t('Tokens.MDP')}</h5>
        <Form.Item
          name="Mot de passe"
          rules={[{ required: true, message: 'Entrer votre Mot de passe svp!' }]}
          style={{ marginBottom: '50px' }}
        >
          <Input.Password value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
        </Form.Item>

        <Form.Item style={{ marginBottom: '40px' }}>
          <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#5B828E',color: 'white'}} onClick={handleSubmit} >
          {t('Tokens.registre')}
          </Button>
        </Form.Item>

        {/* Ligne coupée par le mot "Ou" */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ borderBottom: '1px solid #2C3E50', flex: 1 }}></div>
          <span style={{ color: '#5B828E', margin: '0 10px' }}>{t('Tokens.or')}</span>
          <div style={{ borderBottom: '1px solid #2C3E50', flex: 1 }}></div>
        </div>

        {/* Texte et lien "Vous avez déjà un compte?" */}
        <p style={{ color: '#2C3E50', marginBottom: '10px' }}>
        {t('Tokens.hvcount')}
          <Link style={{color:'#5B828E'}}to="/connexion">{t('Tokens.Connection')}</Link>
        </p>

      </Form>
      {showConnexion && <Connexion onClose={onClose} />}
    </div>
</>
  );
};

export default Inscription;
