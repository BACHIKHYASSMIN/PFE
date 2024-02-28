import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CytoscapeComponent from 'react-cytoscapejs';

const Neo4jGraph = () => {
  const [elements, setElements] = useState([]);
  const formattedElements = [];
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
                       
                         },
                 position:
                  { x: positionX, y: 0 } ,
                style:{
                    backgroundColor:'orange',
                    fontWeight:'bold'
                }
                };
            }else if(item.labels[0].includes('Restauration') ) {
              return { data:
                { id: item.elementId,
                    label: 'node',
                  
                    },
            position:
             { x: positionX, y: positionY } ,
           style:{
            backgroundColor:'brown',
           }
           };
            }else if( item.labels[0].includes('Technique')) {
              return { data:
                { id: item.elementId,
                    label: 'node',
                  
                    },
            position:
             { x: positionX, y: positionY } ,
           style:{
            backgroundColor:'chocolate',
           }
           };
            } else if( item.labels[0].includes('Pathologie')) {
              return { data:
                { id: item.elementId,
                    label: 'node',
                  
                    },
            position:
             { x: positionX, y: positionY } ,
           style:{
            backgroundColor:'cornflowerblue',
           }
           };
            } else if( item.labels[0].includes('Ouvrage')) {
              return { data:
                { id: item.elementId,
                    label: item.properties.designation,
                  
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
                    label: 'node',
                  
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
                    label: 'node',
                  
                    },
            position:
             { x: positionX, y: positionY } ,
           style:{
            backgroundColor:'green',
            fontWeight:'bold'
           }
           };
            } else if(item.labels[0].includes('Place')) {
              return { data:
                { id: item.elementId,
                    label: 'node',
                  
                    },
            position:
             { x: positionX, y: positionY } ,
           style:{
            backgroundColor:'red',
            fontWeight:'bold'
           }
           };
            } 
            else {
            return { data: { id: item.elementId, label: item.properties.designation }, position: { x: positionX, y: 0 } };
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
    Color:'red',
    fontWeight:'bold',
    fontSize:'200px',
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

  

  return (
    
    <div>
      <CytoscapeComponent elements={elements} style={{ position:'absolute',  left:'-5%',width: '90%', height: '500px' }}  />
    </div>
  );
};

export default Neo4jGraph;
