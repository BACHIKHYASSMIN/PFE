import './Connexion.css'
import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import Inscription from './Inscription';
import { useNavigate } from 'react-router-dom';

const Connexion = ({ onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showInscription, setShowInscription] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Form values:', values);
    setLoading(true);
    // Simuler un appel API
    setTimeout(() => {
      setLoading(false);
      onClose(); // Fermer la fenêtre modale après le chargement
    }, 2000);
  };

  const Connect = () => {
    navigate('/material');
  };
  const toggleInscription = () => {
    setShowInscription(!showInscription);
  };

  return (
    <div className="connexion-modal" style={{ textAlign: 'center', padding: '40px', margin: '10px' }}>
      {/* Fermez la fenêtre modale lorsque showInscription est true */}
      {!showInscription && (
        <>
          <h2 style={{ color: '#3498db', marginBottom: '30px' }}>Se Connecter</h2>
          <h5 style={{ color: '#2C3E50', marginBottom: '10px', textAlign: 'left' }}>Email</h5>
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              name="Email"
              rules={[{ required: true, message: 'Entrer votre Email svp' }]}
              style={{ marginBottom: '20px' }}
            >
              <Input />
            </Form.Item>

            <h5 style={{ color: '#2C3E50', marginBottom: '10px', textAlign: 'left' }}>Mot de passe</h5>
            <Form.Item
              name="Mot de passe"
              rules={[{ required: true, message: 'Entrer votre Mot de passe svp!' }]}
              style={{ marginBottom: '50px' }}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item style={{ marginBottom: '40px' }}>
              <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#2C3E50' }} onClick={Connect}>
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
              <a href="#" onClick={toggleInscription}>S'inscrire</a>
            </p>
          </Form>
        </>
      )}

      {/* Affiche la carte d'inscription si showInscription est true */}
      {showInscription && <Inscription onClose={onClose} />}
    </div>
  );
};

export default Connexion;