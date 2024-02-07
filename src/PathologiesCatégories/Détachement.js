import '../Categorie.css';
import React, { useState }  from 'react';
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


function Détachement() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const navigate = useNavigate();
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
  
    
    const handleCheckbox1Change = () => {
      setChecked1(!isChecked1);
    };
    const handleCheckbox2Change = () => {
      setChecked2(!isChecked2);
    };
    const handleCheckbox3Change = () => {
      setChecked3(!isChecked3);
    };
  return (
      <div className='cat'>
         <Navbar/>
        <div className="categorie-head">
          <img className="menu" src={menuIcon} onClick={handleMenuToggle} />
          <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '10px',textAlign: 'center', marginLeft:'5%' , display:'inline'}}>
       Pathologie
      </Typography.Title>
          
          </div>
          
          <div className='MaterialCat'>
  <img className="home" src={homeIcon}  />
  <Link to="/" style={{ color: 'blue', textDecoration: 'none' }}>Accueil</Link> {/* Lien vers la page d'accueil */}
  <span className='Path' style={{ color: 'blue' }}>&gt;</span> {/* Utilisation de span pour le symbole ">" */}
  <Link to="/pathologie" style={{ color: 'blue', textDecoration: 'none' }}>pathologie</Link> {/* Lien vers la page Monument */}
  <span className='Path' style={{ color: 'blue' }}>&gt;</span> {/* Utilisation de span pour le symbole ">" */}
  <Link to="/détachement" style={{ color: 'blue', textDecoration: 'none' }}>Détachement</Link> {/* Lien vers la page Monument */}
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
                placeholder="Rechercher un matériau"
                style={{ flex:1, marginRight: '10px', background: '#ECF0F1', color:'#2C3E50' }}
              />
            </Col>
            <Col>
              <Button type="primary" htmlType="submit"  style={{backgroundColor :'#2C3E50'}}>
                Valider
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
          
          <div className='catElements'>
          <div className='catItem'>
              <p >Pathologie 1</p>
              <img   onClick={handleImageClick}/>
              </div>
              <div className='catItem'>
              <p >Pathologie 2</p>
              <img  onClick={handleImageClick}/>
              </div>
              <div className='catItem'>
              <p >Pathologie 3</p>
              <img onClick={handleImageClick} />
              </div>
              <div className='catItem'>
              <p >Pathologie 4</p>
              <img onClick={handleImageClick} />
              </div>
              <div className='catItem'>
              <p >Pathologie 5</p>
              <img  onClick={handleImageClick}/>
              </div>
               <div className='catItem'>
              <p >Pathologie 6</p>
              <img  onClick={handleImageClick} />
              </div>
              
              </div>
              <div className='Links'>
              <a >1</a>
              <a >2</a>
              <a >3</a>
              <a >&gt;</a>
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
          <h3 className='catt'>Matériaux</h3>
          </div>
          <div className='catboxList'>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked1}  onChange={handleCheckbox1Change} />
      <label htmlFor="checkbox">Matériaux à base de terre</label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked2}  onChange={handleCheckbox2Change} />
      <label htmlFor="checkbox">Minéraux et Roches</label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked3}  onChange={handleCheckbox3Change} />
      <label htmlFor="checkbox">Bois</label>
    </div>   
    </div> 
    <div className='FilterCat'>
    <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={handleFilterMenuToggle}  />
          <h3 className='filt-name'>Produits</h3>
          </div>
          <div className='catboxList'>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked1}  onChange={handleCheckbox1Change} />
      <label htmlFor="checkbox">Mortier</label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked2}  onChange={handleCheckbox2Change} />
      <label htmlFor="checkbox">Dalle</label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked3}  onChange={handleCheckbox3Change} />
      <label htmlFor="checkbox">Couche</label>
    </div>   
    </div> 
    <div className='FilterCat'>
    <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={handleFilterMenuToggle}  />
           <h3 className='filt-name' >Ouvrages</h3>
          </div>
          <div className='catboxList'>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked1}  onChange={handleCheckbox1Change} />
      <label htmlFor="checkbox">Ouvrage1</label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked2}  onChange={handleCheckbox2Change} />
      <label htmlFor="checkbox">Ouvrage2</label>
    </div>
    <div className='catbox'>
      <input  type="checkbox"  checked={isChecked3}  onChange={handleCheckbox3Change} />
      <label htmlFor="checkbox">Ouvrage3</label>
    </div>   
    </div> 

        
          <div className='lineFBar'></div>
          <div className='ValBtn'>
          <button className='annuler'>Annuler</button>
          <button className='valider'>Valider</button>
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
        <h3 className='rub' style={{textAlign: 'center' }}>Rubriques</h3>
        <ul className='mats' style={{ paddingLeft: '20px' }}>
          <li className='rubMat-name' ><Link to="/material">Matériaux</Link></li>
          <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie1" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Matériaux à base de terre</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie2" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Minéraux et Roches</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie3" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Bois</Link>
</li>
          <li className='rubMat-name'><Link to="/produit">Produits</Link></li>
          <li className='rubMat-name'><Link to="/ouvrage">Ouvrages</Link></li>
          <li className='rubMat-name'><Link to="/pathologie">Pathologies</Link></li>
          <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/biologique" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Biologique</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/chromatique-dépot" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Chromatique-dépot</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/déformation" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Déformation</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/détachement" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Détachement</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/fissure" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Fissure</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/perte de matière" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Pertes de matière</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/autres" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Autres</Link>
</li>
          <li className='rubMat-name'><Link to="/monument">Monuments</Link></li>
          </ul>
        <div className='lineBar'></div>
        <h3 className='rub'  style={{textAlign: 'center' }} >Pages</h3>
        {/* Ajoutez vos liens du menu ici */}
        <Link className="pageLink" to="/">Accueil</Link>
        <Link className="pageLink" to="/Graph">Graph</Link>
        <Link className="pageLink" to="/carte-geographique">Carte Geographique</Link>
        <Link className="pageLink" to="/recherche-avancee">Recherche Avancée</Link>
        <Link className="pageLink" to="/a-propos">À propos</Link>
        <div className='lineDecBar'></div>
        <div className='Decon'>
          <img className="dec" src={deconIcon} alt="Decon Icon" onClick={handleMenuToggle} />
          <a className='decLink' href="/lien2">Deconnexion</a>
        </div>
      </div>
      )}
      <Footer />
      </div>
      
  );
}

export default Détachement;