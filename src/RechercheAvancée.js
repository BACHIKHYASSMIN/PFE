import React from 'react';
import Navbar from './Elements/Navbar';
import Footer from './Elements/Footer';
import { Form, Select, Button, Input, Card, Row, Col , Checkbox ,Typography } from 'antd';

const { Option } = Select;


const RechercheAvancée = () => {
  const [form] = Form.useForm();

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
  <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '40px',textAlign: 'center' }}>
        Recherche avancée
      </Typography.Title>

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
    <Form.Item name="Matériaux" label="Matériaux">
      
      <Checkbox value="Matériau1">Matériau 1</Checkbox>
      </Form.Item>
    <Form.Item>
      <Checkbox value="Matériau2">Matériau 2</Checkbox>
      </Form.Item>
    <Form.Item>
      <Checkbox value="Matériau3">Matériau 3</Checkbox>
    </Form.Item>
    <Form.Item name="produit" label="Produit">
      <Checkbox value="produit1">Produit 1</Checkbox>
    </Form.Item>
    <Form.Item>
      <Checkbox value="produit2">Produit 2</Checkbox>
    </Form.Item>
    <Form.Item>
      <Checkbox value="produit3">Produit 3</Checkbox>
    </Form.Item>
    <Form.Item name="ouvrage" label="Ouvrage">
      <Checkbox value="ouvrage1">Ouvrage 1</Checkbox>
    </Form.Item>
    <Form.Item>
      <Checkbox value="ouvrage2">Ouvrage 2</Checkbox>
    </Form.Item>
    <Form.Item>
      <Checkbox value="ouvrage3">Ouvrage 3</Checkbox>
    </Form.Item>
    {/* Répétez ce schéma pour les autres Form.Item */}
    <Form.Item>
      <Button type="primary" htmlType="submit" style={{ marginRight: '10px', backgroundColor: '#27AE60', marginTop: '20px' }}>
        Valider
      </Button>
      <Button type="default" style={{ backgroundColor: '#d9d9d9', border: 'none' }}>
        Annuler
      </Button>
    </Form.Item>
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
        <Footer />
    </div>
  );
}



export default RechercheAvancée;