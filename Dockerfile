# Étape 1 : Build de l'application React
FROM node:19.3 AS build

WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Nettoyer le cache npm et installer les dépendances
RUN npm install

# Copier le code source de l'application
COPY . .

# Construire l'application React
RUN npm run build

# Étape 2 : Utiliser Nginx pour servir l'application React
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
