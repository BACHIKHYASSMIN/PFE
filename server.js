const express = require('express');
const neo4j = require('neo4j-driver');
const router = express.Router();
const mysql = require('mysql');
const app = express();
const port = 2000;
app.set('view engine', 'ejs');
// Middleware pour activer CORS
app.use(express.json());
app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Autoriser les requêtes depuis le domaine de votre application cliente
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Méthodes HTTP autorisées
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // En-têtes autorisés
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Autoriser l'envoi de cookies depuis le navigateur
    next();
  });
  
app.get('/api/data', async (req, res) => {
  const URI = 'neo4j://localhost';
  const USER = 'neo4j';
  const PASSWORD = 'password';
  let driver;

  try {
    // Connexion au driver Neo4j
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
    const session = driver.session();
      // Récupération des materiaux
      const materiauxResult = await session.run('MATCH (n:Materiau) RETURN n');
      const materiauxArr = materiauxResult.records.map(record => ({
          id: record._fields[0].identity.low,
          title: record._fields[0].properties.designation,
          category:'Matériaux'
      }));

      if (!materiauxResult || materiauxResult.records.length === 0) {
        // Aucune donnée de matériaux trouvée, renvoyer une réponse d'erreur
        return res.status(404).json({ message: "Aucun matériau trouvé" });
      }
    // Récupération des produits
    const produitsResult = await session.run('MATCH (n:Produit) RETURN n');
    const produitsArr = produitsResult.records.map(record => ({
        id: record._fields[0].identity.low,
        title: record._fields[0].properties.designation,
        category:'Produits'
    }));

    if (!produitsResult || produitsResult.records.length === 0) {
        // Aucune donnée de produits trouvée, renvoyer une réponse d'erreur
        return res.status(404).json({ message: "Aucun produit trouvé" });
      }
    // Récupération des ouvrages
    const ouvragesResult = await session.run('MATCH (n:Ouvrage) RETURN n');
    const ouvragesArr = ouvragesResult.records.map(record => ({
        id: record._fields[0].identity.low,
        title: record._fields[0].properties.designation,
        category:'Ouvrage'
    }));

    if (!ouvragesResult || ouvragesResult.records.length === 0) {
        // Aucune donnée de ouvrages trouvée, renvoyer une réponse d'erreur
        return res.status(404).json({ message: "Aucun ouvrage trouvé" });
      }

    // Récupération des Monuments
    const monumentsResult = await session.run('MATCH (n:Monument) RETURN n');
    const monumentArr = monumentsResult.records.map(record => ({
        id: record._fields[0].identity.low,
        title: record._fields[0].properties.designation,
        attitude: record._fields[0].properties.attitude,
        longitude: record._fields[0].properties.longitude,
        category:'Monument'
    }));

    if (!monumentsResult || monumentsResult.records.length === 0) {
        // Aucune donnée de monuments trouvée, renvoyer une réponse d'erreur
        return res.status(404).json({ message: "Aucun monument trouvé" });
      }
    // Récupération des Places
    const placesResult = await session.run('MATCH (n:Place) RETURN n');
    const placesArr = placesResult.records.map(record => ({
        id: record._fields[0].identity,
        title: record._fields[0].properties.designation,
        category:'Place'
    }));
    if (!placesResult || placesResult.records.length === 0) {
        // Aucune donnée de places trouvée, renvoyer une réponse d'erreur
        return res.status(404).json({ message: "Aucun place trouvé" });
      }

     // Récupération des Periodes
     const periodesResult = await session.run('MATCH (n:Periode) RETURN n');
     const periodesArr = periodesResult.records.map(record => ({
         id: record._fields[0].identity,
         title: record._fields[0].properties.designation,
         category:'Periode'
     }));

     if (!periodesResult || periodesResult.records.length === 0) {
        // Aucune donnée de periodes trouvée, renvoyer une réponse d'erreur
        return res.status(404).json({ message: "Aucun periodee trouvé" });
      }
       // Récupération des Couleurs
       const couleursResult = await session.run('MATCH (m:Materiau) UNWIND m.couleur AS couleur RETURN  DISTINCT couleur AS couleur');
       const couleursArr = couleursResult.records.map(record => ({
           id: record._fields[0].identity,
           title: record._fields[0],
           category:'Couleur'
       }));

       if (!couleursResult || couleursResult.records.length === 0) {
        // Aucune donnée de couleurs trouvée, renvoyer une réponse d'erreur
        return res.status(404).json({ message: "Aucun couleur trouvé" });
      }
    // Envoi de la réponse avec les deux listes
    res.json({ materiaux:materiauxArr ,produits: produitsArr, ouvrages: ouvragesArr,monuments:monumentArr, places:placesArr,couleurs:couleursArr , periodes:periodesArr});

} catch (err) {
    console.error(`Error executing query: ${err.message}`);
    res.status(500).send('Error executing query');
} finally {
    if (driver) await driver.close();
}
});


