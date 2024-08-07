import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Input, Card, Row, Col, Checkbox, Typography, Modal, Pagination } from 'antd';
import Navbar from './Elements/Navbar';
import Footer from './Elements/Footer';
import ArrowIcon from "./Assets/arrow.png"
import ChatBox from './Elements/ChatBox';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios, { all } from 'axios';
import deconIcon from "./Assets/decon.png";
import whitemenuIcon from "./Assets/wmenu.png";
import closeIcon from "./Assets/close.png";
import menuIcon from "./Assets/icon.png";
import './RechercheAvancée.css';
import { ContinuousSizeLegend } from 'react-vis';
import { filter } from 'd3';
import { getAllData, getGraph } from './apiServices';
import { configConsumerProps } from 'antd/es/config-provider';

const { Option } = Select;

const RechercheAvancée = ({products,materials,buildings,monuments,places,periodes,colors,pathologies}) => {
  const [form] = Form.useForm();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [alldata,setAllData]= useState([])
  const [filterMenuOpen, setFiltMenuOpen] = useState(null); 
  const [combinedData, setCombinedData] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [isAdvancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [isCategorySelected,setCategorySelected]=useState(false);
  const [isPlaceSelected,setPlacesSelecetd]=useState(false);
  const [isColorSelected,setColorsSeleceted]=useState(false);
  const [isPeriodeSelceted,setPeriodesSelected]=useState(false);
  const [isSearchBar, setSearchBar] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15); // Default number of items per page
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [filtredData,setFiltredData]=useState([]);


  const handleFilterSelect = (category,filter) => {
    filter.category=category
      // Vérifier si le filtre est déjà sélectionné
  const isFilterSelected = selectedFilters.some(selectedFilter => selectedFilter.id === filter.id);

  // Si le filtre est déjà sélectionné, le retirer du tableau
  if (isFilterSelected) {
    setSelectedFilters(prevFilters => prevFilters.filter(selectedFilter => selectedFilter.id !== filter.id));
  } else {
    // Sinon, l'ajouter au tableau
    setSelectedFilters(prevFilters => [...prevFilters, filter]);
  }
  };
  
  // Ensuite, pour afficher les filtres sélectionnés, vous devez utiliser selectedFilters dans votre JSX :
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data= await getAllData();
        setAllData(data);
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData=async ()=>{
      await renderItems(combinedData)

    }
     
   fetchData();
  },[])


  const handleSearch = async () => {
    try {
      // Initialiser un ensemble pour stocker les résultats d'intersection
      let intersectionSet = new Set();
  
      // Fonction pour obtenir les données de l'API et les convertir en ensemble d'IDs
      const fetchAndConvertToSet = async (url) => {
        const response = await axios.get(url);
        return new Set(response.data.nodes.map(node => node.title));
      };
  
      // Tableau des URLs à interroger en fonction des filtres sélectionnés
      const urls = [];
  
      if (isColorSelected) {
        urls.push(`http://localhost:1000/api/nodes/Color/${selectedColor}`);
      }
  
      if (isPlaceSelected) {
        urls.push(`http://localhost:1000/api/nodes/advancedSearch/${selectedPlace}`);
      }
  
      if (isPeriodeSelceted) {
        urls.push(`http://localhost:1000/api/nodes/advancedSearch/${selectedPeriod}`);
      }
  
      if (isSearchBar) {
        urls.push(`http://localhost:1000/api/nodes/Search/${searchTerm}`);
      }
  
      if (isCategorySelected) {
        urls.push(`http://localhost:1000/api/nodes/Category/${selectedCategory}`);
      }
  
      // Parcourir chaque URL et mettre à jour l'intersection des résultats
      for (const url of urls) {
        const currentSet = await fetchAndConvertToSet(url);
  
        if (intersectionSet.size === 0) {
          intersectionSet = currentSet;
        } else {
          intersectionSet = new Set([...intersectionSet].filter(title => currentSet.has(title)));
        }
      }
  
      // Filtrer les données uniques à partir de l'intersection des IDs
      const responseArray = [];
      for (const title of intersectionSet) {
        const response = await axios.get(`http://localhost:1000/api/nodes/Search/${title}`);
        responseArray.push(...response.data.nodes);
        
      }
       // Supprimer les doublons
    const uniqueResults = Array.from(new Set(responseArray.map(a => a.id)))
    .map(id => {
      return responseArray.find(a => a.id === id);
    });

      setFiltredData(uniqueResults);
     
    } catch (error) {
      console.error('Error fetching data:', error);
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

 

  useEffect(() => {
    if (materials && products && buildings) {
      const combined = [
        ...(materials || []).map(item => ({ ...item, category: t("Header.Mat") })),
        ...(products || []).map(item => ({ ...item, category: t("Header.Prod") })),
        ...(buildings || []).map(item => ({ ...item, category: t("Header.Ouv") })),
       // ...(data.pathologies || []).map(item => ({ ...item, category: t("Header.Path") })),
        ...(monuments || []).map(item => ({ ...item, category: t("Header.Monu") }))
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
    setPeriodesSelected(true);
    setSelectedPeriod(value);
    handleSearch()
      
  };
  
  const handleCategoryChange = (value) => {
    setCategorySelected(true);
    setSelectedCategory(value);
    handleSearch()
      
  };
  const handlePlaceChange = (value) => {
    setPlacesSelecetd(true)
    setSelectedPlace(value);
  handleSearch()

  };


  const handleColorChange = (value) => {
    setColorsSeleceted(true)
    setSelectedColor(value);
  handleSearch()
   
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
  const handleFiltMenuToggle = (menuType) => {
    if (filterMenuOpen === menuType) {
      setFiltMenuOpen(null); // Fermer le menu si déjà ouvert
    } else {
      setFiltMenuOpen(menuType); // Ouvrir le menu correspondant
    }
  };
  const handleVoirPlus = (id) => {
    navigate(`/details/${id}`);
  };

  const getDetailLink = (category, itemId) => {
    switch (category) {
      case t("Header.Mat")  :
        navigate(`/materiauDetails/${itemId}`);
        break;
      case "Materiau" :
        navigate(`/materiauDetails/${itemId}`);
        break;
      case "Produit" :
        navigate(`/produitDetails/${itemId}`);
        break;
      case t("Header.Prod"):
        navigate(`/produitDetails/${itemId}`);
        break;
      case t("Header.Monu"):
        navigate(`/monumentDetails/${itemId}`);
        break;
      case "Monument":
        navigate(`/monumentDetails/${itemId}`);
        break;
      case t("Header.Ouv"):
        navigate(`/ouvrageDetails/${itemId}`);
        break;
      case "Ouvrage":
        navigate(`/ouvrageDetails/${itemId}`);
        break;
      case t("Header.Path"):
        navigate(`/details/${itemId}`);
        break;
      case "Pathologie":
        navigate(`/details/${itemId}`);
        break;
      default:
        console.error("Unknown category:", category);
    }

};


const renderItems = (items) => {
  if (selectedFilters && selectedFilters.length > 0) {
    return selectedFilters.map((filter, index) => (
      <Card
        key={index}
        title={filter.category}
        extra={<a onClick={() => getDetailLink(filter.category, filter.id)}>Voir plus</a>}
        style={{ width: '30%', marginRight: '10px', marginLeft: '20px', marginBottom: '20px', border: '1px solid #2C3E50' }}
      >
        <Row gutter={16} align="middle">
          <Col span={16}>
            <p>{filter.title}</p>
          </Col>
        </Row>
      </Card>
    ));
  } else if(filtredData && filtredData.length > 0 && isPlaceSelected ){
    return  filtredData.map((filter, index) =>
      (
        <Card
        key={index}
        title={filter.category}
        extra={<a onClick={() => getDetailLink(filter.category[0],filter.id)}>Voir plus</a>}
        style={{ width: '30%', marginRight: '10px', marginLeft: '20px', marginBottom: '20px', border: '1px solid #2C3E50' }}
      >
        <Row gutter={16} align="middle">
          <Col span={16}>
            <p>{filter.title}</p>
          </Col>
        </Row>
      </Card>
    ));
  } else if(filtredData && filtredData.length >0 && isPeriodeSelceted ){
    return  filtredData.map((filter, index) =>
      (
        <Card
        key={index}
        title={filter.category}
        extra={<a onClick={() => getDetailLink(filter.category[0],filter.id)}>Voir plus</a>}
        style={{ width: '30%', marginRight: '10px', marginLeft: '20px', marginBottom: '20px', border: '1px solid #2C3E50' }}
      >
        <Row gutter={16} align="middle">
          <Col span={16}>
            <p>{filter.title}</p>
          </Col>
        </Row>
      </Card>
    ));
  } else if(filtredData && filtredData.length >0 && isSearchBar ){
    return  filtredData.map((filter, index) =>
      (
        <Card
        key={index}
        title={filter.category}
        extra={<a onClick={() => getDetailLink(filter.category[0],filter.id)}>Voir plus</a>}
        style={{ width: '30%', marginRight: '10px', marginLeft: '20px', marginBottom: '20px', border: '1px solid #2C3E50' }}
      >
        <Row gutter={16} align="middle">
          <Col span={16}>
            <p>{filter.title}</p>
          </Col>
        </Row>
      </Card>
    ));
  } else if(filtredData && filtredData.length >0 && isCategorySelected ){
    return  filtredData.map((filter, index) =>
      (
        <Card
        key={index}
        title={filter.category}
        extra={<a onClick={() => getDetailLink(filter.category[0],filter.id)}>Voir plus</a>}
        style={{ width: '30%', marginRight: '10px', marginLeft: '20px', marginBottom: '20px', border: '1px solid #2C3E50' }}
      >
        <Row gutter={16} align="middle">
          <Col span={16}>
            <p>{filter.title}</p>
          </Col>
        </Row>
      </Card>
    ));
  } else if(filtredData && filtredData.length >0 && isColorSelected ){
    return  filtredData.map((filter, index) =>
      (
        <Card
        key={index}
        title={filter.category}
        extra={<a onClick={() => getDetailLink(filter.category[0],filter.id)}>Voir plus</a>}
        style={{ width: '30%', marginRight: '10px', marginLeft: '20px', marginBottom: '20px', border: '1px solid #2C3E50' }}
      >
        <Row gutter={16} align="middle">
          <Col span={16}>
            <p>{filter.title}</p>
          </Col>

        </Row>
      </Card>
    ));
  }
    else {
      // Afficher tous les éléments de la liste
      return items.map((item, index) => (
        <Card
          key={index}
          title={item.category}
         extra={<a onClick={() => getDetailLink(item.category, item.id)}>Voir plus</a>}
          style={{
            width: '30%',
            marginRight: '10px',
            marginLeft: '20px',
            marginBottom: '20px',
            border: '1px solid #2C3E50',
          }}>
          <Row gutter={16} align="middle">
            <Col span={16}>
              <p>{item.title}</p>
            </Col>
          </Row>
        </Card>
      ));
    }
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
       
        <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          {t("navbar.rechercheAvancee")}
        </Typography.Title>
      </div>
      <Row justify="space-between" align="middle" style={{ marginBottom: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
        <Col>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '400px', height: '60px', background: '#5B828E', marginRight: '20px' }}>
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
                  style={{ flex: 1, marginRight: '10px', background: '#ECF0F1', color: '#5B828E' }}
                  value={searchTerm}
                  onChange={(e) => { 
                    setSearchTerm(e.target.value);
                    setSearchBar(true);
                   }

                  }
                  onCancel={()=> setSearchBar(false)}
                />
              </Col>
              <Col>
                <Button type="primary" htmlType="submit" style={{ backgroundColor: '#5B828E', float: 'right' }} onClick={handleAdvancedSearch}>
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
                  <Button type="primary" onClick={handleSearch}>
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
      style={{ width: '100%' }}
      onChange={(value) => handlePeriodChange(value)}
      onDeselect={() =>setPeriodesSelected(false)}
      > 
      {periodes ? (
        periodes.map(periode => (
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
                    onChange={(value) => handlePlaceChange
                      (value)}
                     onDeselect={() =>setPlacesSelecetd(false)}
                    style={{ width: '100%' }}
                  >
                    {places ? (
                      places.map(place => (
                        <Option key={place.id} value={place.title} >
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
                    value={selectedCategory}
                    onChange={(value) => handleCategoryChange(value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="Materiau">{t("Header.Mat")}</Option>
                    <Option value="Produit">{t("Header.Prod")}</Option>
                    <Option value="Ouvrage">{t("Header.Ouv")}</Option>
                    <Option value="Pathologie">{t("Header.Path")}</Option>
                    <Option value="Monument">{t("Header.Monu")}</Option>
                  </Select>
                </Form.Item>
                <Form.Item label={t("Header.Color")}>
                  <Select
                    mode="multiple"
                    value={selectedColor}
                    onChange={(value) =>handleColorChange(value)}
                    style={{ width: '100%' }}
                  >
                    {colors ? (
                      colors.map(couleur => (
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
                  <Form.Item >
                  <div className='FilterCat'>
          <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
           onClick={() => handleFiltMenuToggle(t("Header.Mat"))}  />
          <h3 className='catt'>{t("Header.Mat")}</h3>
          </div>
          {filterMenuOpen === t("Header.Mat")&& (
             <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {materials  ? (
                        materials.map(materiau => (
                          <Checkbox  key={materiau.id}
                          value={materiau.title}
                          onChange={() => handleFilterSelect(t("Header.Mat"),materiau)}>{materiau.title}</Checkbox>
                        ))
                      ) : (
                        <li>{t("Messages.MatErr")}</li>
                      )}
                    </div>
                       )}
                  </Form.Item>
                </div>
                <div style={{ marginBottom: '10px' }}>
                <Form.Item name="produit" >
    <div className='FilterCat'>
          <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
           onClick={() => handleFiltMenuToggle(t("Header.Prod"))}  />
          <h3 className='catt'>{t("Header.Prod")}</h3>
          </div>
          {filterMenuOpen === t("Header.Prod")&& (
             <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {products  ? (
                        products.map(produit => (
                          <Checkbox key={produit.id} 
                          value={produit.title}
  
                            onChange={() => handleFilterSelect(t("Header.Prod"),produit)}>{produit.title}</Checkbox>
                        ))
                      ) : (
                        <li>{t("Messages.ProdErr")}</li>
                      )}
                    </div>
                       )}
                  </Form.Item>
                </div>

                <div style={{ marginBottom: '10px' }}>
                <Form.Item name="ouvrage">
    <div className='FilterCat'>
          <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
           onClick={() => handleFiltMenuToggle(t("Header.Ouv"))}  />
          <h3 className='catt'>{t("Header.Ouv")}</h3>
          </div>
          {filterMenuOpen === t("Header.Ouv") && (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {buildings ? (
                        buildings.map(ouvrage => (
                          <Checkbox key={ouvrage.id} value={ouvrage.title}
                          onChange={() => handleFilterSelect(t("Header.Ouv"),ouvrage)}>{ouvrage.title}</Checkbox>
                        ))
                      ) : (
                        <li>{t("Messages.OuvErr")}</li>
                      )}
                    </div>
                         )}
                  </Form.Item>
                </div>
                <div style={{ marginBottom: '10px' }}>
                <Form.Item name="produit" >
    <div className='FilterCat'>
          <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
           onClick={() => handleFiltMenuToggle(t("Header.Monu"))}  />
          <h3 className='catt'>{t("Header.Monu")}</h3>
          </div>
          {filterMenuOpen === t("Header.Monu")&& (
             <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {monuments  ? (
                        monuments.map(monument => (
                          <Checkbox key={monument.id} 
                          value={monument.title}
  
                            onChange={() => handleFilterSelect(t("Header.Prod"),monument)}>{monument.title}</Checkbox>
                        ))
                      ) : (
                        <li>{t("Messages.ProdErr")}</li>
                      )}
                    </div>
                       )}
                  </Form.Item>
                </div>
                <div style={{ marginBottom: '10px' }}>
                <Form.Item name="produit" >
    <div className='FilterCat'>
          <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
           onClick={() => handleFiltMenuToggle(t("Header.Path"))}  />
          <h3 className='catt'>{t("Header.Path")}</h3>
          </div>
          {filterMenuOpen === t("Header.Path")&& (
             <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {pathologies  ? (
                        pathologies.map(pathologie => (
                          <Checkbox key={pathologie.id} 
                          value={pathologie.title}
  
                            onChange={() => handleFilterSelect(t("Header.Prod"),pathologie)}>{pathologie.title}</Checkbox>
                        ))
                      ) : (
                        <li>{t("Messages.ProdErr")}</li>
                      )}
                    </div>
                       )}
                  </Form.Item>
                </div>
                <Form.Item>
                  <Button type="primary" htmlType="submit"  style={{ marginRight: '10px', backgroundColor: '#27AE60', marginTop: '20px' }}>
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
     
      
      <ChatBox />
      <Footer />
    </div>
  );
};

export default RechercheAvancée;
