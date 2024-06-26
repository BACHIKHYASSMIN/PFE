import './carte.css';
import React, { useState, useEffect}  from 'react';
import  menuIcon from "./Assets/icon.png"
import { useNavigate } from 'react-router-dom';
import deconIcon from "./Assets/decon.png"
import whitemenuIcon from "./Assets/wmenu.png"
import closeIcon from "./Assets/close.png"
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Navbar from './Elements/Navbar';
import Footer from './Elements/Footer';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Form, Select, Button, Input, Card, Row, Col ,Checkbox, Typography } from 'antd';
import ChatBox from './Elements/ChatBox';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import Monument from './Classes/Monument';
import NavbarHome from './NavbarHome';
import { getMonuments } from './apiServices';

import { useAuth } from './AuthContext';
const { Option } = Select;

function Carte({ monuments }) {
  const [monumentts, setMonuments] = useState([]);
  const [selectedMonuments, setSelectedMonuments] = useState({});
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isFilterOpen, setFilterOpen ] = useState(false);
  const { t,i18n } = useTranslation();
  const navigate = useNavigate();
  const { isConnected } = useAuth();



  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  }
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handleFilterToggle = () => {
    setFilterOpen(!isFilterOpen);
  };

  const handleDeconnect = () => {
    navigate('/');
  };

  const [searchData, setSearchData] = useState({
    title: ""
  });

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialSelectedMonuments = monuments.reduce((acc, monument) => {
          acc[monument.id] = false;
          return acc;
        }, {});
        setSelectedMonuments(initialSelectedMonuments);
        setData(monuments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  

  const [form] = Form.useForm();
 
  const onFinish = (values) => {
    console.log('Received values of form: ');
  };
  
  const handleSelection = () => {
  
  }

  const handleCancel = () => {
    const updatedSelectedMonuments = {};
    for (const monumentId in selectedMonuments) {
      updatedSelectedMonuments[monumentId] = false;
    }
    setSelectedMonuments(updatedSelectedMonuments);
    
  };

  const handleSearchSubmit = () => {
    // Mettez à jour la liste des monuments en fonction du titre saisi
    const filteredMonuments = monuments.filter(monument => {
      return monument.title.toLowerCase().includes(searchData.title.toLowerCase());
    });
    // Mettez à jour les données affichées sur la carte
    setData({
      ...data,
      monuments: filteredMonuments
    });
  };
  return (
    
    <div className='graph'>
      <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      crossOrigin=""/>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossOrigin=""></script>
  <Navbar /> 
      
      <div className="material-head">
      <img className="menu" src={menuIcon} alt="Menu Icon"
          onClick={handleMenuToggle}  />
      <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '40px',textAlign: 'center' }}>
      {t("navbar.carteGeographique")}
      </Typography.Title>
      </div>
      <Row justify="space-between" align="middle" style={{ marginBottom: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
        <Col>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '400px', height: '60px', background: '#2C3E50', marginRight: '20px' }}>
              <Link onClick={handleFilterToggle}><h2 style={{ textAlign: 'center', color: 'white', textDecoration:'none'}}> {t("Tokens.Filter")}</h2></Link>
            </div>
          </div>
        </Col>
        <Col flex="auto" style={{ textAlign: 'right' }}>
          <Row gutter={16}>
            <Col flex="auto">
              <Input
                placeholder= {t("Tokens.rechReq")}
                style={{ flex:1, marginRight: '10px', background: '#ECF0F1' }}
              />
            </Col>
            <Col>
              <Button type="primary" htmlType="submit"  style={{backgroundColor :'#2C3E50'}}>
              {t("Tokens.Recherche")}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      
      <div style={{ display: 'flex' }}>
      <div style={{ width: '400px', paddingLeft: '10px', paddingRight: '10px' }}>
          {/* Carte avec formulaire de recherche avancée */}
         
      <div style={{ flex: 2  ,paddingLeft:'10px'}}>
     
     {/* Carte avec formulaire de recherche avancée */}
     <Card style={{ backgroundColor: '#ECF0F1', padding: '20px', width: '400px' }}>
