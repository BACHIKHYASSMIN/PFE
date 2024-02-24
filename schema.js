const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');

const port = 4000;
const app = express();

// Middleware CORS pour autoriser les requêtes cross-origin
app.use(cors());

app.get('/api/schema', async (req, res) => {
    const URI = 'neo4j://localhost';
    const USER = 'neo4j';
    const PASSWORD = 'password';
    let driver;

    try {
        // Connexion au driver Neo4j
        driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
        const session = driver.session();

        // Récupération du schéma du graphe
        const result = await session.run('MATCH (n) RETURN n');

        // Traitement des données du schéma pour les rendre compatibles avec la bibliothèque frontale
        const nodes = result.records.map(record => {
            const node = record.get('n');
            const properties = node.properties;
            const formattedProperties = {};
           
            // Formatte les propriétés pour supprimer les listes vides
    Object.keys(properties).forEach(key => {
        const values = properties[key];
        if (Array.isArray(values) && values.length > 0) {
            formattedProperties[key] = values;
        }
    });
    return {
        id: node.identity.toString(),
        label: node.labels[0],
        properties: formattedProperties
     
    };
    
});

      
       


         // Récupération des relations
         const relationshipsResult = await session.run('MATCH ()-[r]->() RETURN r');

         // Traitement des données des relations
const relationships = relationshipsResult.records.map(record => {
    const relationship = record.get('r');
    
    return {
        id: relationship.identity.toString(),
        startNodeId: relationship.start.toString(),
        endNodeId: relationship.end.toString(),
        type: relationship.type,
        properties: relationship.properties // Vous pouvez ajouter des traitements supplémentaires pour formater les propriétés si nécessaire
    };
});
 
         // Envoi de la réponse avec les informations des nœuds et des relations
         res.json({ nodes, relationships });
    } catch (err) {
        console.error(`Error fetching schema: ${err.message}`);
        res.status(500).send('Error fetching schema');
    } finally {
        if (driver) await driver.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
