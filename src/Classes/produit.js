import React, { useState, useEffect } from 'react';
import './Material.css';  
import '../Categorie.css'
import  menuIcon from "../Assets/icon.png"
import homeIcon from "../Assets/Vector.png"
import agrImg from  "../Assets/ceramic.png"
import pierImg from  "../Assets/brik.png"
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
const Produit = ({products}) => {
 
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isCheckedOuvrage, setCheckedOuvrage] = useState({});
  const [isCheckedMonument, setCheckedMonument] = useState({});
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [Productsdata, setProductsData] = useState([]);
  const [data, setData] = useState([]);
  const { t,i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Productsdata.slice(indexOfFirstProduct, indexOfLastProduct);
    
  const handleNextPage = () => {
    if (currentPage < Math.ceil(Productsdata.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
const handleSearch = () => {
  
    const filteredProduits = Productsdata.filter((produit) =>
      produit.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData({ ...Productsdata, filteredProduits });
  }


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
        setProductsData(products);
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
          <img className="menu" src={menuIcon} alt="Menu Icon"onClick={handleMenuToggle}  />
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
          {currentProducts ? (
  currentProducts.map(produit => (
    <div className='catItem'>
      <p>{produit.title}</p>
      <img key={produit.id} src={`data:image/jpg;base64, ${produit.image}`} onClick={() => handleImageClick(produit.id)} />
    </div>
  ))
) : (
  <li>{t("Messages.ProdErr")}</li>
)}

      </div>

              <div className='Links'>
              <Link onClick={handlePreviousPage}>Précedente</Link>
              <div ></div>
              <Link  onClick={handleNextPage}>Suivante</Link>
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
          onClick={handleFilterMenuToggle}  />
          <h3 className='catt'> {t("Header.Mat")}</h3>
          </div>
          <div className='catboxList'>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked1}  onChange={handleCheckbox1Change} />
      <label htmlFor="checkbox"> {t("Menu.MAT")}</label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked2}  onChange={handleCheckbox2Change} />
      <label htmlFor="checkbox"> {t("Menu.MER")}</label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked3}  onChange={handleCheckbox3Change} />
      <label htmlFor="checkbox">{t("Menu.Bois")}</label>
    </div>   
    </div> 
    <div className='FilterCat'>
    <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={handleFilterMenuToggle}  />
          <h3 className='filter-name' >{t("Header.Ouv")}</h3>
          </div>
          <div className='catboxList'>
          <ul>
          { data.ouvrages.map(ouvrage => (
        <div key={ouvrage.id}>
          <input
            type="checkbox"
            checked={isCheckedOuvrage[ouvrage.id] || false}
            onChange={e => {
              const isChecked = e.target.checked;
              setCheckedOuvrage(prevState => ({
                ...prevState,
                [ouvrage.id]: isChecked
              }));
            }}
          />
          <label htmlFor={`checkbox-${ouvrage.id}`}>{ouvrage.title}</label>
        </div>
      ))}
      </ul>
    </div> 
    
    <div className='FilterCat'>
    <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={handleFilterMenuToggle}  />
          <h3 className='filter-name' >{t("Header.Monu")}</h3>
          </div>
          <div className='catboxList'>
          <ul>
          { data.monuments.map(monument => (
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
            }}
          />
          <label htmlFor={`checkbox-${monument.id}`}>{monument.title}</label>
        </div>
      ))}
      </ul>
    </div> 
    <div className='FilterCat'>
        <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown" onClick={handleFilterMenuToggle} />
        <h3 className='filter-name'>{t("Header.Place")}</h3>
      </div>
      <div className='catboxList'>
        <ul>
          {data.places.map(place => (
            <div key={place.id}>
              <input
                type="checkbox"
                checked={selectedPlaces.includes(place.id)}
                onChange={() => handleCheckboxPlaceChange(place.id)}
              />
              <label htmlFor={`checkbox-${place.id}`}>{place.title}</label>
            </div>
          ))}
        </ul>
      </div>
    
          <div className='lineFBar'></div>
          <div className='ValBtn'>
          <button className='annuler' onClick={handleCancel}>{t("Btn.Annuler")}</button>
          <button className='valider'>{t("Btn.Valider")}</button>
          </div>
        </div>
      )}


       {/* Afficher le menu latéral s'il est ouvert */}
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
  <Link to="/déformation" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Déformation")}</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/détachement" style={{ textDecoration: 'none', color: '#FFFFFF' }}>{t("Menu.Détachement")}</Link>
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
    <img className="dec" src={deconIcon} alt="Decon Icon" onClick={handleDeconnect} />
    <a className='decLink' href="/lien2">{t("Menu.Deconnexion")}</a>
  </div>
</div>

      )}
   <ChatBox/>   

<Footer/>
    </na>
  );
}





export default Produit;