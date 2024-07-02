const express = require('express');
const neo4j = require('neo4j-driver');
const nodemailer = require('nodemailer');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const mysql = require('mysql2');
const app = express();
const port = 1000;
const upload = multer();
app.set('view engine', 'ejs');

const profiler = require('v8-profiler-next');
const fs = require('fs');

// Démarrer le profilage
profiler.startProfiling('MyProfile', true);

// Arrêter le profilage après un certain temps ou à un certain point de votre code
setTimeout(() => {
  const profile = profiler.stopProfiling('MyProfile');

  // Enregistrer le profil dans un fichier
  profile.export((error, result) => {
    fs.writeFileSync('profile.cpuprofile', result);
    profile.delete();
    console.log('Profil sauvegardé.');
  });
}, 10000);  // Par exemple, après 10 secondes

// Middleware pour activer CORS
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Configuration du transporteur d'e-mails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jy_bachikh@esi.dz',
    pass: 'nsna oteg xmgv htzm',
  },
});

// Détails de connexion
const uri = "neo4j://localhost:7687"; // Assurez-vous d'utiliser le bon port, généralement 7687 pour Bolt
const user = "neo4j";
const password = "password";
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

app.get('/api/MaterialData', async (req, res) => {
  const session = driver.session();
  try {
    // Connexion au driver Neo4j
      // Récupération des materiaux
      const materiauxResult = await session.run('MATCH (n:Materiau) RETURN n');
      const materiauxArr = materiauxResult.records.map(record => ({
          id: record._fields[0].identity.low,
          title: record._fields[0].properties.designation,
          category:'Matériaux',
          image:record.get('n').properties.images,
          famille:record._fields[0].properties.famille
      }));

      if (!materiauxResult || materiauxResult.records.length === 0) {
        // Aucune donnée de matériaux trouvée, renvoyer une réponse d'erreur
        return res.status(404).json({ message: "Aucun matériau trouvé" });
      }

      res.json({ materiaux:materiauxArr});

     } catch (err) {
        console.error(`Error executing query: ${err.message}`);
        res.status(500).send('Error executing query');
    } 
    finally {
      await session.close();
    }
    });


    app.get('/api/ProductData', async (req, res) => {
      const session = driver.session();
      try {
  
          // Récupération des produits depuis Neo4j
          const produitsResult = await session.run('MATCH (n:Produit) RETURN n ');
          const produitsArr = produitsResult.records.map(record => ({
              id: record._fields[0].identity.low,
              title: record._fields[0].properties.designation,
              category: 'Produits',
              image: record._fields[0].properties.images
          }));
  
          if (!produitsResult || produitsResult.records.length === 0) {
              return res.status(404).json({ message: "Aucun produit trouvé" });
          }
  
  
          res.json({ produits: produitsArr });
      } catch (err) {
          console.error(`Error executing query: ${err.message}`);
          res.status(500).send('Error executing query');
      } finally {
        await session.close();
      }
  });
 
   
   app.get('/api/BuildingData', async (req, res) => {
    const session = driver.session();
    try {

    // Récupération des ouvrages
    const ouvragesResult = await session.run('MATCH (n:Ouvrage) RETURN n');
    const ouvragesArr = ouvragesResult.records.map(record => ({
        id: record._fields[0].identity.low,
        title: record._fields[0].properties.designation,
        category:'Ouvrages',
        image:record._fields[0].properties.images
    }));

    if (!ouvragesResult || ouvragesResult.records.length === 0) {
        // Aucune donnée de ouvrages trouvée, renvoyer une réponse d'erreur
        return res.status(404).json({ message: "Aucun ouvrage trouvé" });
      }

      res.json({ouvrages: ouvragesArr});

    } catch (err) {
       console.error(`Error executing query: ${err.message}`);
       res.status(500).send('Error executing query');
   } 
     finally {
       await session.close();
     }
   });

   app.get('/api/MonumentData', async (req, res) => {
    const session = driver.session();
    try {

    // Récupération des Monuments
    const monumentsResult = await session.run('MATCH (n:Monument) RETURN n');
    const monumentArr = monumentsResult.records.map(record => ({
        id: record._fields[0].identity.low,
        title: record._fields[0].properties.designation,
        attitude: record._fields[0].properties.latitude,
        longitude: record._fields[0].properties.longitude,
        image:record._fields[0].properties.images,
        category:'Monuments',
        //image:record._fields[0].properties.images
    }));

    if (!monumentsResult || monumentsResult.records.length === 0) {
        // Aucune donnée de monuments trouvée, renvoyer une réponse d'erreur
        return res.status(404).json({ message: "Aucun monument trouvé" });
      }
      res.json({monuments:monumentArr});

    } catch (err) {
       console.error(`Error executing query: ${err.message}`);
       res.status(500).send('Error executing query');
   } 
     finally {
       await session.close();
     }
   });

   app.get('/api/PathologieData', async (req, res) => {
    const session = driver.session();
    try {
    // Récupération des Monuments
    const pathologieResult = await session.run('MATCH (n:Pathologie) RETURN n');
    const pathologieArr = pathologieResult.records.map(record => ({
        id: record._fields[0].identity.low,
        title: record._fields[0].properties.designation,
        category:record._fields[0].properties.categorie,
        //image:record._fields[0].properties.images
    }));

    if (!pathologieResult || pathologieResult.records.length === 0) {
        // Aucune donnée de monuments trouvée, renvoyer une réponse d'erreur
        return res.status(404).json({ message: "Aucun monument trouvé" });
      }
      res.json({pathologies:pathologieArr});

    } catch (err) {
       console.error(`Error executing query: ${err.message}`);
       res.status(500).send('Error executing query');
   } 
     finally {
       await session.close();
     }
   });
   app.get('/api/PlaceData', async (req, res) => {
    const session = driver.session();
    try {

    // Récupération des Places
    const placesResult = await session.run('MATCH (n:Place) RETURN n');
    const placesArr = placesResult.records.map(record => ({
        id: record._fields[0].identity.low,
        title: record._fields[0].properties.designation,
        category:'Places'
    }));
    if (!placesResult || placesResult.records.length === 0) {
        // Aucune donnée de places trouvée, renvoyer une réponse d'erreur
        return res.status(404).json({ message: "Aucun place trouvé" });
      }
      res.json({places:placesArr});

    } catch (err) {
       console.error(`Error executing query: ${err.message}`);
       res.status(500).send('Error executing query');
   } 
     finally {
       await session.close();
     }
   });

   app.get('/api/PeriodeData', async (req, res) => {
    const session = driver.session();
    try {

     // Récupération des Periodes
     const periodesResult = await session.run('MATCH (n:Periode) RETURN n');
     const periodesArr = periodesResult.records.map(record => ({
         id: record._fields[0].identity,
         title: record._fields[0].properties.designation,
         category:'Périodes'
     }));

     if (!periodesResult || periodesResult.records.length === 0) {
        // Aucune donnée de periodes trouvée, renvoyer une réponse d'erreur
        return res.status(404).json({ message: "Aucun periodee trouvé" });
      }
      
    // Envoi de la réponse avec les deux listes
    res.json({periodes:periodesArr});

  } catch (err) {
    console.error(`Error executing query: ${err.message}`);
    res.status(500).send('Error executing query');
} 
  finally {
    await session.close();
  }
});

