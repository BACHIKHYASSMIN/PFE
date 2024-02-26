const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');

const port = 4000;
const app = express();

// Middleware CORS pour autoriser les requêtes cross-origin
app.use(cors());

app.get('/api/nodes', async (req, res) => {
    const URI = 'neo4j://localhost';
    const USER = 'neo4j';
    const PASSWORD = 'password';
    let driver;

    try {
        // Connexion au driver Neo4j
        driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
        const session = driver.session();
    
        // Récupération du schéma du graphe
        const nodesresult = await session.run('MATCH (n) RETURN  n');
        let nodes = [];
        // Traitement des données du schéma pour les rendre compatibles avec la bibliothèque frontale
        nodesresult.records.forEach(record => {
            // Extraire les propriétés du nœud de chaque enregistrement
            const properties = record.get('n');
            nodes.push(properties); // Ajouter les propriétés du nœud à votre tableau de nœuds
        });


        // Récupération du schéma du graphe
        const edgesresult = await session.run('MATCH ()-[r]->() RETURN r');
        let edges = [];
        // Traitement des données du schéma pour les rendre compatibles avec la bibliothèque frontale
        edgesresult .records.forEach(record => {
            // Extraire les propriétés du nœud de chaque enregistrement
            const properties = record.get('r');
            edges.push(properties); // Ajouter les propriétés du nœud à votre tableau de nœuds
        });
        res.json({ nodes,edges });
    
    } catch (err) {
        console.error(`Error fetching schema: ${err.message}`);
        res.status(500).send('Error fetching schema');
    } finally {
        if (driver) await driver.close();
    }
});


app.get('/api/edges', async (req, res) => {
    const URI = 'neo4j://localhost';
    const USER = 'neo4j';
    const PASSWORD = 'password';
    let driver;

    try {
        // Connexion au driver Neo4j
        driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
        const session = driver.session();
    
        // Récupération du schéma du graphe
        const result = await session.run('MATCH ()-[r]->() RETURN r');
    
        // Traitement des données du schéma pour les rendre compatibles avec la bibliothèque frontale
        const edges = result.records.map(record => {

                return {
                    label: record.get('r'),
                };
            
        }); // Filtrer les nœuds sans position
    
        // Envoyer les données traitées au client
        res.json({ edges });
    
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
