import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Input, Card, Row, Col, Checkbox, Typography, Modal } from 'antd';
import Navbar from './Elements/Navbar';
import Footer from './Elements/Footer';
import ChatBox from './Elements/ChatBox';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import deconIcon from "./Assets/decon.png";
import whitemenuIcon from "./Assets/wmenu.png";
import closeIcon from "./Assets/close.png";
import menuIcon from "./Assets/icon.png";
import './RechercheAvancée.css';

const { Option } = Select;

const RechercheAvancée = () => {
  const [form] = Form.useForm();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [isAdvancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);

  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  }

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleCancel = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectFieldsChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedFields([...selectedFields, value]);
    } else {
      setSelectedFields(selectedFields.filter((f) => f !== value));
    }
  };

  const handleApply = () => {
    // Handle form submission
  };

  const handleAdvancedSearch = () => {
    setAdvancedSearchOpen(true);
  };

  const handleCancelAdvancedSearch = () => {
    setAdvancedSearchOpen(false);
  };

  const handlePeriodChange = (value) => {
    setSelectedPeriod(value);
  };

  const handlePlaceChange = (value) => {
    setSelectedPlace(value);
  };

  const handleCategoriesChange = (value) => {
    setSelectedCategories(value);
  };

  const handleColorChange = (value) => {
    setSelectedColor(value);
  };

  const handleApplyAdvancedSearch = () => {
    // Perform some action with the selected values
    console.log("Period:", selectedPeriod);
    console.log("Place:", selectedPlace);
    console.log("Categories:", selectedCategories);
    console.log("Color:", selectedColor);

    // Reset the selected values
    setSelectedPeriod([]);
    setSelectedPlace([]);
    setSelectedCategories([]);
    setSelectedColor([]);

    // Close the modal
    handleCancelAdvancedSearch();
  };

  const handleVoirPlus = (id) => {
    navigate(`/details/${id}`);
  };

  const renderItems = (items, category) => {
    return items.map(item => (
      <Col key={item.id} span={8}>
        <Card
          title={category}
          bordered={false}
          cover={<img alt={item.title} src={item.image} />}
        >
          <p>{item.title}</p>
          <Button type="primary" onClick={() => handleVoirPlus(item.id)}>
            {t("Btn.VoirPlus")}
          </Button>
        </Card>
      </Col>
    ));
  };

  return (
    <div>
      <Navbar />
      <div className="material-head">
        <img className="menu" src={menuIcon} alt="Menu Icon" onClick={handleMenuToggle} />
        <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          {t("navbar.rechercheAvancee")}
        </Typography.Title>
      </div>
      <Row justify="space-between" align="middle" style={{ marginBottom: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
        <Col>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '400px', height: '60px', background: '#2C3E50', marginRight: '20px' }}>
              <h2 style={{ textAlign: 'center', color: 'white' }}> {t("Tokens.Filter")}</h2>
            </div>
          </div>
        </Col>
        <Col flex="auto" style={{ textAlign: 'right' }}>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col flex="auto">
                <Input
                  placeholder={t("Tokens.rechReq")}
                  style={{ flex: 1, marginRight: '10px', background: '#ECF0F1', color: '#2C3E50' }}
                />
              </Col>
              <Col>
                <Button type="primary" htmlType="submit" style={{ backgroundColor: '#2C3E50', float: 'right' }} onClick={handleAdvancedSearch}>
                  {t("navbar.rechercheAvancee")}
                </Button>
              </Col>
            </Row>
            <Modal
              title={t("navbar.rechercheAvancee")}
              visible={isAdvancedSearchOpen}
              onCancel={handleCancelAdvancedSearch}
              footer={
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button style={{ marginRight: '10px' }} onClick={handleCancelAdvancedSearch}>
                    {t("Btn.Annuler")}
                  </Button>
                  <Button type="primary" onClick={handleApplyAdvancedSearch}>
                    {t("Btn.Valider")}
                  </Button>
                </div>
              }
            >
              <Form layout="vertical">
                <Form.Item label={t("Header.Periode")}>
                  <Select
                    mode="multiple"
                    value={selectedPeriod}
                    onChange={handlePeriodChange}
                    style={{ width: '100%' }}
                  >
                    {data && data.periodes ? (
                      data.periodes.map(periode => (
                        <Option key={periode.id} value={periode.title}>
                          {periode.title}
                        </Option>
                      ))
                    ) : (
                      <Option value="">{t("Messages.PerErr")}</Option>
                    )}
                  </Select>
                </Form.Item>
                <Form.Item label={t("Header.Place")}>
                  <Select
                    mode="multiple"
                    value={selectedPlace}
                    onChange={handlePlaceChange}
                    style={{ width: '100%' }}
                  >
                    {data && data.places ? (
                      data.places.map(place => (
                        <Option key={place.id} value={place.title}>
                          {place.title}
                        </Option>
                      ))
                    ) : (
                      <Option value="">{t("Messages.PlaceErr")}</Option>
                    )}
                  </Select>
                </Form.Item>
                <Form.Item label={t("Header.Categorie")}>
                  <Select
                    mode="multiple"
                    value={selectedCategories}
                    onChange={handleCategoriesChange}
                    style={{ width: '100%' }}
                  >
                    <Option value="materiau">{t("Header.Mat")}</Option>
                    <Option value="produit">{t("Header.Prod")}</Option>
                    <Option value="ouvrage">{t("Header.Ouv")}</Option>
                    <Option value="pathologie">{t("Header.Path")}</Option>
                    <Option value="monument">{t("Header.Monu")}</Option>
                  </Select>
                </Form.Item>
                <Form.Item label={t("Header.Color")}>
                  <Select
                    mode="multiple"
                    value={selectedColor}
                    onChange={handleColorChange}
                    style={{ width: '100%' }}
                  >
                    {data && data.couleurs ? (
                      data.couleurs.map(couleur => (
                        <Option key={couleur.id} value={couleur.title}>
                          {couleur.title}
                        </Option>
                      ))
                    ) : (
                      <Option value="">{t("Messages.ColorErr")}</Option>
                    )}
                  </Select>
                </Form.Item>
              </Form>
            </Modal>
          </Form>
        </Col>
      </Row>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '10px', paddingRight: '10px' }}>
        <div style={{ flex: 1 }}>
        <Card style={{ backgroundColor: '#ECF0F1', padding: '20px', width: '400px' }}>
  <Form form={form} layout="vertical" name="advanced_search" onFinish={onFinish}>
    {/* Vos champs de formulaire ici */}
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ marginBottom: '10px' }}>
    <Form.Item name="Matériaux" label={t("Header.Mat")}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    {data && data.materiaux ? (
            data.materiaux.map(materiau => (
  <Checkbox  key={materiau.id} value="Matériau1">{materiau.title}</Checkbox>
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
        <div style={{ flex: 3, marginLeft: '10px', marginRight: '10px' }}>
          <Row gutter={[16, 16]}>
            {data && data.materiaux && renderItems(data.materiaux, t("Header.Mat"))}
            {data && data.produits && renderItems(data.produits, t("Header.Prod"))}
            {data && data.ouvrages && renderItems(data.ouvrages, t("Header.Ouv"))}
            {data && data.pathologies && renderItems(data.pathologies, t("Header.Path"))}
            {data && data.monuments && renderItems(data.monuments, t("Header.Monu"))}
          </Row>
        </div>
      </div>
      
      <ChatBox />
      <Footer />
    </div>
  );
};

export default RechercheAvancée;
