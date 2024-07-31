const express = require('express');
const neo4j = require('neo4j-driver');
const nodemailer = require('nodemailer');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const mysql = require('mysql2');
const app = express();
const port = 5000;
const upload = multer();
app.set('view engine', 'ejs');

// Middleware pour activer CORS
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

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
  host: 'mysql', // Utilisez le nom du service Docker ici
  user: 'root',
  password: 'rootpassword', // Mettez à jour le mot de passe ici
  database: 'materiautheque'
});
  
  app.post('/api/register', async (req, res) => {
    const { nomComplet, email, motDePasse } = req.body;
  
    // Créer une connexion à la base de données MySQL
    const connection = mysql.createConnection({
      host: 'mysql', // Utilisez le nom du service Docker ici
      user: 'root',
      password: 'rootpassword', // Mettez à jour le mot de passe ici
      database: 'materiautheque'
    });
  
    try {
      // Insertion des données d'inscription dans la base de données
      const sql = "INSERT INTO logging (`full_name`, `email`, `password`) VALUES (?, ?, ?)";
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
    // Requête SQL pour chercher l'utilisateur par email, mot de passe et récupérer son rôle
    const results = await query('SELECT `id`, `role`, `image` FROM logging WHERE `email` = ? AND `password` = ?', [email, pass]);

    if (results.length > 0) {
      // L'utilisateur est trouvé, authentification réussie
      const userId = results[0].id;
      const role = results[0].role;
      const image=results[0].image;
      res.status(200).json({ message: 'Authentification réussie', userId, role,image });
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


  app.post('/update-user', upload.single('profileImage'), (req, res) => {
    const { userId, editedName, editedFullName, editedEmail, editedPassword } = req.body;
    const profileImageBuffer = req.file ? req.file.buffer : null;
    
    const connection = mysql.createConnection({
      host: 'mysql', // Utilisez le nom du service Docker ici
      user: 'root',
      password: 'rootpassword', // Mettez à jour le mot de passe ici
      database: 'materiautheque'
    });
  
    const query = 'UPDATE logging SET  `Username` = ?, `full_name` = ?, `email`= ?,`password` = ? , `image` = ? WHERE `id` = ?';
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
      host: 'mysql', // Utilisez le nom du service Docker ici
      user: 'root',
      password: 'rootpassword', // Mettez à jour le mot de passe ici
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
  
  
  app.get('/api/utilisateurs', (req, res) => {
    const connection = mysql.createConnection({
      host: 'mysql', // Utilisez le nom du service Docker ici
      user: 'root',
      password: 'rootpassword', // Mettez à jour le mot de passe ici
      database: 'materiautheque'
    });
    const sql = 'SELECT * FROM logging';
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des utilisateurs :', err);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });  
  