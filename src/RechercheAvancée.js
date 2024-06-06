import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Input, Card, Row, Col, Checkbox, Typography, Modal, Pagination } from 'antd';
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
import { ContinuousSizeLegend } from 'react-vis';

const { Option } = Select;

const RechercheAvancée = () => {
  const [form] = Form.useForm();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [isAdvancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15); // Default number of items per page
  const [selectedFilters, setSelectedFilters] = useState({
    materiaux: [],
    produits: [],
    ouvrages: [],
  });


  const handleFilterSelect = (category, filter) => {
    if (selectedFilters === filter) {
      setSelectedFilters(false); // Désélectionne le filtre si déjà sélectionné
    } else {
      setSelectedFilters(filter); // Sélectionne le filtre
    }
  };
  

  const handleCategoriesChange = (value) => {
    setSelectedCategories(value);
    if (value.length > 0) {
      handleFilterSelect(value[0]); // Suppose that the filter is the first selected category
    }
  };
  
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

  useEffect(() => {
    if (data) {
      const combined = [
        ...(data.materiaux || []).map(item => ({ ...item, category: t("Header.Mat") })),
        ...(data.produits || []).map(item => ({ ...item, category: t("Header.Prod") })),
        ...(data.ouvrages || []).map(item => ({ ...item, category: t("Header.Ouv") })),
        ...(data.pathologies || []).map(item => ({ ...item, category: t("Header.Path") })),
        ...(data.monuments || []).map(item => ({ ...item, category: t("Header.Monu") }))
      ];
      setCombinedData(shuffleArray(combined));
    }
  }, [data, t]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

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

  const getDetailLink = (category, itemId) => {
    console.log(itemId)
    switch (category) {
      case "Matériaux":
        navigate(`/materialdetails/${itemId}`);
      case "Produits":
        navigate(`/produitDetails/${itemId}`);
      case "Monuments":
        return `/monumentDetails/${itemId}`;
      case "Ouvrages":
        return `/ouvrageDetails/${itemId}`;
      case "Pathologies":
        return `/details/${itemId}`;
    }
};




const renderItems = (items) => {
  
    // Sinon, afficher tous les éléments de la liste
    return items.map((item, index) => (
      <Card
        key={index}
        title={item.category}
        extra={<Link to={getDetailLink(item.category, item.id)}>Voir plus</Link>}
        style={{ width: '30%', marginRight: '10px', marginLeft: '20px', marginBottom: '20px', border: '1px solid #2C3E50' }}>
        <Row gutter={16} align="middle">
          <Col span={8}>
            <p>{item.title}</p>
          </Col>
          <Col span={16}>
            <div>
              <img src={item.image} alt={item.title} style={{ maxWidth: '100%' }} />
            </div>
          </Col>
        </Row>
      </Card>
    ));
  
};

  
  
  
  // Get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = combinedData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to the first page whenever the items per page is changed
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
                      <Option value="">{t("Messages.PeriodeErr")}</Option>
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
        <div style={{ flex: 1, position: 'sticky', top: '20px' }}>
          <Card style={{ backgroundColor: '#ECF0F1', padding: '20px', width: '400px' }}>
            <Form form={form} layout="vertical" name="advanced_search" onFinish={onFinish}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '10px' }}>
                  <Form.Item name="Matériaux" label={t("Header.Mat")}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {data && data.materiaux ? (
                        data.materiaux.map(materiau => (
                          <Checkbox  key={materiau.id}
                          value={materiau.title}
                          onChange={() => handleFilterSelect(materiau.category, materiau)}>{materiau.title}</Checkbox>
                        ))
                      ) : (
                        <li>{t("Messages.MatErr")}</li>
                      )}
                    </div>
                  </Form.Item>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Form.Item name="produit" label={t("Header.Prod")}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {data && data.produits ? (
                        data.produits.map(produit => (
                          <Checkbox key={produit.id} 
                          value={produit.title}
                            onChange={() => handleFilterSelect(produit.category,produit)}>{produit.title}</Checkbox>
                        ))
                      ) : (
                        <li>{t("Messages.ProdErr")}</li>
                      )}
                    </div>
                  </Form.Item>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Form.Item name="ouvrage" label={t("Header.Ouv")}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {data && data.ouvrages ? (
                        data.ouvrages.map(ouvrage => (
                          <Checkbox key={ouvrage.id} value="">{ouvrage.title}</Checkbox>
                        ))
                      ) : (
                        <li>{t("Messages.OuvErr")}</li>
                      )}
                    </div>
                  </Form.Item>
                </div>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ marginRight: '10px', backgroundColor: '#27AE60', marginTop: '20px' }} onClick={handleSelectFieldsChange}>
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
            {currentItems && renderItems(currentItems)}
          </Row>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
           
          <Row justify="center" align="middle">
  <Col>
    <Pagination
      current={currentPage}
      pageSize={itemsPerPage}
      total={combinedData.length}
      showSizeChanger={false}
      onChange={handlePageChange}
    />
  </Col>
  <Col>
    <Select
      value={itemsPerPage}
      onChange={handleItemsPerPageChange}
      style={{ width: '120px', marginLeft: '10px' }}
    >
<Option value={15}>15/page</Option>
              <Option value={30}>30/page</Option>
              <Option value={45}>45/page</Option>
              <Option value={60}>60/page</Option>
    </Select>
  </Col>
</Row>


          </div>
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
    <img className="dec" src={deconIcon} alt="Decon Icon" onClick={handleMenuToggle} />
    <a className='decLink' href="/lien2">{t("Menu.Deconnexion")}</a>
  </div>
</div>

      )}
      <ChatBox />
      <Footer />
    </div>
  );
};

export default RechercheAvancée;
