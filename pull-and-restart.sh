#!/bin/bash

# Arrêter le script en cas d'erreur
set -e

# Variables à personnaliser
IMAGE_NAME="alexandredelesse/mealappclient"  # Nom de l'image Docker
IMAGE_TAG="latest"                 # Tag de l'image (par défaut : latest)
CONTAINER_NAME="mealapp-client" # Nom du conteneur
PORT_MAPPING="3002:80"           # Mapping des ports (hôte:conteneur)

# Étape 1 : Tirer la nouvelle image depuis le registre
docker login
echo "Récupération de l'image Docker mise à jour..."
docker pull "$IMAGE_NAME:$IMAGE_TAG"

# Étape 2 : Arrêter et supprimer l'ancien conteneur (s'il existe)
if docker ps -a | grep -q "$CONTAINER_NAME"; then
  echo "Arrêt du conteneur existant..."
  docker stop "$CONTAINER_NAME" || true

  echo "Suppression du conteneur existant..."
  docker rm "$CONTAINER_NAME" || true
fi

# Étape 3 : Lancer un nouveau conteneur avec la nouvelle image
echo "Démarrage d'un nouveau conteneur avec l'image mise à jour..."
docker run -d -p "$PORT_MAPPING" --name "$CONTAINER_NAME" "$IMAGE_NAME:$IMAGE_TAG"

# Étape 4 : Vérifier que le conteneur est en cours d'exécution
echo "Vérification de l'état du conteneur..."
docker ps | grep "$CONTAINER_NAME"

# Fin du script
echo "Le conteneur a été relancé avec succès : $CONTAINER_NAME utilisant l'image $IMAGE_NAME:$IMAGE_TAG"
