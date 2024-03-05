import './Inscription.css';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import Connexion from './Connexion';
import { useNavigate , Link} from 'react-router-dom';
import { message } from 'antd';
const Inscription = ({ onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showConnexion, setShowConnexion] = useState(false);
  const navigate = useNavigate();

   // Définir des états pour stocker les valeurs des champs de formulaire
   const [nomComplet, setNomComplet] = useState('');
   const [email, setEmail] = useState('');
   const [motDePasse, setMotDePasse] = useState('');
  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async () => {
    setLoading(true); // Activer le chargement

    try {
      // Envoyer une requête POST à votre API côté serveur pour traiter l'inscription
      const response = await axios.post('http://localhost:2000/api/register', {
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
      <h2 style={{ color: '#3498db', marginBottom: '30px' }}>S'inscrire</h2>

      <h5 style={{ color: '#2C3E50', marginBottom: '10px', textAlign: 'left' }}>Nom Complet</h5>
      <Form form={form} >
        <Form.Item
          name="Nom Complet"
          rules={[{ required: true, message: 'Entrer votre Nom svp' }]}
          style={{ marginBottom: '20px' }}
        >
          <Input value={nomComplet} onChange={(e) => setNomComplet(e.target.value)} />
        </Form.Item>

        <h5 style={{ color: '#2C3E50', marginBottom: '10px', textAlign: 'left' }}>Email</h5>
        <Form.Item
          name="Email"
          rules={[{ required: true, message: 'Entrer votre Email svp!' }]}
          style={{ marginBottom: '20px' }}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)}  />
        </Form.Item>

        <h5 style={{ color: '#2C3E50', marginBottom: '10px', textAlign: 'left' }}>Mot de passe</h5>
        <Form.Item
          name="Mot de passe"
          rules={[{ required: true, message: 'Entrer votre Mot de passe svp!' }]}
          style={{ marginBottom: '50px' }}
        >
          <Input.Password value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
        </Form.Item>

        <Form.Item style={{ marginBottom: '40px' }}>
          <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#2C3E50' }} onClick={handleSubmit} >
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
          <Link to="/connexion">Se connecter</Link>
        </p>

      </Form>
      {showConnexion && <Connexion onClose={onClose} />}
    </div>
</>
  );
};

export default Inscription;
