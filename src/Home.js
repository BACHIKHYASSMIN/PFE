import matériautheque from './Assets/Materiautheque.png';
import Materiauphoto from './Assets/Materiauphoto.png';
import ProduitPhoto from './Assets/ProduitPhoto.png';
import MonumentPhoto from './Assets/MonumentPhoto.png';
import OuvragePhoto from './Assets/OuvragePhoto.png';
import localisation from './Assets/localisation.jpg';
import RechAvancée from './Assets/rechercheAvancée.PNG';
import visualisation from './Assets/visualisation.png';
import './Home.css';
import React from 'react';
import Navbar from './NavbarHome';
import Footer from './Elements/Footer';

const Home = () => {
    const containerStyle = {
      position: 'relative',
      width: '100%',   // 100% de la largeur de la vue
      height: '60%',   // 50% de la hauteur de la vue
      overflow: 'hidden',
      marginBottom: '20px', 
    
    };
  
    const descriptionStyle = {
      textAlign: 'center',
      color: 'black',
      fontWeight: 'semi-bold',
      fontSize: '24px',
      maxWidth: '850px',
      margin: ' auto', // Ajoutez cette ligne pour centrer horizontalement
      marginBottom: '100px', // Ajoutez cette ligne pour définir la marge basse
      marginTop: '50px'
    };
  
      const sectionStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '130px',
       
      
      };
  
  
    const textColumnStyle = {
      textAlign: 'center',
      color: 'black',
      maxWidth: '600px',
      marginLeft: '10px',
      marginRight: '100px',
      fontSize: '24px',
    
    };
  
    const linkStyle = {
      color: 'blue',
      fontWeight: 'regular',
      textDecoration: 'none',
    };
  
    const cardContainerStyle = {
      display: 'flex',
      justifyContent: 'space-around',
     
      marginBottom: '50px', // Ajustez la marge inférieure selon vos préférences
      height: '340px', // Ajustez la hauteur selon vos préférences
   
    };
  
    const cardStyle = {
      width: '25%',
      padding: '10px',
      border: '1px solid #F39C12',
      borderRadius: '8px',
      color:'#2C3E50 ' , 
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
      textAlign: 'center',
    };
   
    return (
      <div style={containerStyle}>
       <Navbar isAuthenticated={false} />
        <img src={matériautheque} alt="Description de l'image" style={{ width: '100%', height: '10%' }} />
  
        <div style={descriptionStyle} >
          <p>NumeriqueMaterial est une platforme de matériathèque numérique du domaine du patrimoine bâti de la Casbah d'Alger, deployée en Algérie, qui vous permet d'accerder à tous moment, librement et gratuitement au données sur les matériaux, produits, ouvrages, monuments, pathologies, causes de dégardation  techniques de construction du le patrimoine bati en Algérie.</p>
        </div>
  
        <ul>
    <li>
                <div style={sectionStyle}>
                <img src={Materiauphoto} alt="Image des matériaux"  style={{ width: '35%', height: '35%' }}/>
          <div style={textColumnStyle}>
            <h2>Matériaux</h2>
            <p>
            Numerique Materials vous invite à plonger dans l'univers captivant des matériaux architecturaux  à travers sa section dédiée. Notre plateforme offre une immersion au sein des textures, des couleurs et des propriétés uniques de ces matériaux, mettant en lumière leur contribution essentielle à la construction et à la préservation des édifices historiques. Découvrez la richesse de ces éléments fondamentaux du patrimoine bâti et explorez comment ils façonnent l'histoire architecturale. Bienvenue dans notre espace dédié aux matériaux, où chaque découverte renforce votre lien avec le patrimoine architectural.
            </p>
            <a href="/material" style={linkStyle}>Consulter tout les Matériaux ...</a>
          </div>
        </div>
  
    </li>
  
    <li>
              <div style={sectionStyle}>
          <div style={textColumnStyle}>
          <h2>Produits</h2>
            <p>
            Numerique Materials vous invite à explorer les produits liés au patrimoine bâti , et à plonger dans les détails de leurs propriétés distinctives,vous pouvez consulter ces produits et découvrir leurs formes, disponibilités, provenances et bien plus encore. Explorez les trésors patrimoniaux avec nous et approfondissez votre connaissance des éléments qui façonnent ces monuments emblématiques.
            </p>
            <a href="/produit" style={linkStyle}>Consulter tout les Produits ...</a>
          </div>
          <img src={ProduitPhoto} alt="Image des produits" style={{ width: '35%', height: '35%' }} />
        </div>
    </li>
  
    <li>
      <div style={sectionStyle}>
      <img src={OuvragePhoto} alt="Image des ouvrages"  style={{ width: '35%', height: '35%' }} />
          <div style={textColumnStyle}>
          <h2>Ouvrages</h2>
            <p>
            Numérique Materials vous offre une expérience enrichissante à travers sa section dédiée aux ouvrages architecturaux. Explorez un large éventail d'ouvrages, plongez dans leurs détails fascinants et accédez à une mine d'informations sur l'histoire, l'architecture et les aspects techniques. Consultez la section "Ouvrages" pour une exploration complète du patrimoine architectural de la Casbah d'Alger.
            </p>
            <a href="/ouvrage" style={linkStyle}>Consulter tout les Ouvrages ...</a>
          </div>
        </div>
    </li>
  
    <li>
              <div style={sectionStyle}>
          <div style={textColumnStyle}>
          <h2>Pathologies</h2>
          <p>
            Numérique Materials vous propose un aperçu complet des pathologies courantes qui affectent le patrimoine bâti. Explorez la section "Pathologies" pour obtenir des informations générales sur les différents problèmes auxquels peuvent être confrontés les édifices historiques. Grâce à notre plateforme, accédez à une variété de connaissances sur les causes et les solutions pour préserver ces structures précieuses. Consultez la section "Pathologies" pour élargir votre compréhension des défis liés à la conservation du patrimoine architectural.
            </p>
            <a href="/pathologies" style={linkStyle}>Consulter tout les Pathologies ...</a>
          </div>
          <img src={MonumentPhoto} alt="Image des monuments"  style={{ width: '35%', height: '35%' }} />
        </div>
  
    </li>
  
    <li>
    
      <div style={sectionStyle}>
              <img src={MonumentPhoto} alt="Image des monuments"  style={{ width: '35%', height: '35%' }} />
          <div style={textColumnStyle}>
          <h2>Monuments</h2>
          <p>
            Numérique Materials vous offre une immersion fascinante dans la section "Monuments", où vous pouvez explorer la diversité des monuments historiques . Découvrez leurs types, leurs emplacements et leurs descriptions succinctes pour obtenir une vue d'ensemble du riche patrimoine architectural. Consultez la section dédiée aux monuments pour une expérience captivante et informative.
            </p>
            <a href="/monuments" style={linkStyle}>Consulter tout les Monuments ...</a>
          </div>
        </div>
  
  
    </li>
  </ul>
  
 
  <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <h2>Visualiser le Graphe</h2>
          <p>Découvrez une représentation graphique des connaissances disponibles sur Numerique Materials.</p>
          <img src={visualisation}  style={{height: '100p%' , width: '35%'}} />
        </div>
  
        <div style={cardStyle}>
          <h2>Localiser les Monuments</h2>
          <p>Explorez la carte géographique pour repérer l'emplacement des monuments historiques de la Casbah d'Alger.</p>
          <img src={localisation}  style={{height: '100p%' , width: '35%'}} />
        </div>
  
        <div style={cardStyle}>
          <h2>Recherche Avancée</h2>
          <p>Effectuez des recherches ciblées en utilisant des mots-clés pour trouver des informations spécifiques sur le patrimoine bâti.</p>
          <img src={RechAvancée}  style={{height: '100p%' , width: '35%'}} /> 
        </div>
        </div>



   <Footer/>
  
      </div>
  
      
    );
  
  }
  export default Home;