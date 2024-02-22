import React, { useEffect, useState } from 'react';
import { Driver, auth } from 'neo4j-driver'; // Importez 'auth' en plus de 'Driver' depuis 'neo4j-driver'

const GraphComponent = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    // Connexion à Neo4j
    const driver = new Driver('neo4j://localhost:7687', auth.basic('neo4j', 'password')); // Utilisez 'auth' pour créer les informations d'authentification
    const session = driver.session();

    // Exécution de la requête Cypher pour récupérer les données du graphe
    session
      .run('MATCH (n) RETURN n')
      .then(result => {
        // Traitement des données récupérées
        const data = result.records.map(record => record.get('n').properties);
        setGraphData(data);
      })
      .catch(error => console.error('Error retrieving data from Neo4j:', error));

    // Fermeture de la session Neo4j
    return () => {
      session.close();
      driver.close();
    };
  }, []);

  return (
    <div>
      <h2>Graphique de connaissances</h2>
      {/* Affichage du graphe à l'aide d'une bibliothèque de visualisation de données */}
      <div>
        {/* Utilisez les données de graphData pour construire votre graphe */}
        {/* Exemple : affichage d'une liste des nœuds */}
        <ul>
          {graphData.map(node => (
            <li key={node.id}>{node.label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GraphComponent;
