

import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import Connexion from './Connexion';

const Inscription = ({ onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showConnexion, setShowConnexion] = useState(false);

  const onFinish = (values) => {
    console.log('Form values:', values);
    setLoading(true);
    // Simuler un appel API
    setTimeout(() => {
      setLoading(false);
      onClose(); // Fermer la fenêtre modale après le chargement
      setShowConnexion(true); // Afficher la carte de connexion
    }, 2000);
  };

  return (
    <div className="connexion-modal" style={{ textAlign: 'center', padding: '40px', margin: '10px' }}>
      <h2 style={{ color: '#3498db', marginBottom: '30px' }}>S'inscrire</h2>

      <h5 style={{ color: '#2C3E50', marginBottom: '10px', textAlign: 'left' }}>Nom Complet</h5>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="Nom Complet"
          rules={[{ required: true, message: 'Entrer votre Nom svp' }]}
          style={{ marginBottom: '20px' }}
        >
          <Input />
        </Form.Item>

        <h5 style={{ color: '#2C3E50', marginBottom: '10px', textAlign: 'left' }}>Email</h5>
        <Form.Item
          name="Email"
          rules={[{ required: true, message: 'Entrer votre Email svp!' }]}
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
          <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#2C3E50' }}>
            S'inscrire
          </Button>
        </Form.Item>

        {/* Ligne coupée par le mot "Ou" */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ borderBottom: '1px solid #2C3E50', flex: 1 }}></div>
          <span style={{ color: '#2C3E50', margin: '0 10px' }}>Ou</span>
          <div style={{ borderBottom: '1px solid #2C3E50', flex: 1 }}></div>
        </div>

        {/* Texte et lien "Vous avez déjà un compte?" */}
        <p style={{ color: '#2C3E50', marginBottom: '10px' }}>
          Vous avez déjà un compte?{' '}
          <a href="#" onClick={() => setShowConnexion(true)}>Se connecter</a>
        </p>

      </Form>
      {showConnexion && <Connexion onClose={onClose} />}
    </div>

  );
};

export default Inscription;
