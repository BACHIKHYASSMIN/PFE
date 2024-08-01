import React, { useState, useEffect } from 'react';
import './Material.css';  
import '../Categorie.css'
import  menuIcon from "../Assets/icon.png"
import homeIcon from "../Assets/Vector.png"
import agrImg from  "../Assets/agr.png"
import pierImg from  "../Assets/pier.png"
import deconIcon from "../Assets/decon.png"
import NoImage from "../Assets/block.png"
import whitemenuIcon from "../Assets/wmenu.png"
import closeIcon from "../Assets/close.png"
import { Link } from 'react-router-dom';
import categorie from '../MatérialsCatégories/Categorie1'; 
import Details from '../MaterialDetails';
import Graph from '../Graph';
import FilterIcon from "../Assets/filter.png"
import noResults from "../Assets/no-results.png"
import closeBIcon from "../Assets/closeb.png"
import ArrowIcon from "../Assets/arrow.png"
import { useNavigate } from 'react-router-dom';
import OuvrageImg from "../Assets/building.png"
import Navbar from '../Elements/Navbar';
import { Form, Select, Button, Input, Card, Row, Col , Typography } from 'antd';
import Footer from '../Elements/Footer';
import ChatBox from '../Elements/ChatBox';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Ouvrage = ({buildings,products,monuments,usage}) => {
 

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCheckedMateriaux, setCheckedMateriaux] = useState({});
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isCheckedUsage1, setCheckedUsage1] = useState(false);
  const [isCheckedUsage2, setCheckedUsage2] = useState(false);
  const [isCheckedProduit, setCheckedProduit] = useState({});
  const [filteredBuildings, setFilteredBuildings] = useState(buildings);
  const [isCheckedMonument, setCheckedMonument] = useState({});
  const [filterMenuOpen, setFiltMenuOpen] = useState(null); 
  const [selectedProductId, setSelectedProductId] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [materialsClass, setMaterialsClass] = useState([]);
  const [data, setData] = useState([]);
  const { t,i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const buildingsPerPage = 10;
  const indexOfLastBuilding = currentPage * buildingsPerPage;
  const indexOfFirstBuilding = indexOfLastBuilding - buildingsPerPage;
  const currentBuildings = filteredBuildings.slice(indexOfFirstBuilding, indexOfLastBuilding);
 
    
  const handleNextPage = () => {
    if (currentPage < Math.ceil(buildings.length / buildingsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
     // Remplacez par l'ID du nœud souhaité
     const nodelabel= 'Ouvrage'; // Remplacez par la famille de nœud souhaitée
      
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
     const nodelabel= 'Ouvrage'; // Remplacez par la famille de nœud souhaitée
      
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
  const handleSearch = () => {
    if (searchTerm === "") {
      setFilteredBuildings(buildings);
    } else {
      const filteredOuvrages = buildings.filter((ouvrage) =>
        ouvrage.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBuildings(filteredOuvrages);
    }
    setCurrentPage(1); // Réinitialiser à la première page après la recherche
  };
  

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredBuildings(buildings);
    }
  }, [searchTerm, buildings]);

  useEffect(() => {
    const fetchData = async () => {
     // Remplacez par l'ID du nœud souhaité
     const nodelabel= 'Ouvrage'; // Remplacez par la famille de nœud souhaitée
      
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

  const handleFiltMenuToggle = (menuType) => {
    if (filterMenuOpen === menuType) {
      setFiltMenuOpen(null); // Fermer le menu si déjà ouvert
    } else {
      setFiltMenuOpen(menuType); // Ouvrir le menu correspondant
    }
  };

  const navigate = useNavigate();
  const handleImageClick = (ouvrageId) => {
    const integerOuvrageId = parseInt(ouvrageId, 10);
    navigate(`/ouvrageDetails/${integerOuvrageId}`);
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
        setFilteredBuildings(buildings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeconnect = () => {
    navigate('/');
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
    const handleCheckboxUsage1Change = () => {
      setCheckedUsage1(!isCheckedUsage1);
    };
    const handleCheckboxUsage2Change = () => {
      setCheckedUsage2(!isCheckedUsage2);
    };
    const handleCheckboxProduits = (index) => {
      // Créez une copie de l'état actuel des cases à cocher pour les ouvrages
      const updatedCheckedProduits = [...isCheckedProduit];
      // Inversez la valeur de la case à cocher pour l'ouvrage spécifié
      updatedCheckedProduits[index] = !updatedCheckedProduits[index];
      // Mettez à jour l'état avec la nouvelle valeur
      setCheckedProduit(updatedCheckedProduits);
    };
    const handleCheckboxMonument = (index) => {
 
      setCheckedMonument(!isCheckedMonument);
    };
    const handleCancel = () => {
      setChecked1(false);
      setChecked2(false);
      setChecked3(false);
      setCheckedProduit(false);
      setCheckedMonument(false);
      setCheckedUsage1(false);
      setCheckedUsage2(false);
      // Réinitialiser d'autres états de cases à cocher si nécessaire
    };
  
    return(
    <na className="material">
      <Navbar  /> 
      <div className="material-head">
          <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '10px',textAlign: 'center', marginLeft:'30%' }}>
          {t("Header.Ouv")}
      </Typography.Title>
          </div>
          <div className='MaterialCat'>
  <img className="home" src={homeIcon}  />
  <Link to="/acceuil" style={{ marginLeft:'10px',color: 'blue', textDecoration: 'none' }}>{t("navbar.accueil")}</Link> {/* Lien vers la page d'accueil */}
  <span className='Path' style={{ color: 'blue' }}>&gt;</span> {/* Utilisation de span pour le symbole ">" */}
  <Link to="/ouvrage" style={{ marginLeft:'10px', color: 'blue', textDecoration: 'none' }}>{t("Header.Ouv")}</Link> {/* Lien vers la page Monument */}
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
                placeholder={`${t("Tokens.RechercherUn")} ${t("Header.Ouv")}`}
                style={{ flex:1, marginRight: '10px', background: '#ECF0F1', color:'#2C3E50' }}
                value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col>
              <Button type="primary" htmlType="submit"  style={{backgroundColor :'#2C3E50'}} onClick={handleSearch}>
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
  ):  currentBuildings && currentBuildings.length > 0 ? (
    // Trier currentMaterials en mettant d'abord les éléments avec images
    currentBuildings.sort((a, b) => {
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
  }).map(ouvrage => (
    <div className='catItem' key={ouvrage.id}>
      <p>{ouvrage.title}</p>
      {ouvrage.image && ouvrage.image.length > 0 ? (
                <img 
                  className="mat-img" 
                  src={`data:image/jpg;base64, ${ouvrage.image[0]}`} // Affiche la première image
                  onClick={() => handleImageClick(ouvrage.id)} 
                  alt="Material"
                />
              ) : (
                <img style={{width:"128px",height:"128px",marginLeft:"5%"}} src={NoImage} onClick={() => handleImageClick(ouvrage.id)} />
              )}

    </div>
  ))
) : (
  <div>
    <img src={noResults} />
    <p>{t("Messages.OuvErr")}</p>
  </div>
  )
}

        
              
              </div>
              <div className='Links'>
  {currentPage > 1 && currentBuildings.length > 0 && (
    <Link onClick={handlePreviousPage}>Précédente</Link>
  )}
  {currentBuildings.length === buildingsPerPage && (
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
          <h3 className='catt'>{t("Header.Mat")}</h3>
          </div>
          {filterMenuOpen === t("Header.Mat") && (
          <div className='catboxList'>
          <ul>
          { materialsClass.map((materiau,index) => (
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
                setSelectedProductId(index);
              } else {
                setSelectedProductId(null); // Désélectionner le produit
                setData()
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
           onClick={() => handleFiltMenuToggle(t("Header.Prod"))}  />
          <h3 className='filter-name' >{t("Header.Prod")}</h3>
          </div>
          {filterMenuOpen === t("Header.Prod") && (
  <div className='catboxList'>
    <ul>
      {Array.from(
        new Set(
          products
            .map(produit => produit.famille)
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
          {monuments.map(monument => (
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
    <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={() => handleFiltMenuToggle(t("Header.Usages"))}  />
          <h3 className='filter-name' >{t("Header.Usages")}</h3>
          </div>
          {filterMenuOpen === t("Header.Usages")&& (
          <div className='catboxList'>
          <ul>
          {usage.map(use => (
        <div key={use.id}>
          <input
            type="checkbox"
            checked={isCheckedMonument[use.id] || false}
            onChange={e => {
              const isChecked = e.target.checked;
              setCheckedMonument(prevState => ({
                ...prevState,
                [use.id]: isChecked
              }));
              if (isChecked) {
                setSelectedProduct(use.id);
              } else {
                setSelectedProduct(null); // Désélectionner le produit
                setData()
              }
            }}
          />
          <label htmlFor={`checkbox-${use.id}`}>{use.title}</label>
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

<Footer />
    </na>
  );
  
}





export default Ouvrage;