app.get('/api/componentsId/:id', async (req, res) => {

  const URI = 'neo4j://localhost';
  const USER = 'neo4j';
  const PASSWORD = 'password';
  let driver;
  let session; // Déclarer la variable session en dehors du bloc try
  const componentId = parseInt(req.params.id, 10);


  try {
    // Connexion au driver Neo4j
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
    session = driver.session(); // Assigner la session ici
    const componentsresult = await session.run('MATCH (p) WHERE ID(p)=$componentId RETURN p',{componentId});
    const componentsArr = componentsresult.records[0].get('p').properties;
    res.json({component:componentsArr});
  } catch (error) {
    console.error('Error fetching components details',error);
    res.status(500).send('Internal Server Error');
  } finally {
    if (session) await session.close(); // Vérifier si la session est définie avant de la fermer
  }
});

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

app.get('/api/node', async (req, res) => {
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
      const nodes = nodesresult .records.map(record => ({
        id: record._fields[0].identity.low,
        title: record._fields[0].properties.designation
    }));
      res.json({ nodes });
  
  } catch (err) {
      console.error(`Error fetching schema: ${err.message}`);
      res.status(500).send('Error fetching schema');
  } finally {
      if (driver) await driver.close();
  }
});

app.post('/api/register', async (req, res) => {
  const { nomComplet, email, motDePasse } = req.body;

  // Créer une connexion à la base de données MySQL
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'materiautheque'
  });

  try {
    // Insertion des données d'inscription dans la base de données
    const sql = "INSERT INTO logging (`full name`, `email`, `password`) VALUES (?, ?, ?)";
    connection.query(sql, [nomComplet, email, motDePasse], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'inscription :', err);
        res.status(500).json({ message: 'Erreur lors de l\'inscription' });
      } else {
        console.log('Utilisateur inscrit avec succès');
        res.status(200).json({ message: 'Inscription réussie' });
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, pass } = req.body;

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'materiautheque'
  });
  
  try {
  // Recherche de l'utilisateur dans la base de données
  connection.query('SELECT * FROM logging WHERE `email` = ? AND `password` = ?', [email, pass], (error, results) => {
      if (error) {
          console.error('Erreur lors de la connexion :', error);
          res.status(500).json({ message: 'Erreur lors de la connexion' });
      } else {
          if (results.length > 0) {
              // L'utilisateur est trouvé, authentification réussie
              res.status(200).json({ message: 'Authentification réussie' });
          } else {
              // Aucun utilisateur correspondant trouvé
              res.status(401).json({ message: 'Email ou mot de passe incorrect' });
          }
      }
  });
  }catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur lors de connexion' });
  }
});

app.get('/api/nodes/subgraph/:nodeId', async (req, res) => {
  const URI = 'neo4j://localhost';
  const USER = 'neo4j';
  const PASSWORD = 'password';
  let driver;
  let session; // Déclarer la variable session en dehors du bloc try
  const componentId = parseInt(req.params.nodeId, 10);
  try {
      // Connexion au driver Neo4j
      driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
      const session = driver.session();
  
      // Récupération du schéma du graphe
      const nodesresult = await session.run('MATCH (n)-[]-(connectedNode) WHERE ID(n) =$componentId RETURN n,connectedNode',{componentId});
      let nodes = [];
      // Traitement des données du schéma pour les rendre compatibles avec la bibliothèque frontale
      nodesresult.records.forEach(record => {
          // Extraire les propriétés du nœud de chaque enregistrement
          const Nproperties = record.get('n');
          nodes.push(Nproperties); // Ajouter les propriétés du nœud à votre tableau de nœuds
          const properties = record.get('connectedNode');
          nodes.push(properties); // Ajouter les propriétés du nœud à votre tableau de nœuds
          
      });


      // Récupération du schéma du graphe
      const edgesresult = await session.run('MATCH (n)-[r]-(connectedNode) WHERE ID(n) = $componentId RETURN  r',{componentId});
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


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

 