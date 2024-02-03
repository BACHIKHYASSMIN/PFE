
import './Categorie.css';
import React from 'react';
import  menuIcon from "./Assets/icon.png"
import homeIcon from "./Assets/Vector.png"
import FilterIcon from "./Assets/filter.png"
import agrImg from  "./Assets/agr.png"
import pierImg from  "./Assets/pier.png"
function Categorie() {
  return (
      <div className='cat'>
        <div className="categorie-head">
          <img className="menu" src={menuIcon}  />
          <p className="tit">Matériaux</p>
          <div className='catlist'>
          <div className='catIt'><p>Matériaux à base de terre</p> </div>
          <div className='catIt'> <p>Minéraux et Roches</p> </div>
          <div className='catIt'> <p>Bois</p> </div>
          </div>
          </div>
          <div className='MaterialCat'>
          <img className="home" src={homeIcon}  />
          <p className='Path' >Acceuil &gt; Matériaux &gt; Matériaux à base de terre</p>
          </div>
          <div className='searchBar'>
          <div className='Filter'>
          <img className="fit" src={FilterIcon}  />
          <p >Filtres</p>
          </div>
          <div className='Search'>
          <input  type="text" placeholder="Rechercher un matériau" className='bar' />
          </div>
          </div>
          <div className='catElements'>
          <div className='CatItem'>
              <p >Agrégat</p>
              <img  src={agrImg}/>
              </div>
              <div className='catItem'>
              <p >Pierre</p>
              <img  src={pierImg}/>
              </div>
              <div className='catItem'>
              <p >Pierre</p>
              <img  src={pierImg}/>
              </div>
              <div className='catItem'>
              <p >Agrégat</p>
              <img  src={agrImg}/>
              </div>
              <div className='catItem'>
              <p >Pierre</p>
              <img  src={pierImg}/>
              </div> <div className='catItem'>
              <p >Agrégat</p>
              <img  src={agrImg}/>
              </div>
              <div className='catItem'>
              <p >Pierre</p>
              <img  src={pierImg}/>
              </div> <div className='catItem'>
              <p >Agrégat</p>
              <img  src={agrImg}/>
              </div>
              <div className='catItem'>
              <p >Pierre</p>
              <img  src={pierImg}/>
              </div> <div className='catItem'>
              <p >Agrégat</p>
              <img  src={agrImg}/>
              </div>
              <div className='catItem'>
              <p >Pierre</p>
              <img  src={pierImg}/>
              </div>
              </div>
              
              
        
      </div>
      
  );
}

export default Categorie;
