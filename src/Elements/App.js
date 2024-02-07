import './App.css';

import Connexion from '../Connexion';
import Inscription from '../Inscription';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Home from '../Home';
import RechercheAvancée from '../RechercheAvancée';
import React, { useState } from 'react';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('connexion');
  const [showConnexion , setShowConnexion ] = useState(false);

  const openModal = (page) => {
    setCurrentPage(page);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleConnexion = () => {
    setShowConnexion (!showConnexion );
    setCurrentPage(showConnexion  ? 'connexion' : 'connexion ');
    setShowModal(true);
  };

  <Navbar  onConnexionClick={toggleConnexion}/>

  {showModal && currentPage === 'connexion' && <Connexion onClose={closeModal} openInscription={() => openModal('inscription')} />}
  {showModal && currentPage === 'inscription' && <Inscription onClose={closeModal} openConnexion={() => openModal('connexion')} />}
  

  return (
    <div>
      <Navbar />
    <Connexion/>
      <Footer />

     
    </div>
  );
};

export default App;