import './Connexion.css';
import React, { useState,useEffect, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import Inscription from './Inscription';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import { useAuth } from './AuthContext';
import { useTranslation } from 'react-i18next';
import lang from './Assets/lang.png'
import NET from 'vanta/dist/vanta.net.min';
import LanguagePopup from './Elements/LangSwitch';
import * as THREE from 'three';
const Connexion = ({ onClose }) => {
  const vantaRef = useRef(null);
  const { t, i18n } = useTranslation();
  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  };
  useEffect(() => {
    let vantaEffect;

    if (!vantaRef.current) return;

    vantaEffect = NET({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xff85ae,
      backgroundColor: 0x100e11,
      points: 7.00,
      maxDistance: 23.00,
      spacing: 14.00,
  color:0xECF0F1,
  backgroundColor:0x2C3E50
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaRef]);
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showInscription, setShowInscription] = useState(false);
  const { login } = useAuth();
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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuccessfulLogin = (previousUrl, userId,role,image) => {
    console.log(userId)
    login(userId,role,image);
    if (role === 'administrateur') {
      navigate('/admin');
    } else {
      if (previousUrl) {
        navigate(previousUrl);
        localStorage.removeItem('previousUrl');
      } else {
        navigate('/acceuil');
      }
    }
  
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        pass,
      });
      const { userId, role ,image} = response.data;
      handleSuccessfulLogin(userId, role,image);    // Save any necessary token or state here
      handleSuccessfulLogin(localStorage.getItem('previousUrl'),userId,role,image);
    } catch (error) {
      message.error(error.response?.data?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const toggleInscription = () => {
    setShowInscription(!showInscription);
  };
  
  return (
    <>
    {<div className="connexion-overlay"></div>}
    {<div style={{ width: '100%', height: '100vh' }} />}
    {<div className="connexion-background"></div>}
    <div className="connexion-modal " style={{ textAlign: 'center', padding: '40px', margin: '10px' }} >
      {/* Fermez la fenêtre modale lorsque showInscription est true */}
      {!showInscription && (
        <>
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
          <h2 style={{ color: '#5B828E', marginBottom: '30px' }}>{t('Tokens.Connection')}</h2>
          <h5 style={{ color: 'black', marginBottom: '10px', textAlign: 'left' }}>{t('Tokens.Email')}</h5>
          <Form form={form} >
            <Form.Item
              name="Email"
              rules={[{ required: true, message: 'Entrer votre Email svp' }]}
              style={{ marginBottom: '20px' }}
            >
              <Input  value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <h5 style={{ color: 'black', marginBottom: '10px', textAlign: 'left' }}>{t('Tokens.MDP')}</h5>
            <Form.Item
              name="Mot de passe"
              rules={[{ required: true, message: 'Entrer votre Mot de passe svp!' }]}
              style={{ marginBottom: '50px' }}
            >
              <Input.Password  value={pass} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Item>

            <Form.Item style={{ marginBottom: '40px' }}>
              <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#5B828E', color:'white' }}  onClick={handleSubmit}>
              {t('Tokens.Connection')}
              </Button>
            </Form.Item>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ borderBottom: '1px solid #2C3E50', flex: 1 }}></div>
              <span style={{ color: '#5B828E', margin: '0 10px' }}> {t('Tokens.or')}</span>
              <div style={{ borderBottom: '1px solid #2C3E50', flex: 1 }}></div>
            </div>

            <p style={{ color: 'black', marginBottom: '10px' }}>
            {t('Tokens.hvnt')}
              <Link style={{color:'#5B828E'}}to="/inscription">{t('Tokens.registre')}</Link>
            </p>
          </Form>
        </>
      )}

      {/* Affiche la carte d'inscription si showInscription est true */}
      {showInscription && <Inscription onClose={onClose} />}
    </div>
    </>
  );
};

export default Connexion;