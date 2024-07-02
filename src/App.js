// Class.js
import React, {useState, useEffect} from 'react';
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
import ProductDetails from './ProductDetails';
import MaterialDetails from './MaterialDetails';
import MonumentDetails from './MonumentDetails';
import OuvrageDetails from './OuvrageDetails'
import UserHome from './Elements/userHome';
import { AuthProvider } from './AuthContext';
import Neo4jGraph from './test.js'
import { getColors, getGraph, getMonuments, getPathologies, getPeriodes, getPlaces, getUsages } from './apiServices.js';
import { getProducts } from './apiServices.js';
import { getBuildings } from './apiServices.js';
import { getMaterials } from './apiServices.js';
import { getNodes } from './apiServices.js';
import ErrorBoundary from './erreurs.js';
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
        console.error('Error fetching monuments:', error);
      } 
    };
    const fetchColors = async () => {
      try {
        const colorsData = await getColors();
        setColors(colorsData.couleurs);
      } catch (error) {
        console.error('Error fetching monuments:', error);
      } 
    };
    const fetchUsage = async () => {
      try {
        const usageData = await getUsages();
        setUsage(usageData.usage);
      } catch (error) {
        console.error('Error fetching monuments:', error);
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
        console.error('Error fetching products:', error);
      } 
    };
    const fetchMaterials = async () => {
      try {
        const MaterialsData = await getMaterials();
        setMaterials(MaterialsData.materiaux);
      } catch (error) {
        console.error('Error fetching products:', error);
      } 
    };
    const fetchNodes = async () => {
      try {
        const NodesData = await getNodes();
        setNodes(NodesData.nodes);
      } catch (error) {
        console.error('Error fetching products:', error);
      } 
    };
    const fetchGraph = async () => {
      try {
        const NodesData = await getGraph();
        setGraph(NodesData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } 
    };

    const fetchPlaces = async () => {
      try {
        const PlacesData = await getPlaces();
        setPlaces(PlacesData.places);
      } catch (error) {
        console.error('Error fetching products:', error);
      } 
    };

    const fetchPeriodes = async () => {
      try {
        const PeriodesData = await getPeriodes();
        setPeriodes(PeriodesData.periodes);
      } catch (error) {
        console.error('Error fetching products:', error);
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
          <Route path="/categorie1" element={<Categorie1 products={products} materials={materials}buildings={buildings} monuments={monuments} places={places} colors={colors} />} />
          <Route path="/categorie2" element={<Categorie2 products={products} materials={materials} buildings={buildings} monuments={monuments} places={places} colors={colors} />} />
          <Route path="/categorie3" element={<Categorie3 products={products} materials={materials} buildings={buildings} monuments={monuments} places={places} colors={colors} />} />
          <Route path="/Graph" element={<Graph  products={products} materials={materials} buildings={buildings} nodes={nodes} graph={graph}/>} />
          <Route path="/carte-geographique" element={<CarteGeographique   monuments={monuments}/>} />
          <Route path="/produit" element={<Produit products={products} buildings={buildings} monuments={monuments} places={places} materials={materials} />} />
          <Route path="/details" element={<Details />} />
          <Route path="/monument" element={<Monument monuments={monuments} products={products} buildings={buildings} periodes={periodes} places={places} />} />
          <Route path="/pathologie" element={<Pathologie  pathologies={pathologies}/>} />
          <Route path="/ouvrage" element={<Ouvrage buildings={buildings} products={products}  monuments={monuments} usage={usage} />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription/>} />
          <Route path="/recherche-avancee" element={<RechercheAvancée products={products} materials={materials}buildings={buildings} monuments={monuments} places={places} periodes={periodes} colors={colors}/>} />
          <Route path="/biologique" element={<Biologique pathologies={pathologies} />} />
          <Route path="/chromatique-dépot" element={<ChromatiqueDépot pathologies={pathologies}/>} />
          <Route path="/déformation" element={<Déformation pathologies={pathologies} />} />
          <Route path="/détachement" element={<Détachement pathologies={pathologies}/>} />
          <Route path="/fissure" element={<Fissure pathologies={pathologies}/>} />
          <Route path="/perte de matière" element={<PertesDeMatière pathologies={pathologies}/>} />
          <Route path="/profil" element={<Profil/>} />
          <Route path="/autres" element={<Autres pathologies={pathologies} />} />
          <Route path= "/a-propos"element={<Apropos/>}/>
          <Route path="/interaction" element={<Interaction/>}/>
          <Route path="/produitDetails/:productId"  element={<ProductDetails />}  />
          <Route path="/materiauDetails/:materialId"  element={<MaterialDetails />}  />
          <Route path="/monumentDetails/:monumentId"  element={<MonumentDetails />}  />
          <Route path="/ouvrageDetails/:ouvrageId"  element={<OuvrageDetails />}  />
          <Route path="/connexion/:previousUrl"  element={<Connexion />}  />
          <Route path="/userHome" element={< UserHome />} />
         
          
          
         
        </Routes>
   
    
  
    </div>
    </ErrorBoundary>
    </LangProvider>
    </AuthProvider>
  );
}

export default App;
