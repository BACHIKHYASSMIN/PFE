// Class.js
import React, {useState, useEffect} from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Material from './Classes/Material.js';

import Graph from './Graph.js';
import CarteGeographique from './carte.js';
import Produit from './Classes/produit.js';
import Details from './PathologieDetails.js';
import Monument from './Classes/Monument.js';
import Pathologie from './Classes/Pathologie.js';
import Ouvrage from './Classes/Ouvrage.js';
import Home from './Home.js'
import Connexion from './Connexion.js';
import Inscription from './Inscription.js';
import RechercheAvancée from './RechercheAvancée.js';
import Biologique from './PathologiesCatégories/Biologique.js';
import ChromatiqueDépot from './PathologiesCatégories/ChromatiqueDépot.js';
import Déformation from './PathologiesCatégories/Déformation.js';
import Détachement from './PathologiesCatégories/Détachement.js';
import Fissure from './PathologiesCatégories/Fissure.js';
import PertesDeMatière from './PathologiesCatégories/PertesDeMatière.js'
import Autres from './PathologiesCatégories/Autres.js';
import Categorie1 from './MatérialsCatégories/Categorie1.js';
import Categorie2 from './MatérialsCatégories/Categorie2.js';
import Categorie3 from './MatérialsCatégories/Categorie3.js';
import Apropos from './Apropos.js';
import Profil from './Profil.js';
import Interaction from './Interaction.js';
import { LangProvider } from './LangContext.js';
import ProductDetails from './ProductDetails.js';
import MaterialDetails from './MaterialDetails.js';
import MonumentDetails from './MonumentDetails.js';
import OuvrageDetails from './OuvrageDetails.js'
import UserHome from './Elements/userHome.js';
import { AuthProvider } from './AuthContext.js';
import Neo4jGraph from './Neo4JGraph.js'
import { getColors, getGraph, getMonuments, getPathologies, getPeriodes, getPlaces, getUsages } from './apiServices.js';
import { getProducts } from './apiServices.js';
import { getBuildings } from './apiServices.js';
import { getMaterials } from './apiServices.js';
import { getNodes } from './apiServices.js';
import ErrorBoundary from './erreurs.js';
import GestionUtilisateurs from './userManagmen.js'
import PathologieDetails from './PathologieDetails.js';