app.get('/api/ColorsData', async (req, res) => {
  const session = driver.session();
  try {

    const couleursResult = await session.run('MATCH (m) UNWIND m.couleur AS couleur RETURN  DISTINCT couleur AS couleur');
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
 res.json({couleurs:couleursArr});
} catch (err) {
 console.error(`Error executing query: ${err.message}`);
 res.status(500).send('Error executing query');
} finally {
  await session.close();
}
});
app.post('/api/RelationData', async (req, res) => {
  const session = driver.session();
  const { nodeId, nodeFamily } = req.body; // Récupération des paramètres de requête
  console.log(req.body)

  try {
    const relationsResult = await session.run(
      'MATCH (n)-[r]-(connectedNode) WHERE id(n) = $nodeId AND connectedNode.famille = $nodeFamily RETURN distinct connectedNode',
      { nodeId: parseInt(nodeId), nodeFamily }
    );

    const relationsArr = relationsResult.records.map(record => ({
      id: record.get('connectedNode').identity.low,
      title: record.get('connectedNode').properties.designation,
      image:record.get('connectedNode').properties.images,
    }));

    if (!relationsResult || relationsResult.records.length === 0) {
      // Aucune donnée trouvée, renvoyer une réponse d'erreur
      return res.status(404).json({ message: "Aucun Usage trouvé" });
    }

    // Envoi de la réponse avec les données trouvées
    res.json({ data: relationsArr  });
  } catch (err) {
    console.error(`Error executing query: ${err.message}`);
    res.status(500).send('Error executing query');
  } finally {
    await session.close();
  }
});

