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
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const handleDeselectMonument = (monumentId) => {
    setSelectedMonuments(prevState => ({
      ...prevState,
      [monumentId]: false
    }));
  };
  
 
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
    console.log('Received values of form: ', values);
    
  };
  
  const handleSearch = () => {
    const results = monuments.filter(monument => 
      monument.title.toLowerCase().includes(searchInput.toLowerCase()) && 
      monument.attitude.low !== 0
    );
    setSearchResults(results);
  };
  
  const handleSearchResultClick = (monument) => {
    setSearchResults([]);
    setSelectedMonuments(prevState => ({
      ...prevState,
      [monument.id]: true
    }));
    <ZoomToMonument key={monument.id} monument={monument} deselectMonument={handleDeselectMonument} />
  };

  const handleCancel = () => {
    const updatedSelectedMonuments = {};
    for (const monumentId in selectedMonuments) {
      updatedSelectedMonuments[monumentId] = false;
    }
    setSelectedMonuments(updatedSelectedMonuments);
    
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
      <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '40px',textAlign: 'center' }}>
      {t("navbar.carteGeographique")}
      </Typography.Title>
      </div>
      <Row justify="space-between" align="middle" style={{ marginBottom: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
        <Col>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '400px', height: '60px', background: '#5B828E', marginRight: '20px' }}>
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
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Col>
            <Col>
              <Button type="primary" htmlType="submit"  style={{backgroundColor :'#5B828E'}}onClick={() =>handleSearch()}>
              {t("Tokens.Recherche")}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {searchResults.length > 0 && (
  <div className="search-results-container">
    <Card>
      <ul className="search-results-list">
        {searchResults.map((result) => (
          <li key={result.id} className="search-result-item" onClick={() => handleSearchResultClick(result)}>
            {result.title}
          </li>
        ))}
      </ul>
    </Card>
  </div>
)}

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
    data
      .filter(monument => monument.attitude  !== 0 && monument.longitude !== 0)
      .map(monument => (
        <Checkbox
          checked={selectedMonuments[monument.id]}
          onChange={e => {
            setSelectedMonuments(prevState => ({
              ...prevState,
              [monument.id]: e.target.checked,
            }));
          }}
          key={monument.id}
          value=""
        >
          {monument.title}
        </Checkbox>
      ))
  ) : (
    <li>{t("Messages.MonuErr")}</li>
  )}
</div>
</Form.Item>
</div>

{/* Répétez ce schéma pour les autres Form.Item */}

<Form.Item>
 <Button type="default" style={{ backgroundColor: '#27AE60', border: 'none',color:'white'}} onClick={handleCancel}>
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
    {data ? (
      data.map(monument => (
       
        monument.attitude !== null && monument.longitude !== null && selectedMonuments[monument.id] ? (
          <ZoomToMonument key={monument.id} monument={monument} deselectMonument={handleDeselectMonument} />
        ) : null
      ))
    ) : (
      <li>{t("Messages.MonuErr")}</li>
    )}
     
  </MapContainer>
</div>


      </div>
   



      
<ChatBox/>   
      <Footer/>
    </div>  

  );
  
}

// Composant ZoomToMonument pour zoomer automatiquement sur un monument sélectionné
function ZoomToMonument({ monument , deselectMonument }) {
  const map = useMap();
  const navigate = useNavigate();
  const handleImageClick = (monumentId) => {
    const integerId = parseInt(monumentId, 10);
    navigate(`/monumentDetails/${integerId}`);
  };

  useEffect(() => {
    console.log("attitude",monument.attitude);
    console.log("longitude",monument.longitude);
    if (map && monument && monument.attitude !== undefined && monument.longitude !== undefined) {
      map.flyTo([monument.attitude, monument.longitude], 16);
    } else {
      console.error("Les coordonnées du monument ne sont pas définies  :", monument);
    }
  }, [map, monument,, deselectMonument]);

 
  return (
    <Marker position={[monument.attitude, monument.longitude]}>
      <Popup>
      
       <img  style={{width:'120px'}} src={`data:image/jpg;base64, ${monument.image}`}  onClick={() => handleImageClick(monument.id)}/>
       <div></div>
      <a style={{textDecoration:'none' }}>{monument.title}</a>
        </Popup>
    </Marker>
  );

}

export default Carte;