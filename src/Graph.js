
import './Graph.css';
import React, { useState, useEffect  }  from 'react';
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
import { Link } from 'react-router-dom';
import closeIcon from "./Assets/close.png"
import { Form, Select, Button, Input, Card, Row, Col ,Checkbox, Typography } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ChatBox from './Elements/ChatBox';
import axios from 'axios';
import CytoscapeComponent from 'react-cytoscapejs';
import GraphComponent from './Elements/KnowledgeGraph'
import Neo4jGraph from './test';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';



function Graph() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState([]);
  const { t,i18n } = useTranslation();
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  }
  const navigate = useNavigate();


  const handleMaterialSelect = (materialId) => {
    setSelectedMaterials((prevSelected) => {
      if (prevSelected.includes(materialId)) {
        return prevSelected.filter((id) => id !== materialId);
      } else {
        return [...prevSelected, materialId];
      }
    });
  };
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
    const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
    
  const handleCancel = () => {
    form.resetFields(); // Réinitialiser les champs du formulaire
  };

  const handleSubmit = () => {
    const selectedMaterialsQuery = selectedMaterials.join('&');
    navigate(`/graph?materials=${selectedMaterialsQuery}`);
    
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  
   
  return (
      <div className='graph'>
    <Navbar isAuthenticated={true} /> 
    <div className="material-head">
          <img className="menu" src={menuIcon} alt="Menu Icon"
          onClick={handleMenuToggle}  />
    <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '40px',textAlign: 'center' }}>
    {t("navbar.graph")}
      </Typography.Title>
      </div>
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
                placeholder={t("Tokens.rechReq")}
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
          <div className='catElements'>
          
              
              </div>
      
            
            
              <div style={{ display: 'flex' }}>
      

      <div style={{ flex: 2  ,paddingLeft:'10px'}}>
     
           {/* Carte avec formulaire de recherche avancée */}
           <Card style={{ backgroundColor: '#ECF0F1', padding: '20px', width: '400px' }}>
  <Form form={form} layout="vertical" name="advanced_search" onFinish={onFinish}>
    {/* Vos champs de formulaire ici */}
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ marginBottom: '10px' }}>
    <Form.Item name="Matériaux" label={t("Header.Mat")}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    {data && data.materiaux ? (
            data.materiaux.map(materiau => (
  <Checkbox  key={materiau.id} onChange={() => handleMaterialSelect(materiau.id)}
  checked={selectedMaterials.includes(materiau.id)} value="Matériau1">{materiau.title}</Checkbox>
          ))
          ):(
            <li>{t("Messages.MatErr")}</li>
          )
      }  
      </div>
    </Form.Item>
    </div>

    <div style={{ marginBottom: '10px' }}>
    <Form.Item name="produit" label={t("Header.Prod")}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    {data && data.produits ? (
            data.produits .map(produit => (
  <Checkbox  key={produit.id} value="">{produit.title}</Checkbox>
          ))
          ):(
            <li>{t("Messages.ProdErr")}</li>
          )
      }  
      </div>
    </Form.Item>
    </div>
    <div style={{ marginBottom: '10px' }}>
    <Form.Item name="ouvrage" label={t("Header.Ouv")}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    {data && data.ouvrages ? (
            data.ouvrages .map(ouvrage=> (
  <Checkbox  key={ouvrage.id} value="">{ouvrage.title}</Checkbox>
          ))
          ):(
            <li>{t("Messages.OuvErr")}</li>
          )
      }  
      </div>
    </Form.Item>
    </div>
    {/* Répétez ce schéma pour les autres Form.Item */}
    <Form.Item>
      <Button type="primary" htmlType="submit" style={{ marginRight: '10px', backgroundColor: '#27AE60', marginTop: '20px' }}>
      {t("Btn.Valider")}
      </Button>
      <Button type="default" style={{ backgroundColor: '#d9d9d9', border: 'none' }} onClick={handleCancel}>
      {t("Btn.Annuler")}
      </Button>
    </Form.Item>
    </div>
  </Form>
</Card>



        </div>
        
        
       
        < Neo4jGraph />
  
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
    <img className="dec" src={deconIcon} alt="Decon Icon" onClick={handleMenuToggle} />
    <a className='decLink' href="/lien2">{t("Menu.Deconnexion")}</a>
  </div>
</div>

      )}


      
<ChatBox/>   
<Footer />
        </div>
       
    
      
  );
}

export default Graph;