function App() {
  const [materials,setMaterials]=useState([]);
  const [monuments, setMonuments] = useState([]);
  const [products,setProducts]=useState([]);
  const [buildings,setBuildings]=useState([]);
  const [nodes,setNodes]=useState([]);
  const [graph,setGraph]=useState();
  const [places,setPlaces]=useState([]);
  const [periodes,setPeriodes]=useState([]);
  const [colors,setColors]=useState([]);
  const [pathologies,setPathologies]=useState([]);
  const [usage,setUsage]=useState([])

  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        const monumentsData = await getMonuments();
        setMonuments(monumentsData.monuments);
      } catch (error) {
        console.error('Error fetching monuments:', error);
      } 
    };
    const fetchPathologies = async () => {
      try {
        const pathologieData = await getPathologies();
        setPathologies(pathologieData.pathologies);
      } catch (error) {
        console.error('Error fetching pathologies:', error);
      } 
    };
    const fetchColors = async () => {
      try {
        const colorsData = await getColors();
        setColors(colorsData.couleurs);
      } catch (error) {
        console.error('Error fetching colors:', error);
      } 
    };
    const fetchUsage = async () => {
      try {
        const usageData = await getUsages();
        setUsage(usageData.usage);
      } catch (error) {
        console.error('Error fetching uses:', error);
      } 
    };
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData.produits);
      } catch (error) {
        console.error('Error fetching products:', error);
      } 
    };

    const fetchBuildings = async () => {
      try {
        const buildingsData = await getBuildings();
        setBuildings(buildingsData.ouvrages);
      } catch (error) {
        console.error('Error fetching buildngs:', error);
      } 
    };
    const fetchMaterials = async () => {
      try {
        const MaterialsData = await getMaterials();
        setMaterials(MaterialsData.materiaux);
      } catch (error) {
        console.error('Error fetching materials:', error);
      } 
    };
    const fetchNodes = async () => {
      try {
        const NodesData = await getNodes();
        setNodes(NodesData.nodes);
      } catch (error) {
        console.error('Error fetching nodes:', error);
      } 
    };
    const fetchGraph = async () => {
      try {
        const NodesData = await getGraph();
        setGraph(NodesData);
      } catch (error) {
        console.error('Error fetching graph :', error);
      } 
    };

    const fetchPlaces = async () => {
      try {
        const PlacesData = await getPlaces();
        setPlaces(PlacesData.places);
      } catch (error) {
        console.error('Error fetching places:', error);
      } 
    };

    const fetchPeriodes = async () => {
      try {
        const PeriodesData = await getPeriodes();
        setPeriodes(PeriodesData.periodes);
      } catch (error) {
        console.error('Error fetching periodes:', error);
      } 
    };
    fetchPathologies();
    fetchColors();
    fetchPeriodes();
    fetchGraph();
    fetchPlaces();
    fetchNodes();
    fetchUsage();
    fetchMonuments();
    fetchProducts();
    fetchBuildings();
    fetchMaterials();
    
  }, []);



  return (
    <AuthProvider>
    <LangProvider>
    <ErrorBoundary> 
    <div className="App">
        <Routes>
        <Route path="/acceuil" exact element={<UserHome />} />
          <Route path="/material" element={<Material materials={materials} />} />
          <Route path="/" element={<Home />} />
          <Route path="/categorie1" element={<Categorie1 products={products} materials={materials} buildings={buildings} monuments={monuments} places={places} colors={colors} />} />
          <Route path="/categorie2" element={<Categorie2 products={products} materials={materials} buildings={buildings} monuments={monuments} places={places} colors={colors} />} />
          <Route path="/categorie3" element={<Categorie3 products={products} materials={materials} buildings={buildings} monuments={monuments} places={places} colors={colors} />} />
          <Route path="/Graph" element={<Graph  products={products} materials={materials} buildings={buildings} nodes={nodes} graph={graph}/>} />
          <Route path="/carte-geographique" element={<CarteGeographique   monuments={monuments}/>} />
          <Route path="/produit" element={<Produit products={products} buildings={buildings} monuments={monuments} places={places} materials={materials} />} />
          <Route path="/details/:pathologieId" element={<PathologieDetails />} />
          <Route path="/monument" element={<Monument monuments={monuments} products={products} buildings={buildings} periodes={periodes} places={places} />} />
          <Route path="/pathologie" element={<Pathologie  pathologies={pathologies}/>} />
          <Route path="/ouvrage" element={<Ouvrage buildings={buildings} products={products}  monuments={monuments} usage={usage} />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription/>} />
          <Route path="/recherche-avancee" element={<RechercheAvancée products={products} materials={materials}buildings={buildings} monuments={monuments} places={places} periodes={periodes} colors={colors} pathologies={pathologies}/>} />
          <Route path="/biologique" element={<Biologique pathologies={pathologies} monuments={monuments} products={products} buildings={buildings} periodes={periodes} places={places} />} />
          <Route path="/chromatique-dépot" element={<ChromatiqueDépot pathologies={pathologies} monuments={monuments} products={products} buildings={buildings} periodes={periodes} places={places}/>} />
          <Route path="/déformation" element={<Déformation pathologies={pathologies} monuments={monuments} products={products} buildings={buildings} periodes={periodes} places={places} />} />
          <Route path="/détachement" element={<Détachement pathologies={pathologies} monuments={monuments} products={products} buildings={buildings} periodes={periodes} places={places}/>} />
          <Route path="/fissure" element={<Fissure pathologies={pathologies} monuments={monuments} products={products} buildings={buildings} periodes={periodes} places={places}/>} />
          <Route path="/perte de matière" element={<PertesDeMatière pathologies={pathologies} monuments={monuments} products={products} buildings={buildings} periodes={periodes} places={places}/>} />
          <Route path="/profil" element={<Profil/>} />
          <Route path="/autres" element={<Autres pathologies={pathologies} monuments={monuments} products={products} buildings={buildings} periodes={periodes} places={places} />} />
          <Route path= "/a-propos"element={<Apropos/>}/>
          <Route path="/interaction" element={<Interaction/>}/>
          <Route path="/produitDetails/:productId"  element={<ProductDetails />}  />
          <Route path="/materiauDetails/:materialId"  element={<MaterialDetails />}  />
          <Route path="/monumentDetails/:monumentId"  element={<MonumentDetails />}  />
          <Route path="/ouvrageDetails/:ouvrageId"  element={<OuvrageDetails />}  />
          <Route path="/connexion/:previousUrl"  element={<Connexion />}  />
          <Route path="/userHome" element={< UserHome />} />
          <Route path="/admin" element={<GestionUtilisateurs />} />
         
          
          
         
        </Routes>
   
    
  
    </div>
    </ErrorBoundary>
    </LangProvider>
    </AuthProvider>
  );
}

export default App;
