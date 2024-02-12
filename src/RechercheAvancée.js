
import Navbar from './Elements/Navbar';
import Footer from './Elements/Footer';
import { Form, Select, Button, Input, Card, Row, Col , Checkbox ,Typography } from 'antd';
import ChatBox from './Elements/ChatBox';
import deconIcon from "./Assets/decon.png"
import whitemenuIcon from "./Assets/wmenu.png"
import closeIcon from "./Assets/close.png"
import { Link } from 'react-router-dom';
import React, { useState }  from 'react';
import  menuIcon from "./Assets/icon.png"

const { Option } = Select;


const RechercheAvancée = () => {
  const [form] = Form.useForm();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const itemsData = [
    { title: 'Catégorie 1', subtitle: 'Nom 1', image: 'URL_image_1' },
    { title: 'Catégorie 2', subtitle: 'Nom2', image: 'URL_image_2' },
    { title: 'Catégorie 3', subtitle: 'Nom 3', image: 'URL_image_3' },
    { title: 'Catégorie 1', subtitle: 'Nomn 1', image: 'URL_image_1' },
    { title: 'Catégorie 2', subtitle: 'Nom 2', image: 'URL_image_2' },
    { title: 'Catégorie 3', subtitle: 'Nom 3', image: 'URL_image_3' },
    { title: 'Catégorie 1', subtitle: 'Nom 1', image: 'URL_image_1' },
    { title: 'Catégorie 2', subtitle: 'Nom 2', image: 'URL_image_2' },
    { title: 'Catégorie 3', subtitle: 'Nom 3', image: 'URL_image_3' },
    
    // Ajoutez le reste des données ici
  ];


  return (
    <div>
   <Navbar/>
   <div className="material-head">
          <img className="menu" src={menuIcon} alt="Menu Icon"
          onClick={handleMenuToggle}  />
  <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '40px',textAlign: 'center' }}>
        Recherche avancée
      </Typography.Title>
      </div>
      <Row justify="space-between" align="middle" style={{ marginBottom: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
        <Col>
        <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ width: '400px', height: '60px', background: '#2C3E50', marginRight: '20px' }}>
      <h2 style={{ textAlign: 'center', color: 'white' }}>Filtres</h2>
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

      <div style={{ display: 'flex' }}>
      

       
      <div style={{ flex: 2  ,paddingLeft:'10px'}}>
     
          {/* Carte avec formulaire de recherche avancée */}
          <Card style={{ backgroundColor: '#ECF0F1', padding: '20px', width: '400px' }}>
  <Form form={form} layout="vertical" name="advanced_search" onFinish={onFinish}>
    {/* Vos champs de formulaire ici */}
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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

        <div style={{ display: 'flex', flexWrap: 'wrap' , }}>
        {/* Ensemble de cartes */}
        {itemsData.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            extra={<a href="#">Voir plus</a>}
            style={{ width: '30%', marginRight: '10px',marginLeft: '20px', marginBottom: '20px' ,border: '1px solid #2C3E50',}}  >
           <Row gutter={16} align="middle">
              <Col span={8}>
              <p>{item.subtitle}</p>
              </Col>
              <Col span={16}>
                <div>
                  <img src={item.image} alt={item.title} style={{ maxWidth: '100%' }} />
                </div>
              </Col>
            </Row>
          </Card>
        ))}
      </div>

        </div>
        {isMenuOpen && (
        
        <div className="side-menu">
  <div className="popIcons">
    <img className="popmenu" src={whitemenuIcon} alt="Menu Icon" onClick={handleMenuToggle} />
    <img className="closemenu" src={closeIcon} alt="Close Icon" onClick={handleMenuToggle} />
  </div>
  <div className='lineBar'></div>
  <h3 className='rub' style={{textAlign: 'center' }}>Rubriques</h3>
  <ul className='mats' style={{ paddingLeft: '20px' }}>
    <li className='rubMat-name' ><Link to="/material">Matériaux</Link></li>
    <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie1" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Matériaux à base de terre</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie2" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Minéraux et Roches</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie3" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Bois</Link>
</li>
    <li className='rubMat-name'><Link to="/produit">Produits</Link></li>
    <li className='rubMat-name'><Link to="/ouvrage">Ouvrages</Link></li>
    <li className='rubMat-name'><Link to="/pathologie">Pathologies</Link></li>
    <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/biologique" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Biologique</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/chromatique-dépot" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Chromatique-dépot</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/déformation" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Déformation</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/détachement" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Détachement</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/fissure" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Fissure</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/perte de matière" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Pertes de matière</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/autres" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Autres</Link>
</li>
    <li className='rubMat-name'><Link to="/monument">Monuments</Link></li>
    </ul>
  <div className='lineBar'></div>
  <h3 className='rub'  style={{textAlign: 'center' }} >Pages</h3>
  {/* Ajoutez vos liens du menu ici */}
  <Link className="pageLink" to="/">Accueil</Link>
  <Link className="pageLink" to="/Graph">Graph</Link>
  <Link className="pageLink" to="/carte-geographique">Carte Geographique</Link>
  <Link className="pageLink" to="/recherche-avancee">Recherche Avancée</Link>
  <Link className="pageLink" to="/a-propos">À propos</Link>
  <div className='lineDecBar'></div>
  <div className='Decon'>
    <img className="dec" src={deconIcon} alt="Decon Icon" onClick={handleMenuToggle} />
    <a className='decLink' href="/lien2">Deconnexion</a>
  </div>
</div>

      )}

      
<ChatBox/>   
        <Footer />
    </div>
  );
}



export default RechercheAvancée;