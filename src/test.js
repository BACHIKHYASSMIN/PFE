import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CytoscapeComponent from 'react-cytoscapejs';
import './GraphStyle.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const Neo4jGraph = ({graph}) => {
  const [elements, setElements] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(graph)
const [matId,setMatId]=useState(0);
  const formatElements = (nodes, edges) => {
    const formattedNodes = nodes.map((item, index) => {
      const positionX = index * 100;
      const positionY = index * 2;
      let backgroundColor = '';
      let label = 'node';

      if (item.labels[0].includes('Produit')) {
        backgroundColor = 'orange';
        label = item.designation;
      } else if (item.labels[0].includes('Restauration')) {
        backgroundColor = '';
      } else if (item.labels[0].includes('Technique')) {
        backgroundColor = '';
      } else if (item.labels[0].includes('Pathologie')) {
        backgroundColor = '';
      } else if (item.labels[0].includes('Ouvrage')) {
        backgroundColor = 'gold';
        label = item.designation;
      } else if (item.labels[0].includes('Monument')) {
        backgroundColor = 'crimson';
        label = item.designation;
      } else if (item.labels[0].includes('ConstruirRelation')) {
        backgroundColor = 'aquamarine';
        label = item.designation;
      } else if (item.labels[0].includes('Materiau')) {
        backgroundColor = 'blue';
        label = item.designation;
      } else if (item.labels[0].includes('Periode')) {
        backgroundColor = 'green';
        label = item.designation;
      } else if (item.labels[0].includes('Place')) {
        backgroundColor = 'red';
        label = item.designation;
      } else {
        label = item.designation;
      }

      return {
        data: {
          id: item.id,
          label: label,
          type: item.labels[0],
        },
        position: { x: positionX, y: positionY },
        style: {
          backgroundColor: backgroundColor,
          fontWeight: 'bold'
        },
      };
    });

    const formattedEdges = edges.map(edge => ({
      data: {
        id: edge.elementId-300,
        source: edge.startNodeElementId,
        target: edge.endNodeElementId,
        label: edge.type,
      },
      style: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '100px',
      },
    }));

    return { nodes: formattedNodes, edges: formattedEdges };
  };


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(graph)
        const responseData = graph
        const { nodes, edges } = formatElements(responseData.nodes, responseData.edges);
        setElements([...nodes, ...edges]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
    // Extraction des paramètres de requête de l'URL
    const queryParams = queryString.parse(location.search);
    const selectedMaterials = queryParams.selectedMaterials;
  
    // Si des matériaux sont sélectionnés, récupérer le sous-graphe correspondant
    if (selectedMaterials) {
      const materialIds = Array.isArray(selectedMaterials) ? selectedMaterials : [selectedMaterials];
      const materialId = materialIds[0];
      setMatId(materialId); // Mise à jour de materId
    }
  
    
  }, [location.search]); // Ajout de fetchSubGraph comme dépendance
  

  // Utiliser useEffect pour appeler fetchSubGraph une fois que matId est mis à jour
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Exécuter fetchSubGraph avec matId si matId existe
        if (matId) {
          await fetchSubGraph(matId);
        }
      } catch (error) {
        console.error('Error fetching subgraph:', error);
      }
    };
  
    fetchData(); // Appel initial pour récupérer le sous-graphe lorsque le composant est monté
  
    // L'effet sera réexécuté chaque fois que matId change
  }, [matId]);

  const fetchSubGraph = async (nodeId) => {
    try {
      setElements([]);
      console.log(nodeId);
      const response = await axios.get(`http://localhost:2000/api/nodes/subgraph/${nodeId}`);
      const responseData = response.data;
      const { nodes, edges } = formatElements(responseData.nodes, responseData.edges);
      setElements([...nodes, ...edges]);
    } catch (error) {
      console.error('Error fetching subgraph:', error);
    }
  };
  
  const layoutOptions = {
    name: 'cose',
  };

  const cyEventHandler = (cy) => {
    cy.on('tap', 'node', (event) => {
      const nodeId = event.target.id();
      const nodelabels = event.target._private.data.type;
      if (nodelabels && nodelabels.includes('Produit')) {
        navigate(`/produitdetails/${nodeId}`);
      } else if (nodelabels.includes('Materiau')) {
        navigate(`/materialdetails/${nodeId}`);
      } else if (nodelabels.includes('Monument')) {
        navigate(`/monumentdetails/${nodeId}`);
      } else if (nodelabels.includes('Ouvrage')) {
        navigate(`/ouvragedetails/${nodeId}`);
      }
    });
  };



  return (
    <div>
      <CytoscapeComponent
        elements={elements}
        style={{ position: 'absolute', left: '35%', width: '50%', height: '500px' }}
        layout={layoutOptions}
        cy={(cy) => {
          cyEventHandler(cy);
          cy.layout({ name: 'cose' }).run();
        }}
      />
    </div>
  );
}
  
export default Neo4jGraph;
