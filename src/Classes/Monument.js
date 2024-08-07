import React, { useState, useEffect } from 'react';
import './Material.css';  
import '../Categorie.css'
import  menuIcon from "../Assets/icon.png"
import homeIcon from "../Assets/Vector.png"
import deconIcon from "../Assets/decon.png"
import whitemenuIcon from "../Assets/wmenu.png"
import closeIcon from "../Assets/close.png"
import { Link } from 'react-router-dom';
import FilterIcon from "../Assets/filter.png"
import closeBIcon from "../Assets/closeb.png"
import ArrowIcon from "../Assets/arrow.png"
import MonumentImg from "../Assets/arc.png"
import Navbar from '../Elements/Navbar';
import { Form, Select, Button, Input, Card, Row, Col , Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Footer from '../Elements/Footer';
import ChatBox from '../Elements/ChatBox';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import NoImage from "../Assets/block.png"
import { useTranslation } from 'react-i18next';
const Monument = ({monuments, products, buildings, periodes,places}) => {
 

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isCheckedOuvrage, setCheckedOuvrage] = useState({});
  const [isCheckedProduit, setCheckedProduit] = useState({});
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedPeriods, setSelectedPeriods] = useState([]);
  const { t,i18n } = useTranslation();
  const [Monumentsdata, setMonumentsData] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { logout } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterMenuOpen, setFiltMenuOpen] = useState(null); 
  const monumentsPerPage = 10;
  const indexOfLastMonuement = currentPage * monumentsPerPage;
  const indexOfFirstMonuement = indexOfLastMonuement - monumentsPerPage;
  const currentMonuments = monuments.slice(indexOfFirstMonuement, indexOfLastMonuement);
    
  const handleNextPage = () => {
    if (currentPage < Math.ceil(monuments.length / monumentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleSearch = () => {
    const filteredMonuments = Monumentsdata.filter((monument) =>
      monument.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData({ ...Monumentsdata,filteredMonuments });
  };
console.log(monuments)

const handleFiltMenuToggle = (menuType) => {
  if (filterMenuOpen === menuType) {
    setFiltMenuOpen(null); // Fermer le menu si déjà ouvert
  } else {
    setFiltMenuOpen(menuType); // Ouvrir le menu correspondant
  }
};

  const navigate = useNavigate();
  const handleImageClick = (monumentId) => {
    const integerId = parseInt(monumentId, 10);
    navigate(`/monumentDetails/${integerId}`);
  };

  const handleDeconnect = () => {
    logout(); // Déconnexion de l'utilisateur
    navigate('/'); // Redirection vers la page d'accueil
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMonumentsData(monuments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const  handleFilterMenuToggle = () => {
    setFilterMenuOpen(!isFilterMenuOpen);
  };
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
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
   

  const handleCheckboxChange = (periodId) => {
    if (selectedPeriods.includes(periodId)) {
      setSelectedPeriods(selectedPeriods.filter(id => id !== periodId));
    } else {
      setSelectedPeriods([...selectedPeriods, periodId]);
    }
  };

    const handleCheckboxProduit = (index) => {
 
      setCheckedProduit(!isCheckedProduit);
    };
    const handleCancel = () => {
      setChecked1(false);
      setChecked2(false);
      setChecked3(false);
      setCheckedOuvrage(false);
      setSelectedPeriods([]);
      setSelectedPlaces([]);
      setCheckedProduit(false);
      // Réinitialiser d'autres états de cases à cocher si nécessaire
    };
    

    return(
    <na className="material">
       <Navbar  /> 
      <div className="material-head">
         
         <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '10px',textAlign: 'center', marginLeft:'30%' }}>
         {t("Header.Monu")}
      </Typography.Title>
          </div>
          <div className='MaterialCat'>
  <img className="home" src={homeIcon}  />
  <Link to="/acceuil" style={{marginLeft:'10px', color: 'blue', textDecoration: 'none' }}>{t("navbar.accueil")}</Link> {/* Lien vers la page d'accueil */}
  <span className='Path' style={{ color: 'blue' }}>&gt;</span> {/* Utilisation de span pour le symbole ">" */}
  <Link to="/monument" style={{ marginLeft:'10px',color: 'blue', textDecoration: 'none' }}>{t("Header.Monu")}</Link> {/* Lien vers la page Monument */}
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
                placeholder={`${t("Tokens.RechercherUn")} ${t("Header.Monu")}`}
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
          {currentMonuments  ? (
            currentMonuments.map(monument => (
            <div className='catItem'>
              <p >{monument.title}</p>
              {monument.image ? (
                 <img 
                 className="mat-img" 
                 src={`data:image/jpg;base64, ${monument.image[0]}`} // Affiche la première image
                 onClick={() => handleImageClick(monument.id)} 
                 alt="Material"
               />
             ) : (
               <img style={{width:"128px",height:"128px",marginLeft:"5%"}} src={NoImage} onClick={() => handleImageClick(monument.id)} />
             )}
            </div>
          ))
          ):(
            <li>{t("Messages.MonuErr")}</li>
          )
      }  
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
             onClick={() => handleFiltMenuToggle(t("Header.Mat"))}  />
          <h3 className='catt'>{t("Header.Mat")}</h3>
          </div>
          {filterMenuOpen === t("Header.Mat") && (
          <div className='catboxList'>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked1}  onChange={handleCheckbox1Change} />
      <label htmlFor="checkbox">{t("Menu.MAT")}</label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked2}  onChange={handleCheckbox2Change} />
      <label htmlFor="checkbox">{t("Menu.MER")}</label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked3}  onChange={handleCheckbox3Change} />
      <label htmlFor="checkbox">{t("Menu.Bois")}</label>
    </div>   
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
          { products.map(produit => (
        <div key={produit.id}>
          <input
            type="checkbox"
            checked={isCheckedProduit[produit.id] || false}
            onChange={e => {
              const isChecked = e.target.checked;
              setCheckedProduit(prevState => ({
                ...prevState,
                [produit.id]: isChecked
              }));
            }}
          />
          <label htmlFor={`checkbox-${produit.id}`}>{produit.title}</label>
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
          { buildings.map(ouvrage => (
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
          )}
    <div className='FilterCat'>
        <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={() => handleFiltMenuToggle(t("Header.Periode"))}  />
        <h3 className='filter-name'>{t("Header.Periode")}</h3>
      </div>
      {filterMenuOpen === t("Header.Periode") && (
      <div className='catboxList'>
        <ul>
          {periodes.map(periode => (
            <div key={periode.id}>
              <input
                type="checkbox"
                checked={selectedPeriods.includes(periode.id)}
                onChange={() => handleCheckboxChange(periode.id)}
              />
              <label htmlFor={`checkbox-${periode.id}`}>{periode.title}</label>
            </div>
          ))}
        </ul>
      </div>
      )}
    <div className='FilterCat'>
        <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown" 
         onClick={() => handleFiltMenuToggle(t("Header.Place"))}  />
        <h3 className='filter-name'>{t("Header.Place")}</h3>
      </div>
      {filterMenuOpen === t("Header.Place") && (
      <div className='catboxList'>
        <ul>
          {places.map(place => (
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





export default Monument;