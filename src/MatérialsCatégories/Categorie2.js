import '../Categorie.css';
import React, { useState, useEffect }  from 'react';
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
import { useNavigate } from 'react-router-dom';
import Navbar from '../Elements/Navbar';
import { Form, Select, Button, Input, Card, Row, Col , Typography } from 'antd';
import Footer from '../Elements/Footer';
import axios from 'axios';
function Categorie2() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isCheckedProduit, setCheckedProduit] = useState({});
  const [isCheckedPlace, setCheckedPlace] = useState({});
  const [isCheckedMonument, setCheckedMonument] = useState({});
  const [isCheckedOuvrage, setCheckedOuvrage] = useState({});
  const [isCheckedCouleur, setCheckedCouleur] = useState({});

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    const filteredMateriaux = data.materiaux.filter((materiau) =>
      materiau.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData({ ...data, materiaux: filteredMateriaux });
  };
  const navigate = useNavigate();
  const handleImageClick = (materialId) => {
    const integerMaterialId = parseInt(materialId, 10);
    navigate(`/materialdetails/${integerMaterialId}`);
  };
 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/data');
        setData(response.data);
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
    const handleCheckboxOuvrageChange = () => {
      setCheckedOuvrage(!isCheckedOuvrage);
    };
    
    const handleCheckboxProduitChange = () => {
      setCheckedPlace(!isCheckedProduit);
    };
    const handleCheckboxMonumentChange = () => {
      setCheckedMonument(!isCheckedMonument);
    };
    const handleCheckboxPlaceChange = () => {
      setCheckedPlace(!isCheckedPlace);
    };
    
    const handleCheckboxCouleurChange = () => {
      setCheckedCouleur(!isCheckedCouleur);
    };
   
    const handleCancel = () => {
      setChecked1(false);
      setChecked2(false);
      setChecked3(false);
      setCheckedCouleur(false);
      setCheckedMonument(false);
      setCheckedOuvrage(false);
      setCheckedPlace(false);
      setCheckedProduit(false);
      // Réinitialiser d'autres états de cases à cocher si nécessaire
    };
    
    

  return (
      <div className='cat'>
         <Navbar/>
         <div className="categorie-head">
  <img className="menu" src={menuIcon} onClick={handleMenuToggle} />
  <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '10px', textAlign: 'center', marginLeft: '5%', display: 'inline' }}>
    Matériaux
  </Typography.Title>

</div>
         

          <div className='MaterialCat'>
  <img className="home" src={homeIcon}  />
  <Link to="/" style={{ color: 'blue', textDecoration: 'none' }}>Accueil</Link> {/* Lien vers la page d'accueil */}
  <span className='Path' style={{ color: 'blue' }}>&gt;</span> {/* Utilisation de span pour le symbole ">" */}
  <Link to="/material" style={{ color: 'blue', textDecoration: 'none' }}>Matériaux</Link> {/* Lien vers la page Monument */}
  <span className='Path' style={{ color: 'blue' }}>&gt;</span> {/* Utilisation de span pour le symbole ">" */}
  <Link to="/categorie2" style={{ color: 'blue', textDecoration: 'none' }}>Minéraux et Roches</Link> {/* Lien vers la page Monument */}
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col>
              <Button type="primary" htmlType="submit"  style={{backgroundColor :'#2C3E50'}} onClick={handleSearch}>
                Valider
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
          
          <div className='catElements'>
          {data && data.materiaux ? (
            data.materiaux.map(materiau => (
            <div className='catItem'>
              <p >{materiau.title}</p>
              <img key={materiau.id} src='' onClick={() => handleImageClick(materiau.id)}/>
            </div>
          ))
          ):(
            <li>Aucun produit trouvé</li>
          )
      }  
              
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
          <h3 className='catt'>Famille des matériaux</h3>
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
          <h3 className='filter-name' >Produits</h3>
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
          <h3 className='filter-name' >Ouvrages</h3>
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
          <h3 className='filter-name' >Monuments</h3>
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
    <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={handleFilterMenuToggle}  />
          <h3 className='filter-name' >Places</h3>
          </div>
          <div className='catboxList'>
          <ul>
          { data.places.map(place => (
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
            }}
          />
          <label htmlFor={`checkbox-${place.id}`}>{place.title}</label>
        </div>
      ))}
      </ul>
    </div>
    <div className='FilterCat'>
    <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown"
          onClick={handleFilterMenuToggle}  />
          <h3 className='filter-name' >Couleurs</h3>
          </div>
          <div className='catboxList'>
          <ul>
          { data.couleurs.map(couleur => (
        <div key={couleur.id}>
          <input
            type="checkbox"
            checked={isCheckedCouleur[couleur.id] || false}
            onChange={e => {
              const isChecked = e.target.checked;
              setCheckedCouleur(prevState => ({
                ...prevState,
                [couleur.id]: isChecked
              }));
            }}
          />
          <label htmlFor={`checkbox-${couleur.id}`}>{couleur.title}</label>
        </div>
      ))}
      </ul>
    </div>  
          <div className='lineFBar'></div>
          <div className='ValBtn'>
          <button className='annuler' onClick={handleCancel}>Annuler</button>
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
          <ul style={{ paddingLeft: '30px' ,marginBottom: '10px'}}>
          <li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie1" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Matériaux à base de terre</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie2" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Minéraux et Roches</Link>
</li>
<li className='catgs' style={{ textDecoration: 'none', color: '#FFFFFF' }}>
  <Link to="/categorie3" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Bois</Link>
</li>
          </ul>
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

export default Categorie2;
