import React, { useState, useEffect } from 'react';
import './Material.css';  
import '../Categorie.css'
import  menuIcon from "../Assets/icon.png"
import homeIcon from "../Assets/Vector.png"
import agrImg from  "../Assets/ceramic.png"
import pierImg from  "../Assets/brik.png"
import NoImage from "../Assets/block.png"
import noResults from "../Assets/no-results.png"
import deconIcon from "../Assets/decon.png"
import whitemenuIcon from "../Assets/wmenu.png"
import closeIcon from "../Assets/close.png"
import { Link } from 'react-router-dom';
import categorie from '../MatérialsCatégories/Categorie1'; 
import Details from '../MaterialDetails';
import Graph from '../Graph';
import FilterIcon from "../Assets/filter.png"
import closeBIcon from "../Assets/closeb.png"
import ArrowIcon from "../Assets/arrow.png"
import Navbar from '../Elements/Navbar';
import { Form, Select, Button, Input, Card, Row, Col , Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Footer from '../Elements/Footer';
import ChatBox from '../Elements/ChatBox';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
const Produit = ({products,buildings,monuments,places,materials}) => {
  
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
  const [isCheckedMateriaux, setCheckedMateriaux] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isCheckedOuvrage, setCheckedOuvrage] = useState({});
  const [isCheckedMonument, setCheckedMonument] = useState({});
  const [isCheckedPlace, setCheckedPlace] = useState({});
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [filteredProduits, setFilteredProduits] = useState(products);
  const [Productsdata, setProductsData] = useState([]);
  const [selectedMaterialIds, setSelectedMaterialIds] = useState([]);
  const [data, setData] = useState([]);
  const [isCheckedProduit, setCheckedProduit] = useState({});
  const { t,i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [filterMenuOpen, setFiltMenuOpen] = useState(null); 
  const productsPerPage = 10;
  const [materialsClass, setMaterialsClass] = useState([]);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProduits.slice(indexOfFirstProduct, indexOfLastProduct);

  //const currentProducts = Productsdata.slice(indexOfFirstProduct, indexOfLastProduct);
    
  const handleNextPage = () => {
    if (currentPage < Math.ceil(Productsdata.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  

  const handleFiltMenuToggle = (menuType) => {
    if (filterMenuOpen === menuType) {
      setFiltMenuOpen(null); // Fermer le menu si déjà ouvert
    } else {
      setFiltMenuOpen(menuType); // Ouvrir le menu correspondant
    }
  };

  const handleMaterialCheckboxChange = (materialId, isChecked) => {
    setCheckedMateriaux(prevState => ({
      ...prevState,
      [materialId]: isChecked
    }));
  
    if (isChecked) {
      setSelectedMaterialIds(prevState => [...prevState, materialId]);
    } else {
      setSelectedMaterialIds(prevState => prevState.filter(id => id !== materialId));
    }
  };
  
  
  useEffect(() => {
    const fetchData = async () => {
     // Remplacez par l'ID du nœud souhaité
     const nodelabel= 'Produit'; // Remplacez par la famille de nœud souhaitée
      
      try {
        const response = await axios.post('http://localhost:1000/api/RelationProductData', {
          nodeId: selectedProductId,
          nodeLabel: nodelabel ,
        });
        console.log('Données reçues:', response.data.data);
        const data = response.data.data;
        setData(data)
        
        // Traitez les données reçues ici
      } catch (error) {
        console.error('Erreur lors de la requête API:', error.message);
      }
    };
    
    if (selectedProductId !== null) {
      fetchData();
    }
  }, [selectedProductId]);


  useEffect(() => {
    const fetchData = async () => {
     // Remplacez par l'ID du nœud souhaité
     const nodelabel= 'Produit'; // Remplacez par la famille de nœud souhaitée
      
      try {
        const response = await axios.post('http://localhost:1000/api/RelationProductFamilyData', {
          nodesFamille: selectedProductId,
          nodeLabel: nodelabel ,
        });
        console.log('Données reçues:', response.data.data);
        const data = response.data.data;
        setData(data)
        
        // Traitez les données reçues ici
      } catch (error) {
        console.error('Erreur lors de la requête API:', error.message);
      }
    };
    
    if (selectedProductId !== null) {
      fetchData();
    }
  }, [selectedProductId]);


  const handleSearch = () => {
    if (searchTerm === "") {
      setFilteredProduits(products);
    } else {
      const filteredProducts = products.filter((produit) =>
        produit.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProduits(filteredProducts);
    }
    setCurrentPage(1); // Réinitialiser à la première page après la recherche
  };
  

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProduits(products);
    }
  }, [searchTerm, products]);
  

  useEffect(() => {
    const fetchData = async () => {
     // Remplacez par l'ID du nœud souhaité
     const nodelabel= 'Produit'; // Remplacez par la famille de nœud souhaitée
      
      try {
        const response = await axios.post('http://localhost:1000/api/RelationProductData', {
          nodeId: selectedProduct,
          nodeLabel: nodelabel ,
        });
        console.log('Données reçues:', response.data.data);
        const data = response.data.data;
        setData(data)
        
        // Traitez les données reçues ici
      } catch (error) {
        console.error('Erreur lors de la requête API:', error.message);
      }
    };
    
    if (selectedProduct !== null) {
      fetchData();
    }
  }, [selectedProduct]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =await axios.get('http://localhost:1000/api/MaterialsClass');
        const data=response.data.classes
        setMaterialsClass(data)
        
        // Traitez les données reçues ici
      } catch (error) {
        console.error('Erreur lors de la requête API:', error.message);
      }
    };
    fetchData()
  }, []);

  const navigate = useNavigate();
  const handleImageClick = (productId) => {
    const integerProductId = parseInt(productId, 10);
    navigate(`/produitDetails/${integerProductId}`);
  };
 
  const handleDeconnect = () => {
    navigate('/');
  };
  const  handleFilterMenuToggle = () => {
    setFilterMenuOpen(!isFilterMenuOpen);
  };
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
      
        setFilteredProduits(products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
    const handleCheckboxOuvrage = (index) => {
      // Créez une copie de l'état actuel des cases à cocher pour les ouvrages
      const updatedCheckedOuvrages = [...isCheckedOuvrage];
      // Inversez la valeur de la case à cocher pour l'ouvrage spécifié
      updatedCheckedOuvrages[index] = !updatedCheckedOuvrages[index];
      // Mettez à jour l'état avec la nouvelle valeur
      setCheckedOuvrage(updatedCheckedOuvrages);
    };
    const handleCheckboxPlaceChange = (placeId) => {
      if (selectedPlaces.includes(placeId)) {
        setSelectedPlaces(selectedPlaces.filter(id => id !== placeId));
      } else {
        setSelectedPlaces([...selectedPlaces, placeId]);
      }
    };
    const handleCheckboxMonument = (index) => {
 
      setCheckedMonument(!isCheckedMonument);
    };
    const handleCancel = () => {
      setChecked1(false);
      setChecked2(false);
      setChecked3(false);
  setCheckedOuvrage(false);
      setCheckedMonument(false);
      setSelectedPlaces([]);
      // Réinitialiser d'autres états de cases à cocher si nécessaire
    };

    
    return(
    <na className="material">
      <Navbar /> 
      <div className="material-head">
        
        <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '10px',textAlign: 'center', marginLeft:'30%' }}>
        {t("Header.Prod")}
      </Typography.Title>
          </div>

          <div className='MaterialCat'>
  <img className="home" src={homeIcon}  />
  <Link to="/acceuil" style={{marginLeft:'10px', color: 'blue', textDecoration: 'none' }}>{t("navbar.accueil")}</Link> {/* Lien vers la page d'accueil */}
  <span className='Path' style={{ color: 'blue' }}>&gt;</span> {/* Utilisation de span pour le symbole ">" */}
  <Link to="/produit" style={{marginLeft:'10px', color: 'blue', textDecoration: 'none' }}>  {t("Header.Prod")}</Link> {/* Lien vers la page Monument */}
