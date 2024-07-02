
import '../Categorie.css';
import React, { useState, useEffect  }  from 'react';
import  menuIcon from "../Assets/icon.png"
import homeIcon from "../Assets/Vector.png"
import FilterIcon from "../Assets/filter.png"
import agrImg from  "../Assets/agr.png"
import pierImg from  "../Assets/pier.png"
import ArrowIcon from "../Assets/arrow.png"
import deconIcon from "../Assets/decon.png"
import whitemenuIcon from "../Assets/wmenu.png"
import closeBIcon from "../Assets/closeb.png"
import closeIcon from "../Assets/close.png"
import { Link } from 'react-router-dom';
import Navbar from '../Elements/Navbar';
import { useNavigate } from 'react-router-dom';
import { Form, Select, Button, Input, Card, Row, Col , Typography } from 'antd';
import Footer from '../Elements/Footer';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext';
function Déformation({pathologies}) {
  const { t,i18n } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isCheckedOuvrage, setCheckedOuvrage] = useState({})
  const [isCheckedProduit, setCheckedProduit] = useState({})
  const [searchTerm, setSearchTerm] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const {logout}=useAuth();
  const [filteredPathologies, setFilteredPathologies] = useState(pathologies);
const pathologiesPerPage = 10;
  const indexOfLastPathologie = currentPage * pathologiesPerPage;
  const indexOfFirstPathologie = indexOfLastPathologie - pathologiesPerPage;
  const currentPathologies = filteredPathologies.filter(pathologie => pathologie.category === "DEFORMATION").slice(indexOfFirstPathologie, indexOfLastPathologie);
  
  const handleNextPage = () => {
    if (currentPage < Math.ceil(pathologies.length/ pathologiesPerPage)) {
      setCurrentPage(currentPage + 1);
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
  const [data, setData] = useState([]);
  const handleImageClick = () => {
    // Naviguer vers la page "Details" lors du clic sur l'image
    navigate('/details');
  };
 
  const  handleFilterMenuToggle = () => {
    setFilterMenuOpen(!isFilterMenuOpen);
  };
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handleDeconnect = () => {
    logout();
    navigate('/');
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
          <img className="menu" src={menuIcon} onClick={handleMenuToggle} />
          <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '10px',textAlign: 'center', marginLeft:'5%' , display:'inline'}}>
          {t("Menu.Déformation")}
      </Typography.Title>
         
          </div>
          
          <div className='MaterialCat'>
          <img className="home" src={homeIcon}  />
  <Link to="/acceuil" style={{ marginLeft:'10px',color: 'blue', textDecoration: 'none' }}>{t("navbar.accueil")}</Link> {/* Lien vers la page d'accueil */}
  <span className='Path' style={{ color: 'blue' }}>&gt;</span> {/* Utilisation de span pour le symbole ">" */}
  <Link to="/pathologie" style={{ marginLeft:'10px',color: 'blue', textDecoration: 'none' }}>{t("Header.Path")}</Link> {/* Lien vers la page Monument */}
  <span className='Path' style={{ color: 'blue' }}>&gt;</span> {/* Utilisation de span pour le symbole ">" */}
  <Link to="/déformation" style={{ marginLeft:'10px',color: 'blue', textDecoration: 'none' }}>{t("Menu.Déformation")}</Link> {/* Lien vers la page Monument */}
</div>

          <Row justify="space-between" align="middle" style={{ marginBottom: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
        <Col>
  
        </Col>
        <Col flex="auto" style={{ textAlign: 'right' }}>
          <Row gutter={16} style={{ marginLeft:'6%'}}>
            <Col flex="auto">
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
  {currentPathologies  ? (
   currentPathologies 
    .map(pathologie => (
      <div className='pathologieItem border-blue' key={pathologie.id}>
      {pathologie.title}
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
  {currentPathologies.length === pathologiesPerPage -1 && (
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
          onClick={handleFilterMenuToggle}  />
          <h3 className='catt'>{t("Header.Mat")}</h3>
          </div>
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
    <div className='FilterCat'>
    <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={handleFilterMenuToggle}  />
          <h3 className='filter-name' >{t("Header.Prod")}</h3>
          </div>
          <div className='catboxList'>
          <ul>
          { data.produits.map(produit => (
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
  <Link className="pageLink" to="/acceuil">{t("navbar.accueil")}</Link>
  <Link className="pageLink" to="/Graph">{t("navbar.graph")}</Link>
  <Link className="pageLink" to="/carte-geographique">{t("navbar.carteGeographique")}</Link>
  <Link className="pageLink" to="/recherche-avancee">{t("navbar.rechercheAvancee")}</Link>
  <Link className="pageLink" to="/a-propos">{t("navbar.aPropos")}</Link>
  <div className='lineDecBar'></div>
  <div className='Decon'>
    <img className="dec" src={deconIcon} alt="Decon Icon" onClick={handleDeconnect} />
    <a className='decLink' onClick={handleDeconnect} >{t("Menu.Deconnexion")}</a>
  </div>
</div>

      )}
      <Footer />
      </div>
      
  );
}

export default Déformation;