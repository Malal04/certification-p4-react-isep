# Fichier Dockerfile pour construire une image Docker pour cette application React

# Etape 1: Construire l'application React 
FROM node:20 as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Etape 2: Initialisation du serveur d'application pour se faire nous allons utiliser NGINX 
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Etape 3: Copier le fichier de configuration se trouvant à la racine du projet dans le container
COPY nginx.conf /etc/nginx/nginx.conf

# Etape 4: Exposer le port 80
EXPOSE 80

# Lancement le serveur d'application
CMD ["nginx", "-g", "daemon off;"]
