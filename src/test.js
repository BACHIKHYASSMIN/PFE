import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import CytoscapeComponent from 'react-cytoscapejs';
import './GraphStyle.css'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
const Neo4jGraph = () => {

  const [elements, setElements] = useState([]);
  const formattedElements = [];
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Effectuer une requête à votre endpoint pour récupérer les données
        const response = await axios.get('http://localhost:2000/api/nodes');
        const responseData = response.data;
        const lab=responseData.nodes[0].labels;
      
        // Formater les données pour les utiliser dans la structure d'éléments
        const Nodes = responseData.nodes.map((item, index) => {
          const positionX = index * 100;
          const positionY = index * 2;

            if(item.labels[0].includes('Produit')){
                return { data:
                     { id: item.elementId,
                         label: item.properties.designation,
                         type:item.labels[0],
                         },
                 position:
                  { x: positionX, y: 0 } ,
                style:{
                    backgroundColor:'orange',
                    fontWeight:'bold'
                },
                };
                
            }else if(item.labels[0].includes('Restauration') ) {
              return { data:
                { id: item.elementId,
                    label: 'node',
                    type:item.labels[0],
                    },
                
           };
            }else if( item.labels[0].includes('Technique')) {
              return {data:
                { id: item.elementId,
                    label: 'node',
                    type:item.labels[0],
                    },
           };
            } else if( item.labels[0].includes('Pathologie')) {
              return { data:
                { id: item.elementId,
                    label: 'node',
                    type:item.labels[0],
                    },
           };
            } else if( item.labels[0].includes('Ouvrage')) {
              return { data:
                { id: item.elementId,
                    label: item.properties.designation,
                    type:item.labels[0],
                    },
            position:
             { x: positionX, y: positionY} ,
           style:{
            backgroundColor:'gold',
           }
           };
            }else if( item.labels[0].includes('Monument')) {
              return { data:
                { id: item.elementId,
                    label: item.properties.designation,
                    type:item.labels[0],
                    },
            position:
             { x: positionX, y: positionY } ,
           style:{
            backgroundColor:'crimson',
           }
           };
            }else if( item.labels[0].includes('ConstruirRelation')) {
              return { data:
                { id: item.elementId,
                    label: item.properties.designation,
                    type:item.labels[0],
                    },
            position:
             { x: positionX, y: positionY } ,
           style:{
            backgroundColor:'aquamarine',
           }
           };
            } else if(item.labels[0].includes('Materiau')) {
              return { data:
                { id: item.elementId,
                    label: item.properties.designation,
                    type:item.labels[0],
                    },
            position:
             { x: positionX, y: positionY } ,
           style:{
            backgroundColor:'blue',
            fontWeight:'bold'
           }
           };
            } else if(item.labels[0].includes('Periode')) {
              return { data:
                { id: item.elementId,
                    label: item.properties.designation,
                    type:item.labels[0],
                    },
            position:
             { x: positionX, y: positionY } ,
           style:{
            backgroundColor:'green',
            fontWeight:'bold'
           }
           };
            } else if(item.labels[0].includes('Place')) {
              return { 
                data:
                { id: item.elementId,
                    label: item.properties.designation,
                    type:item.labels[0],
                    },
            position:
             { x: positionX, y: positionY } ,
           style:{
            backgroundColor:'red',
            fontWeight:'bold'
           }
           }; }
            else {
            return { data: { id: item.elementId, label: item.properties.designation, type:item.labels[0], }, };
            }
        });
        formattedElements.push(...Nodes);
// Formatage des arêtes
const edges = responseData.edges.map(edge => ({
  data: {
    id: edge.elementId,
    source: edge.startNodeElementId,
    target: edge.endNodeElementId,
    label: edge.type
  },
  style:{
    Color:'Black',
    fontWeight:'bold',
    fontSize:'100px',
   }
}));


formattedElements.push(...edges);
        setElements(formattedElements);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, []);

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    const selectedItemId = queryParams.itemId;
    const integerProductId = parseInt(selectedItemId, 10);
    console.log('ELEMENT ',integerProductId)
}, [location.search, elements]);

  
  const layoutOptions = {
    name: 'cose', 
  };

  const cyEventHandler = (cy) => {
    cy.on('tap', 'node', (event) => {
      const nodeId = event.target.id();
      const nodelabels=event.target._private.data.type;
      if (nodelabels && nodelabels.includes('Produit')) {
        navigate(`/produitdetails/${nodeId}`);
    }else if(nodelabels.includes('Materiau')){
      navigate(`/materialdetails/${nodeId}`);
    }else if (nodelabels.includes('Monument')){
      navigate(`/monumentdetails/${nodeId}`);
    }else if(nodelabels.includes('Ouvrage')){
      navigate(`/ouvrageetails/${nodeId}`);
    }
    });
  };

  return (
    
    <div>
     <CytoscapeComponent
  elements={elements}
  style={{
    position: 'absolute',
    left: '35%',
    width: '50%',
    height: '500px'
  }}
  layout={layoutOptions}
  cy={(cy) => {
    cyEventHandler(cy);
    cy.layout({ name: 'cose' }).run();
   
  }}
  
>

</CytoscapeComponent>

    </div>
  );
};

export default Neo4jGraph;