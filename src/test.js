import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import axios from 'axios';

const SchemaViewer = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/schema');
      
        const schemaData = response.data;
      
        // Formater les données récupérées pour les utiliser dans Cytoscape.js
        const formattedElements = [];

        if (schemaData.nodes) {
            schemaData.nodes.forEach(node => {
                console.log('Node label:', node.label);
                formattedElements.push({ data: { id: node.id, label: node.label } });
            });
        } else {
            console.error('No nodes found in schema data');
        }
  // Ajouter les arêtes
  schemaData.relationships.forEach(relationship => {
    console.log('Relationship label:', relationship.type);
    formattedElements.push({
      data: {
        source: relationship.startNodeId,
        target: relationship.endNodeId,
        label: relationship.type // Vous pouvez utiliser le type de relation comme libellé de l'arête
      }
    });
  });
        // Mettre à jour l'état avec les éléments formatés
        setElements(formattedElements);
      } catch (error) {
        console.error('Error fetching schema:', error);
      }
    };

    fetchSchema();
  }, []);

  return (
    <div>
      <CytoscapeComponent elements={elements} style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

export default SchemaViewer;
