
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
import { useTranslation } from 'react-i18next';
function Categorie1({products,materials,buildings,monuments,places,colors}) {
  const { t,i18n } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isCheckedProduit, setCheckedProduit] = useState({});
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [isCheckedMonument, setCheckedMonument] = useState({});
  const [isCheckedPlaces, setCheckedPlaces] = useState({});
  const [isCheckedColors, setCheckedColors] = useState({});
  const [isCheckedOuvrage, setCheckedOuvrage] = useState({});
  const [selectedCouleurs, setSelectedCouleurs] = useState([]);;
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredMaterials, setFilteredMaterials] = useState(materials);
  const [selectedProductId, setSelectedProductId] = useState(); 
  const [selectedColor, setSelectedColor] = useState(); 

  const materialsPerPage = 10;
  const indexOfLastMaterial = currentPage * materialsPerPage;
  const indexOfFirstMaterial = indexOfLastMaterial - materialsPerPage;
  const currentMaterials = filteredMaterials.filter(materiau => materiau.famille === "Base terre").slice(indexOfFirstMaterial, indexOfLastMaterial);
  
  const handleNextPage = () => {
    if (currentPage < Math.ceil(materials.length/ materialsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
     // Remplacez par l'ID du nœud souhaité
     const nodeFamily = 'Base terre'; // Remplacez par la famille de nœud souhaitée
      
      try {
        const response = await axios.post('http://localhost:1000/api/RelationData', {
          nodeId: selectedProductId,
          nodeFamily: nodeFamily ,
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
     const nodeFamily = 'Base terre'; // Remplacez par la famille de nœud souhaitée
      
      try {
        const response = await axios.post('http://localhost:1000/api/RelationColorData', {
          nodeColor: selectedColor,
          nodeFamily: nodeFamily ,
        });
        console.log('Données reçues:', response.data.data);
        const data = response.data.data;
        setData(data)
        
        // Traitez les données reçues ici
      } catch (error) {
        console.error('Erreur lors de la requête API:', error.message);
      }
    };
    
    if (selectedColor !== null) {
      fetchData();
    }
  }, [selectedColor]);

  


  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleSearch = () => {
    const filteredMateriaux = filteredMaterials.filter((materiau) =>
      materiau.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMaterials(filteredMateriaux);
    setCurrentPage(1); // Réinitialiser à la première page après la recherche
  };
  

  const navigate = useNavigate();
  const handleImageClick = (materialId) => {
    const integerMaterialId = parseInt(materialId, 10);
    navigate(`/materiauDetails/${integerMaterialId}`);
  };
  const handleDeconnect = () => {
    navigate('/');
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
      
        setFilteredMaterials(materials);
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
    const handleCheckboxPlaceChange = (placeId) => {
      if (selectedPlaces.includes(placeId)) {
        setSelectedPlaces(selectedPlaces.filter(id => id !== placeId));
      } else {
        setSelectedPlaces([...selectedPlaces, placeId]);
      }
    };
    const handleCheckboxCouleurChange = (couleurId) => {
      if (selectedCouleurs.includes(couleurId)) {
        setSelectedCouleurs(selectedCouleurs.filter(id => id !== couleurId));
      } else {
        setSelectedCouleurs([...selectedCouleurs, couleurId]);
      }
    };

   
   

    const handleCancel = () => {
      setChecked1(false);
      setChecked2(false);
      setChecked3(false);
      setSelectedCouleurs([]);
      setSelectedPlaces([]);
      setCheckedMonument(false);
      setCheckedOuvrage(false);
     
      setCheckedProduit(false);
      // Réinitialiser d'autres états de cases à cocher si nécessaire
    };


  return (
      <div className='cat'>
         <Navbar/>
         <div className="categorie-head">
  <img className="menu" src={menuIcon} onClick={handleMenuToggle} />
  <Typography.Title level={1} style={{ fontWeight: 'bold', marginBottom: '10px', textAlign: 'center', marginLeft: '5%', display: 'inline' }}>
  {t("Menu.MAT")}
  </Typography.Title>
  
</div>
          <div className='MaterialCat'>
  <img className="home" src={homeIcon}  />
  <Link to="/acceuil" style={{ marginLeft:'10px',color: 'blue', textDecoration: 'none' }}>{t("navbar.accueil")}</Link> {/* Lien vers la page d'accueil */}
  <span className='Path' style={{ color: 'blue' }}>&gt;</span> {/* Utilisation de span pour le symbole ">" */}
  <Link to="/material" style={{marginLeft:'10px', color: 'blue', textDecoration: 'none' }}>{t("Header.Mat")}</Link> {/* Lien vers la page Monument */}
  <span className='Path' style={{ color: 'blue' }}>&gt;</span> {/* Utilisation de span pour le symbole ">" */}
  <Link to="/categorie1" style={{ marginLeft:'10px', color: 'blue', textDecoration: 'none' }}>{t("Menu.MAT")}</Link> {/* Lien vers la page Monument */}
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
                placeholder={`${t("Tokens.RechercherUn")} ${t("Header.Mat")}`}
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
          <img src={`data:image/jpg;base64, ${item.image}`}  onClick={() => handleImageClick(item.id)}/>
        )}
      </div>
    ))
  ) : selectedProductId ? (
    <li>{t("Messages.MatErr")}</li>
  ) : selectedColor ? (
    <li>{t("Messages.MatErr")}</li>
  ) :(
    // Si aucune donnée n'est disponible dans data, afficher les currentMaterials
    currentMaterials && currentMaterials.length > 0 ? (
      currentMaterials.map(materiau => (
        <div className='catItem' key={materiau.id}>
          <p>{materiau.title}</p>
          {materiau.image && materiau.image.length > 0 ? (
            <img 
              className="mat-img" 
              src={`data:image/jpg;base64, ${materiau.image[0]}`}
              onClick={() => handleImageClick(materiau.id)} 
              alt="Material"
            />
          ) : (
            <img src={`data:image/jpg;base64, ${materiau.image}`}  onClick={() => handleImageClick(materiau.id)}/>
          )}
        </div>
      ))
    ) : (
      <li>{t("Messages.MatErr")}</li>
    )
  )}
