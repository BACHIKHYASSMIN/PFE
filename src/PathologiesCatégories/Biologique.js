
import '../Categorie.css';
import React, { useState, useEffect }  from 'react';
import  menuIcon from "../Assets/icon.png"
import homeIcon from "../Assets/Vector.png"
import FilterIcon from "../Assets/filter.png"
import ArrowIcon from "../Assets/arrow.png"
import deconIcon from "../Assets/decon.png"
import whitemenuIcon from "../Assets/wmenu.png"
import NoImage from "../Assets/block.png"
import closeBIcon from "../Assets/closeb.png"
import closeIcon from "../Assets/close.png"
import { Link } from 'react-router-dom';
import Navbar from '../Elements/Navbar';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Row, Col , Typography } from 'antd';
import Footer from '../Elements/Footer';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext';
function Biologique({pathologies,products, buildings}) {
  const { t} = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCheckedMateriaux, setCheckedMateriaux] = useState(false);
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isCheckedOuvrage, setCheckedOuvrage] = useState({})
  const [materialsClass, setMaterialsClass] = useState([]);
  const [isCheckedProduit, setCheckedProduit] = useState({})
  const [filterMenuOpen, setFiltMenuOpen] = useState(null); 
  const [selectedProductId, setSelectedProductId] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [data, setData] = useState([]);
  const {logout}=useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPathologies, setFilteredPathologies] = useState(pathologies);
  const pathologiesPerPage = 10;
  const indexOfLastPathologie = currentPage * pathologiesPerPage;
  const indexOfFirstPathologie = indexOfLastPathologie - pathologiesPerPage;
  const currentPathologies = filteredPathologies.filter(pathologie => pathologie.category === "BIOLOGIQUE").slice(indexOfFirstPathologie, indexOfLastPathologie);
  
  const handleNextPage = () => {
    if (currentPage < Math.ceil(pathologies.length/ pathologiesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
     // Remplacez par l'ID du nœud souhaité
     const nodelabel= 'Pathologie'; // Remplacez par la famille de nœud souhaitée
      
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
     // Remplacez par l'ID du nœud souhaité
     const nodelabel= 'Pathologie'; // Remplacez par la famille de nœud souhaitée
      
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

  const handleFiltMenuToggle = (menuType) => {
    if (filterMenuOpen === menuType) {
      setFiltMenuOpen(null); // Fermer le menu si déjà ouvert
    } else {
      setFiltMenuOpen(menuType); // Ouvrir le menu correspondant
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleSearch = () => {
    const filteredPathologie = filteredPathologies.filter((pathologie) =>
      pathologie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPathologies(filteredPathologie);
    setCurrentPage(1); // Réinitialiser à la première page après la recherche
  };
  const navigate = useNavigate();
  
  const handleImageClick = (materialId) => {
    const integerMaterialId = parseInt(materialId, 10);
    navigate(`/details/${integerMaterialId}`);
  };

  const handleDeconnect = () => {
    logout();
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
        setFilteredPathologies(pathologies)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
    const handleCheckbox1Change = () => {
      setChecked1(!isChecked1);
    };
    const handleCheckbox2Change = () => {
      setChecked2(!isChecked2);
    };
    const handleCheckbox3Change = () => {
      setChecked3(!isChecked3);
    };
    const handleCancel = () => {
      setChecked1(false);
      setChecked2(false);
      setChecked3(false);
  setCheckedOuvrage(false);
      setCheckedProduit(false);
    
      // Réinitialiser d'autres états de cases à cocher si nécessaire
    };
  return (
      <div className='cat'>
         <Navbar/>
        <div className="categorie-head">
        
          <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '10px',textAlign: 'center', marginLeft:'5%' , display:'inline'}}>
          {t("Menu.Biologique")}
      </Typography.Title>
         
          </div>
      
          <div className='MaterialCat'>
  <img className="home" src={homeIcon}  />
  <Link to="/acceuil" style={{ marginLeft:'10px',color: 'blue', textDecoration: 'none' }}>{t("navbar.accueil")}</Link> {/* Lien vers la page d'accueil */}
  <span className='Path' style={{ color: 'blue' }}>&gt;</span> {/* Utilisation de span pour le symbole ">" */}
  <Link to="/pathologie" style={{ marginLeft:'10px',color: 'blue', textDecoration: 'none' }}>{t("Header.Path")}</Link> {/* Lien vers la page Monument */}
  <span className='Path' style={{ color: 'blue' }}>&gt;</span> {/* Utilisation de span pour le symbole ">" */}
  <Link to="/biologique" style={{ marginLeft:'10px',color: 'blue', textDecoration: 'none' }}> {t("Menu.Biologique")}</Link> {/* Lien vers la page Monument */}
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
        <Col flex="auto" style={{ textAlign: 'right'}}>
          <Row gutter={16}>
            <Col flex="auto" style={{ marginLeft:'6%'}}>
              <Input
                placeholder={`${t("Tokens.RechercherUn")} ${t("Header.Path")}`}
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
          
      <div className='catPathlements'>
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
  currentPathologies  ? (
   currentPathologies 
    .map(pathologie => (
      <div className='catItem' key={pathologie.id}>
      <p>{pathologie.title}</p>
      {pathologie.image && pathologie.image.length > 0 ? (
                <img 
                  className="mat-img" 
                  src={`data:image/jpg;base64, ${pathologie.image[0]}`} // Affiche la première image
                  onClick={() => handleImageClick(pathologie.id)} 
                  alt="Material"
                />
              ) : (
                <img style={{width:"128px",height:"128px",marginLeft:"5%"}} src={NoImage} onClick={() => handleImageClick(pathologie.id)} />
              )}

    </div>
      ))
  ) : (
    <li>{t("Messages.MatErr")}</li>
  )}
</div>

<div className='Links'>
  {currentPage > 1 && currentPathologies.length > 0 && (
    <Link onClick={handlePreviousPage}>Précédente</Link>
  )}
  {currentPathologies.length === pathologiesPerPage-1 && (
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
            .filter(famille => famille !==undefined )
        )
      ).map((famille, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={isCheckedOuvrage[famille] || false}
            onChange={e => {
              const isChecked = e.target.checked;
              setCheckedOuvrage(prevState => ({
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
     
          <div className='lineFBar'></div>
          <div className='ValBtn'>
          <button className='annuler' onClick={handleCancel}>{t("Btn.Annuler")}</button>
          <button className='valider'>{t("Btn.Valider")}</button>
          </div>
        </div>
      )}


      
      <Footer />
      </div>
      
  );
}

export default Biologique;
