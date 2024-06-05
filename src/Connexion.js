import './Connexion.css';
import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import Inscription from './Inscription';
import { Link, useNavigate , useParams } from 'react-router-dom';
import axios from 'axios';

import { message } from 'antd';
const Connexion = ({ onClose}) => { // Ajoutez history en tant que prop
// Définir des états pour stocker les valeurs des champs de formulaire
const [email, setEmail] = useState('');
const [pass, setPassword] = useState();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showInscription, setShowInscription] = useState(false);
  const navigate= useNavigate();
// Après la connexion réussie
const handleSuccessfulLogin = () => {
  // Récupérer l'URL stockée dans le localStorage
  const previousUrl = localStorage.getItem('previousUrl');
  // Vérifier si une URL précédente existe
  if (previousUrl) {
    // Rediriger vers l'URL précédente
    window.location.href = previousUrl;
    // Supprimer l'URL précédente du localStorage
    localStorage.removeItem('previousUrl');
  } else {
    // Si aucune URL précédente n'est trouvée, rediriger vers une page par défaut
    window.location.href = '/'; // Par exemple, la page d'accueil
  }
};

  const handleSubmit = async () => { 
    
    try {
      // Envoyer une requête POST avec les informations d'identification saisies par l'utilisateur
      
      const response = await axios.post('http://localhost:2000/api/login', {
        email, 
        pass
      });
    
      const previousUrl = localStorage.getItem('previousUrl');
      // Vérifier si une URL précédente existe
      if (previousUrl) {
        // Rediriger vers l'URL précédente
        window.location.href = previousUrl;
        // Supprimer l'URL précédente du localStorage
        localStorage.removeItem('previousUrl');
      } else {
        // Si aucune URL précédente n'est trouvée, rediriger vers une page par défaut
        window.location.href = '/userHome'; // Par exemple, la page d'accueil
      }
  
    } catch (error) {
        message.error(error.response.data.message); 
  };
  }

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