app.post('/api/RelationColorData', async (req, res) => {
  const session = driver.session();
  const { nodeColor, nodeFamily } = req.body; // Récupération des paramètres de requête
  console.log(req.body)

  try {
    const relationsResult = await session.run(
      'MATCH (n)-[r]-(connectedNode) WHERE n.couleur = $nodeColor AND connectedNode.famille = $nodeFamily RETURN distinct connectedNode',
      { nodeColor, nodeFamily }
    );

    const relationsArr = relationsResult.records.map(record => ({
      id: record.get('connectedNode').identity.low,
      title: record.get('connectedNode').properties.designation,
      image:record.get('connectedNode').properties.images,
    }));

    if (!relationsResult || relationsResult.records.length === 0) {
      // Aucune donnée trouvée, renvoyer une réponse d'erreur
      return res.status(404).json({ message: "Aucun Usage trouvé" });
    }

    // Envoi de la réponse avec les données trouvées
    res.json({ data: relationsArr  });
  } catch (err) {
    console.error(`Error executing query: ${err.message}`);
    res.status(500).send('Error executing query');
  } finally {
    await session.close();
  }
});

app.get('/api/UsageData', async (req, res) => {
  const session = driver.session();
  try {

    const usageResult = await session.run('MATCH (m:Usage) RETURN m');
    const usageArr = usageResult.records.map(record => ({
        id: record._fields[0].identity.low,
        title: record._fields[0].properties.designation,
    }));

    if (!usageResult || usageResult.records.length === 0) {
     // Aucune donnée de couleurs trouvée, renvoyer une réponse d'erreur
     return res.status(404).json({ message: "Aucun Usage trouvé" });
   }
 // Envoi de la réponse avec les deux listes
 res.json({usage:usageArr});
} catch (err) {
 console.error(`Error executing query: ${err.message}`);
 res.status(500).send('Error executing query');
} finally {
  await session.close();
}
});

