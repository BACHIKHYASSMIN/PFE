const express = require('express');
const Memcached = require('memcached');
const neo4j = require('neo4j-driver');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 2000;

// Connexion à Memcached (par défaut, Memcached est sur localhost:11211)
const memcached = new Memcached('localhost:11211');

// Détails de connexion
const uri = "neo4j://localhost:7687"; // Assurez-vous d'utiliser le bon port, généralement 7687 pour Bolt
const user = "neo4j";
const password = "password";
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

// Fonction pour récupérer des données depuis Memcached
function getFromMemcached(key) {
    return new Promise((resolve, reject) => {
        memcached.get(key, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// Fonction pour mettre des données dans Memcached
function setInMemcached(key, value, expiry) {
    return new Promise((resolve, reject) => {
        memcached.set(key, value, expiry, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Route pour récupérer les données des produits avec mise en cache
app.get('/api/ProductData', async (req, res) => {
    const session = driver.session();
    try {
        // Vérifiez si les données sont dans le cache Memcached
        const cachedData = await getFromMemcached('products');
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        // Récupération des produits depuis Neo4j
        const produitsResult = await session.run('MATCH (n:Produit) RETURN n');
        const produitsArr = produitsResult.records.map(record => ({
            id: record.get('n').identity.low,
            title: record.get('n').properties.designation,
            category: 'Produits',
            image: record.get('n').properties.images
        }));

        if (produitsArr.length === 0) {
            return res.status(404).json({ message: "Aucun produit trouvé" });
        }

        // Stockez les données dans le cache Memcached pour une heure (3600 secondes)
        await setInMemcached('products', JSON.stringify({ produits: produitsArr }), 3600);

        res.json({ produits: produitsArr });
    } catch (err) {
        console.error(`Error executing query: ${err.message}`);
        res.status(500).send('Error executing query');
    } finally {
        await session.close();
    }
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