<Form form={form} layout="vertical" name="advanced_search" onFinish={onFinish}>
<div style={{ display: 'flex', flexDirection: 'column' }}>
{/* Vos champs de formulaire ici */}
<div style={{ marginBottom: '10px' }}>
<Form.Item name="Matériaux" label="Monuments">
<div style={{ display: 'flex', flexDirection: 'column' }}>
          {data ? (
            data.map(monument => (
           <Checkbox checked={selectedMonuments[monument.id]}
           onChange={e => {
             setSelectedMonuments(prevState => ({
               ...prevState,
               [monument.id]: e.target.checked
             }));
           }} key={monument.id}  value="">{monument.title}</Checkbox>
          ))
          ):(
            <li> {t("Messages.MonuErr")}</li>
          )
        }  
    
 

 </div>
</Form.Item>
</div>

{/* Répétez ce schéma pour les autres Form.Item */}

<Form.Item>
 <Button type="default" style={{ backgroundColor: '#27AE60', border: 'none',color:'#d9d9d9'}} onClick={handleCancel}>
 {t("Btn.Effacer")}
 </Button>
</Form.Item>
</div>
</Form>
</Card>

   </div>
        </div>
        
        <div style={{ width: '100%', height: '600px' }}>
  <MapContainer center={[7.1881, 21.0938]} zoom={3} scrollWheelZoom={false} style={{ marginLeft: '10%', zIndex: '100', width: '80%', height: '100%' }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {data  ? (
      data.map(monument => (
        selectedMonuments[monument.id] ? (
          <ZoomToMonument key={monument.id} monument={monument} />
        ) : null
      ))
    ) : (
      <li>{t("Messages.MonuErr")}</li>
    )}
  </MapContainer>
  
</div>

      </div>
   


      {isMenuOpen && (
        
        <div className="side-menu">
  <div className="popIcons">
    <img className="popmenu" src={whitemenuIcon} alt="Menu Icon" onClick={handleMenuToggle} />
    <img className="closemenu" src={closeIcon} alt="Close Icon" onClick={handleMenuToggle} />
  </div>
  <div className='lineBar'></div>
  <h3 className='rub' style={{textAlign: 'center' }}>{t("Menu.Rubrique")}</h3>
  <ul className='mats' style={{ paddingLeft: '20px' }}>
    <li className='rubMat-name' ><Link to="/material">{t("Header.Mat")}</Link></li>
    <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie1" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.MAT")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie2" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.MER")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie3" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Bois")}</Link>
</li>
    <li className='rubMat-name'><Link to="/produit">{t("Header.Prod")}</Link></li>
    <li className='rubMat-name'><Link to="/ouvrage">{t("Header.Ouv")}</Link></li>
    <li className='rubMat-name'><Link to="/pathologie">{t("Header.Path")}</Link></li>
    <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/biologique" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Biologique")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/chromatique-dépot" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Chd")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/déformation" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Deformation")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/détachement" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Detachment")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/fissure" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Fissure")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/perte de matière" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.PDM")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/autres" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Autres")}</Link>
</li>
    <li className='rubMat-name'><Link to="/monument">{t("Header.Monu")}</Link></li>
    </ul>
  <div className='lineBar'></div>
  <h3 className='rub'  style={{textAlign: 'center' }} >{t("Menu.Pages")}</h3>
  {/* Ajoutez vos liens du menu ici */}
  <Link className="pageLink" to="/userHome">{t("navbar.accueil")}</Link>
  <Link className="pageLink" to="/Graph">{t("navbar.graph")}</Link>
  <Link className="pageLink" to="/carte-geographique">{t("navbar.carteGeographique")}</Link>
  <Link className="pageLink" to="/recherche-avancee">{t("navbar.rechercheAvancee")}</Link>
  <Link className="pageLink" to="/a-propos">{t("navbar.aPropos")}</Link>
  <div className='lineDecBar'></div>
  <div className='Decon'>
    <img className="dec" src={deconIcon} alt="Decon Icon" onClick={handleDeconnect} />
    <a className='decLink' href="/lien2">{t("Menu.Deconnexion")}</a>
  </div>
</div>

      )}

      
<ChatBox/>   
      <Footer/>
    </div>  

  );
  
}

// Composant ZoomToMonument pour zoomer automatiquement sur un monument sélectionné
function ZoomToMonument({ monument }) {
  const map = useMap();
  
  // Utilisez map.flyTo pour zoomer et centrer la carte sur le monument sélectionné
  useEffect(() => {
    if (map && monument) {
      map.flyTo([monument.attitude, monument.longitude], 16);
    }
  }, [map, monument]);

  return (
    <Marker position={[monument.attitude, monument.longitude]}>
      <Popup>{monument.title}</Popup>
    </Marker>
  );
}
export default Carte;