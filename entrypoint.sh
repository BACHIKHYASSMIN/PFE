#!/bin/sh

# Exécuter le fichier connection.js
echo "Exécution de connection.js..."
node /app/connection.js

# Vérifier si connection.js s'est exécuté correctement
if [ $? -ne 0 ]; then
  echo "Erreur lors de l'exécution de connection.js"
  exit 1
fi

# Exécuter le fichier server.js
echo "Exécution de server.js..."
node /app/server.js

# Vérifier si server.js s'est exécuté correctement
if [ $? -ne 0 ]; then
  echo "Erreur lors de l'exécution de server.js"
  exit 1
fi

# Exécuter le fichier advanced.js
echo "Exécution de advanced.js..."
node /app/advanced.js

# Vérifier si advanced.js s'est exécuté correctement
if [ $? -ne 0 ]; then
  echo "Erreur lors de l'exécution de advanced.js"
  exit 1
fi

# Démarrer Nginx
echo "Démarrage de Nginx..."
nginx -g 'daemon off;'
