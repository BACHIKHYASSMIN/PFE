import React from 'react';
import './Material.css';  
import  menuIcon from "./Assets/icon.png"
import homeIcon from "./Assets/Vector.png"
import agrImg from  "./Assets/agr.png"
import pierImg from  "./Assets/pier.png"
import { Link } from 'react-router-dom';
import categorie from './Categorie'; 


const Material = () => {
  return (
    <na className="material">
      <div className="material-head">
          <img className="menu" src={menuIcon}  />
          <p className="title">Matériaux</p>
          </div>
          <div className='MaterialCat'>
          <img className="home" src={homeIcon}  />
          <p className='Path' >Acceuil &gt; Matériaux</p>
          </div>
          <Categories  categorieName="Matériaux à base de terre"/>
          <Categories  categorieName="Minéraux et Roches"/>
          <Categories  categorieName="Bois"/>
    </na>
  );
}


const Categories =(props) =>{
  const CatName = props.categorieName;
return (
<div className='Categories'>
  <div className='catTitle'>
  <h3>{CatName}</h3>
  </div>   
  <div className='CardDetails'>
  <Link to="/categorie">
<h3>Voir Tout</h3>
</Link>
  </div>
            <div className='CategorieList'>
              <div className='CardItem'>
              <p >Agrégat</p>
              <img  src={agrImg}/>
              </div>
              <div className='CardItem'>
              <p >Pierre</p>
              <img  src={pierImg}/>
              </div>
              <div className='CardItem'>
              <p >Agrégat</p>
              <img  src={agrImg}/>
              </div>
            </div>
                       </div>


);
}


export default Material;