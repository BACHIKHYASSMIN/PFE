import React from 'react';
import './Material.css';  
import  menuIcon from "./Assets/icon.png"
import homeIcon from "./Assets/Vector.png"
import agrImg from  "./Assets/agr.png"
import pierImg from  "./Assets/pier.png"


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
          <Categorie />
    </na>
  );
}


const Categorie =() =>{
return (
<div className='Categorie'>
  <div className='catTitle'>
  <h3>Materiaux A base de Terre</h3>
  </div>   
  <div className='CardDetails'>
  <a> <h3>Voir Tout</h3></a> 
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
              <div className='CardItem'>
              <p >Pierre</p>
              <img  src={pierImg}/>
              </div>
            </div>
                       </div>


);
}


export default Material;