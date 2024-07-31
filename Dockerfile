# Utilisez une image Node.js comme base pour construire l'application
FROM node:14 AS build

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances de l'application
RUN npm install

# Copiez tous les fichiers du projet dans le conteneur
COPY . .

# Construisez l'application pour la production
RUN npm run build

# Utilisez une image Nginx pour servir l'application
FROM nginx:alpine

# Copiez les fichiers de construction de l'application dans le répertoire Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposez le port sur lequel Nginx va écouter
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
