import React from 'react';
import './Material.css';  
import  menuIcon from "./Assets/icon.png"
import homeIcon from "./Assets/Vector.png"


const Material = () => {
  return (
    <na className="material">
      <div className="material-head">
          <img className="menu" src={menuIcon}  />
          <p className="title">Matériaux</p>
          </div>
          <div className='MaterialCat'>
          <img className="home" src={homeIcon}  />
          </div>
    </na>
  );
}

export default Material;