</div>


<div className='Links'>
  {currentPage > 1 && currentMaterials.length > 0 && (
    <Link onClick={handlePreviousPage}>Précédente</Link>
  )}
  {currentMaterials.length === materialsPerPage && (
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
          <h3 className='filter-name' >{t("Header.Prod")}</h3>
          </div>
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
              if (isChecked) {
                setSelectedProductId(produit.id);
              } else {
                setSelectedProductId(null); // Désélectionner le produit
                setData()
              }
             
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
              if (isChecked) {
                setSelectedProductId(ouvrage.id);
              } else {
                setSelectedProductId(null); // Désélectionner le produit
                setData()
              }
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
                setSelectedProductId(monument.id);
              } else {
                setSelectedProductId(null); // Désélectionner le produit
                setData()
              }
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
          {places.map(place => (
            <div key={place.id}>
              <input
                type="checkbox"
                checked={isCheckedPlaces[place.id] || false}
                onChange={e => {
                  const isChecked = e.target.checked;
                  setCheckedPlaces(prevState => ({
                    ...prevState,
                    [place.id]: isChecked
                  }));
                  if (isChecked) {
                    setSelectedProductId(place.id);
                  } else {
                    setSelectedProductId(null); // Désélectionner le produit
                    setData()
                  }
                }}
              />
              <label htmlFor={`checkbox-${place.id}`}>{place.title}</label>
            </div>
          ))}
        </ul>
      </div>
      <div className='FilterCat'>
        <img className="arrowdwn" src={ArrowIcon} alt="ArrowDown" onClick={handleFilterMenuToggle} />
        <h3 className='filter-name'>{t("Header.Color")}</h3>
      </div>
      <div className='catboxList'>
  <ul>
    {colors.map((couleur, index) => ( // Utilisation de l'index comme identifiant
      <div key={index}>
        <input
          type="checkbox"
          checked={isCheckedColors[index] || false}
          onChange={e => {
            const isChecked = e.target.checked;
            setCheckedColors(prevState => ({
              ...prevState,
              [index]: isChecked
            }));
            if (isChecked) {
              setSelectedColor(couleur.title);
            } else {
              setSelectedColor(null); // Désélectionner le produit
              setData(null); // Remise à zéro des données
            }
          }}
        />
        <label htmlFor={`checkbox-${index}`}>{couleur.title}</label>
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
    <a className='decLink' onClick={handleDeconnect} >{t("Menu.Deconnexion")}</a>
  </div>
</div>

      )}
      <Footer />
      </div>
      
  );
}

export default Categorie1;