
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
import { Form, Select, Button, Input, Card, Row, Col , Typography } from 'antd';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
  
    
    const handleCheckbox1Change = () => {
      setChecked1(!isChecked1);
    };
    const handleCheckbox2Change = () => {
      setChecked2(!isChecked2);
    };
    const handleCheckbox3Change = () => {
      setChecked3(!isChecked3);
    };
  return (
      <div className='graph'>
       <Navbar />
       <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '40px',textAlign: 'center' }}>
        Carte Geographiuqe
      </Typography.Title>

      <Row justify="space-between" align="middle" style={{ marginBottom: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
        <Col>
        <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ width: '400px', height: '60px', background: '#2C3E50', marginRight: '20px' }}>
    <Link   onClick={handleMenuToggle}><h2 style={{ textAlign: 'center', color: 'white', textDecoration:'none'}}>Filtres</h2></Link>
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
              
      
            
            
         {/* Afficher le menu latéral s'il est ouvert */}
      {isMenuOpen && (
        
        <div className="side-filter">
          <div className="popFIcon">
          <h3 className='filter'>Filters</h3>
          <img className="closebmenu" src={closeBIcon} alt="Close Icon"
          onClick={handleMenuToggle}  />
          </div>
          <div className='lineFBar'></div>
          <div className='FilterCat'>
          <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={handleMenuToggle}  />
          <h3 className='catt'>Monuments</h3>
          </div>
          <div className='catboxList'>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked1}  onChange={handleCheckbox1Change} />
      <label htmlFor="checkbox">Monument 1</label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked2}  onChange={handleCheckbox2Change} />
      <label htmlFor="checkbox">Monument 2</label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked3}  onChange={handleCheckbox3Change} />
      <label htmlFor="checkbox">Monument 3</label>
    </div>   
    </div> 
    
          <div className='lineFBar'></div>
          <div className='ValBtn'>
          <button className='annuler'>Annuler</button>
          <button className='valider'>Valider</button>
          </div>
        </div>
      )}
      </div>
      
  );
}

export default Carte;
