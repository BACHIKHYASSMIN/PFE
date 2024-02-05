// Class.js
import React from 'react';
import Navbar from './Elements/Navbar';
import Footer from './Elements/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Material from './Classes/Material';
import Categorie from './Categorie';
import Graph from './Graph';
import CarteGeographique from './carte';
import Produit from './Classes/produit';
import Details from './MaterialDetails';
import Monument from './Classes/Monument';
import Pathologie from './Classes/Pathologie';
import Ouvrage from './Classes/Ouvrage';

function Class() {
  return (
    <div className="Class">
  
      
        <Navbar />
        <Routes>
          <Route path="/material" element={<Material />} />
          <Route path="/categorie" element={<Categorie />} />
          <Route path="/Graph" element={<Graph />} />
          <Route path="/carte-geographique" element={<CarteGeographique />} />
          <Route path="/produit" element={<Produit />} />
          <Route path="/details" element={<Details />} />
          <Route path="/monument" element={<Monument />} />
          <Route path="/pathologie" element={<Pathologie />} />
          <Route path="/ouvrage" element={<Ouvrage />} />
     
         
        </Routes>
        <Footer />
      
  
    </div>
  );
}

export default Class;
