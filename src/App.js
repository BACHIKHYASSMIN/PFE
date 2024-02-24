// Class.js
import React from 'react';
import Navbar from './Elements/Navbar';
import Footer from './Elements/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Material from './Classes/Material';
import Categorie from './MatérialsCatégories/Categorie1';
import Graph from './Graph';
import CarteGeographique from './carte';
import Produit from './Classes/produit';
import Details from './MaterialDetails';
import Monument from './Classes/Monument';
import Pathologie from './Classes/Pathologie';
import Ouvrage from './Classes/Ouvrage';
import Home from './Home'
import Connexion from './Connexion';
import Inscription from './Inscription';
import RechercheAvancée from './RechercheAvancée';
import Biologique from './PathologiesCatégories/Biologique';
import ChromatiqueDépot from './PathologiesCatégories/ChromatiqueDépot';
import Déformation from './PathologiesCatégories/Déformation';
import Détachement from './PathologiesCatégories/Détachement';
import Fissure from './PathologiesCatégories/Fissure';
import PertesDeMatière from './PathologiesCatégories/PertesDeMatière'
import Autres from './PathologiesCatégories/Autres';
import Categorie1 from './MatérialsCatégories/Categorie1';
import Categorie2 from './MatérialsCatégories/Categorie2';
import Categorie3 from './MatérialsCatégories/Categorie3';
import Apropos from './Apropos';
import Profil from './Profil';
import Interaction from './Interaction';
import { LangProvider } from './LangContext';

function App() {
  return (
    <LangProvider>
    <div className="Class">
        <Routes>
        <Route path="/" exact element={<Home />} />
          <Route path="/material" element={<Material />} />
          <Route path="/categorie1" element={<Categorie1 />} />
          <Route path="/categorie2" element={<Categorie2 />} />
          <Route path="/categorie3" element={<Categorie3 />} />
          <Route path="/Graph" element={<Graph />} />
          <Route path="/carte-geographique" element={<CarteGeographique />} />
          <Route path="/produit" element={<Produit />} />
          <Route path="/details" element={<Details />} />
          <Route path="/monument" element={<Monument />} />
          <Route path="/pathologie" element={<Pathologie />} />
          <Route path="/ouvrage" element={<Ouvrage />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription/>} />
          <Route path="/recherche-avancee" element={<RechercheAvancée />} />
          <Route path="/biologique" element={<Biologique/>} />
          <Route path="/chromatique-dépot" element={<ChromatiqueDépot />} />
          <Route path="/déformation" element={<Déformation />} />
          <Route path="/détachement" element={<Détachement />} />
          <Route path="/fissure" element={<Fissure />} />
          <Route path="/perte de matière" element={<PertesDeMatière/>} />
          <Route path="/profil" element={<Profil/>} />
          <Route path="/autres" element={<Autres />} />
          <Route path= "/a-propos"element={<Apropos/>}/>
          <Route path="/interaction" element={<Interaction/>}/>
          <Route path="/details/:productId" element={<Details />} />

        </Routes>
   
    
  
    </div>
    </LangProvider>
  );
}

export default App;
