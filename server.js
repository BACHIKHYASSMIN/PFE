const express = require('express');
const neo4j = require('neo4j-driver');
const nodemailer = require('nodemailer');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const mysql = require('mysql2');
const app = express();
const port = 2000;
const upload = multer();
app.set('view engine', 'ejs');

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

// Promesse pour exécuter une requête SQL avec le pool de connexions
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};
// Création d'un pool de connexions MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'materiautheque'
});
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
          image:record._fields[0].properties.images,
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



app.get('/api/all', async (req, res) => {
  const session = driver.session();

  try {
  
      // Récupération des materiaux
      const Results = await session.run('MATCH (n) RETURN n');
      const Arr = Results.records.map(record => ({
          id: record._fields[0].identity.low,
          title: record._fields[0].properties.designation,
          category:record._fields[0].labels
      }));

      if (!Results ||Results.records.length === 0) {
        // Aucune donnée de matériaux trouvée, renvoyer une réponse d'erreur
        return res.status(404).json({ message: "Aucun entuté trouvé" });
      }
    // Récupération des produits
   
    res.json({entity:Arr});

} catch (err) {
    console.error(`Error executing query: ${err.message}`);
    res.status(500).send('Error executing query');
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

app.get('/api/nodes', async (req, res) => {
  const session = driver.session();
  try {
    // Récupération des nœuds avec les propriétés spécifiques
    const nodesResult = await session.run('MATCH (n) RETURN id(n) AS id, n.designation AS designation, labels(n) AS labels');
    const nodes = nodesResult.records.map(record => ({
      id: record.get('id').low,
      designation: record.get('designation'),
      labels: record.get('labels')
    }));

    // Récupération des relations avec les propriétés spécifiques
    const edgesResult = await session.run('MATCH ()-[r]->() RETURN r');
    const edges = edgesResult.records.map(record => ({
      elementId:record._fields[0].elementId,
      startNodeElementId: record._fields[0].startNodeElementId,
      endNodeElementId: record._fields[0].endNodeElementId,
      labels: record._fields[0].type
    }));
    
    res.json({ nodes, edges });
  } catch (err) {
    console.error(`Error fetching schema: ${err.message}`);
    res.status(500).send('Error fetching schema');
  } finally {
    await session.close();
  }
});

app.get('/api/node', async (req, res) => {
  const session = driver.session();
  
  try {
    
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
  }  finally {
    await session.close();
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
  connection.end();
});

// Endpoint pour gérer la connexion
app.post('/api/login', async (req, res) => {
  const { email, pass } = req.body;

  try {
    // Requête SQL pour chercher l'utilisateur par email et mot de passe
    const results = await query('SELECT `id` FROM logging WHERE `email` = ? AND `password` = ?', [email, pass]);

    if (results.length > 0) {
      // L'utilisateur est trouvé, authentification réussie
      const userId = results[0].id;
      res.status(200).json({ message: 'Authentification réussie', userId });
    } else {
      // Aucun utilisateur correspondant trouvé
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
});


app.get('/api/nodes/subgraph/:nodeId', async (req, res) => {
  const session = driver.session();
  const componentId = parseInt(req.params.nodeId, 10);
  try {
     
     
  
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



app.get('/api/nodes/Search/:search', async (req, res) => {
  const Term = req.params.search;
  const session = driver.session();
  console.log(Term)
  try {
  
      
      // Récupération du schéma du graphe
      const nodesresult = await session.run('MATCH (n) WHERE n.designation = $Term  RETURN n' ,{Term});
     let nodes=[]
     nodesresult.records.forEach(record => {
     const connectedNodes = record.get('n');
     nodes.push({
      id: connectedNodes.identity.low,
      title: connectedNodes.properties.designation,
      category:connectedNodes.labels,
      couleur:connectedNodes.properties.couleur

     })
  
  

/*


  })  
    nodes.push({
      id: connectedNode.identity,
      title: connectedNode.designation,
      category: connectedNode.labels
    })
*/
  });
    
  res.json({nodes});
 
  } catch (err) {
      console.error(`Error fetching schema: ${err.message}`);
      res.status(500).send('Error fetching schema');
  }  finally {
    await session.close();
  }
});

app.post('/send-email', (req, res) => {
  const { recipientEmail, subject, message } = req.body;

  const mailOptions = {
    from: recipientEmail,
    to: 'jy_bachikh@esi.dz',
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent');
    }
  });
});


app.post('/update-user', upload.single('profileImage'), (req, res) => {
  const { userId, editedName, editedFullName, editedEmail, editedPassword } = req.body;
  const profileImageBuffer = req.file ? req.file.buffer : null;
  
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'materiautheque'
  });

  const query = 'UPDATE logging SET  `Username` = ?, `full name` = ?, `email`= ?,`password` = ? , `image` = ? WHERE `id` = ?';
  const params = [editedName, editedFullName, editedEmail, editedPassword, profileImageBuffer, userId];
 console.log(query)
  connection.query(query, params, (error, results) => {
    if (error) {
      console.error('Error updating user information:', error);
      return res.status(500).json({ error: 'Error updating user information' });
    }
    res.status(200).json({ message: 'User information updated successfully' });
  });

  connection.end();
});
    

app.get('/userInfo/:id', async (req, res) => {
  const userid=parseInt(req.params.id, 10);
  console.log(req.params.id)
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'materiautheque'
  });
  
 

try {
  // Requête SQL pour mettre à jour les informations de l'utilisateur
  connection.query('SELECT * from logging WHERE `id` =? ', [userid], (error, results) => {
    if (error) {
      console.error('Erreur lors de la mise à jour des informations de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur lors de recuperations des informations de l\'utilisateur' });
    } else {
      if (results.length > 0) {
        // Renvoyer les informations de l'utilisateur
        res.status(200).json({ message: 'rahou shih', data:results[0] });
      } else {
        // Aucune ligne n'a été affectée (utilisateur introuvable)
        res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
    }
  });
} catch (error) {
  console.error('Erreur lors de la connexion à la base de données :', error);
  res.status(500).json({ message: 'Erreur lors de la connexion à la base de données' });
}finally {
  // Fermer la connexion à la base de données
  connection.end();
}
});



// Connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'materiautheque'
});

// Connexion à MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connexion à la base de données MySQL réussie');
});

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Route pour récupérer tous les messages
app.get('/api/messages', (req, res) => {
  const sql = 'SELECT * FROM messages';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des messages :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des messages' });
    } else {
      console.log('Messages récupérés avec succès');
      const messages = nestMessages(results);
      res.status(200).json(messages);
    }
  });
});

// Route pour envoyer un nouveau message
app.post('/api/messages', (req, res) => {
  const { message, parentId } = req.body;
  const sql = 'INSERT INTO messages (message, parentId) VALUES (?, ?)';
  connection.query(sql, [message, parentId], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'envoi du message :', err);
      res.status(500).json({ message: 'Erreur lors de l\'envoi du message' });
    } else {
      console.log('Message envoyé avec succès');
      res.status(201).json({ id: result.insertId });
    }
  });
});

// Fonction pour imbriquer les messages
const nestMessages = (messages) => {
  const map = {};
  const nested = [];

  // Mapper les messages par leur ID
  messages.forEach(msg => {
    map[msg.id] = { ...msg, replies: [] };
  });

  // Construire la structure hiérarchique des messages basée sur parentId
  messages.forEach(msg => {
    if (msg.parentId !== null && map[msg.parentId]) {
      map[msg.parentId].replies.push(map[msg.id]);
    } else {
      nested.push(map[msg.id]);
    }
  });

  return nested;
};


 


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

 
