import './Connexion.css';
import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import Inscription from './Inscription';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import { useAuth } from './AuthContext';

const Connexion = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showInscription, setShowInscription] = useState(false);
  const { login } = useAuth();

  const handleSuccessfulLogin = (previousUrl) => {
    login();
    if (previousUrl) {
      navigate(previousUrl);
      localStorage.removeItem('previousUrl');
    } else {
      navigate('/acceuil');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:2000/api/login', {
        email,
        pass,
      });
      // Save any necessary token or state here
      handleSuccessfulLogin(localStorage.getItem('previousUrl'));
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
      {<div className="connexion-background"></div>}
    <div className="connexion-modal " style={{ textAlign: 'center', padding: '40px', margin: '10px' }} >
      {/* Fermez la fenêtre modale lorsque showInscription est true */}
      {!showInscription && (
        <>
          <h2 style={{ color: '#3498db', marginBottom: '30px' }}>Se Connecter</h2>
          <h5 style={{ color: '#2C3E50', marginBottom: '10px', textAlign: 'left' }}>Email</h5>
          <Form form={form} >
            <Form.Item
              name="Email"
              rules={[{ required: true, message: 'Entrer votre Email svp' }]}
              style={{ marginBottom: '20px' }}
            >
              <Input  value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <h5 style={{ color: '#2C3E50', marginBottom: '10px', textAlign: 'left' }}>Mot de passe</h5>
            <Form.Item
              name="Mot de passe"
              rules={[{ required: true, message: 'Entrer votre Mot de passe svp!' }]}
              style={{ marginBottom: '50px' }}
            >
              <Input.Password  value={pass} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Item>

            <Form.Item style={{ marginBottom: '40px' }}>
              <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#2C3E50' }}  onClick={handleSubmit}>
                Connexion
              </Button>
            </Form.Item>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ borderBottom: '1px solid #2C3E50', flex: 1 }}></div>
              <span style={{ color: '#2C3E50', margin: '0 10px' }}>Ou</span>
              <div style={{ borderBottom: '1px solid #2C3E50', flex: 1 }}></div>
            </div>

            <p style={{ color: '#2C3E50', marginBottom: '10px' }}>
              Vous n'avez pas de compte?{' '}
              <Link to="/inscription">S'inscrire</Link>
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