app.post('/api/RelationProductData', async (req, res) => {
  const session = driver.session();
  const { nodeId, nodeLabel } = req.body; // Récupération des paramètres de requête
  console.log(req.body)

  try {
    const relationsResult = await session.run(
      'MATCH (connectedNode)-[r]-(n) WHERE id(n) = $nodeId AND labels(connectedNode) = [$nodeLabel] RETURN distinct connectedNode',
      { nodeId: parseInt(nodeId), nodeLabel }
    );

    const relationsArr = relationsResult.records.map(record => ({
      id: record.get('connectedNode').identity.low,
      title: record.get('connectedNode').properties.designation,
      image:record.get('connectedNode').properties.images,
    }));

    if (!relationsResult || relationsResult.records.length === 0) {
      // Aucune donnée trouvée, renvoyer une réponse d'erreur
      return res.status(404).json({ message: "Aucun Usage trouvé" });
    }

    // Envoi de la réponse avec les données trouvées
    res.json({ data: relationsArr  });
  } catch (err) {
    console.error(`Error executing query: ${err.message}`);
    res.status(500).send('Error executing query');
  } finally {
    await session.close();
  }
});
app.get('/api/nodes/advancedSearch/:searchTerm', async (req, res) => {
    const session = driver.session();
    const Term = req.params.searchTerm;
    try {
      const nodesResult = await session.run(
        'MATCH (n)-[]-(connectedNode) WHERE n.designation = $Term RETURN connectedNode',
        { Term }
      );
  
      const nodes = nodesResult.records.map(record => ({
        id: record.get('connectedNode').identity.low,
        title: record.get('connectedNode').properties.designation,
        category: record.get('connectedNode').labels,
        couleur: record.get('connectedNode').properties.couleur
      }));
  
      res.json({ nodes });
    } catch (err) {
      console.error(`Error fetching advanced search results: ${err.message}`);
      res.status(500).send('Error fetching advanced search results');
    } finally {
      session.close();
    }
  });

  app.get('/api/nodes', async (req, res) => {
    const session = driver.session();
    try {
      // Récupération des nœuds connectés avec leurs relations
      const query = `
        MATCH (n)-[r]->(m)
        RETURN DISTINCT id(n) AS id, n.designation AS designation, labels(n) AS labels,
                        id(r) AS relationId, type(r) AS relationType,
                        id(m) AS targetId, m.designation AS targetDesignation, labels(m) AS targetLabels
      `;
  
      const result = await session.run(query);
      const nodes = [];
      const edges = [];
  
      // Parcourir les résultats pour construire les nœuds et les relations
      result.records.forEach(record => {
        const nodeId = record.get('id').low;
        const targetId = record.get('targetId').low;
        const relationId = record.get('relationId').low;
  
        // Ajouter le nœud source s'il n'existe pas déjà
        if (!nodes.some(node => node.id === nodeId)) {
          nodes.push({
            id: nodeId,
            designation: record.get('designation'),
            labels: record.get('labels')
          });
        }
  
        // Ajouter le nœud cible s'il n'existe pas déjà
        if (!nodes.some(node => node.id === targetId)) {
          nodes.push({
            id: targetId,
            designation: record.get('targetDesignation'),
            labels: record.get('targetLabels')
          });
        }
  
        // Ajouter la relation
        edges.push({
          elementId: relationId,
          startNodeElementId: nodeId,
          endNodeElementId: targetId,
          labels: record.get('relationType')
        });
      });
  
      // Filtrer les nœuds pour n'inclure que ceux qui sont liés par des relations
      const connectedNodeIds = new Set([...edges.map(edge => edge.startNodeElementId), ...edges.map(edge => edge.endNodeElementId)]);
      const connectedNodes = nodes.filter(node => connectedNodeIds.has(node.id));
  
      res.json({ nodes: connectedNodes, edges });
    } catch (err) {
      console.error(`Error fetching schema: ${err.message}`);
      res.status(500).send('Error fetching schema');
    } finally {
      await session.close();
    }
  });
  
  
  app.get('/api/nodes/Search/:search', async (req, res) => {
    const Term = req.params.search;
    const session = driver.session();
    console.log(Term)
    try {
        // Récupération du schéma du graphe
        const nodesresult = await session.run('MATCH (n) WHERE n.designation = $Term  RETURN id(n) AS id , n.designation AS designation , labels(n) AS category ' ,{Term});
       const  nodes=nodesresult.records.map(record => ({
        id: record.get('id').low,
        title: record.get('designation'),
        category:record.get('category'),
  
       }));
       
    res.json({nodes});
   
    } catch (err) {
        console.error(`Error fetching schema: ${err.message}`);
        res.status(500).send('Error fetching schema');
    }  finally {
      await session.close();
    }
  });

  app.get('/api/nodes/Category/:category', async (req, res) => {
    const Term = req.params.category;
    const session = driver.session();
    console.log(Term)
    try {
        // Récupération du schéma du graphe
        const nodesresult = await session.run('MATCH (n) where labels(n)=[$Term] RETURN id(n) AS id , n.designation AS designation , labels(n) AS category' ,{Term});
       const  nodes=nodesresult.records.map(record => ({
        id: record.get('id').low,
        title: record.get('designation'),
        category:record.get('category'),
       }));
       
    res.json({nodes});
   
    } catch (err) {
        console.error(`Error fetching schema: ${err.message}`);
        res.status(500).send('Error fetching schema');
    }  finally {
      await session.close();
    }
  });

  app.get('/api/nodes/Color/:color', async (req, res) => {
    const Term = req.params.color;
    const session = driver.session();
    console.log(Term)
    try {
        // Récupération du schéma du graphe
        const nodesresult = await session.run('MATCH (n) where $Term in n.couleur RETURN id(n) AS id , n.designation AS designation , labels(n) AS category' ,{Term});
       const  nodes=nodesresult.records.map(record => ({
        id: record.get('id').low,
        title: record.get('designation'),
        category:record.get('category'),
       }));
       
    res.json({nodes});
   
    } catch (err) {
        console.error(`Error fetching schema: ${err.message}`);
        res.status(500).send('Error fetching schema');
    }  finally {
      await session.close();
    }
  });

  app.get('/api/componentsId/:id', async (req, res) => {
    const session = driver.session(); // Assigner la session ici
      const componentId = parseInt(req.params.id, 10);
      try {
       
        
        const componentsresult = await session.run('MATCH (p) WHERE ID(p)=$componentId RETURN p',{componentId});
        const componentsArr = componentsresult.records[0].get('p').properties;
        res.json({component:componentsArr});
      } catch (error) {
        console.error('Error fetching components details',error);
        res.status(500).send('Internal Server Error');
      } finally {
        await session.close();
      }
    });


    app.get('/api/RealtionsData/:componentId', async (req, res) => {
      const session = driver.session();
      const componentId = parseInt(req.params.componentId, 10);
      console.log(componentId);
      try {
  
          // Récupération des produits depuis Neo4j
          const Result = await session.run('MATCH (n)-[r]-(s) WHERE id(n) = $componentId RETURN type(r) AS type,     CASE   WHEN startNode(r) = n THEN endNode(r).designation ELSE startNode(r).designation  END AS cible',{componentId});
          const Arr = Result.records.map(record => ({
              relation: record.get('type'),
              Cible: record.get('cible')
          }));
  
          if (!Result || Result.records.length === 0) {
              return res.status(404).json({ message: "Aucun produit trouvé" });
          }
  
  
          res.json({ infos: Arr });
      } catch (err) {
          console.error(`Error executing query: ${err.message}`);
          res.status(500).send('Error executing query');
      } finally {
        await session.close();
      }
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

 
  