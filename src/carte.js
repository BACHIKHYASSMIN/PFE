
import './carte.css';
import React, { useState }  from 'react';
import  menuIcon from "./Assets/icon.png"
import homeIcon from "./Assets/Vector.png"
import FilterIcon from "./Assets/filter.png"
import agrImg from  "./Assets/agr.png"
import pierImg from  "./Assets/pier.png"
import ArrowIcon from "./Assets/arrow.png"
import deconIcon from "./Assets/decon.png"
import whitemenuIcon from "./Assets/wmenu.png"
import closeBIcon from "./Assets/closeb.png"
import Navbar from './Elements/Navbar';
import Footer from './Elements/Footer';
import  Map from './Map';
import { Link } from 'react-router-dom';
import { Form, Select, Button, Input, Card, Row, Col ,Checkbox, Typography } from 'antd';


import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
const { Option } = Select;

function Carte() {
  const monuments = [
    { name: 'Monument 1', lat: 40.7128, lng: -74.0060 },
    { name: 'Monument 2', lat: 34.0522, lng: -118.2437 },
    // Add more monuments as needed
  ];
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
    
  
  return (
    <div className='graph'>
      <Navbar />
      <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '40px',textAlign: 'center' }}>
        Carte Géographique
      </Typography.Title>
  
      <Row justify="space-between" align="middle" style={{ marginBottom: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
        <Col>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '400px', height: '60px', background: '#2C3E50', marginRight: '20px' }}>
              <Link onClick={handleMenuToggle}><h2 style={{ textAlign: 'center', color: 'white', textDecoration:'none'}}>Filtres</h2></Link>
            </div>
          </div>
        </Col>
        <Col flex="auto" style={{ textAlign: 'right' }}>
          <Row gutter={16}>
            <Col flex="auto">
              <Input
                placeholder="Entrer une requête de recherche"
                style={{ flex:1, marginRight: '10px', background: '#ECF0F1' }}
              />
            </Col>
            <Col>
              <Button type="primary" htmlType="submit"  style={{backgroundColor :'#2C3E50'}}>
                Rechercher
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '400px', paddingLeft: '10px', paddingRight: '10px' }}>
          {/* Carte avec formulaire de recherche avancée */}
         
      <div style={{ flex: 2  ,paddingLeft:'10px'}}>
     
     {/* Carte avec formulaire de recherche avancée */}
     <Card style={{ backgroundColor: '#ECF0F1', padding: '20px', width: '400px' }}>
<Form form={form} layout="vertical" name="advanced_search" onFinish={onFinish}>
<div style={{ display: 'flex', flexDirection: 'column' }}>
{/* Vos champs de formulaire ici */}
<div style={{ marginBottom: '10px' }}>
<Form.Item name="Matériaux" label="Matériaux">
<div style={{ display: 'flex', flexDirection: 'column' }}>
 <Checkbox value="Matériau1">Matériau 1</Checkbox>
 
 <Checkbox value="Matériau2">Matériau 2</Checkbox>
 
 <Checkbox value="Matériau3">Matériau 3</Checkbox>
 </div>
</Form.Item>
</div>
<div style={{ marginBottom: '10px' }}>
<Form.Item name="produit" label="Produit">
<div style={{ display: 'flex', flexDirection: 'column' }}>
 <Checkbox value="produit1">Produit 1</Checkbox>

 <Checkbox value="produit2">Produit 2</Checkbox>

 <Checkbox value="produit3">Produit 3</Checkbox>
 </div>
</Form.Item>
</div>
<div style={{ marginBottom: '10px' }}>
<Form.Item name="ouvrage" label="Ouvrage">
<div style={{ display: 'flex', flexDirection: 'column' }}>
 <Checkbox value="ouvrage1">Ouvrage 1</Checkbox>

 <Checkbox value="ouvrage2">Ouvrage 2</Checkbox>

 <Checkbox value="ouvrage3">Ouvrage 3</Checkbox>
 </div>
</Form.Item>
</div>
{/* Répétez ce schéma pour les autres Form.Item */}

<Form.Item>
 <Button type="primary" htmlType="submit" style={{ marginRight: '10px', backgroundColor: '#27AE60', marginTop: '20px' }}>
   Valider
 </Button>
 <Button type="default" style={{ backgroundColor: '#d9d9d9', border: 'none' }}>
   Annuler
 </Button>
</Form.Item>
</div>
</Form>
</Card>

   </div>
        </div>
        
        <div style={{ flex: 1, paddingRight: '40px' }}>
          <div className='carteGeo'> 
            <MapContainer center={[28.0339, 1.6596]} zoom={5} style={{ height: '400px', width: '100%' }} >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
  
              {monuments.map((monument, index) => (
                <Marker key={index} position={[monument.lat, monument.lng]}>
                  <Popup>{monument.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    
      <Footer/>
    </div>  
  );
  
}

export default Carte;