</div>

          <Row justify="space-between" align="middle" style={{ marginBottom: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
        <Col>
        <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{  display: 'flex',  alignItems: 'center' , width: '400px', height: '60px', background: '#ECF0F1', marginRight: '20px' , justifyContent:"center"}}>
    <img  src={FilterIcon}  onClick={handleFilterMenuToggle}   />
    <Link   onClick={handleFilterMenuToggle} ><h2 style={{ textAlign: 'center', color: '#2C3E50', textDecoration:'none'}}>Filtres</h2></Link>
    </div>
    </div>
        </Col>
        <Col flex="auto" style={{ textAlign: 'right' }}>
          <Row gutter={16}>
            <Col flex="auto">
            <Input
    placeholder={`${t("Tokens.RechercherUn")} ${t("Header.Prod")}`}
    style={{ flex:1, marginRight: '10px', background: '#ECF0F1', color:'#2C3E50' }}
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    
  />
            </Col>
            <Col>
              <Button type="primary" htmlType="submit"  onClick={handleSearch} style={{backgroundColor :'#2C3E50'}}>
              {t("Btn.Valider")}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
          <div className='catElements'>
             {/* Affichage des données récupérées si disponibles */}
  {data && data.length > 0 ? (
    data.map((item) => (
      <div className='catItem' key={item.id}>
        <p>{item.title}</p>
        {/* Affichage de l'image si disponible */}
        {item.image && item.image.length > 0 ? (
          <img
            className="mat-img"
            src={`data:image/jpg;base64, ${item.image[0]}`}
            onClick={() => handleImageClick(item.id)}
            alt="Material"
          />
        ) : (
          <img src={NoImage}  onClick={() => handleImageClick(item.id)}/>
        )}
      </div>
    ))
  ) : selectedProductId ? (
    <li>{t("Messages.ProdErr")}</li>
  ):
          currentProducts && currentProducts.length > 0 ? (
    // Trier currentMaterials en mettant d'abord les éléments avec images
  currentProducts.sort((a, b) => {
    // Mettre en premier les éléments avec des images
    if (a.image && a.image.length > 0 && (!b.image || b.image.length === 0)) {
      return -1;
    }
    // Mettre en dernier les éléments sans images
    if ((!a.image || a.image.length === 0) && b.image && b.image.length > 0) {
      return 1;
    }
    // Sinon, conserver l'ordre actuel
    return 0;
  }).map(produit => (
    <div className='catItem' key={produit.id}>
      <p>{produit.title}</p>
      {produit.image && produit.image.length > 0 ? (
                <img 
                  className="mat-img" 
                  src={`data:image/jpg;base64, ${produit.image[0]}`} // Affiche la première image
                  onClick={() => handleImageClick(produit.id)} 
                  alt="Material"
                />
              ) : (
                <img style={{width:"128px",height:"128px",marginLeft:"5%"}} src={NoImage} onClick={() => handleImageClick(produit.id)} />
              )}

    </div>
  ))
) : (
  <div>
    <img src={noResults} />
    <p>{t("Messages.ProErr")}</p>
  </div>
  )
}
</div>

<div className='Links'>
  {currentPage > 1 && currentProducts.length > 0 && (
    <Link onClick={handlePreviousPage}>Précédente</Link>
  )}
  {currentProducts.length === productsPerPage && (
    <Link onClick={handleNextPage}>Suivante</Link>
  )}
</div>


        {/* Afficher le menu latéral s'il est ouvert */}
      {isFilterMenuOpen && (
        
        <div className="side-filter-menu">
          <div className="popFIcon">
          <h3 className='filter'>Filters</h3>
          <img className="closebmenu" src={closeBIcon} alt="Close Icon"
          onClick={handleFilterMenuToggle}  />
          </div>
          <div className='lineFBar'></div>

          <div className='FilterCat'>
    <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
       onClick={() => handleFiltMenuToggle(t("Header.Mat"))}  />
          <h3 className='filter-name' >{t("Header.Mat")}</h3>
          </div>
          {filterMenuOpen === t("Header.Mat") && (
  <div className='catboxList'>
    <ul>
      {materialsClass.map((materiau, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={isCheckedMateriaux[index] || false}
            onChange={e => {
              const isChecked = e.target.checked;
              setCheckedMateriaux(prevState => ({
                ...prevState,
                [index]: isChecked
              }));
              if (isChecked) {
                setSelectedProduct(index);
              } else {
                setSelectedProduct(null); // Désélectionner le produit
                setData();
              }
            }}
          />
          <label htmlFor={`checkbox-${index}`}>{materiau.title}</label>
        </div>
      ))}
    </ul>
  </div>
)}

    <div className='FilterCat'>
    <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
           onClick={() => handleFiltMenuToggle(t("Header.Ouv"))}  />
          <h3 className='filter-name' >{t("Header.Ouv")}</h3>
          </div>
          {filterMenuOpen === t("Header.Ouv") && (
  <div className='catboxList'>
    <ul>
      {Array.from(
        new Set(
          buildings
            .map(ouvrage => ouvrage.famille)
            .filter(famille => famille !== "" )
        )
      ).map((famille, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={isCheckedProduit[famille] || false}
            onChange={e => {
              const isChecked = e.target.checked;
              setCheckedProduit(prevState => ({
                ...prevState,
                [famille]: isChecked
              }));
              if (isChecked) {
                setSelectedProductId(famille);
              } else {
                setSelectedProductId(null); // Désélectionner le produit
                setData();
              }
            }}
          />
          <label htmlFor={`checkbox-${famille}`}>{famille}</label>
        </div>
      ))}
    </ul>
  </div>
)}
    <div className='FilterCat'>
    <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
           onClick={() => handleFiltMenuToggle(t("Header.Monu"))}  />
          <h3 className='filter-name' >{t("Header.Monu")}</h3>
          </div>
          {filterMenuOpen === t("Header.Monu") && (
          <div className='catboxList'>
          <ul>
          { monuments.map(monument => (
        <div key={monument.id}>
          <input
            type="checkbox"
            checked={isCheckedMonument[monument.id] || false}
            onChange={e => {
              const isChecked = e.target.checked;
              setCheckedMonument(prevState => ({
                ...prevState,
                [monument.id]: isChecked
              }));
              if (isChecked) {
                setSelectedProduct(monument.id);
              } else {
                setSelectedProduct(null); // Désélectionner le produit
                setData()
              }
            }}
          />
          <label htmlFor={`checkbox-${monument.id}`}>{monument.title}</label>
        </div>
      ))}
      </ul>
    </div> 
      )}
    <div className='FilterCat'>
        <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"   onClick={() => handleFiltMenuToggle(t("Header.Place"))}  />
        <h3 className='filter-name'>{t("Header.Place")}</h3>
      </div>
      {filterMenuOpen === t("Header.Place") && (
          <div className='catboxList'>
          <ul>
          { places.map(place => (
        <div key={place.id}>
          <input
            type="checkbox"
            checked={isCheckedPlace[place.id] || false}
            onChange={e => {
              const isChecked = e.target.checked;
              setCheckedPlace(prevState => ({
                ...prevState,
                [place.id]: isChecked
              }));
              if (isChecked) {
                setSelectedProduct(place.id);
              } else {
                setSelectedProduct(null); // Désélectionner le produit
                setData()
              }
            }}
          />
          <label htmlFor={`checkbox-${place.id}`}>{place.title}</label>
        </div>
      ))}
      </ul>
    </div> 
      )}
          <div className='lineFBar'></div>
          <div className='ValBtn'>
          <button className='annuler' onClick={handleCancel}>{t("Btn.Annuler")}</button>
          <button className='valider'>{t("Btn.Valider")}</button>
          </div>
        </div>
      )}


      
   <ChatBox/>   

<Footer/>
    </na>
  );
}





export default Produit;