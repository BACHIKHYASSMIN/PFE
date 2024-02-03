
import './Class.css';
import Navbar from './Elements/Navbar';
import Footer from './Elements/Footer';
import  Categorie from  './Categorie';
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom';
import Material from './Material';
function Class() {
  return (
    <div className="Class">
      <Router>
      <Navbar/>
      <Routes>
        <Route path="/" exact element={<Material />} />
        <Route path="/categorie"  element={<Categorie />} />
      </Routes>
      <Footer/>
    </Router>
    
     
</div>
  );
}

export default Class;
