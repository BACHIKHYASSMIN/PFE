import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CytoscapeComponent from 'react-cytoscapejs';
import './GraphStyle.css';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const Neo4jGraph = () => {
  const [elements, setElements] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [matId, setMatId] = useState(0);
  const [cyInstance, setCyInstance] = useState(null);
  const cyInstanceRef = useRef(null);


  const legend = [
    { color: 'orange', label: 'Produit' },
    { color: 'gold', label: 'Ouvrage' },
    { color: 'crimson', label: 'Monument' },
    { color: 'aquamarine', label: 'ConstruirRelation' },
    { color: 'blue', label: 'Materiau' },
    { color: 'green', label: 'Periode' },
    { color: 'red', label: 'Place' },
    { color: 'violet', label: 'Pathologie' }
  ];

  const fetchGraphData = async () => {
    try {
      const response = await axios.get('http://localhost:1000/api/nodes');
      const responseData = response.data;

      // Filtrer les nœuds pour n'inclure que ceux qui sont connectés par des relations
      const connectedNodes = filterConnectedNodes(responseData.nodes, responseData.edges);

      // Formater les éléments pour Cytoscape
      const { nodes, edges } = formatElements(connectedNodes, responseData.edges);

      setElements([...nodes, ...edges]);
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  };

  const filterConnectedNodes = (nodes, edges) => {
    const connectedNodeIds = new Set();

    edges.forEach(edge => {
      connectedNodeIds.add(edge.startNodeElementId);
      connectedNodeIds.add(edge.endNodeElementId);
    });

    return nodes.filter(node => connectedNodeIds.has(node.id));
  };

  const formatElements = (nodes, edges) => {
    const formattedNodes = nodes.map((item, index) => {
      const positionX = index * 100;
      const positionY = index * 2;
      let backgroundColor = '';
      let label = 'node';

      switch (item.labels[0]) {
        case 'Produit':
          backgroundColor = 'orange';
          label = item.designation;
          break;
        case 'Restauration':
        case 'Technique':
          backgroundColor = '';
          break;
        case 'Pathologie':
          backgroundColor = 'violet';
          break;
        case 'Ouvrage':
          backgroundColor = 'gold';
          label = item.designation;
          break;
        case 'Monument':
          backgroundColor = 'crimson';
          label = item.designation;
          break;
        case 'ConstruirRelation':
          backgroundColor = 'aquamarine';
          label = item.designation;
          break;
        case 'Materiau':
          backgroundColor = 'blue';
          label = item.designation;
          break;
        case 'Periode':
          backgroundColor = 'green';
          label = item.designation;
          break;
        case 'Place':
          backgroundColor = 'red';
          label = item.designation;
          break;
        default:
          label = item.designation;
          break;
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
        id: `edge_${edge.elementId}`,
        source: edge.startNodeElementId,
        target: edge.endNodeElementId,
        label: edge.labels
      },
      style: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '100px'
      }
    }));

    return { nodes: formattedNodes, edges: formattedEdges };
  };

  useEffect(() => {
    fetchGraphData();

    // Extraction des paramètres de requête de l'URL
    const queryParams = queryString.parse(location.search);
    const selectedMaterials = queryParams.selectedMaterials;

    // Si des matériaux sont sélectionnés, mettre à jour matId
    if (selectedMaterials) {
      const materialIds = Array.isArray(selectedMaterials) ? selectedMaterials : [selectedMaterials];
      const materialId = materialIds[0];
      setMatId(materialId);
    }
  }, [location.search]);

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

  useEffect(() => {
    if (cyInstanceRef.current) {
      cyInstanceRef.current.fit();
    }
  }, [elements]);
  
  const cyEventHandler = (cy) => {
    try {
      cyInstanceRef.current = cy;
    cy.on('tap', 'node', (event) => {
      const nodeId = event.target.id();
      const nodeType = event.target._private.data.type;

      switch (nodeType) {
        case 'Produit':
          navigate(`/produitDetails/${nodeId}`);
          break;
        case 'Materiau':
          navigate(`/materiauDetails/${nodeId}`);
          break;
        case 'Monument':
          navigate(`/monumentDetails/${nodeId}`);
          break;
        case 'Ouvrage':
          navigate(`/ouvrageDetails/${nodeId}`);
          break;
        default:
          break;
      }
      if (cyInstanceRef.current) {
        cyInstanceRef.current.fit();
      }
    });

    if (cyInstance) {
      cyInstance.fit();
    } else {
      setCyInstance(cy);
    }
  } catch (error) {
    console.error('Error in cyEventHandler:', error);
  }
  };

  return (
    <div>
      <CytoscapeComponent
        elements={elements}
        style={{ position: 'absolute', left: '35%', width: '50%', height: '500px' }}
        layout={layoutOptions}
        cy={(cy) => {
          cyEventHandler(cy);
          cy.layout({
            name: 'cose',
            animate: true, // Désactive l'animation lors de l'exécution du layout
            idealEdgeLength: 200, // Longueur idéale des arêtes
            edgeElasticity: 0.7, // Élasticité des arêtes
            nodeRepulsion: 1000, // Répulsion entre les nœuds
            nodeOverlap: 9000, // Tolérance de chevauchement entre les nœuds
            randomize: false, // Désactive la randomisation initiale des positions des nœuds
            padding: 10,
          }).run();
        }}
      />
      <div className="legend">
        <h3>Legend</h3>
        <ul>
          {legend.map((item, index) => (
            <li key={index}>
              <span className="legend-color" style={{ backgroundColor: item.color }}></span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Neo4jGraph;
